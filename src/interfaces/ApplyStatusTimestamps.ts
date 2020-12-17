export interface ApplyStatusTimestamps {
  canceledAt: Date; // `json:"canceled-at"`
  erroredAt: Date; // `json:"errored-at"`
  finishedAt: Date; // `json:"finished-at"`
  forceCanceledAt: Date; // `json:"force-canceled-at"`
  queuedAt: Date; // `json:"queued-at"`
  startedAt: Date; // `json:"started-at"`
}
