// Workspace represents a Terraform Enterprise workspace.
import { WorkspaceActions } from './WorkspaceActions';

export interface Workspace {
  id: string;
  actions: WorkspaceActions;
  agentPoolID: string;
  allowDestroyPlan: boolean;
  autoApply: boolean;
  canQueueDestroyPlan: boolean;
  createdAt: Date;
  environment: string;
  executionMode: string;
  fileTriggersEnabled: boolean;
  locked: boolean;
  migrationEnvironment: string;
  name: string;
  operations: boolean;
  queueAllRuns: boolean;
  speculativeEnabled: boolean;
  terraformVersion: string;
  triggerPrefixes: string[];
  workingDirectory: string;
  currentRun?: { id: string };
  latestRun?: { id: string };
  agentPool?: { id: string };
  currentStateVersion?: { id: string };
  lockedBy?: { id: string };
}
