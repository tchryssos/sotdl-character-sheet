import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
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
  return (
    <FormSection columns={1} icon={RpgIcons.Bubbles} title="Other Statuses">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={StatusChildWrapper}
        createDefaultValue={createDefaultValue}
        parentFieldName="other_statuses"
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
