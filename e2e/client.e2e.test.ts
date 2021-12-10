import { config } from 'dotenv';
import env from 'env-var';
import { join } from 'path';
import { Serializer } from 'jsonapi-serializer';
import Client, {
  ConfigurationStatus,
  ResourceNotFoundError,
  Run,
  RunStatus,
  WorkspaceVariableCategory,
} from '../src/index';
import { TagsAddOptionsSerializer } from '../src/interfaces/TagsDeleteOptions';

config({ path: join(__dirname, '.env.e2e') });

// Extract and validate required environment variables
const token = env.get('token').required().asString();
const organizationName = env.get('organizationName').required().asString();

const client = new Client({
  token,
});

describe('createWorkspace', () => {
  const workspaceName = 'createWorkspace';
  beforeEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });
  afterEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });
  it('should create the workspace', async () => {
    await client.Workspaces.create(organizationName, {
      name: workspaceName,
      autoApply: true,
      sourceName: 'some external value',
    });

    const w = await client.Workspaces.read(organizationName, workspaceName);
    expect(w).toMatchObject({
      id: expect.anything(),
      sourceName: 'some external value',
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

  it('should read the workspace', async () => {
    await client.Workspaces.create(organizationName, {
      name: workspaceName,
      autoApply: true,
    });

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
      terraformVersion: '1.1.0',
      triggerPrefixes: [],
      vcsRepo: null,
      vcsRepoIdentifier: null,
      workingDirectory: null,
    });
  });
  it('should populate workspace relationships on read workspace', async () => {
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
      currentRun: { id: expect.anything() },
      latestRun: { id: expect.anything() },
    });
  });
  it('should include the related resources', async () => {
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
    // wait for the configuration to be uploaded
    await waitConfigurationIsUploaded(configuration.id);

    const w = await client.Workspaces.read(organizationName, workspaceName, {
      include: 'current_run',
    });

    expect(w).toMatchObject({
      currentRun: { id: expect.anything(), status: expect.anything() },
    });
  });
  it('should include current_run even after the run has completed', async () => {
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

    let w = await client.Workspaces.read(organizationName, workspaceName, {
      include: 'current_run',
    });

    await waitRunStatusToBe(w.currentRun?.id as string, RunStatus.applied);

    w = await client.Workspaces.read(organizationName, workspaceName, {
      include: 'current_run',
    });

    expect(w).toMatchObject({
      currentRun: { id: expect.anything() },
    });
  });
});

