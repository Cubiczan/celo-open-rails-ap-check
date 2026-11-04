# Loops House submission draft: Agents on Open Rails
**Project:** Open Rails AP-Check
**Tracks:** Build with `buy` (HTTP 402 service); USD₮ x402 Open Corridors (settlement in USD₮ on Celo mainnet)
**Repo:** https://github.com/Cubiczan/celo-open-rails-ap-check
**Agent wallet:** <mainnet buyer address>   **PayTo (seller):** <mainnet seller address>
**ERC-8004 Agent ID:** <to register>
**Services used:** Celo mainnet RPC (Forno / Chainstack), USD₮ on Celo, ERC-8021 attribution suffix
**Gas sponsorship:** none (the agent pays its own gas)
**Payment proof:** <tx hashes from PROOF.md>

**Description:** A pay-per-call accounts-payable control service for agents. An agent posts an invoice and gets back a 402 challenge. It pays $0.01 USD₮ on Celo, retries with the tx hash, and gets back APPROVE/REVIEW/HOLD with flags: math errors, duplicates, a remit-to bank change (BEC fraud), PO overrun, and more. Built by Shyam Desigan, CFO, to encode the checks a finance team runs before money moves. Settlement is verified on-chain by the seller (direct transfer). The facilitator/EIP-3009 path is the stated next step.
