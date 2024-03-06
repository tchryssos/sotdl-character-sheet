import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface CyberdeckInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'postSortIndex' | 'onDelete'> {}

const createCyberdeckFieldName = makeNestedFieldNameFn<
  CwnCharacterData,
  'cyberdecks'
>('cyberdecks');

export function CyberdeckInputItem({
  postSortIndex: index,
  onDelete,
}: CyberdeckInputItemProps) {
  const { watch, setValue } = useFormContext<CwnCharacterData>();

  const nameFieldName = createCyberdeckFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const readiedFieldName = createCyberdeckFieldName('readied', index);
  const readied = watch(readiedFieldName) as boolean;

  return (
    <AAMItemFormSection title={name}>
      <GridBox gridTemplateColumns="auto 1fr">
        <CheckboxInput
          customOnChange={() => {
            setValue(readiedFieldName, !readied);
          }}
          inputLike
          isChecked={readied}
          label="Readied"
          name={readiedFieldName}
        />
        <AAMItemTitleAndDelete<CwnCharacterData>
          index={index}
          label="Name"
          name={nameFieldName}
          onDelete={onDelete}
        />
      </GridBox>
      <GridBox>
        <NumberInput<CwnCharacterData>
          label="Bonus Access"
          min={0}
          name={createCyberdeckFieldName('bonus_access', index)}
        />
        <NumberInput<CwnCharacterData>
          label="Memory"
          min={0}
          name={createCyberdeckFieldName('memory', index)}
        />
      </GridBox>
      <GridBox columns={3}>
        <NumberInput<CwnCharacterData>
          label="Shielding"
          min={0}
          name={createCyberdeckFieldName('shielding', index)}
        />
        <NumberInput<CwnCharacterData>
          label="CPU"
          min={0}
          name={createCyberdeckFieldName('cpu', index)}
        />
        <NumberInput<CwnCharacterData>
          label="Encumbrance"
          min={0}
          name={createCyberdeckFieldName('encumbrance', index)}
        />
      </GridBox>
      <TextAreaInput<CwnCharacterData>
        label="Description/Mods"
        name={createCyberdeckFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
