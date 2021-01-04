import { WorkspaceVariableCategory } from '../enums/WorkspaceVariableCategory';

export interface WorkspaceVariable {
  id: string;
  type: 'vars';
  key: string;
  value: string;
  description: string;
  category: WorkspaceVariableCategory;
  hcl: boolean;
  sensitive: boolean;
}
