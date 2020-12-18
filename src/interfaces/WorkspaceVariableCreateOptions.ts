import { Serializer } from 'jsonapi-serializer';
import { WorkspaceVariableCategory } from '../enums/WorkspaceVariableCategory';

export interface WorkspaceVariableCreateOptions {
  key: string;
  value: string;
  description?: string;
  category: WorkspaceVariableCategory;
  hcl?: boolean;
  sensitive?: boolean;
}

export const WorkspaceVariableCreateOptionsSerializer = new Serializer('vars', {
  attributes: ['key', 'value', 'description', 'category', 'hcl', 'sensitive'],
});
