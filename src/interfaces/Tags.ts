import { TagList } from "./TagsList";

export interface Tags {
    list(
        organization: string
    ):Promise<TagList>

    delete(
        organization: string,
        options: any
    ): Promise<void>;
}