describe('listWorkspaces', () => {
  const workspaceName = 'A-Workspace';
  const anotherWorkspaceName = 'B-Workspace';
  const yetAnotherWorkspaceName = 'A-Workspace-2';
  const configurationPath = join(__dirname, 'templates/random');

  beforeEach(async () => {
    await Promise.all(
      [workspaceName, anotherWorkspaceName, yetAnotherWorkspaceName].map(
        assertWorkspaceIsDeletedOrDeleteIt
      )
    );
  });
  afterEach(async () => {
    await Promise.all(
      [workspaceName, anotherWorkspaceName, yetAnotherWorkspaceName].map(
        assertWorkspaceIsDeletedOrDeleteIt
      )
    );
  });

  it('should list the workspaces', async () => {
    await Promise.all(
      [workspaceName, anotherWorkspaceName].map((workspaceName) =>
        client.Workspaces.create(organizationName, {
          name: workspaceName,
          autoApply: true,
        })
      )
    );

    const res = await client.Workspaces.list(organizationName);
    
    expect(
      res.items.sort((a: any, b: any) => a.name.localeCompare(b.name))
    ).toMatchObject([
      {
        name: workspaceName,
      },
      {
        name: anotherWorkspaceName,
      },
    ]);
  });

  it('should list only the workspaces that match the queried name', async () => {
    await Promise.all(
      [workspaceName, anotherWorkspaceName].map((workspaceName) =>
        client.Workspaces.create(organizationName, {
          name: workspaceName,
          autoApply: true,
        })
      )
    );

    const res = await client.Workspaces.list(organizationName, {
      'search[name]': workspaceName,
    });
    
    expect(res.items).toMatchObject([
      {
        name: workspaceName,
      },
    ]);
  });

  it('should support wildcard when when filtering workspaces by name', async () => {
    await Promise.all(
      [workspaceName, anotherWorkspaceName, yetAnotherWorkspaceName].map(
        (workspaceName) =>
          client.Workspaces.create(organizationName, {
            name: workspaceName,
            autoApply: true,
          })
      )
    );

    const res = await client.Workspaces.list(organizationName, {
      'search[name]': 'A-',
    });

    expect(
      res.items.sort((a: any, b: any) => a.name.localeCompare(b.name))
    ).toMatchObject([
      {
        name: workspaceName,
      },
      {
        name: yetAnotherWorkspaceName,
      },
    ]);
  });

  it('should populate workspace relationships on list workspace', async () => {
    await Promise.all(
      [workspaceName, anotherWorkspaceName].map(async (workspaceName) => {
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
      })
    );

    const res = await client.Workspaces.list(organizationName);

    expect(
      res.items.sort((a: any, b: any) => a.name.localeCompare(b.name))
    ).toMatchObject([
      {
        currentRun: { id: expect.anything() },
        latestRun: { id: expect.anything() },
        name: workspaceName,
      },
      {
        currentRun: { id: expect.anything() },
        latestRun: { id: expect.anything() },
        name: anotherWorkspaceName,
      },
    ]);
  });

  it('should include the related resources', async () => {
    await Promise.all(
      [workspaceName, anotherWorkspaceName].map(async (workspaceName) => {
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
      })
    );

    const res = await client.Workspaces.list(organizationName, {
      include: 'current_run',
    });

    expect(
      res.items.sort((a: any, b: any) => a.name.localeCompare(b.name))
    ).toMatchObject([
      {
        name: workspaceName,
        currentRun: { id: expect.anything(), status: expect.anything() },
      },
      {
        name: anotherWorkspaceName,
        currentRun: { id: expect.anything(), status: expect.anything() },
      },
    ]);
  });
});

describe('createVariable', () => {
  const workspaceName = 'createVariable';
  const configurationPath = join(
    __dirname,
    'templates/random-complex-variable'
  );

  beforeEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });
  afterEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });
  it('should create complex variable', async () => {
    const workspace = await client.Workspaces.create(organizationName, {
      name: workspaceName,
      autoApply: true,
    });
    const randoms = [
      { id: 1, length: 2 },
      { id: 2, length: 2 },
    ];

    await client.Workspaces.createVariable(workspace.id, {
      key: 'randoms',
      // convert : into =
      value: JSON.stringify(randoms).replace(/:/g, '='),
      category: WorkspaceVariableCategory.terraform,
      hcl: true,
    });

    const configuration = await client.ConfigurationVersions.create(
      workspace.id,
      { autoQueueRuns: true }
    );

    await client.ConfigurationVersions.upload(
      configuration.uploadUrl,
      configurationPath
    );

    await waitConfigurationIsUploaded(configuration.id);

    const w = await client.Workspaces.read(organizationName, workspaceName, {
      include: 'current_run',
    });

    await waitRunStatusToBe(w.currentRun?.id as string, RunStatus.applied);
  });
});

describe('listTags', () => {
  beforeEach(async () => {
    await assertTagExistsOrCreateIt(["tag0","tag1","tag2"], "listTagTest")
  });
  afterEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt("listTagTest");
  });
  it('should list all the tags of the organization', async () => {
    const w = await client.Tags.list(organizationName);
    expect(w).toMatchObject({
      pagination: {
        currentPage: 1,
        previousPage: undefined,
        nextPage: null,
        totalPages: 1,
        totalCount: 3
      },
      items: [
        {
          name: 'tag0',
          instanceCount: 1,
          id: expect.anything(),
          organization: expect.anything(),
          links: expect.anything()
        },
        {
          name: 'tag1',
          instanceCount: 1,
          id: expect.anything(),
          organization: expect.anything(),
          links: expect.anything()
        },
        {
          name: 'tag2',
          instanceCount: 1,
          id: expect.anything(),
          organization: expect.anything(),
          links: expect.anything()
        }
      ]
    })
  });
  it('should list only the tags that matched the queried name', async () => {
    const w = await client.Tags.list(organizationName, {
      'q': 'tag0',
    });
    expect(w.items).toMatchObject([
      {
        name: 'tag0',
        instanceCount: 1,
        id: expect.anything(),
        organization: expect.anything(),
        links: expect.anything()
      }
    ])
  });
});

