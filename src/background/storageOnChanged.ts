import { browser } from "webextension-polyfill-ts";
import { USEntry } from "./USEntry";
import { storageArea, storageKey } from "../common";

export const storageOnChanged = async (): Promise<USEntry[]> => {
  const config =
    (await browser.storage[storageArea].get(storageKey))[storageKey] ?? [];
  return config.map((entry: any) => new USEntry(entry));
};
