// Workspace represents a Terraform Enterprise workspace.
import { WorkspaceActions } from './WorkspaceActions';

export interface Workspace {
  ID: string;
  Actions: WorkspaceActions;
  AgentPoolID: string;
  AllowDestroyPlan: boolean;
  AutoApply: boolean;
  CanQueueDestroyPlan: boolean;
  CreatedAt: Date;
  Environment: string;
  ExecutionMode: string;
  FileTriggersEnabled: boolean;
  Locked: boolean;
  MigrationEnvironment: string;
  Name: string;
  Operations: boolean;
  QueueAllRuns: boolean;
  SpeculativeEnabled: boolean;
  TerraformVersion: string;
  TriggerPrefixes: string[];
  WorkingDirectory: string;
}
