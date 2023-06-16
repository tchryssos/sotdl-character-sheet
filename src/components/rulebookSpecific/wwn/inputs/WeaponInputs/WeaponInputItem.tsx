import { startCase, toUpper } from 'lodash';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { Pill } from '~/components/Pill';
import { Text } from '~/components/Text';
import { RpgIcons } from '~/constants/icons';
import { ATTRIBUTES, WEAPON_TRAITS, WeaponTrait } from '~/constants/wwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData, WwnWeapon } from '~/typings/wwn/characterData';

interface WeaponInputItemProps {
  index: number;
  createWeaponFieldName: (
    name: keyof WwnWeapon,
    index: number
  ) => `weapons.${number}.${keyof WwnWeapon}`;
  onDelete: (index: number) => void;
}

const weaponAttributeOptions: SelectOption[] = ATTRIBUTES.map((a) => ({
  label: startCase(a),
  value: a,
}));

const weaponTraitsOptions: SelectOption[] = WEAPON_TRAITS.map((t) => ({
  label: toUpper(t),
  value: t,
}));

interface WeaponTraitsDisplayProps {
  name: string;
}

function WeaponTraitsDisplay({ name }: WeaponTraitsDisplayProps) {
  const { watch } = useFormContext();

  const weaponTraits: string[] = watch(name);

  if (!weaponTraits.length) {
    return <Text variant="body-sm">None</Text>;
  }

  return (
    <FlexBox gap={8} marginTop={8}>
      {weaponTraits.map((v) => (
        <Pill key={v} text={toUpper(v)} />
      ))}
    </FlexBox>
  );
}

export function WeaponInputItem({
  index,
  createWeaponFieldName,
  onDelete,
}: WeaponInputItemProps) {
  const { watch } = useFormContext<WwnCharacterData>();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const { isEditMode } = useContext(EditContext);

  const weaponNameFieldName = createWeaponFieldName('weapon_name', index);
  const weaponName = watch(weaponNameFieldName);

  const weaponDamageFieldName = createWeaponFieldName('weapon_damage', index);
  const weaponDamage = watch(weaponDamageFieldName);

  const weaponTraitsFieldName = createWeaponFieldName('weapon_traits', index);
  const weaponTraits = watch(weaponTraitsFieldName) as WeaponTrait[];

  const weaponReadiedFieldName = createWeaponFieldName('weapon_readied', index);
  const weaponReadied = watch(weaponReadiedFieldName);

  const sectionTitle = `${weaponName}, ${weaponDamage}${
    weaponTraits.length && !isLessThanSm
      ? ` (${weaponTraits.map((t) => toUpper(t)).join(', ')})`
      : ''
  }`;

  return (
    <FormSection
      borderless
      canToggleVisibility={false}
      columns={isLessThanSm ? 1 : 2}
      icon={weaponReadied ? RpgIcons.TriangleFlagSm : undefined}
      title={sectionTitle}
      visibilityTitle={`weapon${index}`}
    >
      <GridBox columns={1}>
        <GridBox gridTemplateColumns="auto 1fr">
          <CheckboxInput<WwnCharacterData>
            label="Readied"
            name={weaponReadiedFieldName}
          />
          <TextInput<WwnCharacterData>
            label="Name"
            name={weaponNameFieldName}
          />
        </GridBox>
        {isLessThanSm && (
          <TextAreaInput<WwnCharacterData>
            label="Description"
            name={createWeaponFieldName('weapon_description', index)}
          />
        )}
        <GridBox columns={isLessThanSm ? 1 : 2}>
          <TextInput<WwnCharacterData>
            label="Damage"
            name={weaponDamageFieldName}
          />
          <TextInput<WwnCharacterData>
            label="Shock"
            name={createWeaponFieldName('weapon_shock', index)}
          />
        </GridBox>
        <GridBox columns={isLessThanSm ? 1 : 2}>
          <SelectInput<WwnCharacterData>
            label="Attribute(s)"
            maxSelected={2}
            multiple
            name={createWeaponFieldName('weapon_attribute', index)}
            options={weaponAttributeOptions}
          />
          <SelectInput<WwnCharacterData>
            MultiDisplayComponent={WeaponTraitsDisplay}
            label="Traits"
            multiple
            name={weaponTraitsFieldName}
            options={weaponTraitsOptions}
          />
        </GridBox>
        <GridBox>
          <NumberInput<WwnCharacterData>
            label="Encumbrance"
            min={0}
            name={createWeaponFieldName('weapon_encumbrance', index)}
          />
        </GridBox>
      </GridBox>
      {!isLessThanSm && (
        <TextAreaInput<WwnCharacterData>
          label="Description"
          name={createWeaponFieldName('weapon_description', index)}
        />
      )}
      {isEditMode && (
        <FlexBox
          gridColumnEnd={3}
          gridColumnStart={1}
          justifyContent="flex-end"
        >
          <DeleteButton onDelete={() => onDelete(index)} />
        </FlexBox>
      )}
    </FormSection>
  );
}
