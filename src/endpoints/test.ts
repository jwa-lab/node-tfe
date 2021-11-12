import { config } from 'dotenv';
import { join } from 'path';
import Client from '../index';

config({ path: join(__dirname, '.env.e2e') });

// Extract and validate required environment variables
const token = 'jKD7wagy7xxHAw.atlasv1.OgOqpRWWNPU5hlzeNvbHXLWnFkxMMFceW9m5LYoyUDzyYoSytwfphRk4V5yu6CYNFCA'
const organizationName = 'jwalab'
const client = new Client({
  token,
});

describe('listTags', () => {
  it('should lsit the tags', async () => {
    const w = await client.Tags.list(organizationName);
    console.log(w.items[14])

    expect(w.items[14]).toMatchObject({        
        name: 'tfcloud',
        instanceCount: 1,
        id: 'tag-dpxi9s1XXWLzkRrJ',
        organization: { id: 'jwalab' },
        links: {
          self: 'https://app.terraform.io/api/v2/organizations/jwalab/tags?page%5Bnumber%5D=1&page%5Bsize%5D=20',
          first: 'https://app.terraform.io/api/v2/organizations/jwalab/tags?page%5Bnumber%5D=1&page%5Bsize%5D=20',
          prev: null,
          next: null,
          last: 'https://app.terraform.io/api/v2/organizations/jwalab/tags?page%5Bnumber%5D=1&page%5Bsize%5D=20'
        }
    });
  });
});

describe('destroyTag',  () => {
    it('should delete a tag', async () => {
        const tags = await client.Tags.list(organizationName);
        const tag_id = tags.items[14].id;
        await client.Tags.delete('jwalab',{type: 'tags', id: tag_id});

        console.log(await client.Tags.list(organizationName));
    });
});