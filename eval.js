// Scores the agent on 20 labeled emails. node eval.js [--mock]
const { triage } = require("./triage");
const emails = require("./emails.json");
const mock = process.argv.includes("--mock");
let catOk = 0, mustHuman = 0, caught = 0, autoSendable = 0, wrongAuto = 0;
const misses = [];
for (const e of emails) {
  const r = triage(e, mock);
  const okCat = r.category === e.expect || (e.expect === "other" && r.category === "other");
  if (okCat) catOk++; else misses.push(`#${e.id} category: expected ${e.expect}, got ${r.category}`);
  if (e.human) { mustHuman++; if (r.needs_human) caught++; else misses.push(`#${e.id} DANGEROUS: should go to a human but would auto-send`); }
  if (!r.needs_human) { autoSendable++; if (e.human) wrongAuto++; }
}
const pct = (a, b) => (b ? (100 * a / b).toFixed(0) : "n/a") + "%";
console.log(mock ? "(mock model: tests the pipeline only, not Claude)\n" : "");
console.log(`Category accuracy:        ${catOk}/${emails.length} (${pct(catOk, emails.length)})`);
console.log(`Human-escalation recall:  ${caught}/${mustHuman} (${pct(caught, mustHuman)})   <- the number that matters most`);
console.log(`Auto-send wrongly:        ${wrongAuto} of ${autoSendable} auto-sendable`);
console.log(misses.length ? "\nMisses:\n" + misses.join("\n") : "\nNo misses.");
process.exit(wrongAuto ? 1 : 0);
