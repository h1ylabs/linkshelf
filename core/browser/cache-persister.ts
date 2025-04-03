import type {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";

export default function createChromeStorageLocalPersister(
  key = "react-query-persist-client",
) {
  return {
    persistClient: async (client: PersistedClient) => {
      await chrome.storage.local.set({ [key]: client });
    },
    restoreClient: async () => {
      return (await chrome.storage.local.get(key))[key];
    },
    removeClient: async () => {
      await chrome.storage.local.remove(key);
    },
  } satisfies Persister;
}
