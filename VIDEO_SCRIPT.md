# 3-minute video script
0:00–0:20 Hook: "Before any payment goes out, a CFO checks it. Agents need the same control, and they can pay for it per call."
0:20–0:50 Problem: duplicate invoices and changed bank details (BEC) cost companies real money. The checks are simple, but they get skipped.
0:50–1:30 Demo 1: curl POST /ap-check returns 402 with requirements (chain, USD₮, payTo, amount). Explain the x402 shape.
1:30–2:15 Demo 2: run the buyer agent. It pays on Celo, and the tx hash opens on Celoscan. The retry returns HOLD: BANK_CHANGE + PO_OVERRUN.
2:15–2:40 Code tour: the verify() receipt check (payee, amount, single-use, recency) and the ERC-8021 suffix in agent.js.
2:40–3:00 Honest scope and next steps: today it uses direct-transfer settlement; next is the Celo x402 facilitator and gasless USD₮. Repo link.
