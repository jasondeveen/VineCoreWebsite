## Agent skills

### Issue tracker

Issues and specs for this repo live as GitHub issues (github.com/jasondeveen/VineCoreWebsite), managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical triage roles using the default label strings: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.

## Git and deploy permissions

Do not push to GitHub, and do not deploy or promote on Vercel, unless the user
explicitly instructs it in the current conversation. Local edits, local commits,
and local builds are fine; remote operations (`git push`, `vercel deploy`,
`vercel --prod`, `vercel promote`, `vercel rollback`) require an explicit
request.
