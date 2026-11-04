# Loops House submission: Agents on Open Rails (testnet proof only)

**Project name:** Open Rails AP-Check

**Track:** Build with `buy` (HTTP 402 service). USD₮ x402 Open Corridors is *planned* and not entered, because it is judged on mainnet volume and there is no mainnet activity.

**Live App URL:** https://celo-open-rails-ap-check.vercel.app

**Public repo:** https://github.com/Cubiczan/celo-open-rails-ap-check

**Agent (buyer) wallet:** 0xAdcFF27739dacbA09e6169E4c38fBaA8dB1d0BB8 (Celo Sepolia testnet only)

**PayTo (seller) address:** 0xF9b1A20C6ef13F693CA1FA0E834A1ce956677519 (Celo Sepolia testnet only)

**ERC-8004 Agent ID:** Not registered yet (planned).

**ERC-8021 attribution tag:** Not applied. No tag was used on any transaction.

**Network:** Celo Sepolia testnet (chain 11142220). No mainnet transactions have been made.

**Services used:** Celo Sepolia public RPC (Forno), the Celo Sepolia faucet, and the Blockscout explorer. Payments are in native CELO.

**Gas sponsorship disclosure:** None. The buyer wallet paid its own gas.

**Payment proof (Celo Sepolia, 0.001 CELO per call):**
- APPROVE (clean invoice): https://celo-sepolia.blockscout.com/tx/0x1a07bf0379f690f527126968e473b86ab1d974ddb737b4a51d56712071351498
- REVIEW (round-amount flag): https://celo-sepolia.blockscout.com/tx/0xd8c3425db347afc45fc32b5543419e69727bade328212777162feab1ab0b3772
- HOLD (line-math error and PO overrun): https://celo-sepolia.blockscout.com/tx/0xe9337432dc8a2ab515f658b4be58839a4b3b15a7bf0d8a144a8b418cea233ca4
- Replay check: resubmitting the APPROVE payment hash was refused with `402 payment already used`.

**Description:**
Open Rails AP-Check is a pay-per-call accounts-payable control service for AI agents. An agent posts an invoice and gets an HTTP 402 challenge with x402-style payment terms (scheme, chain, asset, payTo, amount). The agent pays on Celo, then retries with the transaction hash. The service reads the receipt from Celo and checks the payee, amount, success, recency and single use. It then returns APPROVE, REVIEW or HOLD with flags:
- line and total math errors
- duplicate invoices
- a remit-to bank account that differs from the vendor record (business-email-compromise risk)
- PO overrun, high tax, large round amounts, and bad dates

It was built by Shyam Desigan, CFO, and encodes the checks a finance team runs before money moves.

**Honest scope:** This entry has testnet proof only. Settlement is a direct on-chain transfer that the seller verifies; it does not use the Celo x402 facilitator.

**Planned, not done:**
- mainnet USD₮ payments
- ERC-8004 registration
- the ERC-8021 attribution tag
- facilitator/EIP-3009 gasless settlement
