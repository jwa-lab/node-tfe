import { RunStatus } from '../enums/RunStatus';

export const runIsErrored = (runStatus?: RunStatus): boolean => {
  return !!runStatus && runStatus === RunStatus.errored;
};