describe('destroyTag',  () => {
  const workspaceName = 'destroyTagTest';
  beforeEach(async () => {
    const workspace = await assertTagExistsOrCreateIt(["tag0","tag1"], workspaceName)
    const testTags = await client.Tags.list(organizationName);

    expect(await client.get(`/workspaces/${workspace.id}/relationships/tags`)).toMatchObject({
      data: [
        {
          id: testTags.items[0].id,
          type: 'tags',
          attributes: expect.anything(),
          relationships: expect.anything()
        },
        {
          id: testTags.items[1].id,
          type: 'tags',
          attributes: expect.anything(),
          relationships: expect.anything()
        }
      ],
      links: expect.anything(),
      meta: expect.anything()
    });
  });
  afterEach(async () => {
    await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  });
  it('should delete a tag', async () => {
    const workspace = await client.Workspaces.read(organizationName,workspaceName);
    const t = (await client.Tags.list(organizationName)).items;
    await client.Tags.delete('jwalab-test', [{ type: 'tags', id: t[0].id }, { type: 'tags', id: t[1].id }]);

    expect(await client.get(`/workspaces/${workspace.id}/relationships/tags`)).toMatchObject({
      data: [],
      links: expect.anything(),
      meta: expect.anything()
    });
  });
});


describe('addWorkspacesToTag', () => {
  const workspaceNames = ['test0','test1','test2'];
  beforeEach(async () => {
    for(const name of workspaceNames){
      await assertWorkspaceIsDeletedOrDeleteIt(name);
      await assertTagExistsOrCreateIt(["tag0"], "addWorkSpaceToTagTest")
    }
  });
  afterEach(async () => {
    for(const name of workspaceNames){
      await assertWorkspaceIsDeletedOrDeleteIt(name);
      await assertWorkspaceIsDeletedOrDeleteIt("addWorkSpaceToTagTest");
    }
  });
  it('should add a workspace to a tag', async () => {
    const testTags = await client.Tags.list(organizationName);
    const responses = [];
    for(const name in workspaceNames){
      responses.push(await client.Workspaces.create(organizationName, {
        name: workspaceNames[name],
        autoApply: true,
        sourceName: 'some external value',
      }));
    }
    await client.Tags.addWorkspacesToTag(testTags.items[0].id, [
      { type: 'workspaces', id: responses[0].id},
      { type: 'workspaces', id: responses[1].id},
      { type: 'workspaces', id: responses[2].id},
    ]);

    for(const workspaces in responses){
      expect(await client.get(`/workspaces/${responses[workspaces].id}/relationships/tags`)).toMatchObject({
        data: [
          {
            id: testTags.items[0].id,
            type: 'tags',
            attributes: expect.anything(),
            relationships: expect.anything()
          }
        ],
        links: expect.anything(),
        meta: expect.anything()
      });
    }
  })
});

async function addTagsToWorkspace(endpoint: string, options: any){
  const serializedOptions = await TagsAddOptionsSerializer.serialize(
    options
);
  await client.post(endpoint, serializedOptions);
}

async function assertTagExistsOrCreateIt(tagNames: string[], workspaceName: string){
  const options = new Serializer('tags', {attributes: ['name']});
  await assertWorkspaceIsDeletedOrDeleteIt(workspaceName);
  const workspace = await client.Workspaces.create(organizationName, {
    name: workspaceName,
    autoApply: true,
    sourceName: 'some external value',
  });

  for(const tag in tagNames){
    const serializedOptions = options.serialize([{type: 'tags', name: tagNames[tag]}])
    await client.post(`workspaces/${workspace.id}/relationships/tags`, serializedOptions);
  }

  return workspace;
}

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

async function waitRunStatusToBe(runId: string, status: string) {
  let run: Run;
  run = await client.Runs.read(runId, {
    include: 'plan,apply',
  });
  while (run.status !== status) {
    console.log(`waiting runStatus to be ${status}`);
    await wait(500);
    run = await client.Runs.read(run.id, {
      include: 'plan,apply',
    });
  }
}

const wait = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });
