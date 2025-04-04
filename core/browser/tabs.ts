import Timeout from "@core/utils/timeout";

type TabUpdatedListener =
  Parameters<typeof chrome.tabs.onUpdated.addListener>[0];
type TabCompleteValidationFn = (tab: chrome.tabs.Tab) => boolean;

export async function getCurrentTab(
  isComplete: TabCompleteValidationFn,
) {
  return getTab({
    active: true,
    lastFocusedWindow: true,
  }, isComplete);
}

export async function getTab(
  queryInfo: chrome.tabs.QueryInfo,
  isComplete: TabCompleteValidationFn,
): Promise<chrome.tabs.Tab> {
// 1. 현재 탭 정보를 불러온다.
  let [_resolvedTab] = await chrome.tabs.query(queryInfo);
  let _listener: TabUpdatedListener;

  // 2-1. Tab 정보를 알 수 없으면 에러를 발생시킨다.
  if (!_resolvedTab?.status || !_resolvedTab?.id) {
    throw new Error();
  }

  // 2-2. 만약 status가 "complete"면 바로 결과물을 반환한다.
  if (_resolvedTab?.status === "complete") {
    return _resolvedTab;
  }

  // 2-3. 만약 status가 "loading"이면 대기한다.
  const createListener:
  (resolve: (tab: chrome.tabs.Tab) => void) => TabUpdatedListener =
  (resolve) => (tabId, _, updatedTab) => {
    // 동일한 Tab만 감지한다.
    if (_resolvedTab.id !== tabId) {
      return;
    }

    // 2-3-1. 모두 로드되지 않은 경우, Tab 정보를 계속 업데이트한다. 
    if (!isComplete(updatedTab)) {
      _resolvedTab = updatedTab;
      return;
    }

    // 2-3-2. Tab 정보가 모두 로드된 경우, 리스너를 제거하고 정보를 반환한다.
    chrome.tabs.onUpdated.removeListener(_listener);
    resolve(_resolvedTab = updatedTab);
  };

  const result = await Promise.race([
  // A. 5초 안에 Tab 정보가 반환되지 않으면, 가장 최근에 업데이트된 정보를 반환한다.
    Timeout(5000, () => _resolvedTab),

    // B. Tab 정보를 업데이트하는 핸들러를 등록한다.
    new Promise((resolve) => 
      chrome.tabs.onUpdated.addListener(
        _listener = createListener(resolve),
      ),
    ),
  ]);

  return result as chrome.tabs.Tab;
}
