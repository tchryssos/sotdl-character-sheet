import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export function AttackBonusInput() {
  return (
    <FormSection columns={1} icon={RpgIcons.MirrorSword} title="Attack Bonus">
      <Text as="p" variant="body-xs">
        Your attack bonus is generally equal to half your level rounded down,
        unless you have the &quot;On Target&quot; Edge, in which case it is your
        full character level.
      </Text>
      <NumberInput<CwnCharacterData> name="attack_bonus" />
    </FormSection>
  );
}
