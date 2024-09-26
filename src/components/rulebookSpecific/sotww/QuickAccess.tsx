import styled from '@emotion/styled';
import { trim } from 'lodash';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { Text } from '~/components/Text';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { DefenseContext } from './DefenseProvider';

const LongEffect = styled(Text)`
  white-space: pre-line;
`;

interface QuickKeyValProps {
  label: string;
  value: string;
  longVal?: boolean;
}
function QuickKeyVal({ label, value, longVal }: QuickKeyValProps) {
  if (longVal) {
    return (
      <FlexBox flexDirection="column">
        <Text>{label}:</Text>
        <LongEffect color="textAccent" variant="body-xs">
          {value}
        </LongEffect>
      </FlexBox>
    );
  }
  return (
    <Text>
      {label}: <Text color="textAccent">{value}</Text>
    </Text>
  );
}

export function QuickAccess() {
  const { watch } = useFormContext<SotwwCharacterData>();
  const { totalDefense, recalculateDefense } = useContext(DefenseContext);

  const equippedWeapon = watch('weapons').filter((w) => w.weapon_equipped);
  const weaponText = equippedWeapon
    ? equippedWeapon
        .map((w) => `${w.weapon_name} ${w.weapon_damage}`)
        .join(' / ')
    : 'Unarmed 1d6';
  const equippedArmor = watch('armors').filter((a) => a.armor_equipped);
  const equippedArmorText = equippedArmor.map((a) => a.armor_name).join(', ');
  const damage = watch('damage');
  const health = watch('health_current');
  const conditions = watch('conditions');
  const boonBane = watch('boons_and_banes');
  const bonusDamage = watch('bonus_attack_damage');

  useEffect(() => {
    recalculateDefense();
  }, [recalculateDefense]);

  return (
    <FormSection
      borderColor="primary"
      columns={1}
      isCollapsible={false}
      title="Quick Access"
    >
      <GridBox
        gap={8}
        gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 2fr' }}
      >
        <FlexBox flexDirection="column" gap={8}>
          <QuickKeyVal label="Damage" value={`${damage}/${health}`} />
          <QuickKeyVal label="Weapon" value={weaponText} />
          {trim(bonusDamage) && (
            <QuickKeyVal label="Bonus Atk Damage" value={`+${bonusDamage}`} />
          )}
          <QuickKeyVal
            label="Defense"
            value={`${totalDefense} (${
              equippedArmorText || 'Natural Defense'
            })`}
          />
        </FlexBox>

        <GridBox columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 16 }}>
          {trim(boonBane) && (
            <QuickKeyVal label="Boons/Banes" longVal value={boonBane} />
          )}
          {trim(conditions) && (
            <QuickKeyVal label="Conditions" longVal value={conditions} />
          )}
        </GridBox>
      </GridBox>
    </FormSection>
  );
}
