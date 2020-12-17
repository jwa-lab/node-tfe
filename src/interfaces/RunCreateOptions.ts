import { Serializer } from 'jsonapi-serializer';
import { ConfigurationVersion } from './ConfigurationVersion';
import { Workspace } from './Workspace';

export interface RunCreateOptions {
  // Specifies if this plan is a destroy plan, which will destroy all
  // provisioned resources.
  isDestroy?: boolean; // `jsonapi:"attr,is-destroy,omitempty"`

  // Specifies the message to be associated with this run.
  message?: string; // `jsonapi:"attr,message,omitempty"`

  // Specifies the configuration version to use for this run. If the
  // configuration version object is omitted, the run will be created using the
  // workspace's latest configuration version.
  configurationVersion?: ConfigurationVersion; // `jsonapi:"relation,configuration-version"`

  // Specifies the workspace where the run will be executed.
  workspace: Workspace; // `jsonapi:"relation,workspace"`

  // If non-empty, requests that Terraform should create a plan including
  // actions only for the given objects (specified using resource address
  // syntax) and the objects they depend on.
  //
  // This capability is provided for exceptional circumstances only, such as
  // recovering from mistakes or working around existing Terraform
  // limitations. Terraform will generally mention the -target command line
  // option in its error messages describing situations where setting this
  // argument may be appropriate. This argument should not be used as part
  // of routine workflow and Terraform will emit warnings reminding about
  // this whenever this property is set.
  targetAddrs?: string[]; // `jsonapi:"attr,target-addrs,omitempty"`
}

export const RunCreateOptionsSerializer = new Serializer('runs', {
  attributes: [
    'isDestroy',
    'message',
    'configurationVersion',
    'workspace',
    'targetAddrs',
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  configurationVersion: {
    ref: 'id',
  },
  workspace: {
    ref: 'id',
  },
});
