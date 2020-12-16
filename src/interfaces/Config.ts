export interface Config {
  // The address of the Terraform Enterprise API.
  Address?: string;

  // The base path on which the API is served.
  BasePath?: string;

  // API token used to access the Terraform Enterprise API.
  Token?: string;
}
