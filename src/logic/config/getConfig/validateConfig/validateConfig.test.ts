import { validateConfig } from './validateConfig';

describe('validateConfig', () => {
  it('should not throw an error if everything succeeded', async () => {
    await validateConfig({ config: {} as any }); // todo replace with real example when we need it
  });
});
