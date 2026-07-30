/**
 * Screen 1 — Start (docs/DEMO_SPEC.md §11). Not part of the persistent
 * shell (§7 scopes that to Screens 2-7), so this renders standalone.
 *
 * No approved beginner-facing description sentence exists anywhere in
 * the repository for this screen, and starting-cash visibility here is
 * an explicitly open design choice (§11: "not something any controlling
 * document currently requires either way") — both are left out rather
 * than invented; see the implementation report for details.
 */
export interface StartScreenProps {
  onStartDemo: () => void
}

export function StartScreen({ onStartDemo }: StartScreenProps) {
  return (
    <main className="start-screen">
      <h1>Market Empire</h1>
      <button type="button" onClick={onStartDemo}>
        Start Demo
      </button>
    </main>
  )
}
