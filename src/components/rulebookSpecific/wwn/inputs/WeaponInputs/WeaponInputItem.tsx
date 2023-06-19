import styled from '@emotion/styled';
import { startCase, toUpper } from 'lodash';
import { useContext, useEffect } from 'react';
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
import { ATTRIBUTES, WEAPON_TRAITS, WeaponTrait } from '~/constants/wwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { WwnCharacterData, WwnWeapon } from '~/typings/wwn/characterData';

import { EncumbranceContext } from '../../EncumbranceProvider';

const TraitPill = styled(Pill)`
  min-width: ${({ theme }) => theme.spacing[24]};
  text-align: center;
`;

interface WeaponInputItemProps {
  index: number;
  onDelete: (index: number) => void;
  hideUnreadied: boolean;
}

const createWeaponFieldName = (
  name: keyof WwnWeapon,
  index: number
): `weapons.${number}.${keyof WwnWeapon}` => `weapons.${index}.${name}`;

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
  const { watch } = useFormContext<WwnCharacterData>();

  const weaponTraits = watch(name as `weapons.${number}.weapon_traits`);

  if (!weaponTraits.length) {
    return <Text variant="body-sm">None</Text>;
  }

  return (
    <FlexBox flexWrap="wrap" gap={8} marginTop={8}>
      {weaponTraits.map((v) => (
        <TraitPill key={v} text={toUpper(v)} />
      ))}
    </FlexBox>
  );
}

function WeaponAttributeDisplay({ name }: WeaponTraitsDisplayProps) {
  const { watch } = useFormContext<WwnCharacterData>();

  const weaponAttributes = watch(name as `weapons.${number}.weapon_attribute`);

  return (
    <FlexBox flexWrap="wrap" gap={8} marginTop={8}>
      {weaponAttributes.map((a) => {
        const attributeScore = watch(`attribute_${a}`);

        // "Strength (+2)"
        const pillText = `${startCase(a)} (${
          attributeScore >= 0 ? '+' : ''
        }${calcAttributeBonus(attributeScore)})`;

        return <Pill key={a} text={pillText} />;
      })}
    </FlexBox>
  );
}

export function WeaponInputItem({
  index,
  onDelete,
  hideUnreadied,
}: WeaponInputItemProps) {
  const { watch } = useFormContext<WwnCharacterData>();
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isXxs = useBreakpointsLessThan('xs');
  const { isEditMode } = useContext(EditContext);
  const { calculateEncumbrances } = useContext(EncumbranceContext);

  const weaponNameFieldName = createWeaponFieldName('weapon_name', index);
  const weaponName = watch(weaponNameFieldName);

  const weaponDamageFieldName = createWeaponFieldName('weapon_damage', index);
  const weaponDamage = watch(weaponDamageFieldName);

  const weaponTraitsFieldName = createWeaponFieldName('weapon_traits', index);
  const weaponTraits = watch(weaponTraitsFieldName) as WeaponTrait[];

  const weaponReadiedFieldName = createWeaponFieldName('weapon_readied', index);
  const weaponReadied = watch(weaponReadiedFieldName);

  const weaponEncumbranceFieldName = createWeaponFieldName(
    'weapon_encumbrance',
    index
  );
  const weaponEncumbrance = watch(weaponEncumbranceFieldName);

  useEffect(() => {
    calculateEncumbrances();
  }, [weaponEncumbrance, weaponReadied, calculateEncumbrances]);

  if (hideUnreadied && !weaponReadied) {
    return null;
  }

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
      isNested
      title={sectionTitle}
      titleColor={weaponReadied ? 'text' : 'textAccent'}
      visibilityTitle={`weapon${index}`}
    >
      <GridBox columns={1}>
        <GridBox gridTemplateColumns={isXxs ? '1fr' : 'auto 1fr'}>
          <CheckboxInput<WwnCharacterData>
            alwaysEditable
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
            MultiDisplayComponent={WeaponAttributeDisplay}
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
            name={weaponEncumbranceFieldName}
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
