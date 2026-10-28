import type { WithRequiredChildren } from "@/types/components/with-required-children";

import { useCurrentUser } from "@/lib/current-user";
import { usePresenceHeartbeat } from "@/lib/use-presence-heartbeat";

import { AppLayout } from "./app-layout";
import { AppSidebar } from "./app-sidebar";
import { AuthenticatedAppHeader } from "./authenticated-app-header";
import { NavigationDrawer } from "./navigation-drawer";

export function AuthenticatedAppContainer({ children }: WithRequiredChildren) {
  useCurrentUser();
  usePresenceHeartbeat();

  return (
    <AppLayout>
      <AppLayout.Header>
        <AuthenticatedAppHeader />
      </AppLayout.Header>

      <AppLayout.Content>
        <AppLayout.Sidebar>
          <AppSidebar />
        </AppLayout.Sidebar>

        <AppLayout.Main>{children}</AppLayout.Main>
      </AppLayout.Content>

      <AppLayout.Navigation>
        <NavigationDrawer />
      </AppLayout.Navigation>
    </AppLayout>
  );
}
