import { Serializer } from 'jsonapi-serializer';

export interface WorkspaceUpdateOptions {
  // Required when execution-mode is set to agent. The ID of the agent pool
  // belonging to the workspace's organization. This value must not be specified
  // if execution-mode is set to remote or local or if operations is set to true.
  AgentPoolID?: string; // `jsonapi:"attr,agent-pool-id,omitempty"`

  // Whether destroy plans can be queued on the workspace.
  AllowDestroyPlan?: boolean; // `jsonapi:"attr,allow-destroy-plan,omitempty"`

  // Whether to automatically apply changes when a Terraform plan is successful.
  AutoApply?: boolean; // `jsonapi:"attr,auto-apply,omitempty"`

  // A new name for the workspace, which can only include letters, numbers, -,
  // and _. This will be used as an identifier and must be unique in the
  // organization. Warning: Changing a workspace's name changes its URL in the
  // API and UI.
  Name?: string; // `jsonapi:"attr,name,omitempty"`

  // Which execution mode to use. Valid values are remote, local, and agent.
  // When set to local, the workspace will be used for state storage only.
  // This value must not be specified if operations is specified.
  // 'agent' execution mode is not available in Terraform Enterprise.
  ExecutionMode?: string; // `jsonapi:"attr,execution-mode,omitempty"`

  // Whether to filter runs based on the changed files in a VCS push. If
  // enabled, the working directory and trigger prefixes describe a set of
  // paths which must contain changes for a VCS push to trigger a run. If
  // disabled, any push will trigger a run.
  FileTriggersEnabled?: boolean; // `jsonapi:"attr,file-triggers-enabled,omitempty"`

  // Whether to queue all runs. Unless this is set to true, runs triggered by
  // a webhook will not be queued until at least one run is manually queued.
  QueueAllRuns?: boolean; // `jsonapi:"attr,queue-all-runs,omitempty"`

  // Whether this workspace allows speculative plans. Setting this to false
  // prevents Terraform Cloud or the Terraform Enterprise instance from
  // running plans on pull requests, which can improve security if the VCS
  // repository is public or includes untrusted contributors.
  SpeculativeEnabled?: boolean; // `jsonapi:"attr,speculative-enabled,omitempty"`

  // The version of Terraform to use for this workspace.
  TerraformVersion?: string; // `jsonapi:"attr,terraform-version,omitempty"`

  // List of repository-root-relative paths which list all locations to be
  // tracked for changes. See FileTriggersEnabled above for more details.
  TriggerPrefixes?: string[]; // `jsonapi:"attr,trigger-prefixes,omitempty"`

  // A relative path that Terraform will execute within. This defaults to the
  // root of your repository and is typically set to a subdirectory matching
  // the environment when multiple environments exist within the same
  // repository.
  WorkingDirectory?: string; // `jsonapi:"attr,working-directory,omitempty"`
}

export const WorkspaceUpdateOptionsSerializer = new Serializer('workspaces', {
  attributes: [
    'AgentPoolID',
    'AllowDestroyPlan',
    'AutoApply',
    'ExecutionMode',
    'FileTriggersEnabled',
    'Name',
    'QueueAllRuns',
    'SpeculativeEnabled',
    'TerraformVersion',
    'TriggerPrefixes',
    'WorkingDirectory',
  ],
});
