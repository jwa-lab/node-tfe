// Workspace represents a Terraform Enterprise workspace.

import { WorkspaceVariableCategory } from './WorkspaceVariableCategory';

export interface WorkspaceVariable {
  type: 'vars';
  key: string;
  value: string;
  description: string;
  category: WorkspaceVariableCategory;
  hcl: boolean;
  sensitive: boolean;
}
