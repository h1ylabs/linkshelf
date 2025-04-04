import { useSuspenseQuery } from "@tanstack/react-query";

import { currentTabQuery } from "../api";

/**
 * 현재 탭의 정보를 가져옵니다.
 *
 * **주의:** 이 Hook을 사용하는 컴포넌트는
 * 반드시 `<Suspense />` 또는 `<ErrorBoundary />`로 감싸야 합니다.
 */
export default function useCurrentTab() {
  const { data: tab } = useSuspenseQuery(currentTabQuery.options());

  return tab;
}
