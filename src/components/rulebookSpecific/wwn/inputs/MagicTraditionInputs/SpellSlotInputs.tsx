import { PropsWithChildren } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { WwnCharacterData, WwnSpellSlot } from '~/typings/wwn/characterData';

const createDefaultSpellSlot = (): WwnSpellSlot => ({
  spell_slot_spent: false,
});

function SpellSlotChild({ postSortIndex }: SortableAddAnotherChildProps) {
  return (
    <CheckboxInput<WwnCharacterData>
      alwaysEditable
      label={`Slot ${postSortIndex + 1}`}
      name={`magic_spell_slots.${postSortIndex}.spell_slot_spent`}
      useX
    />
  );
}

function SpellSlotsWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <FlexBox flexWrap="wrap" gap={8}>
      {children}
    </FlexBox>
  );
}

export function SpellSlotInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.InsetGem} title="Spell Slots">
      <AddAnotherMultiField<WwnCharacterData>
        ChildWrapper={SpellSlotsWrapper}
        createDefaultValue={createDefaultSpellSlot}
        parentFieldName="magic_spell_slots"
        simpleDelete
      >
        {(childProps) => (
          <SpellSlotChild
            {...childProps}
            key={childProps.fieldId}
            postSortIndex={childProps.index}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
