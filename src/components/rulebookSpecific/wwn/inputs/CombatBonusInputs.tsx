import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { RpgIcons } from '~/constants/icons';
import { WwnCharacterData } from '~/typings/wwn/characterData';

export function CombatBonusInputs() {
  return (
    <FormSection icon={RpgIcons.MirrorSword} title="Combat Bonuses">
      <NumberInput<WwnCharacterData>
        label="Base Attack Bonus"
        name="attack_bonus_base"
      />
      <NumberInput<WwnCharacterData>
        label="Melee Attack Bonus"
        name="attack_bonus_melee"
      />
      <NumberInput<WwnCharacterData>
        label="Ranged Attack Bonus"
        name="attack_bonus_ranged"
      />
      <NumberInput<WwnCharacterData>
        label="Initiative Bonus"
        name="initiative_bonus"
      />
    </FormSection>
  );
}
