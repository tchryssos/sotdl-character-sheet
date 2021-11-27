import styled from '@emotion/styled';
import { useContext, useEffect, useRef } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { TextButton } from '~/components/buttons/TextButton';
import { AddAnotherButton } from '~/components/form/AddAnotherButton';
import { Label } from '~/components/form/Label';
import { SubBody } from '~/components/typography/SubBody';
import { SHY } from '~/constants/characterEntities';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FormSection } from '../../form/FormSection';
import { NumberInput } from '../../form/NumberInput';
import { TextAreaInput } from '../../form/TextAreaInput';

const powersTemplateColumns = '1fr 8fr';

const MagicSectionLabel = styled(SubBody)`
  margin-top: ${({ theme }) => theme.spacing[8]};
  ${({ theme }) => theme.breakpoints.sm} {
    margin-top: 0;
  }
`;

// parseInt(level, 10) <= power
const CastingsByLevel: React.FC = () => {
  const initialized = useRef(false);
  const { control } = useForm();
  const { watch, setValue } = useFormContext();
  const { isEditMode } = useContext(EditContext);
  const castings: { value: string }[] = watch(
    FIELD_NAMES.spellPower.castings.fieldName
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_NAMES.spellPower.castings.fieldName,
  });
  const isAtLeastSm = useBreakpointsAtLeast('sm');
  const isAtLeastMd = useBreakpointsAtLeast('md');

  useEffect(() => {
    if (castings && castings.length > fields.length && !initialized.current) {
      append(castings);
      initialized.current = true;
    }
  }, [castings, append, fields]);

  let columns = 4;
  if (isAtLeastSm) {
    columns = 6;
  }
  if (isAtLeastMd) {
    columns = 8;
  }

  const onRemove = () => {
    remove(fields.length - 1);
    const nextCastings = [...castings];
    nextCastings.pop();
    setValue(FIELD_NAMES.spellPower.castings.fieldName, nextCastings);
  };

  return (
    <GridBox alignItems="end" gridTemplateColumns={`repeat(${columns}, 1fr)`}>
      {fields?.map((field, i) => (
        <NumberInput
          key={field.id}
          label={`Lvl ${i}`}
          min={0}
          name={`${FIELD_NAMES.spellPower.castings.fieldName}.${i}.value`}
        />
      ))}
      {fields.length <= 10 && isEditMode && (
        <AddAnotherButton includeLabel onClick={() => append({ value: '0' })} />
      )}
      {fields.length && isEditMode && (
        <AddAnotherButton includeLabel label="-" onClick={onRemove} />
      )}
    </GridBox>
  );
};

const SpellsByLevel = () => {
  const { control } = useForm();
  const fields = useFieldArray({
    control,
    name: FIELD_NAMES.spells.fieldName,
  });
  return null;
};

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
          label={isLessThanSm ? 'Power' : SHY}
          min={0}
          name={FIELD_NAMES.spellPower.fieldName}
        />
        <FlexBox column>
          {isLessThanSm && (
            <MagicSectionLabel bold mb={8}>
              Castings by Level
            </MagicSectionLabel>
          )}
          <CastingsByLevel />
        </FlexBox>
      </GridBox>
      {/* <MagicSectionLabel bold>Spells by Level</MagicSectionLabel>
      <GridBox>
        {Object.keys(FIELD_NAMES.spells.spellsByLevel).map(
          (level) =>
            parseInt(level, 10) <= power && (
              <TextAreaInput
                key={FIELD_NAMES.spells.spellsByLevel[level]}
                label={`Lvl ${level}`}
                name={FIELD_NAMES.spells.spellsByLevel[level]}
              />
            )
        )}
      </GridBox> */}
    </FormSection>
  );
};
