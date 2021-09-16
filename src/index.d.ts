type WebNavigationType =
  | "onCreatedNavigationTarget"
  | "onBeforeNavigate"
  | "onCommitted"
  | "onDOMContentLoaded"
  | "onCompleted"
  | "onReferenceFragmentUpdated"
  | "onHistoryStateUpdated";

interface WebNavigationDetails {
  tabId: number;
  url: string;
}

type USType = "userstyle" | "userscript";

interface USConfig {
  includeNonRoot?: boolean;
  on?: WebNavigationType[];
  regexp: string;
  source: string;
  type: USType;
}
