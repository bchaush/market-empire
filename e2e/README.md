# e2e/

E2E-001 (`docs/testing/initial-test-plan.md`): one complete seven-screen
Playwright walkthrough.

`e2e-001-full-walkthrough.spec.ts` implements it as a single deterministic
run through Start → Coach Tutorial → Market Intelligence → City Investment
Decision → Market Result → Property Opportunity & Sealed Bid → Round
Summary → Play Again (full reset), per the transition table in
`docs/DEMO_SPEC.md` §12.

Every numeric input the spec uses (the $2,500-per-sector allocation and
the $4,500 player bid) traces to an existing known-answer fixture
(FIN-EX-002/CALC-002/BOUND-ALLOC-01 and FIN-EX-010/BOUND-BID-05 — see the
comment at the top of the spec file) or to `src/content/gameConfig.ts`
(DEC-010). Every other asserted figure is computed in the spec at test-run
time by calling the real engine functions from `src/engine/`, not
hand-calculated.

Run with `npm run e2e`. Passing this spec is evidence for E2E-001 only —
it is not a usability, accessibility, or Vercel-preview verification, and
does not by itself establish that Issue #7 is complete.
