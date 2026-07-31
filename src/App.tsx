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
import type { MarketResultCoachContent } from './content/issue11Guidance'
import { bidResultCategory, marketResultCategory } from './engine'
import type { BidResultCategory } from './engine'
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
 * Derives the Screen 5 engine-owned category once per render, so both the
 * Coach popover and the visible Screen 5 panel (docs/DECISIONS.md DEC-011)
 * read the same single computed value instead of calling
 * `marketResultCategory` a second time.
 */
function getMarketResultContent(state: GameState): MarketResultCoachContent | null {
  if (state.currentScreen !== 'marketResult') return null
  const sectorResults = Object.values(state.sectorResultsCents ?? {})
  const category = marketResultCategory(sectorResults)
  return marketResultCoachContent[category]
}

/**
 * Derives the Screen 6 post-submission engine-owned branch once per
 * render, so both the Coach popover and the visible Screen 6 panel
 * (docs/DECISIONS.md DEC-012) read the same single computed value instead
 * of calling `bidResultCategory` a second time.
 */
function getBidResultBranch(state: GameState): BidResultCategory | null {
  if (state.currentScreen !== 'propertyOpportunity' || state.currentScreenState !== 'post-submission') return null
  return bidResultCategory(state.playerBidCents ?? 0, state.scriptedOpponentBidCents ?? 0)
}

function bidResultMessage(branch: BidResultCategory): string {
  if (branch === 'win') return bidWonMessage
  if (branch === 'tie') return bidTieMessage
  return bidBelowOpponentMessage
}

/**
 * Selects the approved DEC-011 Coach body content for the active screen,
 * from the already-derived `marketResultContent`/`bidResultBranch` — never
 * mutates state, never recalculates a financial result, and reproduces no
 * sign-classification or bid-comparison logic of its own. Screen 2 reads
 * the same existing tutorial source of truth CoachTutorialScreen already
 * uses, rather than introducing a second tutorial state.
 */
function getCoachGuidance(
  state: GameState,
  marketResultContent: MarketResultCoachContent | null,
  bidResultBranch: BidResultCategory | null,
): ReactNode {
  switch (state.currentScreen) {
    case 'coachTutorial': {
      const stepText = state.tutorialStep === 0 ? gameConfig.coach.introduction : tutorialTopics[state.tutorialStep - 1]
      return <p>{stepText}</p>
    }
    case 'marketIntelligence':
      return <p>{screen3CoachMessage}</p>
    case 'cityInvestmentDecision':
      return <p>{screen4CoachMessage}</p>
    case 'marketResult':
      if (!marketResultContent) return null
      return (
        <>
          <h4>{marketResultContent.heading}</h4>
          <p>{marketResultContent.message}</p>
        </>
      )
    case 'propertyOpportunity': {
      if (state.currentScreenState === 'pre-submission') {
        return <p>{sealedBidPreSubmissionMessage}</p>
      }
      if (!bidResultBranch) return null
      return <p>{bidResultMessage(bidResultBranch)}</p>
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

  // Derived once per render and reused for both the Coach popover and the
  // visible screen explanation (docs/DECISIONS.md DEC-011, DEC-012) — see
  // getMarketResultContent/getBidResultBranch above.
  const marketResultContent = getMarketResultContent(gameState)
  const bidResultBranch = getBidResultBranch(gameState)

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
          resultHeading={marketResultContent?.heading ?? ''}
          resultMessage={marketResultContent?.message ?? ''}
        />
      )
      break
    case 'propertyOpportunity':
      rightPanelContent = (
        <PropertyOpportunityScreen
          state={gameState}
          onSubmitBid={handleSubmitBid}
          onContinue={() => setGameState((current) => continueFromBid(current))}
          preSubmissionExplanation={sealedBidPreSubmissionMessage}
          postSubmissionExplanation={bidResultBranch ? bidResultMessage(bidResultBranch) : ''}
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
      coachGuidance={getCoachGuidance(gameState, marketResultContent, bidResultBranch)}
      isCoachOpen={isCoachOpen}
      onCoachOpen={() => setIsCoachOpen(true)}
      onCoachClose={() => setIsCoachOpen(false)}
    />
  )
}

export default App
