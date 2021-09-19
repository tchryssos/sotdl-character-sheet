import { useContext, useEffect, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DEFAULT_VALUES, FIELD_NAMES } from '~/constants/form';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import { FateRolls } from '~/typings/form';

import { CheckboxInput } from '../CheckboxInput';
import { Label } from '../Label';

interface FateCheckboxProps {
  index: number;
  setFateRolls: (newRolls: FateRolls) => void;
  fateRolls: FateRolls;
}

const FateCheckbox: React.FC<FateCheckboxProps> = ({
  index,
  setFateRolls,
  fateRolls,
}) => {
  const isChecked = fateRolls[index];
  const onChange = () => {
    const newRolls: FateRolls = [...fateRolls];
    newRolls.splice(index, 1, !isChecked);
    setFateRolls(newRolls);
  };
  return <input checked={isChecked} type="checkbox" onChange={onChange} />;
};

export const FortuneFateInputs: React.FC = () => {
  const [fateRolls, setFateRolls] = useState<FateRolls>(
    DEFAULT_VALUES[FIELD_NAMES.fateRolls] as FateRolls
  );

  const { setValue } = useContext(ReactHookFormContext);
  const breakpoints = useContext(BreakpointsContext);

  const lessThanMd = !breakpoints.includes('md');

  useEffect(() => {
    setValue(FIELD_NAMES.fateRolls, fateRolls);
  }, [fateRolls, setValue]);

  return (
    <GridBox>
      <Label
        label={lessThanMd ? 'Fate' : 'Fate Rolls'}
        labelFor={FIELD_NAMES.fateRolls}
      >
        <FlexBox justifyContent="space-between">
          {fateRolls.map((roll, i) => (
            <FateCheckbox
              fateRolls={fateRolls}
              index={i}
              // eslint-disable-next-line react/no-array-index-key
              key={`${roll}-${i}`}
              setFateRolls={setFateRolls}
            />
          ))}
        </FlexBox>
      </Label>
      <CheckboxInput name={FIELD_NAMES.fortune} />
    </GridBox>
  );
};
