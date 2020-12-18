export interface StateVersionOutput {
  id: string; //`jsonapi:"primary,state-version-outputs"`
  name: string; //`jsonapi:"attr,name"`
  sensitive: boolean; //   `jsonapi:"attr,sensitive"`
  type: string; //`jsonapi:"attr,type"`
  value: string; //`jsonapi:"attr,value"`
}
