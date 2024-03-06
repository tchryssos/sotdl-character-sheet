import { PropsWithChildren, useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { CwnCharacterData, CwnOtherStatus } from '~/typings/cwn/characterData';

import { OtherStatusInputItem } from './OtherStatusInputItem';

function StatusChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

const createDefaultValue = () =>
  ({
    name: '',
    description: '',
  } satisfies CwnOtherStatus);

export function OtherStatusesInput() {
  const { setIsEditMode } = useContext(EditContext);
  return (
    <FormSection columns={1} icon={RpgIcons.Bubbles} title="Other Statuses">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={StatusChildWrapper}
        alwaysEditable
        createDefaultValue={createDefaultValue}
        emptyLabel="No Other Statuses"
        parentFieldName="other_statuses"
        onAdd={() => setIsEditMode(true)}
      >
        {({ index, onDelete, fieldId }) => (
          <OtherStatusInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
