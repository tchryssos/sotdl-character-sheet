import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { CwnCharacterData, CwnFocus } from '~/typings/cwn/characterData';

import { FocusInputItem } from './FocusInputItem';

function FociChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

const createDefaultValue = () =>
  ({
    name: '',
    level: '1',
    description: '',
  } satisfies CwnFocus);

export function FociInput() {
  return (
    <FormSection columns={1} icon={RpgIcons.Lightbulb} title="Foci">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={FociChildWrapper}
        createDefaultValue={createDefaultValue}
        parentFieldName="foci"
      >
        {({ index, onDelete, fieldId }) => (
          <FocusInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
