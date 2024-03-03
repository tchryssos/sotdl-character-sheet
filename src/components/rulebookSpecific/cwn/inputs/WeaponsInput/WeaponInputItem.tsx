import { capitalize } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { SelectOption } from '~/components/form/typings';
import { ATTRIBUTES, WEAPON_TYPES, WeaponType } from '~/constants/cwn/game';
import { SHOCK_REGEX } from '~/constants/cwn/regex';
import { DICE_WITH_MODIFIER_REGEX, RANGE_REGEX } from '~/constants/regex';
import { CwnCharacterData, CwnWeapon } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { LinkedCyberwareLink } from '../CyberwaresInput/LinkedCyberwareLink';
import { useLinkedCyberware } from '../CyberwaresInput/utils';
import { createWeaponFieldName } from './utils';

interface WeaponInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'postSortIndex' | 'onDelete'> {}

const weaponTypeOptions: SelectOption[] = WEAPON_TYPES.map((t) => ({
  label: capitalize(t),
  value: t,
}));

const weaponAttributeOptions: SelectOption[] = ATTRIBUTES.map((a) => ({
  label: capitalize(a),
  value: a,
}));

export function WeaponInputItem({
  postSortIndex: index,
  onDelete,
}: WeaponInputItemProps) {
  const { setValue, watch, getValues } = useFormContext<CwnCharacterData>();

  const nameFieldName = createWeaponFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const readiedFieldName = createWeaponFieldName('readied', index);
  const readied = watch(readiedFieldName) as boolean;

  const typeFieldName = createWeaponFieldName('weapon_type', index);
  const type = watch(typeFieldName) as WeaponType;
  const isRanged = type === 'ranged';

  const damageFieldName = createWeaponFieldName('damage', index);
  const damage = watch(damageFieldName) as CwnWeapon['damage'];

  const rangeFieldName = createWeaponFieldName('range', index);
  const range = watch(rangeFieldName) as CwnWeapon['range'];

  const shockFieldName = createWeaponFieldName('shock', index);
  const shock = watch(shockFieldName) as CwnWeapon['shock'];
  const useShock = !isRanged && shock;

  const idFieldName = createWeaponFieldName('id', index);
  const id = watch(idFieldName) as string;

  const linkedCyberware = useLinkedCyberware(id);

  const title = name
    ? `${name} - ${damage}${range || useShock ? ', ' : ''}${range}${
        range && useShock ? ', ' : ''
      }${useShock ? shock : ''}`
    : '';

  return (
    <AAMItemFormSection
      linkId={id}
      title={title}
      titleColor={readied ? 'text' : 'textAccent'}
      visibilityTitle={`${name}${index}`}
    >
      <GridBox
        alignItems="start"
        gridTemplateColumns={{ base: '1fr', xs: 'auto 1fr' }}
      >
        <CheckboxInput
          alwaysEditable
          customOnChange={() => {
            setValue(readiedFieldName, !readied);
            const weapons = getValues('weapons');
            // Only one weapon can be readied at a time
            weapons.forEach((_, i) => {
              if (i !== index) {
                setValue(createWeaponFieldName('readied', i), false);
              }
            });
          }}
          inputLike
          isChecked={readied}
          label="Readied"
          name={readiedFieldName}
        />
        <FlexBox flexDirection="column" gap={4}>
          <AAMItemTitleAndDelete<CwnCharacterData>
            index={index}
            label="Name"
            name={nameFieldName}
            noDelete={Boolean(linkedCyberware)}
            onDelete={(i: number) => {
              if (linkedCyberware) {
                const cyberwares = getValues('cyberware');
                setValue(
                  'cyberware',
                  cyberwares.filter((r) => r.id !== id)
                );
              }
              onDelete(i);
            }}
          />
          <LinkedCyberwareLink cyberware={linkedCyberware} id={id} />
        </FlexBox>
      </GridBox>
      <GridBox>
        <SelectInput<CwnCharacterData>
          label="Type"
          name={typeFieldName}
          options={weaponTypeOptions}
        />
        <SelectInput<CwnCharacterData>
          label="Attribute"
          multiple
          name={createWeaponFieldName('attribute', index)}
          options={weaponAttributeOptions}
        />
      </GridBox>
      <GridBox gridTemplateColumns="5fr 2fr">
        <TextInput<CwnCharacterData>
          label="Damage"
          name={damageFieldName}
          validations={{
            pattern: DICE_WITH_MODIFIER_REGEX,
          }}
        />
        <NumberInput<CwnCharacterData>
          label="Encumbrance"
          min={0}
          name={createWeaponFieldName('encumbrance', index)}
        />
      </GridBox>
      <GridBox>
        <TextInput<CwnCharacterData>
          label="Range"
          name={rangeFieldName}
          validations={{
            pattern: RANGE_REGEX,
          }}
        />
        {isRanged ? (
          <NumberInput<CwnCharacterData>
            label="Mag"
            min={1}
            name={createWeaponFieldName('mag', index)}
          />
        ) : (
          <TextInput<CwnCharacterData>
            label="Shock"
            name={shockFieldName}
            validations={{
              pattern: SHOCK_REGEX,
            }}
          />
        )}
      </GridBox>
      <GridBox>
        <TextInput<CwnCharacterData>
          label="Trauma Die"
          name={createWeaponFieldName('trauma_die', index)}
          validations={{
            pattern: DICE_WITH_MODIFIER_REGEX,
          }}
        />
        <NumberInput<CwnCharacterData>
          label="Trauma Rating"
          min={0}
          name={createWeaponFieldName('trauma_rating', index)}
        />
      </GridBox>
      <TextAreaInput<CwnCharacterData>
        label="Description/Mods"
        name={createWeaponFieldName('description', index)}
      />
    </AAMItemFormSection>
  );
}
