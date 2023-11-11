import styled from '@emotion/styled';
import { startCase } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '../box/FlexBox';
import { Text } from '../Text';
import { Pill } from './Pill';

const TraitPill = styled(Pill)`
  min-width: ${({ theme }) => theme.spacing[24]};
  text-align: center;
`;

interface PropertyPillProps {
  name: string;
}

export function PropertyPills({ name }: PropertyPillProps) {
  const { watch } = useFormContext();
  const weaponProperties: string[] = watch(name);

  if (!weaponProperties.length) {
    return <Text variant="body-sm">None</Text>;
  }

  return (
    <FlexBox flexWrap="wrap" gap={8} marginTop={8}>
      {weaponProperties.map((p) => (
        <TraitPill key={p} text={startCase(p)} />
      ))}
    </FlexBox>
  );
}
