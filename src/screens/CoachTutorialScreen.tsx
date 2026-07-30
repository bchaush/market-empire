import { tutorialTopics } from '../content/tutorialSteps'
import { gameConfig } from '../content/gameConfig'
import { TUTORIAL_STEP_COUNT } from '../state/gameActions'
import type { GameState } from '../state/types'

/**
 * Screen 2 — Coach Tutorial (docs/DEMO_SPEC.md §11). Step 0 shows the
 * exact approved Coach introduction (docs/DECISIONS.md DEC-010); steps
 * 1-4 show the four topics copied verbatim from §11 Screen 2
 * (src/content/tutorialSteps.ts) — no invented Coach copy.
 */
export interface CoachTutorialScreenProps {
  state: GameState
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export function CoachTutorialScreen({ state, onNext, onBack, onSkip }: CoachTutorialScreenProps) {
  const stepIndex = state.tutorialStep
  const isFirstStep = stepIndex === 0
  const stepText = stepIndex === 0 ? gameConfig.coach.introduction : tutorialTopics[stepIndex - 1]

  return (
    <div className="screen-panel">
      <h2>Coach Tutorial</h2>
      <p aria-live="polite">{stepText}</p>
      <p className="step-indicator">
        Step {stepIndex + 1} of {TUTORIAL_STEP_COUNT}
      </p>
      <div role="group" aria-label="Tutorial navigation">
        <button type="button" onClick={onBack} disabled={isFirstStep}>
          Back
        </button>
        <button type="button" onClick={onNext}>
          Next
        </button>
        <button type="button" onClick={onSkip}>
          Skip Tutorial
        </button>
      </div>
    </div>
  )
}
