import { Serializer } from 'jsonapi-serializer';

export interface TagsAddWorkspacesOptions {
    type: string, // `jsonapi:"relation,type"`
    id: string, // `jsonapi:"relation,id"`
}

export const TagsAddWorkspacesOptionsSerializer = new Serializer('workspaces', {});

