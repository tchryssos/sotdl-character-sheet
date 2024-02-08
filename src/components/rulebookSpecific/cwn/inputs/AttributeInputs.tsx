import { startCase } from 'lodash';

import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { ATTRIBUTES } from '~/constants/wwn/game';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { CwnCharacterData } from '~/typings/cwn/characterData';

import { BonusInput } from '../../../form/BonusInput';
import { NumberInputProps } from '../../../form/typings';
// import { AcContext } from '../AcProvider';

type AttributeInputProps<T> = Omit<NumberInputProps<T>, 'type' | 'name'> & {
  name: keyof Pick<
    CwnCharacterData,
    | 'attribute_charisma'
    | 'attribute_constitution'
    | 'attribute_dexterity'
    | 'attribute_intelligence'
    | 'attribute_strength'
    | 'attribute_wisdom'
  >;
};

function AttributeInput<T extends Record<string, unknown>>({
  name,
}: AttributeInputProps<T>) {
  const label = startCase(name.split('_')[1] || name);

  return (
    <BonusInput
      bonusCalculationFn={calcAttributeBonus}
      label={label}
      max={18}
      min={0}
      name={name}
    />
  );
}

export function AttributeInputs() {
  const isLessThanXs = useBreakpointsLessThan('xs');

  // const { watch } = useFormContext<CwnCharacterData>();
  // const dexterity = watch('attribute_dexterity');

  // const { calculateAc } = useContext(AcContext);

  // useEffect(() => {
  //   calculateAc();
  // }, [dexterity, calculateAc]);

  return (
    <FormSection
      columns={isLessThanXs ? 2 : 3}
      icon={RpgIcons.Brain}
      title="Attributes"
    >
      {ATTRIBUTES.map((a) => (
        <AttributeInput key={a} name={`attribute_${a}`} />
      ))}
    </FormSection>
  );
}
