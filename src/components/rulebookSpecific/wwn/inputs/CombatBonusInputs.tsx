import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData } from '~/typings/wwn/characterData';

const makeAtkLabel = (name: string, truncate: boolean) =>
  `${name} ${truncate ? 'Atk' : 'Attack'} Bonus`;

export function CombatBonusInputs() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  const atLeastLg = useBreakpointsAtLeast('lg');
  return (
    <FormSection
      columns={isLessThanSm ? 1 : 2}
      icon={RpgIcons.MirrorSword}
      title="Combat Bonuses"
    >
      <NumberInput<WwnCharacterData>
        label={makeAtkLabel('Base', !atLeastLg)}
        name="attack_bonus_base"
      />
      <NumberInput<WwnCharacterData>
        label={makeAtkLabel('Melee', !atLeastLg)}
        name="attack_bonus_melee"
      />
      <NumberInput<WwnCharacterData>
        label={makeAtkLabel('Ranged', !atLeastLg)}
        name="attack_bonus_ranged"
      />
      <NumberInput<WwnCharacterData>
        label="Initiative Bonus"
        name="initiative_bonus"
      />
    </FormSection>
  );
}
