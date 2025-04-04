import { defaultQueryKey } from "@frontend/shared/consts";

const tabQueryKey = [...defaultQueryKey, "tab"] as const;

export default tabQueryKey;
