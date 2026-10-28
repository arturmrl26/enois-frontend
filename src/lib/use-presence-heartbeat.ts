import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { presenceApi } from "@/lib/api/presence";
import { hasSessionFlag } from "@/lib/session";

/** Sem tráfego em abas ocultas; a API considera offline quem parou de enviar sinais. */
export function usePresenceHeartbeat() {
  const signedIn = hasSessionFlag();
  const presence = useQuery({
    queryKey: ["presence", "me"],
    queryFn: presenceApi.own,
    enabled: signedIn,
    retry: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!signedIn || !presence.data) return;
    const send = () => {
      if (document.visibilityState === "visible")
        void presenceApi.heartbeat().catch(() => undefined);
    };
    send();
    const timer = window.setInterval(send, 45_000);
    document.addEventListener("visibilitychange", send);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", send);
    };
  }, [signedIn, presence.data]);
}
