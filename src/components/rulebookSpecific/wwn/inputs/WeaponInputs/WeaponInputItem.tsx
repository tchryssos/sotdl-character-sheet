import { startCase } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { SelectInput } from '~/components/form/SelectInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { ATTRIBUTES } from '~/constants/wwn/game';
import { WwnCharacterData, WwnWeapon } from '~/typings/wwn/characterData';

interface WeaponInputItemProps {
  index: number;
  createWeaponFieldName: (
    name: keyof WwnWeapon,
    index: number
  ) => `weapons.${number}.${keyof WwnWeapon}`;
}

const weaponAttributeOptions: SelectOption[] = ATTRIBUTES.map((a) => ({
  label: startCase(a),
  value: a,
}));

export function WeaponInputItem({
  index,
  createWeaponFieldName,
}: WeaponInputItemProps) {
  const { watch } = useFormContext<WwnCharacterData>();

  const weaponNameFieldName = createWeaponFieldName('weapon_name', index);
  const weaponName = watch(weaponNameFieldName);

  const sectionTitle = `${weaponName}`;

  return (
    <FormSection borderless canToggleVisibility={false} title={sectionTitle}>
      <GridBox gridTemplateColumns="auto 1fr">
        <CheckboxInput<WwnCharacterData>
          label="Readied"
          name={createWeaponFieldName('weapon_readied', index)}
        />
        <TextInput<WwnCharacterData> label="Name" name={weaponNameFieldName} />
      </GridBox>
      <TextInput<WwnCharacterData>
        label="Damage"
        name={createWeaponFieldName('weapon_damage', index)}
      />
      <TextInput<WwnCharacterData>
        label="Shock"
        name={createWeaponFieldName('weapon_shock', index)}
      />
      <SelectInput<WwnCharacterData>
        label="Attribute(s)"
        maxSelected={2}
        multiple
        name={createWeaponFieldName('weapon_attribute', index)}
        options={weaponAttributeOptions}
      />
    </FormSection>
  );
}
