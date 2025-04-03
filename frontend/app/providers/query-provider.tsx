import createChromeStorageLocalPersister from "@core/browser/cache-persister";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient();

// chrome.storage.local에 Query Cache를 저장합니다.
const persister = createChromeStorageLocalPersister();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
