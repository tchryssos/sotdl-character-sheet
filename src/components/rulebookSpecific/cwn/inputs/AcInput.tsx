import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { NumberInput } from '~/components/form/NumberInput';
import { Text } from '~/components/Text';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { AcContext, acDescriptionBreakChar } from '../AcProvider';

const DescriptionText = styled(Text)`
  display: grid;
  grid-template-columns: 1fr;
`;

interface AcListProps {
  acDescription: string;
}

function AcList({ acDescription }: AcListProps) {
  return (
    <DescriptionText color="textAccent" variant="body-xs">
      {acDescription.split(acDescriptionBreakChar).map((t) => (
        <span key={t}>{t}</span>
      ))}
    </DescriptionText>
  );
}

export function AcInput() {
  const { rangedAc, meleeAc, acDescriptions } = useContext(AcContext);
  const { setValue } = useFormContext<CwnCharacterData>();

  useEffect(() => {
    setValue('armor_class_ranged', rangedAc);
  }, [rangedAc, setValue]);

  useEffect(() => {
    setValue('armor_class_melee', meleeAc);
  }, [meleeAc, setValue]);

  return (
    <FlexBox flexDirection="column" gap={4}>
      <GridBox columns={2}>
        <FlexBox flexDirection="column" gap={8}>
          <NumberInput<CwnCharacterData>
            label="Melee"
            name="armor_class_melee"
            readOnly
          />
          <AcList acDescription={acDescriptions.melee} />
        </FlexBox>
        <FlexBox flexDirection="column" gap={8}>
          <NumberInput<CwnCharacterData>
            label="Ranged"
            name="armor_class_ranged"
            readOnly
          />
          <AcList acDescription={acDescriptions.ranged} />
        </FlexBox>
      </GridBox>
    </FlexBox>
  );
}
