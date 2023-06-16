import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData } from '~/typings/wwn/characterData';

const makeAtkLabel = (name: string, lessThanMd: boolean) =>
  `${name} ${lessThanMd ? 'Atk' : 'Attack'} Bonus`;

export function CombatBonusInputs() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanMd = useBreakpointsLessThan('md');
  return (
    <FormSection
      columns={isLessThanSm ? 1 : 2}
      icon={RpgIcons.MirrorSword}
      title="Combat Bonuses"
    >
      <NumberInput<WwnCharacterData>
        label={makeAtkLabel('Base', isLessThanMd)}
        name="attack_bonus_base"
      />
      <NumberInput<WwnCharacterData>
        label={makeAtkLabel('Melee', isLessThanMd)}
        name="attack_bonus_melee"
      />
      <NumberInput<WwnCharacterData>
        label={makeAtkLabel('Ranged', isLessThanMd)}
        name="attack_bonus_ranged"
      />
      <NumberInput<WwnCharacterData>
        label="Initiative Bonus"
        name="initiative_bonus"
      />
    </FormSection>
  );
}
