import { deserialize } from './deserializer';
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
  };

  const json = await deserialize(dataSet);

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

it('should deserialize relationships', async () => {
  const dataSet = {
    data: {
      id: 'myId',
      type: 'whatever',
      attributes: {
        name: 'myName',
      },
      relationships: {
        a: {
          data: {
            id: 'a-id',
            type: 'A',
          },
        },
        b: {
          data: {
            id: 'b-id',
            type: 'B',
          },
        },
      },
    },
  };

  const res = await deserialize(dataSet);
  expect(res).toMatchObject({
    a: { id: 'a-id' },
    b: { id: 'b-id' },
    id: 'myId',
    name: 'myName',
  });
});

it('should deserialize multiple objects relationships', async () => {
  const dataSet = {
    data: [
      {
        id: 'an-id',
        type: 'whatever',
        attributes: {
          name: 'name',
        },
        relationships: {
          a: {
            data: {
              id: 'a-id',
              type: 'A',
            },
          },
        },
      },
      {
        id: 'another-id',
        type: 'whatever',
        attributes: {
          name: 'name',
        },
        relationships: {
          b: {
            data: {
              id: 'b-id',
              type: 'B',
            },
          },
        },
      },
    ],
  };

  const res = await deserialize(dataSet);
  expect(res).toMatchObject([
    { a: { id: 'a-id' }, id: 'an-id', name: 'name' },
    { b: { id: 'b-id' }, id: 'another-id', name: 'name' },
  ]);
});
