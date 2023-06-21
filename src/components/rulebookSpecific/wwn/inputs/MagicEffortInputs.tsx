import styled from '@emotion/styled';
import { upperFirst } from 'lodash';
import { ComponentProps, PropsWithChildren, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { BaseButton } from '~/components/buttons/BaseButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { Label } from '~/components/form/Label';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { EFFORT_STATUSES } from '~/constants/wwn/game';
import { Color } from '~/typings/theme';
import { WwnCharacterData, WwnEffort } from '~/typings/wwn/characterData';

interface MagicEffortInputProps {
  index: number;
}

const EffortButton = styled(BaseButton)`
  height: ${({ theme }) => theme.spacing[48]};
  width: ${({ theme }) => theme.spacing[64]};
`;

const createEffortFieldName = (
  name: keyof WwnEffort,
  index: number
): `magic_efforts.${number}.${keyof WwnEffort}` =>
  `magic_efforts.${index}.${name}`;

function MagicEffortInput({ index }: MagicEffortInputProps) {
  const { register, watch, setValue } = useFormContext<WwnCharacterData>();

  const effortStatusFieldName = createEffortFieldName('effort_status', index);
  const effortValue = watch(effortStatusFieldName);

  useEffect(() => {
    register(effortStatusFieldName);
  }, [register, effortStatusFieldName]);

  const onToggleEffort = () => {
    const effortIndex = EFFORT_STATUSES.indexOf(effortValue);
    let nextIdx = effortIndex + 1;
    if (nextIdx >= EFFORT_STATUSES.length) {
      nextIdx = 0;
    }
    setValue(effortStatusFieldName, EFFORT_STATUSES[nextIdx]);
  };

  let severity: ComponentProps<typeof EffortButton>['severity'] = 'normal';
  let color: Color = 'text';
  switch (effortValue) {
    case 'day':
      severity = 'danger';
      break;
    case 'scene':
    case 'indefinite':
      severity = 'warning';
      color = 'background';
      break;
    case 'ready':
    default:
      severity = 'normal';
      break;
  }

  // "Indefinite" makes the buttons too wide, so we cut it off
  // at 5 chars, which fits "ready" and "scene"
  const label = upperFirst(effortValue.slice(0, 5));

  return (
    <EffortButton
      severity={severity}
      title={`Effort Status: ${upperFirst(effortValue)}`}
      transparent={severity === 'normal'}
      onClick={onToggleEffort}
    >
      <Text color={color} variant="body-sm">
        {label}
      </Text>
    </EffortButton>
  );
}

function EffortChildrenWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <Label label="Effort Statuses">
      <FlexBox flexWrap="wrap" gap={8} marginTop={8}>
        {children}
      </FlexBox>
    </Label>
  );
}

const createDefaultEffort = (): WwnEffort => ({
  effort_status: 'ready',
});

export function MagicEffortInputs() {
  return (
    <FormSection columns={1} icon={RpgIcons.CastingHand} title="Efforts">
      <AddAnotherMultiField<WwnCharacterData>
        ChildWrapper={EffortChildrenWrapper}
        createDefaultValue={createDefaultEffort}
        parentFieldName="magic_efforts"
        simpleDelete
      >
        {({ index, fieldId }) => (
          <MagicEffortInput index={index} key={fieldId} />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
