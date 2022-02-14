import { getRequest } from './execution-context.util';

describe('ExecutionContext#getRequest', () => {
  it('should be defined', () => {
    expect(getRequest).toBeDefined();
  });
});
