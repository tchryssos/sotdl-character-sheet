import { upperFirst } from 'lodash';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { Label } from '~/components/form/Label';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { Color } from '~/typings/theme';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { EncumbranceContext } from '../EncumbranceProvider';

interface EncumbranceProps {
  strength: number;
  type: 'stowed' | 'readied';
}

function EncumberedField({ strength, type }: EncumbranceProps) {
  const { readiedEncumbrance, stowedEncumbrance, useEncumbrance } =
    useContext(EncumbranceContext);

  const encValue = type === 'stowed' ? stowedEncumbrance : readiedEncumbrance;
  const encTier = type === 'stowed' ? 4 : 2;

  let textColor: Color = 'text';

  if (useEncumbrance) {
    if (encValue > strength + encTier) {
      textColor = 'danger';
    } else if (encValue > strength) {
      textColor = 'warning';
    }
  }

  return (
    <Label label={upperFirst(type)}>
      <Text as="p" color={textColor} variant="body-lg">
        {encValue} / {strength}
      </Text>
      {Boolean(
        useEncumbrance && readiedEncumbrance > strength + encTier * 2
      ) && (
        <Text as="p" color="danger" variant="body-sm">
          Over-encumbered
        </Text>
      )}
    </Label>
  );
}

export function EncumbranceInput() {
  const { watch } = useFormContext<WwnCharacterData>();
  const strength = watch('attribute_strength');

  const { calculateEncumbrances, useEncumbrance, setUseEncumbrance } =
    useContext(EncumbranceContext);

  useEffect(() => {
    calculateEncumbrances();
  }, [strength, calculateEncumbrances]);

  return (
    <FormSection icon={RpgIcons.Sack} title="Encumbrance">
      <EncumberedField strength={strength} type="readied" />
      <EncumberedField strength={strength} type="stowed" />
      <CheckboxInput
        alwaysEditable
        customOnChange={() => setUseEncumbrance(!useEncumbrance)}
        inputLike
        isChecked={useEncumbrance}
        name="Use Encumbrance"
        size="sm"
      />
    </FormSection>
  );
}
