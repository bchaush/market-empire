# screens/

The seven screens defined in `docs/DEMO_SPEC.md` §6 (Start, Coach
Tutorial, Market Intelligence, City Investment Decision, Market Result,
Property Opportunity & Sealed Bid, Round Summary), implemented in Phase
2B of Issue #7.

Each screen reads `GameState` and calls the action functions in
`src/state/gameActions.ts` — no screen performs its own financial
calculation; every result comes from `src/engine/` via that layer
(`docs/DEMO_SPEC.md` §14). `App.tsx` orchestrates which screen renders
and slots its content into `src/components/AppShell.tsx`.

Structural/playable implementation, not final visual artwork. Landmark
and property "hotspots" are rendered as accessible buttons inside the
shell's panels rather than on a real map graphic — no map art exists yet.
Several pieces of scripted content that DEMO_SPEC calls for (the Start
screen's descriptive sentence, Coach guidance on Screens 4-7 beyond the
approved introduction) have no approved wording anywhere in the
repository and were intentionally left out rather than invented — see
the Phase 2B implementation report for the complete list.
