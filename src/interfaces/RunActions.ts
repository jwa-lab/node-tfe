export interface RunActions {
  isCancelable: boolean; // `json:"is-cancelable"`
  isConfirmable: boolean; // `json:"is-confirmable"`
  isDiscardable: boolean; // `json:"is-discardable"`
  isForceCancelable: boolean; // `json:"is-force-cancelable"`
}
