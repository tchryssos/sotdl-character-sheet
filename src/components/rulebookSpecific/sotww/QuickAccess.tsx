import styled from '@emotion/styled';
import { trim } from 'lodash';
import { useContext } from 'react';
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

export function QuickAccess() {
  const { watch } = useFormContext<SotwwCharacterData>();
  const { totalDefense } = useContext(DefenseContext);

  const weapons = watch('weapons');
  const equippedWeapon = weapons.find((w) => w.weapon_equipped);
  const damage = watch('damage');
  const health = watch('health_current');
  const conditions = watch('conditions');
  const boonBane = watch('boons_and_banes');

  return (
    <FormSection columns={1} isCollapsible={false} title="Quick Access">
      <GridBox
        gap={8}
        gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 2fr' }}
      >
        <FlexBox flexDirection="column" gap={8}>
          <Text>
            Damage:{' '}
            <Text color="textAccent">
              {damage}/{health}
            </Text>
          </Text>
          {equippedWeapon && (
            <Text>
              Weapon:{' '}
              <Text color="textAccent">
                {equippedWeapon.weapon_name} {equippedWeapon.weapon_damage}
              </Text>
            </Text>
          )}
          <Text>
            Defense: <Text color="textAccent">{totalDefense}</Text>
          </Text>
        </FlexBox>

        <GridBox columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 16 }}>
          {trim(boonBane) && (
            <FlexBox flexDirection="column">
              <Text>Boons/Banes:</Text>
              <LongEffect color="textAccent" variant="body-xs">
                {boonBane}
              </LongEffect>
            </FlexBox>
          )}
          {trim(conditions) && (
            <FlexBox flexDirection="column">
              <Text>Conditions:</Text>
              <LongEffect color="textAccent" variant="body-xs">
                {conditions}
              </LongEffect>
            </FlexBox>
          )}
        </GridBox>
      </GridBox>
    </FormSection>
  );
}
