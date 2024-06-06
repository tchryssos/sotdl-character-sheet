import { useTheme } from '@emotion/react';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export function HealthInputs() {
  const { isEditMode } = useContext(EditContext);

  const theme = useTheme();

  const { watch } = useFormContext<CwnCharacterData>();
  const maxHealth = guaranteeNumberValue(watch('health_max'));
  const maxStrain = guaranteeNumberValue(watch('system_strain_max'));
  const maxDamageSoak = guaranteeNumberValue(watch('damage_soak_max'));

  return (
    <FormSection icon={RpgIcons.HeartGuy} title="Health">
      {isEditMode && (
        <NumberInput<CwnCharacterData>
          label="Max HP"
          min={0}
          name="health_max"
        />
      )}
      <GridBox>
        <FlexBox flexDirection="column" gap={4}>
          <NumberInput<CwnCharacterData>
            alwaysEditable
            label="Current HP"
            min={0}
            name="health_current"
          />
          {!isEditMode && (
            <Text color={theme.colors.textAccent} variant="body-xs">
              {`(Max Health: ${maxHealth})`}
            </Text>
          )}
        </FlexBox>
        <FlexBox flexDirection="column" gap={4}>
          <NumberInput<CwnCharacterData>
            alwaysEditable
            label="Damage Soak"
            max={maxDamageSoak}
            min={0}
            name="damage_soak_current"
          />
          <Text color={theme.colors.textAccent} variant="body-xs">
            {`(Max Damage Soak: ${maxDamageSoak})`}
          </Text>
        </FlexBox>
      </GridBox>
      {isEditMode && (
        <NumberInput<CwnCharacterData>
          label="Max System Strain"
          min={0}
          name="system_strain_max"
        />
      )}
      <FlexBox flexDirection="column" gap={4}>
        <NumberInput<CwnCharacterData>
          alwaysEditable
          label="System Strain"
          max={maxStrain}
          min={0}
          name="system_strain_current"
        />
        {!isEditMode && (
          <Text color={theme.colors.textAccent} variant="body-xs">
            {`(Max System Strain: ${maxStrain})`}
          </Text>
        )}
      </FlexBox>
    </FormSection>
  );
}
