import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FlexBox } from '../box/FlexBox';
import { Body } from '../typography/Body';
import { NumberInput, NumberInputComponentProps } from './NumberInput';

type BonusInputProps<T> = NumberInputComponentProps<T> & {
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
  /* Dodges number up/down buttons on FF and Safari */
  right: ${({ theme }) => theme.spacing[16]};
  bottom: 0;
  /* Odd # because of 1px border on input */
  padding-bottom: ${pxToRem(11)};
`;

const BonusText = styled(Body)`
  /* Centers the text and bar at exactly the text height */
  line-height: 0;
`;

const Bar = styled.div`
  width: 2px;
  height: ${({ theme }) => theme.fontSize.body};
  background-color: ${({ theme }) => theme.colors.text};
`;

export function BonusInput<T extends Record<string, unknown>>({
  name,
  bonusCalculationFn,
  ...rest
}: BonusInputProps<T>) {
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
        <FlexBox center gap={8}>
          <Bar />
          <BonusText>
            {` ${bonusIsPositive ? '+' : '-'}${String(Math.abs(bonus))}`}
          </BonusText>
        </FlexBox>
      </BonusWrapper>
    </AttributeWrapper>
  );
}
