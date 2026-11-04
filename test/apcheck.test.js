const t = require("node:test"), assert = require("node:assert");
const { apCheck } = require("../src/apcheck");
t.test("clean invoice approves", () => { const r = apCheck({ vendor: "A", invoice_no: "1", lines: [{ qty: 1, unit_price: 100, amount: 100 }], subtotal: 100, tax: 8, total: 108 }); assert.equal(r.decision, "APPROVE"); });
t.test("duplicate + bank change holds", () => { apCheck({ vendor: "B", invoice_no: "9", lines: [], total: 0 });
  const r = apCheck({ vendor: "B", invoice_no: "9", bank_account: "X", lines: [], total: 0 }, { vendor_bank: { B: "Y" } });
  assert.equal(r.decision, "HOLD"); assert.ok(r.flags.find((f) => f.code === "BANK_CHANGE")); });
t.test("math error flagged", () => { const r = apCheck({ vendor: "C", invoice_no: "2", lines: [{ qty: 2, unit_price: 50, amount: 90 }], subtotal: 100, tax: 0, total: 100 }); assert.ok(r.flags.find((f) => f.code === "LINE_MATH")); });
t.test("402 without payment", async () => { process.env.PAY_TO = "0xF9b1A20C6ef13F693CA1FA0E834A1ce956677519"; delete require.cache[require.resolve("../src/config")];
  const { app } = require("../src/server"); const s = app.listen(0); const r = await fetch(`http://localhost:${s.address().port}/ap-check`, { method: "POST" }); assert.equal(r.status, 402); const j = await r.json(); assert.equal(j.accepts[0].scheme, "exact"); s.close(); });
