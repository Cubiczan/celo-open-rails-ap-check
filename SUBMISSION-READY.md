# SUBMISSION-READY — Loops House: Agents on Open Rails — Open Rails AP-Check

**Prepared / updated:** Thu Nov 5, 2026 ~8:05 AM ET  
**Entrant:** Shyam Desigan (CFO), sam@cubiczan.com  
**Ready to submit in browser as scorable/mainnet entry?** **NO**  
**Ready to submit as honest testnet proof?** **YES** (will not score on mainnet leaderboard)  
**Deadline:** Mon Nov 9, 2026 **4:00 AM ET**  
**Submit URL:** https://www.loops.house/agents-on-open-rails  
**Track:** Build with `buy`

---

## Final links

| | |
|---|---|
| **Public repo** | https://github.com/Cubiczan/celo-open-rails-ap-check (**public**) |
| **Live demo** | https://celo-open-rails-ap-check.vercel.app |
| **Demo video (local mp4)** | `/workspace/contests/celo-open-rails/docs/video/ap-check-demo.mp4` (~27s; also `loops-house/ap-check-demo.mp4`) |
| **YouTube** | **NOT uploaded yet** — upload mp4 then paste URL |

**Secret scan:** keys live only under `/home/box/.celo/*.key` (outside repo). Repo `.gitignore` covers `.env` / `*.key`. Tx hashes in docs are public explorer links, not secrets. Nothing removed from history.

---

## Mainnet / ERC-8004 / ERC-8021 feasibility (no user seed asked)

Existing mainnet agent key on the box (content never printed):

| | |
|---|---|
| **Address to fund** | `0x3330aC97643adD57b9A6AAcd99b9c4eb1E11255E` |
| **CELO balance** | **0** |
| **USD₮ balance** | **0** |
| **ERC-8004** | Registry `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` on Celo mainnet. Gas-only (~0.01–0.04 CELO typical). **Blocked: unfunded.** |
| **ERC-8021 tag** | Issued at Loops enrolment — must copy from Loops dashboard / enrolment email into `ERC8021_SUFFIX`. Cannot invent. |
| **Paid demo calls** | Need gas + (for USD₮ path) ~0.05–1 USD₮. Recommend funding **~0.1 CELO** (gas + register + a few native transfers) **or** ~0.05 CELO + **1 USD₮** for facilitator-style path. |

**Cannot complete mainnet deploy / register / tagged txs without funding that address** (or another funded key the user places as `CELO_AGENT_PK` / `~/.celo/mainnet-agent.key`). Do not ask for seed/private key in chat.

---

## Paste-ready fields (honest testnet)

**Project name:** Open Rails AP-Check  
**Tagline:** Pay-per-call accounts-payable checks for AI agents, settled with HTTP 402 on Celo.  
**Live App URL:** https://celo-open-rails-ap-check.vercel.app  
**Public repo:** https://github.com/Cubiczan/celo-open-rails-ap-check  
**Agent wallet:** `0xAdcFF27739dacbA09e6169E4c38fBaA8dB1d0BB8` (Sepolia)  
**PayTo:** `0xF9b1A20C6ef13F693CA1FA0E834A1ce956677519` (Sepolia)  
**ERC-8004 / ERC-8021:** Not registered / not applied.  
**Network:** Celo Sepolia only. No mainnet txs.  
**Proof txs:** see PROOF.md (APPROVE / REVIEW / HOLD + replay refused).  
**Video:** (upload `docs/video/ap-check-demo.mp4` → YouTube URL)

**Description:** Open Rails AP-Check is a pay-per-call accounts-payable control service for AI agents… (full text in prior SUBMISSION.md). Honest scope: testnet proof only; direct on-chain transfer verified by seller; not Celo x402 facilitator.

---

## Still blocked for a competitive entry

1. Fund `0x3330aC97643adD57b9A6AAcd99b9c4eb1E11255E` (~0.1 CELO and/or 1 USD₮).  
2. Retrieve ERC-8021 attribution tag from Loops enrolment and set `ERC8021_SUFFIX`.  
3. Register ERC-8004 from that wallet; run mainnet paid calls with tag.  
4. Upload demo mp4 to YouTube.  
5. Browser submit on Loops.
