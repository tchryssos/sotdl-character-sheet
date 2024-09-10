import styled from '@emotion/styled';
import { startCase } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { Tooltip } from '~/components/Tooltip';
import { WEAPON_TRAITS } from '~/constants/sotww/game';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { FlexBox } from '../../../../box/FlexBox';
import { Pill } from '../../../../pills/Pill';
import { Text } from '../../../../Text';

export const TraitPill = styled(Pill)`
  min-width: ${({ theme }) => theme.spacing[24]};
  text-align: center;
`;

export interface PropertyPillProps {
  name: string;
}

export function PropertyPills({ name }: PropertyPillProps) {
  const { watch } = useFormContext<SotwwCharacterData>();
  const weaponProperties = watch(name as `weapons.${number}.weapon_traits`);

  if (!weaponProperties.length) {
    return <Text variant="body-sm">None</Text>;
  }

  return (
    <FlexBox flexWrap="wrap" gap={8} marginTop={8}>
      {weaponProperties.map((p) => {
        const tipId = `${p}-trait-tip`;
        return (
          <Tooltip id={tipId} isLabeled key={p} tipText={WEAPON_TRAITS[p]}>
            <TraitPill text={startCase(p)} />
          </Tooltip>
        );
      })}
    </FlexBox>
  );
}
