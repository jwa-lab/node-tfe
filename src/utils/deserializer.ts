import { Deserializer } from 'jsonapi-serializer';
import _ from 'lodash';

const JSONAPIDeserialize = new Deserializer({ keyForAttribute: 'camelCase' })
  .deserialize;

export const deserialize = async (dataSet: any): Promise<any> => {
  if (!dataSet.included) {
    dataSet.included = [];
  }

  _.castArray(dataSet.data).map((data: any) => {
    Object.values(data.relationships || {}).map((relationship: any) => {
      if (
        relationship.data &&
        relationship.data.id &&
        relationship.data.type &&
        !dataSet.included.find(
          (instance: any) =>
            instance.id === relationship.data.id &&
            instance.type === relationship.data.type
        )
      )
        dataSet.included.push(relationship.data);
    });
  });

  return JSONAPIDeserialize(dataSet);
};
