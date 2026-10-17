# Cedar Ridge Bank: Email Triage Agent (practice demo)

A small agent for a **fictional** bank. All emails and policies are invented. No real bank data.

**Design:** one agent (Claude via Claude Code) + one tool (policy lookup) + a code-enforced human gate.
- The email is treated as untrusted text. The model can only use the policy snippets it is given.
- Fraud, legal, complaints, money movement, refunds, low confidence, unparseable output: always routed to a banker, never auto-sent.
- Even approved replies are only "sent" in simulation. A person clicks yes.

## Run locally (Node 18+, no installs, no API key)
1. Install Claude Code and sign in (run `claude` once). Check with `claude -p "say hi"`.
2. In this folder:
   - `node eval.js --mock`   checks the pipeline with no model (instant)
   - `node eval.js`          scores real Claude on the 20 emails (takes a few minutes; one call per email)
   - `node triage.js 1 3 5`  interactive demo on emails 1, 3 and 5 (add `--mock` to skip the model)

## What to look at
Human-escalation recall is the number that matters: emails that should reach a banker must never be auto-sent. Category accuracy is secondary.

## Files
`triage.js` agent + gate, `eval.js` scoring, `emails.json` 20 labeled emails, `kb.json` fake policies.

## Limits
20 emails is a demo-sized test, not proof. The `--mock` model is a keyword stand-in for testing the code; its scores say nothing about Claude. Not for real customers.
