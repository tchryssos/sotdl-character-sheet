import { useContext } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { FormSection } from '../FormSection';
import { NumberInput } from '../NumberInput';

export const MagicInputs: React.FC = () => {
  const { watch, setValue } = useContext(ReactHookFormContext);
  const power = watch?.(FIELD_NAMES.spellPower.fieldName);
  return (
    <FormSection columns={1} title="Spells">
      <GridBox gridTemplateColumns="1fr 8fr">
        <NumberInput
          label="Power"
          min={0}
          name={FIELD_NAMES.spellPower.fieldName}
        />
        <FlexBox>
          {Object.keys(FIELD_NAMES.spellPower.castings.castingsByLevel).map(
            (level) =>
              parseInt(level, 10) <= power && (
                <NumberInput
                  key={FIELD_NAMES.spellPower.castings.castingsByLevel[level]}
                  max={power + 1 - parseInt(level, 10)}
                  min={0}
                  name={FIELD_NAMES.spellPower.castings.castingsByLevel[level]}
                />
              )
          )}
        </FlexBox>
      </GridBox>
    </FormSection>
  );
};
