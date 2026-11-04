// Buyer agent: calls the service, handles 402 by paying on Celo, retries.
// Key from CELO_AGENT_PK env or KEY_FILE path; never printed.
const fs = require("fs");
const { createWalletClient, createPublicClient, http, parseUnits, encodeFunctionData, parseAbi, concatHex } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const cfg = require("./config");
const pk = process.env.CELO_AGENT_PK || fs.readFileSync(process.env.KEY_FILE, "utf8").trim();
const account = privateKeyToAccount(pk);
const chain = { id: cfg.net.id, name: cfg.net.name, nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 }, rpcUrls: { default: { http: [cfg.net.rpc] } } };
const wallet = createWalletClient({ account, chain, transport: http(cfg.net.rpc) });
const pub = createPublicClient({ chain, transport: http(cfg.net.rpc) });
const sfx = (d) => (cfg.attribution ? concatHex([d || "0x", cfg.attribution]) : d); // ERC-8021 attribution suffix

async function pay(req) {
  const value = BigInt(req.maxAmountRequired);
  const hash = req.asset === "native"
    ? await wallet.sendTransaction({ to: req.payTo, value, data: sfx("0x") === "0x" ? undefined : sfx("0x") })
    : await wallet.sendTransaction({ to: req.asset, data: sfx(encodeFunctionData({ abi: parseAbi(["function transfer(address,uint256) returns (bool)"]), functionName: "transfer", args: [req.payTo, value] })) });
  await pub.waitForTransactionReceipt({ hash });
  return hash;
}
async function call(url, body) {
  let r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  if (r.status !== 402) return r.json();
  const reqs = (await r.json()).accepts[0];
  const txHash = await pay(reqs);
  r = await fetch(url, { method: "POST", headers: { "content-type": "application/json", "X-PAYMENT": Buffer.from(JSON.stringify({ txHash })).toString("base64") }, body: JSON.stringify(body) });
  return r.json();
}
module.exports = { call, account };
if (require.main === module) {
  const inv = JSON.parse(fs.readFileSync(process.argv[3] || "examples/invoice.json"));
  call(process.argv[2] || "http://localhost:4021/ap-check", inv).then((o) => console.log(JSON.stringify(o, null, 2)));
}
