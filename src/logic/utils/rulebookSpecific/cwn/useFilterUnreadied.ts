import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { AddAnotherMultiFieldName } from '~/components/form/AddAnotherMultiField';
import { EditContext } from '~/logic/contexts/editContext';
import { SineNomineCharacterData } from '~/typings/characters';
import { SortableAddAnotherChildProps } from '~/typings/form';

export function useFilterUnreadied<T extends SineNomineCharacterData>(
  parentFieldName: AddAnotherMultiFieldName<T>,
  readiedFieldName = 'readied'
) {
  const { getValues } = useFormContext();
  const [hideUnreadied, setHideUnreadied] = useState(false);
  const { isEditMode } = useContext(EditContext);
  const lastHideStateRef = useRef(hideUnreadied);

  const filterUnreadied = useCallback(
    ({ fieldId, sortIndexMap }: SortableAddAnotherChildProps) => {
      const trueFieldIndex = sortIndexMap.get(fieldId);

      if (trueFieldIndex === undefined) {
        return false;
      }

      if (!isEditMode && hideUnreadied) {
        const filterItems = getValues(parentFieldName);

        const item = filterItems[trueFieldIndex];

        if (!item.readied) {
          if (!(readiedFieldName in Object.keys(item))) {
            console.error(`Field ${readiedFieldName} not found in ${item}`);
          }
          return false;
        }
      }

      return true;
    },
    [getValues, hideUnreadied, isEditMode, parentFieldName, readiedFieldName]
  );

  const onToggleHide = useCallback(() => {
    setHideUnreadied(!hideUnreadied);
    lastHideStateRef.current = !hideUnreadied;
  }, [hideUnreadied]);

  useEffect(() => {
    if (isEditMode) {
      setHideUnreadied(false);
    } else {
      setHideUnreadied(lastHideStateRef.current);
    }
  }, [isEditMode]);

  return {
    filterUnreadied,
    hideUnreadied,
    onToggleHide,
  };
}
