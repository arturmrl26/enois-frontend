import { useId, useState } from "react";

import { texts } from "@/texts";
import type { PresenceStatus } from "@/types/application/presence/presence-status";
import type { PresenceSelectorProps } from "@/types/components/presence/presence-selector-props";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const OPTIONS: PresenceStatus[] = ["AVAILABLE", "AWAY", "DO_NOT_DISTURB", "INVISIBLE"];

const DOT_COLORS: Record<PresenceStatus, string> = {
  AVAILABLE: "bg-emerald-500",
  AWAY: "bg-amber-400",
  DO_NOT_DISTURB: "bg-rose-500",
  INVISIBLE: "bg-slate-400",
};

/** O mesmo seletor serve no menu da conta e na página de prévia do fork. */
export function PresenceSelector({
  status,
  onChange,
  pending = false,
  error,
}: PresenceSelectorProps) {
  const [expanded, setExpanded] = useState(false);
  const optionsId = useId();

  return (
    <div className="border-b border-border-soft px-3 py-2">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={optionsId}
        onClick={() => setExpanded((open) => !open)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-text-strong transition hover:bg-surface-2"
      >
        <span aria-hidden className={cn("h-2.5 w-2.5 shrink-0 rounded-full", DOT_COLORS[status])} />

        <span className="flex-1">{texts.presence.options[status].label}</span>

        <ChevronRight aria-hidden className={cn("h-4 w-4 transition", expanded && "rotate-90")} />
      </button>

      {expanded && (
        <div
          id={optionsId}
          className="mt-1 space-y-0.5"
          role="group"
          aria-label={texts.presence.title}
        >
          {OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={status === option}
              disabled={pending}
              onClick={() => onChange(option)}
              className={cn(
                "flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left transition hover:bg-surface-2 disabled:opacity-50",
                status === option && "bg-surface-2",
              )}
            >
              <span
                aria-hidden
                className={cn("mt-1 h-2.5 w-2.5 shrink-0 rounded-full", DOT_COLORS[option])}
              />

              <span>
                <span className="block text-sm font-medium text-text-strong">
                  {texts.presence.options[option].label}
                </span>

                <span className="block text-xs text-text-subtle">
                  {texts.presence.options[option].hint}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {error && (
        <p role="alert" className="px-2 pb-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
