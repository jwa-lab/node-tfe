export interface Config {
  // The address of the Terraform Enterprise API.
  address?: string;

  // The base path on which the API is served.
  basePath?: string;

  // API token used to access the Terraform Enterprise API.
  token?: string;
}
