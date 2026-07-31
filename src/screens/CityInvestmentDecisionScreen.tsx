import { useState } from 'react'
import type { SectorKey } from '../content/gameConfig'
import { gameConfig } from '../content/gameConfig'
import { formatCentsAsDollars } from '../components/format'
import { sectorInfoCloseButtonLabel, sectorInfoTriggerLabel } from '../content/issue11Guidance'
import { DisclosurePopover } from '../components/DisclosurePopover'
import { SECTOR_KEYS } from '../state/gameActions'
import type { GameState } from '../state/types'

/**
 * Screen 4 — City Investment Decision (docs/DEMO_SPEC.md §11). Four
 * structural sector hotspots (native <button>, keyboard-accessible and
 * text-labelled); selecting one shows its exact config description, its
 * exact configured scripted rate (from `state.scriptedSectorRates`,
 * labelled "Approved Provisional — DEC-010"), an indicator-to-sector
 * reminder (from config effects), and an allocation control. This screen
 * only displays the rate — it never calculates or predicts the player's
 * final dollar result; that remains Screen 5, produced by the engine via
 * `confirmInvestments`. All validation goes through the state layer's
 * `setAllocation`, which calls the engine's `validateAllocation` — this
 * component never computes validity itself, and no risk score,
 * recommendation, or "best sector" language is shown.
 */
export interface CityInvestmentDecisionScreenProps {
  state: GameState
  onChangeAllocation: (sector: SectorKey, allocationCents: number) => string | null
  onConfirmInvestments: () => void
}

export function CityInvestmentDecisionScreen({
  state,
  onChangeAllocation,
  onConfirmInvestments,
}: CityInvestmentDecisionScreenProps) {
  const [selectedSector, setSelectedSector] = useState<SectorKey | null>(null)
  const [allocationError, setAllocationError] = useState<string | null>(null)
  const [openSectorInfoId, setOpenSectorInfoId] = useState<SectorKey | null>(null)

  const startingCash = state.startingCashCents ?? 0
  const cashRemaining = state.unallocatedCashCents ?? startingCash

  const handleAllocationChange = (sector: SectorKey, allocationCents: number) => {
    const error = onChangeAllocation(sector, allocationCents)
    setAllocationError(error)
  }

  const selectedConfig = selectedSector ? gameConfig.sectors[selectedSector] : null
  const selectedRate = selectedSector ? (state.scriptedSectorRates?.[selectedSector] ?? null) : null
  const selectedAllocation = selectedSector ? (state.sectorAllocationsCents[selectedSector] ?? 0) : 0
  const sliderMax = selectedAllocation + cashRemaining
  const relevantIndicators = selectedSector
    ? gameConfig.indicators.filter((indicator) =>
        indicator.effects.some((effect) => effect.sector === selectedSector || effect.sector === 'all'),
      )
    : []

  return (
    <div className="screen-panel">
      <h2>City Investment Decision</h2>
      <div role="group" aria-label="Sector landmarks">
        {SECTOR_KEYS.map((key) => {
          const sector = gameConfig.sectors[key]
          const allocated = state.sectorAllocationsCents[key] ?? 0
          return (
            <span key={key} className="sector-landmark">
              <button
                type="button"
                aria-pressed={selectedSector === key}
                onClick={() => {
                  setSelectedSector(key)
                  setAllocationError(null)
                }}
              >
                {sector.label} ({formatCentsAsDollars(allocated)})
              </button>
              <DisclosurePopover
                panelId={`sector-info-${key}`}
                triggerLabel={sectorInfoTriggerLabel(sector.label)}
                panelHeading={sector.label}
                closeButtonLabel={sectorInfoCloseButtonLabel(sector.label)}
                isOpen={openSectorInfoId === key}
                onOpen={() => setOpenSectorInfoId(key)}
                onClose={() => setOpenSectorInfoId(null)}
              >
                <p>{sector.description}</p>
                {sector.labelNote && <p className="sector-note">{sector.labelNote}</p>}
              </DisclosurePopover>
            </span>
          )
        })}
      </div>

      {selectedSector && selectedConfig && (
        <div className="sector-detail">
          <h3>{selectedConfig.label}</h3>
          <p>{selectedConfig.description}</p>
          {selectedConfig.labelNote && <p className="sector-note">{selectedConfig.labelNote}</p>}

          {selectedRate !== null && (
            <p className="sector-rate">
              Scripted rate: {selectedRate > 0 ? '+' : ''}
              {(selectedRate * 100).toFixed(0)}%{' '}
              <span className="provisional-tag">Approved Provisional — DEC-010</span>
            </p>
          )}

          {relevantIndicators.length > 0 && (
            <p className="indicator-reminder">
              Related indicator{relevantIndicators.length > 1 ? 's' : ''}:{' '}
              {relevantIndicators.map((indicator) => indicator.headline).join('; ')}
            </p>
          )}

          <label htmlFor="allocation-input">Allocation for {selectedConfig.label}</label>
          <input
            id="allocation-input"
            type="range"
            min={0}
            max={sliderMax}
            step={100}
            value={selectedAllocation}
            onChange={(event) => handleAllocationChange(selectedSector, Number(event.target.value))}
          />
          <p>Current allocation: {formatCentsAsDollars(selectedAllocation)}</p>
        </div>
      )}

      {allocationError && (
        <p role="alert" className="error-message">
          {allocationError}
        </p>
      )}

      <p>Total allocated: {formatCentsAsDollars(state.totalAllocatedCents)}</p>
      <p>Cash remaining: {formatCentsAsDollars(cashRemaining)}</p>

      <button type="button" onClick={onConfirmInvestments}>
        Confirm Investments
      </button>
    </div>
  )
}
