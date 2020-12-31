import { deserializer } from './deserializer';

it('should include relationships', async () => {
  const dataSet = {
    data: [
      {
        type: 'users',
        id: '54735750e16638ba1eee59cb',
        attributes: {
          'first-name': 'Sandro',
          'last-name': 'Munda',
        },
        relationships: {
          'my-address': {
            data: { type: 'addresses', id: '54735722e16620ba1eee36af' },
          },
        },
      },
    ],
    included: [
      {
        type: 'addresses',
        id: '54735722e16620ba1eee36af',
      },
    ],
  };

  const json = await deserializer(dataSet);

  expect(json).toMatchObject([
    {
      firstName: 'Sandro',
      id: '54735750e16638ba1eee59cb',
      lastName: 'Munda',
      myAddress: {
        id: '54735722e16620ba1eee36af',
      },
    },
  ]);
});
