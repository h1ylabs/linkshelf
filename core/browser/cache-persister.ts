import type {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";

export default function createChromeStorageLocalPersister(
  key = "react-query-persist-client",
) {
  return {
    persistClient: async (client: PersistedClient) => {
      await chrome.storage.local.set({ [key]: JSON.stringify(client) });
    },
    restoreClient: async () => {;
      return JSON.parse((await chrome.storage.local.get(key))[key]);
    },
    removeClient: async () => {
      await chrome.storage.local.remove(key);
    },
  } satisfies Persister;
}
