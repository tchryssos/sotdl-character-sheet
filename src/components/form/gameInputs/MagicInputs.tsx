import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { SubBody } from '~/components/typography/SubBody';
import { FIELD_NAMES } from '~/constants/form';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';
import { TextAreaInput } from '../TextAreaInput';

const powersTemplateColumns = '1fr 8fr';

const MagicSectionLabel = styled(SubBody)`
  margin-top: ${({ theme }) => theme.spacing[8]};
  ${({ theme }) => theme.breakpoints.sm} {
    margin-top: 0;
  }
`;

export const MagicInputs: React.FC = () => {
  const { watch } = useFormContext();
  const isLessThanSm = useBreakpointsLessThan('sm');
  let power: number = watch(FIELD_NAMES.spellPower.fieldName);
  power = parseInt(`${power || 0}`, 10);

  return (
    <FormSection columns={1} isCollapsable title="Spells">
      {!isLessThanSm && (
        <GridBox gridTemplateColumns={powersTemplateColumns}>
          <SubBody bold>Power</SubBody>
          <SubBody bold>Castings by Level</SubBody>
        </GridBox>
      )}
      <GridBox
        gridTemplateColumns={isLessThanSm ? '100%' : powersTemplateColumns}
      >
        <NumberInput
          label={isLessThanSm ? 'Power' : '\u00A0'}
          min={0}
          name={FIELD_NAMES.spellPower.fieldName}
        />
        <FlexBox column>
          {isLessThanSm && (
            <MagicSectionLabel bold mb={8}>
              Castings by Level
            </MagicSectionLabel>
          )}
          <GridBox
            gridTemplateColumns={
              isLessThanSm ? 'repeat(4, 1fr)' : 'repeat(11, 1fr)'
            }
          >
            {Object.keys(FIELD_NAMES.spellPower.castings.castingsByLevel).map(
              (level) =>
                parseInt(level, 10) <= power && (
                  <NumberInput
                    key={FIELD_NAMES.spellPower.castings.castingsByLevel[level]}
                    label={`Lvl ${level}`}
                    max={power + 1 - parseInt(level, 10)}
                    min={0}
                    name={
                      FIELD_NAMES.spellPower.castings.castingsByLevel[level]
                    }
                  />
                )
            )}
          </GridBox>
        </FlexBox>
      </GridBox>
      <MagicSectionLabel bold>Spells by Level</MagicSectionLabel>
      <GridBox>
        {Object.keys(FIELD_NAMES.spellPower.castings.castingsByLevel).map(
          (level) =>
            parseInt(level, 10) <= power && (
              <TextAreaInput
                key={FIELD_NAMES.spells.spellsByLevel[level]}
                label={`Lvl ${level}`}
                name={FIELD_NAMES.spellPower.castings.castingsByLevel[level]}
              />
            )
        )}
      </GridBox>
    </FormSection>
  );
};
