import { TagsDeleteOptions } from "./TagsDeleteOptions";
import { TagList } from "./TagsList";
import { TagsListOptions } from "./TagsListOptions";

export interface OrganizationTags {
    list(
        organization: string,
        options?: TagsListOptions
    ):Promise<TagList>

    delete(
        organization: string,
        options: TagsDeleteOptions[]
    ): Promise<void>;
}
