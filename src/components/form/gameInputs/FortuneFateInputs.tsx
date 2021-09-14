import { useContext, useEffect, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { DEFAULT_VALUES, FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';
import { FateRolls } from '~/typings/form';

import { CheckboxInput } from '../CheckboxInput';

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

  useEffect(() => {
    setValue(FIELD_NAMES.fateRolls, fateRolls);
  }, [fateRolls, setValue]);

  return (
    <GridBox>
      <GridBox columnGap={4} columns={3}>
        {fateRolls.map((roll, i) => (
          <FateCheckbox
            fateRolls={fateRolls}
            index={i}
            // eslint-disable-next-line react/no-array-index-key
            key={`${roll}-${i}`}
            setFateRolls={setFateRolls}
          />
        ))}
      </GridBox>
      <CheckboxInput name={FIELD_NAMES.fortune} />
    </GridBox>
  );
};
