// HTTP 402 pay-per-call AP-check service on Celo.
// Flow: request without payment -> 402 + payment requirements; client pays on-chain,
// retries with X-PAYMENT (base64 JSON {txHash}); server verifies the transfer on Celo, then serves.
const express = require("express");
const { createPublicClient, http, parseUnits, decodeEventLog, parseAbi } = require("viem");
const cfg = require("./config");
const { apCheck } = require("./apcheck");
const client = createPublicClient({ transport: http(cfg.net.rpc) });
const used = new Set();
const amount = parseUnits(cfg.price, cfg.decimals);
const ERC20 = parseAbi(["event Transfer(address indexed from, address indexed to, uint256 value)"]);

function requirements(resource) {
  return { x402Version: 1, accepts: [{ scheme: "exact", network: cfg.net.id === 42220 ? "celo" : "celo-sepolia", chainId: cfg.net.id,
    maxAmountRequired: amount.toString(), asset: cfg.asset, payTo: cfg.payTo, resource, description: "CFO AP invoice check (1 call)", mimeType: "application/json", settlement: "direct-onchain-transfer" }] };
}
async function verify(txHash) {
  if (used.has(txHash)) throw new Error("payment already used");
  const [rc, head] = await Promise.all([client.getTransactionReceipt({ hash: txHash }), client.getBlockNumber()]);
  if (rc.status !== "success") throw new Error("tx failed");
  if (head - rc.blockNumber > BigInt(cfg.maxAgeBlocks)) throw new Error("payment too old");
  if (cfg.asset === "native") {
    const tx = await client.getTransaction({ hash: txHash });
    if (tx.to?.toLowerCase() !== cfg.payTo.toLowerCase() || tx.value < amount) throw new Error("wrong payee/amount");
  } else {
    const ok = rc.logs.some((l) => { if (l.address.toLowerCase() !== cfg.asset.toLowerCase()) return false;
      try { const e = decodeEventLog({ abi: ERC20, ...l }); return e.args.to.toLowerCase() === cfg.payTo.toLowerCase() && e.args.value >= amount; } catch { return false; } });
    if (!ok) throw new Error("no matching token transfer");
  }
  used.add(txHash);
  return { txHash, block: rc.blockNumber.toString(), from: rc.from };
}
const app = express(); app.use(express.json());
app.get("/", (_, res) => res.type("html").send(require("./landing")));
app.get("/api/info", (_, res) => res.json({ service: "Open Rails CFO AP-check", network: cfg.net.name, price: cfg.price, asset: cfg.asset, payTo: cfg.payTo }));
app.get("/ap-check", (req, res) => res.status(402).json(requirements(req.originalUrl)));
app.post("/ap-check", async (req, res) => {
  const hdr = req.get("X-PAYMENT");
  if (!hdr) return res.status(402).json(requirements(req.originalUrl));
  try {
    const { txHash } = JSON.parse(Buffer.from(hdr, "base64").toString());
    const receipt = await verify(txHash);
    res.set("X-PAYMENT-RESPONSE", Buffer.from(JSON.stringify(receipt)).toString("base64"));
    res.json({ ...apCheck(req.body), payment: { ...receipt, explorer: cfg.net.explorer + txHash } });
  } catch (e) { res.status(402).json({ error: e.message, ...requirements(req.originalUrl) }); }
});
if (require.main === module) { if (!cfg.payTo) throw new Error("set PAY_TO"); app.listen(process.env.PORT || 4021, () => console.log(`AP-check on ${cfg.net.name} :${process.env.PORT || 4021}`)); }
app.app = app; app.verify = verify;
module.exports = app;
