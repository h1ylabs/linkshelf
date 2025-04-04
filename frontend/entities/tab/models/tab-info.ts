import { z } from "zod";

export const errorMessage = {
  url: "URL is invalid.",
};

export const tabInfoSchema = z.object({
  // Required
  id: z.number(),
  status: z.enum(["loading", "complete"]),
  url: z.string().url(errorMessage.url),

  // Optional
  title: z.string().optional(),
  favIconUrl: z.string().url().optional(),
});

export const completeTabInfoSchema = tabInfoSchema
  .required({
    title: true,
    favIconUrl: true,
  })
  .and(
    z.object({
      status: z.literal("complete"),
    }),
  );

export function PreprocessSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((obj) => {
    const tabObj = obj as chrome.tabs.Tab;
    const checkProps =
      ["url", "favIconUrl", "title"] satisfies (keyof chrome.tabs.Tab)[];
  
    // 빈 문자열에 대해 undefined로 대체한다.
    checkProps.forEach((prop) => {
      if (tabObj?.[prop] === "") {
        tabObj[prop] = undefined;
      }
    });
  
    return tabObj;
  }, schema);
}

export type TabInfo = z.infer<typeof tabInfoSchema>;
export type CompleteTabInfo = z.infer<typeof completeTabInfoSchema>;