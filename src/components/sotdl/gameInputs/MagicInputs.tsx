import styled from '@emotion/styled';
import { useContext, useEffect, useRef } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { AddAnotherButton } from '~/components/form/AddAnotherButton';
import { SubBody } from '~/components/typography/SubBody';
import { SHY } from '~/constants/characterEntities';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';

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
const Inputs: React.FC = () => {
  const initialized = useRef(false);

  const { control } = useForm();
  const { watch, setValue } = useFormContext();
  const castings: { value: string }[] = watch(
    FIELD_NAMES.spellPower.castings.fieldName
  );
  const spells: { value: string }[] = watch(FIELD_NAMES.spells.fieldName);
  const {
    fields: castingsFields,
    append: appendCastings,
    remove: removeCastings,
  } = useFieldArray({
    control,
    name: FIELD_NAMES.spellPower.castings.fieldName,
  });
  const {
    fields: spellsFields,
    append: appendSpells,
    remove: removeSpells,
  } = useFieldArray({
    control,
    name: FIELD_NAMES.spells.fieldName,
  });

  const { isEditMode } = useContext(EditContext);

  const isAtLeastSm = useBreakpointsAtLeast('sm');
  const isAtLeastMd = useBreakpointsAtLeast('md');
  const isLessThanSm = useBreakpointsLessThan('sm');

  useEffect(() => {
    if (
      castings &&
      castings.length > castingsFields.length &&
      !initialized.current
    ) {
      appendCastings(castings);
      appendSpells(castings.map((_c, i) => spells[i]));
      initialized.current = true;
    }
  }, [castings, appendCastings, castingsFields, spells, appendSpells]);

  const onAdd = () => {
    appendCastings({ value: '0' });
    appendSpells({ values: '' });
  };

  const onRemove = () => {
    removeCastings(castingsFields.length - 1);
    const nextCastings = [...castings];
    nextCastings.pop();
    setValue(FIELD_NAMES.spellPower.castings.fieldName, nextCastings);

    removeSpells(spellsFields.length - 1);
    const nextSpells = [...spells];
    nextSpells.pop();
    setValue(FIELD_NAMES.spells.fieldName, nextSpells);
  };

  let columns = 4;
  if (isAtLeastSm) {
    columns = 6;
  }
  if (isAtLeastMd) {
    columns = 8;
  }

  return (
    <>
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
          <GridBox gridTemplateColumns={`repeat(${columns}, 1fr)`}>
            {castingsFields?.map((cField, i) => (
              <NumberInput
                key={cField.id}
                label={`Lvl ${i}`}
                min={0}
                name={`${FIELD_NAMES.spellPower.castings.fieldName}.${i}.value`}
              />
            ))}
            {castingsFields.length <= 10 && isEditMode && (
              <AddAnotherButton includeLabel onClick={onAdd} />
            )}
            {Boolean(castingsFields.length) && isEditMode && (
              <AddAnotherButton includeLabel label="-" onClick={onRemove} />
            )}
          </GridBox>
        </FlexBox>
      </GridBox>
      <GridBox>
        {spellsFields.map((sField, i) => (
          <TextAreaInput
            key={sField.id}
            label={`Lvl ${i}`}
            name={`${FIELD_NAMES.spells.fieldName}.${i}.value`}
          />
        ))}
      </GridBox>
    </>
  );
};

export const MagicInputs: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');

  return (
    <FormSection columns={1} isCollapsable title="Spells">
      {!isLessThanSm && (
        <GridBox gridTemplateColumns={powersTemplateColumns}>
          <SubBody bold>Power</SubBody>
          <SubBody bold>Castings by Level</SubBody>
        </GridBox>
      )}
      <Inputs />
    </FormSection>
  );
};
