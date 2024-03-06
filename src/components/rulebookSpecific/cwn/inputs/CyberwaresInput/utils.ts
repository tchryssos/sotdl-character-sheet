import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData, CwnCyberware } from '~/typings/cwn/characterData';

export const createCyberwareFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'cyberware'
>('cyberware');

export const useLinkedCyberware = (id: string) => {
  const [linkedCyberware, setLinkedCyberware] = useState<CwnCyberware | null>(
    null
  );
  const { getValues } = useFormContext<CwnCharacterData>();

  useEffect(() => {
    // Cyberware will always exist for linked item, if they are linked
    // so we don't have to `watch` the cyberware, just `getValues`
    const cyberwares = getValues('cyberware');
    setLinkedCyberware(cyberwares.find((c) => c.id === id) || null);
  }, [id, getValues]);

  return linkedCyberware;
};
