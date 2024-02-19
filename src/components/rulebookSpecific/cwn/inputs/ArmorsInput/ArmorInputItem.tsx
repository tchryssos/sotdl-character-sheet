import { upperFirst } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { ARMOR_WEIGHT } from '~/constants/cwn/game';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

interface ArmorInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {
  hideUnequipped: boolean;
}

const createArmorFieldName = makeNestedFieldNameFn<CwnCharacterData, 'armors'>(
  'armors'
);

const armorWeightOptions: SelectOption[] = ARMOR_WEIGHT.map((w) => ({
  label: upperFirst(w),
  value: w,
}));

export function ArmorInputItem({
  postSortIndex: index,
  onDelete,
  hideUnequipped,
}: ArmorInputItemProps) {
  const { setValue, watch, getValues } = useFormContext<CwnCharacterData>();
  const isXxs = useBreakpointsLessThan('xs');

  const nameFieldName = createArmorFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const equippedFieldName = createArmorFieldName('equipped', index);
  const equipped = watch(equippedFieldName) as boolean;

  return (
    <AAMItemFormSection title={name} visibilityTitle={`${name}${index}`}>
      <GridBox gridTemplateColumns={isXxs ? '1fr' : 'auto 1fr'}>
        <CheckboxInput
          customOnChange={() => {
            setValue(equippedFieldName, !equipped);
            // Only one armor can be worn at a time,
            // so unequip any other equipped armor when equipping this one
            getValues('armors').forEach((a, i) => {
              if (i !== index && a.equipped) {
                const otherEquippedName = createArmorFieldName('equipped', i);
                setValue(otherEquippedName, false);
              }
            });
          }}
          inputLike
          isChecked={equipped}
          label="Equipped"
          name={equippedFieldName}
        />
        <TextInput<CwnCharacterData> label="Name" name={nameFieldName} />
      </GridBox>
    </AAMItemFormSection>
  );
}
