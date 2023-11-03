import { useTheme } from '@emotion/react';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

export function DefenseInputs() {
  const { isEditMode } = useContext(EditContext);
  const { watch } = useFormContext<SotwwCharacterData>();
  const theme = useTheme();

  const maxHealth = watch('health_max');
  return (
    <FormSection columns={2} icon={RpgIcons.HeartShield} title="Defenses">
      {isEditMode && (
        <NumberInput<SotwwCharacterData>
          label="Max Health"
          min={0}
          name="health_max"
        />
      )}

      <FlexBox flexDirection="column" gap={4}>
        <NumberInput<SotwwCharacterData>
          alwaysEditable
          label="Health"
          max={parseInt(String(maxHealth), 10)}
          name="health_current"
        />
        {!isEditMode && (
          <Text color={theme.colors.textAccent} variant="body-xs">
            {`(Max Health: ${maxHealth})`}
          </Text>
        )}
      </FlexBox>
      <NumberInput<SotwwCharacterData> alwaysEditable name="damage" />
      <NumberInput<SotwwCharacterData> name="defense" />
    </FormSection>
  );
}
