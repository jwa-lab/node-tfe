import { Serializer } from 'jsonapi-serializer';

export interface TagsDeleteOptions {
    type: string, // `jsonapi:"attr,type"`
    id: string // `jsonapi:"attr,id"`
}

export const TagsDeleteOptionsSerializer = new Serializer('tags', {});
