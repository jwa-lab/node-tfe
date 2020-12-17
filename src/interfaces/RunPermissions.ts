export interface RunPermissions {
  canApply: boolean; // `json:"can-apply"`
  canCancel: boolean; // `json:"can-cancel"`
  canDiscard: boolean; // `json:"can-discard"`
  canForceCancel: boolean; // `json:"can-force-cancel"`
  canForceExecute: boolean; // `json:"can-force-execute"`
}
