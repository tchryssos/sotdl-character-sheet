import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData, CwnContact } from '~/typings/cwn/characterData';

import { ContactInput } from './ContactInput';

const createDefaultValue = () =>
  ({
    name: '',
    relationship: 'acquaintance',
    description: '',
  } satisfies CwnContact);

function ContactsChildWrapper({ children }: PropsWithChildren<unknown>) {
  return <GridBox columns={2}>{children}</GridBox>;
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
          <ContactInput
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
