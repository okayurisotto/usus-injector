import { USEntry } from "./USEntry";

export const onWebNavigate =
  (entries: USEntry[]) =>
  ({
    root,
    tabId,
    type,
    url,
  }: {
    root: boolean;
    tabId: number;
    type: WebNavigationType;
    url: string;
  }) => {
    for (const entry of entries) {
      if (entry.test({ root, type, url })) {
        console.log(entries);
        entry.execute(tabId);
      }
    }
  };
