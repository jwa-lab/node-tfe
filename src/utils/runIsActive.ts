import { RunStatus } from '../enums/RunStatus';

export const runIsActive = (runStatus?: RunStatus): boolean => {
  return (
    !!runStatus &&
    runStatus !== RunStatus.policySoftFailed &&
    runStatus !== RunStatus.plannedAndFinish &&
    runStatus !== RunStatus.discarded &&
    runStatus !== RunStatus.errored &&
    runStatus !== RunStatus.applied
  );
};
