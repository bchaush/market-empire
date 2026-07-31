import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AppShell } from './components/AppShell'
import { humanizeIdentifier } from './components/format'
import { gameConfig } from './content/gameConfig'
import type { SectorKey } from './content/gameConfig'
import { tutorialTopics } from './content/tutorialSteps'
import {
  bidBelowOpponentMessage,
  bidTieMessage,
  bidWonMessage,
  marketResultCoachContent,
  screen3CoachMessage,
  screen4CoachMessage,
  screen7CoachMessage,
  sealedBidPreSubmissionMessage,
} from './content/issue11Guidance'
import { bidResultCategory, marketResultCategory } from './engine'
import { initialGameState } from './state/initialState'
import type { GameState } from './state/types'
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

/**
 * Selects the approved DEC-011 Coach body content for the active screen.
 * A pure derived read of `state` (plus the engine-owned
 * `marketResultCategory` and, per DEC-012, `bidResultCategory`) — never
 * mutates state, never recalculates a financial result, and reproduces no
 * sign-classification or bid-comparison logic of its own. Screen 2 reads
 * the same existing tutorial source of truth CoachTutorialScreen already
 * uses, rather than introducing a second tutorial state.
 */
function getCoachGuidance(state: GameState): ReactNode {
  switch (state.currentScreen) {
    case 'coachTutorial': {
      const stepText = state.tutorialStep === 0 ? gameConfig.coach.introduction : tutorialTopics[state.tutorialStep - 1]
      return <p>{stepText}</p>
    }
    case 'marketIntelligence':
      return <p>{screen3CoachMessage}</p>
    case 'cityInvestmentDecision':
      return <p>{screen4CoachMessage}</p>
    case 'marketResult': {
      const sectorResults = Object.values(state.sectorResultsCents ?? {})
      const category = marketResultCategory(sectorResults)
      const content = marketResultCoachContent[category]
      return (
        <>
          <h4>{content.heading}</h4>
          <p>{content.message}</p>
        </>
      )
    }
    case 'propertyOpportunity': {
      if (state.currentScreenState === 'pre-submission') {
        return <p>{sealedBidPreSubmissionMessage}</p>
      }
      const branch = bidResultCategory(state.playerBidCents ?? 0, state.scriptedOpponentBidCents ?? 0)
      if (branch === 'win') return <p>{bidWonMessage}</p>
      if (branch === 'tie') return <p>{bidTieMessage}</p>
      return <p>{bidBelowOpponentMessage}</p>
    }
    case 'roundSummary':
      return <p>{screen7CoachMessage}</p>
    default:
      return null
  }
}

function App() {
  const [gameState, setGameState] = useState(initialGameState)
  const [isCoachOpen, setIsCoachOpen] = useState(false)

  // Interface-only reset so a Coach popup left open never shows stale
  // content after a screen transition. Never touches GameState and never
  // calls a game action (docs/DECISIONS.md DEC-011).
  useEffect(() => {
    setIsCoachOpen(false)
  }, [gameState.currentScreen])

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
      coachGuidance={getCoachGuidance(gameState)}
      isCoachOpen={isCoachOpen}
      onCoachOpen={() => setIsCoachOpen(true)}
      onCoachClose={() => setIsCoachOpen(false)}
    />
  )
}

export default App
