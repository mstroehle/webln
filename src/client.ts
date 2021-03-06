import { WebLNProvider } from './provider';
import { MissingProviderError } from './errors';

/**
 * Everything needed to get and set providers on the client.
 * The methodology here is pretty brittle, so it could use some changes.
 *
 * TODO: Handle multiple provider registrations?
 */

export interface GetProviderParameters {
  pubkey?: string;
}

export function requestProvider(_: GetProviderParameters = {}): Promise<WebLNProvider> {
  if (typeof window === 'undefined') {
    throw new Error('Must be called in a browser context');
  }

  const webln: WebLNProvider = (window as any).webln;
  if (!webln) {
    throw new MissingProviderError('Your browser has no WebLN provider');
  }

  return webln.enable().then(() => webln);
}
