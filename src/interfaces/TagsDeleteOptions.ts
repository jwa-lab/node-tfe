import { Serializer } from 'jsonapi-serializer';

export interface TagsDeleteOptions {
    type: string,
    id: string

}

export const TagsDeleteOptionsSerializer = new Serializer('tags', {
  attributes: []
});
