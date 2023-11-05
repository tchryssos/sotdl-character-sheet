/* eslint-disable no-nested-ternary */
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { Text } from '~/components/Text';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { SortableAddAnotherChildProps } from '~/typings/form';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { DefenseContext } from '../../DefenseProvider';
import { createArmorFieldName } from './utils';

interface ArmorInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}

export function ArmorInputItem({
  postSortIndex: index,
  onDelete,
}: ArmorInputItemProps) {
  const { isEditMode } = useContext(EditContext);
  const { recalculateDefense } = useContext(DefenseContext);
  const { watch } = useFormContext<SotwwCharacterData>();

  const isXxs = useBreakpointsLessThan('xs');

  const armorEquippedFieldName = createArmorFieldName('armor_equipped', index);
  const armorEquipped = watch(armorEquippedFieldName) as boolean;

  const armorNameFieldName = createArmorFieldName('armor_name', index);
  const armorName = watch(armorNameFieldName) as string;

  const armorScoreFieldName = createArmorFieldName(
    'armor_defense_score',
    index
  );
  const armorScore = guaranteeNumberValue(watch(armorScoreFieldName) as number);

  const armorBonusFieldName = createArmorFieldName(
    'armor_defense_bonus',
    index
  );
  const armorBonus = guaranteeNumberValue(watch(armorBonusFieldName) as number);

  const naturalDefense = guaranteeNumberValue(watch('defense_natural'));

  const relevantArmorBonus =
    armorScore > naturalDefense ? armorScore : armorBonus;

  // If the armor would set a new defense score, show that, otherwise, show bonus with +
  const title = `${armorName}, Def ${
    armorScore > naturalDefense ? '' : '+'
  }${relevantArmorBonus}`;

  useEffect(() => {
    recalculateDefense();
  }, [armorBonus, armorScore, armorEquipped, recalculateDefense]);

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={title}
      titleColor={armorEquipped ? 'text' : 'textAccent'}
      visibilityTitle={`armors${index}`}
    >
      <GridBox gridTemplateColumns={isXxs ? '1fr' : 'auto 1fr'}>
        <CheckboxInput<SotwwCharacterData>
          alwaysEditable
          label="Equipped"
          name={armorEquippedFieldName}
        />
        <TextInput<SotwwCharacterData> label="Name" name={armorNameFieldName} />
      </GridBox>
      <GridBox alignItems="flex-end" gap={8} gridTemplateColumns="1fr auto 1fr">
        <NumberInput<SotwwCharacterData>
          label="Defense Score"
          min={0}
          name={armorScoreFieldName}
        />
        <Text as="p" marginBottom={8}>
          {' '}
          or{' '}
        </Text>
        <NumberInput<SotwwCharacterData>
          label="Defense Bonus"
          min={0}
          name={armorBonusFieldName}
        />
      </GridBox>
      <TextAreaInput<SotwwCharacterData>
        label="Description"
        name={createArmorFieldName('armor_description', index)}
      />
      {isEditMode && (
        <FlexBox justifyContent="flex-end">
          <DeleteButton onDelete={() => onDelete(index)} />
        </FlexBox>
      )}
    </FormSection>
  );
}
