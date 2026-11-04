# Payment proof

## Celo Sepolia testnet (chain 11142220), run 2026-11-04
Each call pays 0.001 CELO (native) from buyer `0xAdcFF27739dacbA09e6169E4c38fBaA8dB1d0BB8` to seller/PayTo `0xF9b1A20C6ef13F693CA1FA0E834A1ce956677519`.

| Case | Invoice | Decision | Flags | Payment tx |
|---|---|---|---|---|
| Clean | examples/approve.json | APPROVE | none | [0x1a07bf03…1498](https://celo-sepolia.blockscout.com/tx/0x1a07bf0379f690f527126968e473b86ab1d974ddb737b4a51d56712071351498) |
| Round amount | examples/review.json | REVIEW | ROUND_AMOUNT | [0xd8c3425d…3772](https://celo-sepolia.blockscout.com/tx/0xd8c3425db347afc45fc32b5543419e69727bade328212777162feab1ab0b3772) |
| Bad math + PO overrun | examples/hold.json | HOLD | LINE_MATH, PO_OVERRUN | [0xe9337432…3ca4](https://celo-sepolia.blockscout.com/tx/0xe9337432dc8a2ab515f658b4be58839a4b3b15a7bf0d8a144a8b418cea233ca4) |

Funding (faucet → buyer): [0x1363e22a…04ba](https://celo-sepolia.blockscout.com/tx/0x1363e22a53db6f3a4ca3da4442d26d75e9ba84ac6397503614ac47f6e4ca04ba)

Replay check: reusing the APPROVE tx hash returned `402 payment already used`.
No ERC-8021 suffix was set on these testnet txs (it is issued at Loops House enrolment).

## Celo mainnet
Pending.
