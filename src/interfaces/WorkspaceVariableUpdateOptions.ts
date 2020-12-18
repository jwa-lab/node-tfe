import { Serializer } from 'jsonapi-serializer';
import { WorkspaceVariableCategory } from '../enums/WorkspaceVariableCategory';

export interface WorkspaceVariableUpdateOptions {
  key?: string;
  value?: string;
  description?: string;
  category?: WorkspaceVariableCategory;
  hcl?: boolean;
  sensitive?: boolean;
}

export const WorkspaceVariableUpdateOptionsSerializer = new Serializer('vars', {
  attributes: ['key', 'value', 'description', 'category', 'hcl', 'sensitive'],
});
