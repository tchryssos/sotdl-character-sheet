import { capitalize, max } from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box } from '~/components/box/Box';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { Text } from '~/components/Text';
import { CWN_DEFAULT_SAVE_SCORE } from '~/constants/cwn/form';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import {
  AttributeName,
  CwnCharacterData,
  SaveName,
} from '~/typings/cwn/characterData';

const useSaveModifiers = (
  saveName: SaveName,
  attrs: [AttributeName, AttributeName]
) => {
  const [attrOneName, attrTwoName] = attrs;
  const { watch, setValue } = useFormContext<CwnCharacterData>();
  const attr1Value = guaranteeNumberValue(watch(attrOneName));
  const attr2Value = guaranteeNumberValue(watch(attrTwoName));
  const level = watch('level') || 1;

  useEffect(() => {
    setValue(
      saveName,
      CWN_DEFAULT_SAVE_SCORE -
        (level - 1) -
        calcAttributeBonus(max([attr1Value, attr2Value]) || 10)
    );
  }, [attr1Value, attr2Value, level, saveName, setValue]);
};

interface SaveInputProps {
  saveName: SaveName;
  modifierAttrs?: [AttributeName, AttributeName];
  showFullLabel?: boolean;
}

const useCalcLuck = () => {
  const { watch, setValue } = useFormContext<CwnCharacterData>();
  const level = watch('level') || 1;

  useEffect(() => {
    setValue('save_luck', CWN_DEFAULT_SAVE_SCORE - (level - 1));
  }, [level, setValue]);
};

function SaveInput({ saveName, modifierAttrs, showFullLabel }: SaveInputProps) {
  const calcSaveFn = saveName === 'save_luck' ? useCalcLuck : useSaveModifiers;
  calcSaveFn(saveName, (modifierAttrs || []) as [AttributeName, AttributeName]);

  const [, saveType] = saveName.split('_');
  const capSave = capitalize(saveType);
  const label = !showFullLabel ? capSave : `${capSave} Save Target`;

  return (
    <NumberInput<CwnCharacterData> label={label} name={saveName} readOnly />
  );
}

export function SaveInputs() {
  const atLeastXs = useBreakpointsAtLeast('xs');
  const atLeastMd = useBreakpointsAtLeast('md');

  return (
    <FormSection
      columns={atLeastXs ? 4 : 2}
      icon={RpgIcons.Rabbit}
      title="Saves"
    >
      <Box gridColumnEnd={atLeastXs ? 5 : 3} gridColumnStart={1}>
        <Text as="p" variant="body-xs">
          Your Saves are automatically calculated based on your level and your
          attribute modifiers.
        </Text>
      </Box>
      <SaveInput
        modifierAttrs={['attribute_strength', 'attribute_constitution']}
        saveName="save_physical"
        showFullLabel={atLeastMd}
      />
      <SaveInput
        modifierAttrs={['attribute_dexterity', 'attribute_intelligence']}
        saveName="save_evasion"
        showFullLabel={atLeastMd}
      />
      <SaveInput
        modifierAttrs={['attribute_wisdom', 'attribute_charisma']}
        saveName="save_mental"
        showFullLabel={atLeastMd}
      />
      <SaveInput saveName="save_luck" showFullLabel={atLeastMd} />
    </FormSection>
  );
}
