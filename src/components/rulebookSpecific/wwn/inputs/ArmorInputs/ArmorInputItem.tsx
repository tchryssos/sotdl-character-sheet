/* eslint-disable no-nested-ternary */
import { upperFirst } from 'lodash';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { ARMOR_WEIGHT } from '~/constants/wwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnArmor, WwnCharacterData } from '~/typings/wwn/characterData';

import { AcContext } from '../../AcProvider';
import { EncumbranceContext } from '../../EncumbranceProvider';

interface ArmorInputItemProps {
  index: number;
  onDelete: (index: number) => void;
  hideUnequipped: boolean;
}

const createArmorFieldName = (
  name: keyof WwnArmor,
  index: number
): `armors.${number}.${keyof WwnArmor}` => `armors.${index}.${name}`;

const armorWeightOptions: SelectOption[] = ARMOR_WEIGHT.map((w) => ({
  label: upperFirst(w),
  value: w,
}));

export function ArmorInputItem({
  index,
  onDelete,
  hideUnequipped,
}: ArmorInputItemProps) {
  const { watch } = useFormContext<WwnCharacterData>();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isXxs = useBreakpointsLessThan('xs');
  const { isEditMode } = useContext(EditContext);
  const { calculateAc } = useContext(AcContext);
  const { calculateEncumbrances } = useContext(EncumbranceContext);

  const armorNameFieldName = createArmorFieldName('armor_name', index);
  const armorName = watch(armorNameFieldName);

  const armorDefenseFieldName = createArmorFieldName('armor_defense', index);
  const armorDefense = watch(armorDefenseFieldName);

  const armorWeightFieldName = createArmorFieldName('armor_weight', index);
  const armorWeight = watch(armorWeightFieldName);

  const armorReadiedFieldName = createArmorFieldName('armor_readied', index);
  const armorReadied = watch(armorReadiedFieldName);

  const armorEncumbranceFieldName = createArmorFieldName(
    'armor_encumbrance',
    index
  );
  const armorEncumbrance = watch(armorEncumbranceFieldName);

  useEffect(() => {
    calculateAc();
  }, [armorReadied, armorDefense, calculateAc]);

  useEffect(() => {
    calculateEncumbrances();
  }, [armorEncumbrance, calculateEncumbrances, armorReadied]);

  if (hideUnequipped && !armorReadied) {
    return null;
  }

  const sectionTitle = `${armorName}, AC ${armorDefense} (${upperFirst(
    armorWeight as string
  )})`;

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={sectionTitle}
      titleColor={armorReadied ? 'text' : 'textAccent'}
      visibilityTitle={`armors${index}`}
    >
      <GridBox columns={1}>
        <GridBox gridTemplateColumns={isXxs ? '1fr' : 'auto 1fr'}>
          <CheckboxInput<WwnCharacterData>
            alwaysEditable
            label="Equipped"
            name={armorReadiedFieldName}
          />
          <TextInput<WwnCharacterData> label="Name" name={armorNameFieldName} />
        </GridBox>
        <GridBox columns={isXxs ? 1 : isLessThanSm ? 2 : 3}>
          <NumberInput<WwnCharacterData>
            label="Defense"
            min={0}
            name={armorDefenseFieldName}
          />
          <SelectInput<WwnCharacterData>
            label="Armor Weight"
            name={armorWeightFieldName}
            options={armorWeightOptions}
          />
          <NumberInput<WwnCharacterData>
            label="Encumbrance"
            min={0}
            name={armorEncumbranceFieldName}
          />
        </GridBox>
        <TextAreaInput<WwnCharacterData>
          label="Description"
          name={createArmorFieldName('armor_description', index)}
        />
      </GridBox>
      {isEditMode && (
        <FlexBox
          gridColumnEnd={3}
          gridColumnStart={1}
          justifyContent="flex-end"
        >
          <DeleteButton onDelete={() => onDelete(index)} />
        </FlexBox>
      )}
    </FormSection>
  );
}
