// Network config. Select with NETWORK=sepolia|mainnet. No keys live in this file.
const NETS = {
  sepolia: { id: 11142220, name: "Celo Sepolia", rpc: process.env.CELO_RPC || "https://forno.celo-sepolia.celo-testnet.org",
    explorer: "https://celo-sepolia.blockscout.com/tx/" },
  mainnet: { id: 42220, name: "Celo", rpc: process.env.CELO_RPC || "https://forno.celo.org",
    explorer: "https://celoscan.io/tx/" },
};
const net = NETS[process.env.NETWORK || "sepolia"];
module.exports = {
  net,
  // Asset: "native" (CELO) or an ERC-20 address (e.g. mainnet USDT 0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e, USDC 0xcebA9300f2b948710d2653dD7B07f33A8B32118C)
  asset: process.env.PAY_ASSET || "native",
  decimals: Number(process.env.PAY_DECIMALS || 18),
  price: process.env.PRICE || "0.001",          // per call, in asset units
  payTo: process.env.PAY_TO,                       // seller address (x402 payTo)
  attribution: process.env.ERC8021_SUFFIX || "",   // hex data suffix issued at enrolment, appended to every tx
  maxAgeBlocks: Number(process.env.MAX_AGE_BLOCKS || 2000),
};
