import { Serializer } from 'jsonapi-serializer';

export interface TagsDeleteOptions {
    type: string, // `jsonapi:"relation,type"`
    id: string, // `jsonapi:"relation,id"`
}

export const TagsDeleteOptionsSerializer = new Serializer('tags', {});

export const TagsAddOptionsSerializer = new Serializer('tags', {
    attributes: ['name']
})