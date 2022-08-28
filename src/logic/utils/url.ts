import { NEW_ID } from '~/constants/routing/shared';
import { RulebookType } from '~/typings/rulebooks';

const getRulebookFromSearch = (search?: string) => {
  if (!search) return undefined;

  const regex = /rulebook=\w+/;
  const match = search.match(regex);
  if (match) {
    return match[0].split('=')[1] as RulebookType;
  }
  return undefined;
};

const getIdFromPathname = (pathname?: string) => {
  if (!pathname) return undefined;

  const chunks = pathname.split('/').filter(Boolean);
  const maybeId = chunks[1];
  const parsedMaybeId = parseInt(maybeId, 10);
  if (maybeId === NEW_ID || parsedMaybeId || parsedMaybeId === 0) {
    return maybeId;
  }
  return undefined;
};

export const getRulebookAndIdFromLocation = () => {
  if (globalThis) {
    const { search, pathname } = globalThis.location || {};
    return {
      rulebook: getRulebookFromSearch(search),
      id: getIdFromPathname(pathname),
    };
  }
  return { rulebook: undefined, id: undefined };
};
