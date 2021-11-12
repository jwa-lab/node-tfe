import urljoin from "url-join";
import { Tags as ITags } from "../interfaces/Tags"
import { TagsDeleteOptionsSerializer } from "../interfaces/TagsDeleteOptions";
import { TagList } from "../interfaces/TagsList";
import { Client } from '../tfe';
import { deserialize } from '../utils/deserializer';

export class Tags implements ITags {
    private client: Client;

    constructor(client: Client) {
      this.client = client;
    }

    async list(
        organization: string,
    ): Promise<TagList> {
        const endpoint = urljoin(
            '/organizations/',
            encodeURI(organization),
            '/tags'
        );
        const response = await this.client.get(endpoint);

        const tagList = {
            items: await deserialize(response),
        };
        return tagList;
    }

    async delete(organization: string, options: any): Promise<void> {
        const endpoint = urljoin('/workspaces/', encodeURI(organization), '/tags');
        const serializedOptions = await TagsDeleteOptionsSerializer.serialize(
            options
          );
        await this.client.delete(endpoint, serializedOptions);
  }
}