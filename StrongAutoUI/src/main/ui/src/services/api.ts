import env from 'env';
import { Configuration } from 'generated';

export const baseConfiguration: Configuration = new Configuration({
  basePath: env.STRONG_AUTO_API_URL,
});

export const createMockResponse = <T>(data: T, timeoutMs = 0) =>
  new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), timeoutMs);
  });
