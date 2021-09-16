import { browser } from "webextension-polyfill-ts";

export class USEntry {
  private readonly includeNonRoot: boolean;
  private readonly on: WebNavigationType[];
  private readonly regexp: RegExp;
  private readonly source: string;
  private readonly type: USType;

  constructor({ includeNonRoot, on, regexp, source, type }: USConfig) {
    if (includeNonRoot === undefined) {
      includeNonRoot = true;
    }

    if (on === undefined) {
      if (type === "userstyle") {
        on = ["onCommitted"];
      } else if (type === "userscript") {
        on = ["onCommitted"];
      } else {
        on = [];
      }
    }

    this.includeNonRoot = includeNonRoot;
    this.on = on;
    this.regexp = new RegExp(regexp);
    this.source = source;
    this.type = type;
  }

  test({
    root,
    type,
    url,
  }: {
    root: boolean;
    type: WebNavigationType;
    url: string;
  }) {
    if (!this.includeNonRoot && !root) return false;
    if (!this.on.includes(type)) return false;
    if (!this.regexp.test(url)) return false;
    return true;
  }

  async execute(tabId?: number) {
    const res = await fetch(this.source);
    const code = await res.text();

    if (this.type === "userstyle") {
      return browser.tabs.insertCSS(tabId, {
        code: code,
      });
    }
    if (this.type === "userscript") {
      return browser.tabs.executeScript(tabId, {
        code: code,
      });
    }
  }
}
