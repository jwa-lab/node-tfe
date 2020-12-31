import { config } from 'dotenv';
import env from 'env-var';
import { join } from 'path';
import Client, {
  ConfigurationStatus,
  ResourceNotFoundError,
} from '../src/index';

config({ path: join(__dirname, '.env.e2e') });

// Extract and validate required environment variables
const token = env.get('token').required().asString();
const organizationName = env.get('organizationName').required().asString();

const client = new Client({
  token,
});

describe('readWorkspace', () => {
  const workspaceName = 'readWorkspace';
  const configurationPath = join(__dirname, 'templates/random');

  beforeEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });
  afterEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });

  it('should read the workspace', async () => {
    const workspace = await client.Workspaces.create(organizationName, {
      name: workspaceName,
      autoApply: true,
    });
    const configuration = await client.ConfigurationVersions.create(
      workspace.id
    );
    await client.ConfigurationVersions.upload(
      configuration.uploadUrl,
      configurationPath
    );
    // wait for the condfiguration to be uploaded
    await waitConfigurationIsUploaded(configuration.id);

    const w = await client.Workspaces.read(organizationName, workspaceName);

    expect(w).toMatchObject({
      actions: { isDestroyable: true },
      agentPool: null,
      allowDestroyPlan: true,
      autoApply: true,
      autoDestroyAt: null,
      createdAt: expect.anything(),
      currentRun: null,
      currentStateVersion: null,
      description: null,
      environment: 'default',
      executionMode: 'remote',
      fileTriggersEnabled: true,
      id: expect.anything(),
      latestChangeAt: expect.anything(),
      latestRun: null,
      locked: false,
      name: 'readWorkspace',
      operations: true,
      permissions: {
        canCreateStateVersions: true,
        canDestroy: true,
        canForceUnlock: true,
        canLock: true,
        canQueueApply: true,
        canQueueDestroy: true,
        canQueueRun: true,
        canReadSettings: true,
        canReadStateVersions: true,
        canReadVariable: true,
        canUnlock: true,
        canUpdate: true,
        canUpdateVariable: true,
      },
      queueAllRuns: false,
      source: 'tfe-api',
      sourceName: null,
      sourceUrl: null,
      speculativeEnabled: true,
      terraformVersion: '0.14.3',
      triggerPrefixes: [],
      vcsRepo: null,
      vcsRepoIdentifier: null,
      workingDirectory: null,
    });
  });
});

describe('readWorkspace', () => {
  const workspaceName = 'readWorkspace';
  const configurationPath = join(__dirname, 'templates/random');

  beforeEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });
  afterEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });

  it('should list the workspaces', async () => {
    const workspace = await client.Workspaces.create(organizationName, {
      name: workspaceName,
      autoApply: true,
    });
    const configuration = await client.ConfigurationVersions.create(
      workspace.id
    );
    await client.ConfigurationVersions.upload(
      configuration.uploadUrl,
      configurationPath
    );
    // wait for the condfiguration to be uploaded
    await waitConfigurationIsUploaded(configuration.id);

    const w = await client.Workspaces.list(organizationName);

    expect(w).toMatchObject({
      actions: { isDestroyable: true },
      agentPool: null,
      allowDestroyPlan: true,
      autoApply: true,
      autoDestroyAt: null,
      createdAt: expect.anything(),
      currentRun: null,
      currentStateVersion: null,
      description: null,
      environment: 'default',
      executionMode: 'remote',
      fileTriggersEnabled: true,
      id: expect.anything(),
      latestChangeAt: expect.anything(),
      latestRun: null,
      locked: false,
      name: 'readWorkspace',
      operations: true,
      permissions: {
        canCreateStateVersions: true,
        canDestroy: true,
        canForceUnlock: true,
        canLock: true,
        canQueueApply: true,
        canQueueDestroy: true,
        canQueueRun: true,
        canReadSettings: true,
        canReadStateVersions: true,
        canReadVariable: true,
        canUnlock: true,
        canUpdate: true,
        canUpdateVariable: true,
      },
      queueAllRuns: false,
      source: 'tfe-api',
      sourceName: null,
      sourceUrl: null,
      speculativeEnabled: true,
      terraformVersion: '0.14.3',
      triggerPrefixes: [],
      vcsRepo: null,
      vcsRepoIdentifier: null,
      workingDirectory: null,
    });
  });
});

async function assertWorkspaceIsDeletedOrDeleteIt(name: string) {
  try {
    await client.Workspaces.delete(organizationName, name);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      console.log(`Nothing to do workspace ${name} already deleted`);
    } else {
      throw err;
    }
  }
}

async function waitConfigurationIsUploaded(configurationId: string) {
  let configuration = await client.ConfigurationVersions.read(configurationId);
  while (configuration.status !== ConfigurationStatus.uploaded) {
    console.log('waiting configuration to upload');
    await wait(500);
    configuration = await client.ConfigurationVersions.read(configurationId);
  }
}

const wait = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });
