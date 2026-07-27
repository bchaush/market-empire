# Market Empire agent instructions

## Project objective

Build one complete, clickable and deterministic demo round before expanding the game.

## Read before starting work

Before proposing or making a change, read:

- `docs/PROJECT_FOUNDATION.md`
- `docs/DEMO_SPEC.md`
- `docs/DECISIONS.md`
- The GitHub issue assigned to the change

If a required file does not exist yet, stop and report that clearly.

## Permanent rules

- Never invent formulas, sources, research findings, test results or approvals.
- Clearly label unresolved information as `Provisional`.
- Do not treat AI output as verified evidence.
- Follow `docs/DEMO_SPEC.md` for the current one-round demo scope.
- Do not add screens, rules or features outside the Demo Spec without a recorded decision.
- Work on one GitHub issue at a time.
- Produce a short plan before editing files.
- Do not silently change architecture, financial rules or project scope.
- Keep financial calculations separate from the interface.
- The engine calculates official results; the interface only displays them.
- Gameplay explanations must use confirmed, scripted content.
- Run the relevant tests before proposing a merge.
- Never remove or skip a failing test merely to make a check pass.
- Never commit passwords, API keys or other secrets.
- Record unresolved risks and limitations honestly.

## Current demo boundaries

The first demo contains:

1. Start
2. Market Signal
3. Investment Decision
4. Market Result
5. Property Bid
6. Round Summary

It does not yet include:

- Real multiplayer
- Accounts or logins
- More than one round
- The Advanced Experience
- Live AI calls during gameplay
- Final validated financial formulas

## Completion report

After completing a task, report:

- Files changed
- Tests run and their results
- Unresolved risks
- Provisional assumptions
- Documentation requiring an update
