import type { PresenceStatus } from "@/types/application/presence/presence-status";

export type PresenceSelectorProps = {
  status: PresenceStatus;
  onChange: (status: PresenceStatus) => void;
  pending?: boolean;
  error?: string | null;
};
