import { getCurrentTab } from "@core/browser/tabs";
import { queryOptions } from "@tanstack/react-query";

import { tabQueryKey } from "../consts";
import { 
  completeTabInfoSchema,
  PreprocessSchema,
  TabInfo,
  tabInfoSchema,
} from "../models";

const completeSchema = PreprocessSchema(completeTabInfoSchema);
const defaultSchema = PreprocessSchema(tabInfoSchema);

async function currentTab(): Promise<TabInfo> {
  const result = getCurrentTab((tab) => completeSchema.safeParse(tab).success);
  
  return defaultSchema.parse(result);
}

const currentTabQuery = {
  key: () => [...tabQueryKey, "currentTab"] as const,
  options: () => queryOptions({
    queryKey: currentTabQuery.key(),
    queryFn: currentTab,
  }),
};

export default currentTabQuery;
  