export interface RunStatusTimestamps {
  erroredAt: Date; // `json:"errored-at"`
  finishedAt: Date; // `json:"finished-at"`
  queuedAt: Date; // `json:"queued-at"`
  startedAt: Date; // `json:"started-at"`
  applyingAt: Date; // `json:"applying-at"`
  appliedAt: Date; // `json:"applied-at"`
  planningAt: Date; // `json:"planning-at"`
  plannedAt: Date; // `json:"planned-at"`
  plannedAndFinishedAt: Date; // `json:"planned-and-finished-at"`
  planQueuabledAt: Date; // `json:"plan-queueable-at"`
}
