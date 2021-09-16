import { browser } from "webextension-polyfill-ts";
import { onWebNavigate as onWebNavigate } from "./onWebNavigate";
import { storageOnChanged } from "./storageOnChanged";

let entries = await storageOnChanged();
browser.storage.onChanged.addListener(async () => {
  entries = await storageOnChanged();
});

const filter = { url: [{ schemes: ["http", "https"] }] };

browser.webNavigation.onCreatedNavigationTarget.addListener((details) => {
  onWebNavigate(entries)({
    root: true,
    tabId: details.tabId,
    type: "onCreatedNavigationTarget",
    url: details.url,
  });
}, filter);

browser.webNavigation.onBeforeNavigate.addListener((details) => {
  onWebNavigate(entries)({
    root: details.frameId === 0,
    tabId: details.tabId,
    type: "onBeforeNavigate",
    url: details.url,
  });
}, filter);

browser.webNavigation.onCommitted.addListener((details) => {
  onWebNavigate(entries)({
    root: details.frameId === 0,
    tabId: details.tabId,
    type: "onCommitted",
    url: details.url,
  });
}, filter);

browser.webNavigation.onDOMContentLoaded.addListener((details) => {
  onWebNavigate(entries)({
    root: details.frameId === 0,
    tabId: details.tabId,
    type: "onDOMContentLoaded",
    url: details.url,
  });
}, filter);

browser.webNavigation.onCompleted.addListener((details) => {
  onWebNavigate(entries)({
    root: details.frameId === 0,
    tabId: details.tabId,
    type: "onCompleted",
    url: details.url,
  });
}, filter);

browser.webNavigation.onReferenceFragmentUpdated.addListener((details) => {
  onWebNavigate(entries)({
    root: details.frameId === 0,
    tabId: details.tabId,
    type: "onReferenceFragmentUpdated",
    url: details.url,
  });
}, filter);

browser.webNavigation.onHistoryStateUpdated.addListener((details) => {
  onWebNavigate(entries)({
    root: details.frameId === 0,
    tabId: details.tabId,
    type: "onHistoryStateUpdated",
    url: details.url,
  });
}, filter);
