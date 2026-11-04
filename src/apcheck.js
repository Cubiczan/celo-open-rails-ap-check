// Deterministic accounts-payable checks a CFO runs before releasing a payment.
const seen = new Map(); // vendor|invoiceNo -> first seen
function apCheck(inv, known = {}) {
  const flags = [];
  const lines = inv.lines || [];
  const sub = lines.reduce((s, l) => s + Number(l.qty) * Number(l.unit_price), 0);
  const r2 = (x) => Math.round(x * 100) / 100;
  lines.forEach((l, i) => { if (l.amount != null && r2(l.qty * l.unit_price) !== r2(l.amount)) flags.push({ code: "LINE_MATH", line: i, msg: `qty*price ${r2(l.qty*l.unit_price)} != ${l.amount}` }); });
  const tax = Number(inv.tax || 0);
  if (inv.subtotal != null && r2(sub) !== r2(inv.subtotal)) flags.push({ code: "SUBTOTAL", msg: `lines sum ${r2(sub)} != subtotal ${inv.subtotal}` });
  if (r2((inv.subtotal ?? sub) + tax) !== r2(inv.total)) flags.push({ code: "TOTAL", msg: `subtotal+tax ${r2((inv.subtotal ?? sub)+tax)} != total ${inv.total}` });
  if (sub > 0 && tax / sub > 0.3) flags.push({ code: "TAX_RATE", msg: `tax rate ${(100*tax/sub).toFixed(1)}% looks high` });
  const key = `${(inv.vendor||"").toLowerCase()}|${inv.invoice_no}`;
  if (seen.has(key) || (known.paid || []).includes(key)) flags.push({ code: "DUPLICATE", msg: `invoice ${inv.invoice_no} from ${inv.vendor} already seen` });
  seen.set(key, Date.now());
  if (known.vendor_bank && inv.bank_account && known.vendor_bank[inv.vendor] && known.vendor_bank[inv.vendor] !== inv.bank_account)
    flags.push({ code: "BANK_CHANGE", msg: "remit-to account differs from vendor master (possible BEC fraud)" });
  if (inv.po_total != null && inv.total > inv.po_total * 1.05) flags.push({ code: "PO_OVERRUN", msg: `total exceeds PO by >5%` });
  if (inv.total % 1000 === 0 && inv.total >= 5000) flags.push({ code: "ROUND_AMOUNT", msg: "large round-dollar amount" });
  if (inv.due_date && inv.invoice_date && new Date(inv.due_date) < new Date(inv.invoice_date)) flags.push({ code: "DATES", msg: "due date before invoice date" });
  const sev = { BANK_CHANGE: 3, DUPLICATE: 3, TOTAL: 2, SUBTOTAL: 2, LINE_MATH: 2, PO_OVERRUN: 2 };
  const score = flags.reduce((s, f) => s + (sev[f.code] || 1), 0);
  return { decision: score >= 3 ? "HOLD" : score > 0 ? "REVIEW" : "APPROVE", risk_score: score, flags, computed_subtotal: r2(sub) };
}
module.exports = { apCheck, _seen: seen };
