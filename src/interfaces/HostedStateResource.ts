export interface HostedStateResource {
  mode: string;
  type: string;
  name: string;
  provider: string;
  instances: { attributes: any; sensitive_attributes: any[] }[];
}
