import { Job, DoneCallback } from 'bull';

async function alertProcessor(job: Job, doneCallback: DoneCallback) {
  doneCallback(null, null);
}

export default alertProcessor;
