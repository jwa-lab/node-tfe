export interface HostedState {
  resources?: HostedStateResource[];
}

export interface HostedStateResource {
  count: number;
  module: string;
  name: string;
  provider: string;
  type: string;
}
