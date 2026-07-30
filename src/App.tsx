import { AppShell } from './components/AppShell'
import { humanizeIdentifier } from './components/format'
import { gameConfig } from './content/gameConfig'
import { initialGameState } from './state/initialState'

function App() {
  const isStartScreen = initialGameState.currentScreen === 'start'

  return (
    <AppShell
      currentStage={humanizeIdentifier(initialGameState.currentScreen)}
      timeOfDay={humanizeIdentifier(initialGameState.timeOfDayState)}
      availableCashCents={initialGameState.availableCashCents}
      provisionalStatusLabel={`${gameConfig.status.label} — ${gameConfig.status.decisionId}`}
      pendingReviews={gameConfig.status.pendingReviews}
      balanceLimitation={gameConfig.status.balanceLimitation}
      coachContent={isStartScreen ? undefined : <p>{gameConfig.coach.introduction}</p>}
    />
  )
}

export default App
