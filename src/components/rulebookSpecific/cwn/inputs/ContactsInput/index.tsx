import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { CwnCharacterData, CwnContact } from '~/typings/cwn/characterData';

import { ContactInputItem } from './ContactInputItem';

const createDefaultValue = () =>
  ({
    name: '',
    relationship: 'acquaintance',
    description: '',
  } satisfies CwnContact);

function ContactsChildWrapper({ children }: PropsWithChildren<unknown>) {
  const lessThanMd = useBreakpointsLessThan('md');
  return <GridBox columns={lessThanMd ? 1 : 2}>{children}</GridBox>;
}

export function ContactsInput() {
  return (
    <FormSection columns={1} icon={RpgIcons.SunglassesGuy} title="Contacts">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={ContactsChildWrapper}
        createDefaultValue={createDefaultValue}
        parentFieldName="contacts"
      >
        {({ index, onDelete, fieldId }) => (
          <ContactInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
