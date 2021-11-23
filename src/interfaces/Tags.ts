import { TagsDeleteOptions } from "./TagsDeleteOptions";
import { TagList } from "./TagsList";

export interface OrganizationTags {
    list(
        organization: string
    ):Promise<TagList>

    delete(
        organization: string,
        options: TagsDeleteOptions
    ): Promise<void>;
}
