import { useState } from 'react'
import type { ReactNode } from 'react'
import { AppShell } from './components/AppShell'
import { humanizeIdentifier } from './components/format'
import { gameConfig } from './content/gameConfig'
import type { SectorKey } from './content/gameConfig'
import { initialGameState } from './state/initialState'
import {
  analyzeCity,
  confirmInvestments,
  continueFromBid,
  continueToAuction,
  exitDemo,
  playAgain,
  setAllocation,
  startDemo,
  submitBid,
  tutorialBack,
  tutorialNext,
  tutorialSkip,
  viewIndicator,
} from './state/gameActions'
import {
  CityInvestmentDecisionScreen,
  CoachTutorialScreen,
  MarketIntelligenceScreen,
  MarketResultScreen,
  PropertyOpportunityScreen,
  RoundSummaryScreen,
  StartScreen,
} from './screens'
import './screens/screens.css'

function App() {
  const [gameState, setGameState] = useState(initialGameState)

  const handleChangeAllocation = (sector: SectorKey, allocationCents: number): string | null => {
    const result = setAllocation(gameState, sector, allocationCents)
    setGameState(result.state)
    return result.error
  }

  const handleSubmitBid = (bidCents: number): string | null => {
    const result = submitBid(gameState, bidCents)
    setGameState(result.state)
    return result.error
  }

  if (gameState.currentScreen === 'start') {
    return <StartScreen onStartDemo={() => setGameState((current) => startDemo(current))} />
  }

  let rightPanelContent: ReactNode
  let coachContent: ReactNode

  switch (gameState.currentScreen) {
    case 'coachTutorial':
      coachContent = (
        <CoachTutorialScreen
          state={gameState}
          onNext={() => setGameState((current) => tutorialNext(current))}
          onBack={() => setGameState((current) => tutorialBack(current))}
          onSkip={() => setGameState((current) => tutorialSkip(current))}
        />
      )
      break
    case 'marketIntelligence':
      rightPanelContent = (
        <MarketIntelligenceScreen
          state={gameState}
          onViewIndicator={(id) => setGameState((current) => viewIndicator(current, id))}
          onAnalyzeCity={() => setGameState((current) => analyzeCity(current))}
        />
      )
      break
    case 'cityInvestmentDecision':
      rightPanelContent = (
        <CityInvestmentDecisionScreen
          state={gameState}
          onChangeAllocation={handleChangeAllocation}
          onConfirmInvestments={() => setGameState((current) => confirmInvestments(current))}
        />
      )
      break
    case 'marketResult':
      rightPanelContent = (
        <MarketResultScreen
          state={gameState}
          onContinueToAuction={() => setGameState((current) => continueToAuction(current))}
        />
      )
      break
    case 'propertyOpportunity':
      rightPanelContent = (
        <PropertyOpportunityScreen
          state={gameState}
          onSubmitBid={handleSubmitBid}
          onContinue={() => setGameState((current) => continueFromBid(current))}
        />
      )
      break
    case 'roundSummary':
      rightPanelContent = (
        <RoundSummaryScreen
          state={gameState}
          onPlayAgain={() => setGameState((current) => playAgain(current))}
          onExit={() => setGameState((current) => exitDemo(current))}
        />
      )
      break
  }

  return (
    <AppShell
      currentStage={humanizeIdentifier(gameState.currentScreen)}
      timeOfDay={humanizeIdentifier(gameState.timeOfDayState)}
      availableCashCents={gameState.availableCashCents}
      provisionalStatusLabel={`${gameConfig.status.label} — ${gameConfig.status.decisionId}`}
      pendingReviews={gameConfig.status.pendingReviews}
      balanceLimitation={gameConfig.status.balanceLimitation}
      rightPanelContent={rightPanelContent}
      coachContent={coachContent}
    />
  )
}

export default App
