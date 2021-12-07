import urljoin from "url-join";
import { OrganizationTags as IOrganizationTags } from "../interfaces/Tags"
import { TagsAddWorkspacesOptionsSerializer } from "../interfaces/TagsAddWorkspacesOptions";
import { TagsDeleteOptionsSerializer } from "../interfaces/TagsDeleteOptions";
import { TagList } from "../interfaces/TagsList";
import { TagsListOptions } from "../interfaces/TagsListOptions";
import { Client } from '../tfe';
import { deserialize } from '../utils/deserializer';
import { parsePagination } from "../utils/parsePagination";

export class OrganizationTags implements IOrganizationTags {
    private client: Client;

    constructor(client: Client) {
      this.client = client;
    }

    async list(
        organization: string,
        options?: TagsListOptions,
    ): Promise<TagList> {
        const endpoint = urljoin(
            '/organizations/',
            encodeURI(organization),
            '/tags'
        );
        const response = await this.client.get(endpoint, options);

        const tagList = {
            pagination: parsePagination(response.meta.pagination),
            items: await deserialize(response)
        };
        return tagList;
    }

    async delete(organization: string, options: any): Promise<void> {
        const endpoint = urljoin(
            '/organizations/', 
            encodeURI(organization), 
            '/tags'
        );
        const serializedOptions = await TagsDeleteOptionsSerializer.serialize(
            options
        );
        await this.client.delete(endpoint, serializedOptions);
  }

    async addWorkspacesToTag(tag_id: string, options: any): Promise<void> {
        const endpoint = urljoin(
            '/tags/', 
            encodeURI(tag_id), 
            '/relationships/',
            '/workspaces'
        );
        const serializedOptions = await TagsAddWorkspacesOptionsSerializer.serialize(
            options
        );
        await this.client.post(endpoint, serializedOptions);
    }
}
