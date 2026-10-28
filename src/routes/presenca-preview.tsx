import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { texts } from "@/texts";
import type { PresenceStatus } from "@/types/application/presence/presence-status";

import { AppContainer } from "@/components/app-container";
import { PresenceSelector } from "@/components/presence-selector";

export const Route = createFileRoute("/presenca-preview")({ component: PresencePreview });

/** Laboratório no fork: permite avaliar o visual antes de conectar a API. */
function PresencePreview() {
  const [status, setStatus] = useState<PresenceStatus>("AVAILABLE");
  return (
    <AppContainer>
      <div className="mx-auto max-w-md space-y-4 p-6">
        <h1 className="text-xl font-semibold text-text-strong">{texts.presence.previewTitle}</h1>

        <p className="text-sm text-text-subtle">{texts.presence.previewHint}</p>

        <div className="rounded-2xl border border-border-soft bg-surface-card shadow-card">
          <PresenceSelector status={status} onChange={setStatus} />
        </div>
      </div>
    </AppContainer>
  );
}
