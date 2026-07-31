import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import './DisclosurePopover.css'

/**
 * Shared non-modal disclosure-popup component approved by
 * docs/DECISIONS.md DEC-011 (Coach access, Screens 2-7; sector
 * information, Screen 4). Interaction only — holds no application or game
 * state; the parent owns and controls `isOpen`, so it can also enforce
 * "only one sector popup open at a time" by tracking a single open ID.
 */
export interface DisclosurePopoverProps {
  panelId: string
  triggerLabel: string
  panelHeading: string
  closeButtonLabel: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  children: ReactNode
}

export function DisclosurePopover({
  panelId,
  triggerLabel,
  panelHeading,
  closeButtonLabel,
  isOpen,
  onOpen,
  onClose,
  children,
}: DisclosurePopoverProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleTriggerClick = () => {
    if (isOpen) {
      onClose()
      triggerRef.current?.focus()
    } else {
      onOpen()
    }
  }

  const handleCloseClick = () => {
    onClose()
    triggerRef.current?.focus()
  }

  return (
    <div className="disclosure-popover">
      <button
        type="button"
        ref={triggerRef}
        className="disclosure-popover__trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleTriggerClick}
      >
        {triggerLabel}
      </button>

      {isOpen && (
        <div id={panelId} className="disclosure-popover__panel">
          <h3 className="disclosure-popover__heading">{panelHeading}</h3>
          <div className="disclosure-popover__body">{children}</div>
          <button type="button" className="disclosure-popover__close" onClick={handleCloseClick}>
            {closeButtonLabel}
          </button>
        </div>
      )}
    </div>
  )
}
