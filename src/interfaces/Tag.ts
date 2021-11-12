// Tags represents a Terraform Enterprise tags.

export interface Tag {
    name: string,
    instanceCount: number,
    id: string,
    organization: { id: string },
    links: any
}
