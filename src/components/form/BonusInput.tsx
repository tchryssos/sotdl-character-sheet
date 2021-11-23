import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FlexBox } from '../box/FlexBox';
import { Body } from '../typography/Body';
import { NumberInput, NumberInputComponentProps } from './NumberInput';

type BonusInputProps = NumberInputComponentProps & {
  name: string;
  bonusCalculationFn: (value: number) => number;
};

const AttributeWrapper = styled.div`
  position: relative;
`;

const BonusWrapper = styled(FlexBox)`
  position: absolute;
  min-width: 33%;
  height: 100%;
  right: 0;
  bottom: 0;
  /* Odd padding b/c of input 1px border */
  padding-bottom: ${pxToRem(11)};
`;

const BonusAligner = styled(FlexBox)``;

const Bar = styled.span`
  user-select: none;
`;

export const BonusInput: React.FC<BonusInputProps> = ({
  name,
  bonusCalculationFn,
  ...rest
}) => {
  const { watch } = useFormContext();
  let mainValue: number = watch(name);
  mainValue = parseInt(`${mainValue || 10}`, 10);

  const bonus = bonusCalculationFn(mainValue);
  const bonusIsPositive = bonus >= 0;

  return (
    <AttributeWrapper>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <NumberInput name={name} {...rest} />
      <BonusWrapper alignItems="flex-end" pr={8}>
        <BonusAligner center>
          <Body>
            <Bar>|</Bar>
            {` ${bonusIsPositive ? '+' : '-'}${String(Math.abs(bonus))}`}
          </Body>
        </BonusAligner>
      </BonusWrapper>
    </AttributeWrapper>
  );
};
