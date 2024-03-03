import { capitalize, upperFirst } from 'lodash';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { AAMItemTitleAndDelete } from '~/components/form/AAMItemTitleAndDelete';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { AAMItemFormSection } from '~/components/form/containers/AAMItemFormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { SelectOption } from '~/components/form/typings';
import {
  ARMOR_TRAITS,
  ARMOR_WEIGHT,
  ArmorTrait,
  ArmorWeight,
} from '~/constants/cwn/game';
import {
  useBreakpointsAtLeast,
  useBreakpointsLessThan,
} from '~/logic/hooks/useBreakpoints';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { CwnArmor, CwnCharacterData } from '~/typings/cwn/characterData';
import { SortableAddAnotherChildProps } from '~/typings/form';

import { AcContext } from '../../AcProvider';
import { LinkedCyberwareLink } from '../CyberwaresInput/LinkedCyberwareLink';
import { useLinkedCyberware } from '../CyberwaresInput/utils';
import { EquippedToInput } from './EquippedToInput';
import { removeAccessoryFromParentArmor } from './utils';

interface ArmorInputItemProps
  extends Pick<SortableAddAnotherChildProps, 'onDelete' | 'postSortIndex'> {}

const createArmorFieldName = makeNestedFieldNameFn<CwnCharacterData, 'armors'>(
  'armors'
);

const armorWeightOptions: SelectOption[] = ARMOR_WEIGHT.map((w) => ({
  label: upperFirst(w),
  value: w,
}));

const armorTraitOptions: SelectOption[] = Object.keys(ARMOR_TRAITS).map(
  (t) => ({
    label: ARMOR_TRAITS[t as ArmorTrait].name,
    value: t,
  })
);

export function ArmorInputItem({
  postSortIndex: index,
  onDelete,
}: ArmorInputItemProps) {
  const { setValue, watch, getValues } = useFormContext<CwnCharacterData>();
  const { calculateAc } = useContext(AcContext);
  // const { isEditMode } = useContext(EditContext);
  const isXxs = useBreakpointsLessThan('xs');
  const mdUp = useBreakpointsAtLeast('md');

  const nameFieldName = createArmorFieldName('name', index);
  const name = watch(nameFieldName) as string;

  const readiedFieldName = createArmorFieldName('readied', index);
  const readied = watch(readiedFieldName) as boolean;

  const traitsFieldName = createArmorFieldName('traits', index);
  const traits = watch(traitsFieldName) as ArmorTrait[];

  const weightFieldName = createArmorFieldName('weight', index);
  const weight = watch(weightFieldName) as ArmorWeight;
  const isAccessory = weight === 'accessory';

  const idFieldName = createArmorFieldName('id', index);
  const id = watch(idFieldName) as string;

  const linkedCyberware = useLinkedCyberware(id);

  const equippedToFieldName = createArmorFieldName('equippedTo', index);
  const equippedTo = watch(equippedToFieldName) as string;

  const accessoriesFieldName = createArmorFieldName('accessories', index);
  const accessories = watch(accessoriesFieldName) as string[];

  // Set accessory ready status to that of parent on assignment
  useEffect(() => {
    if (isAccessory) {
      if (equippedTo) {
        setValue(
          readiedFieldName,
          Boolean(getValues('armors').find((a) => a.id === equippedTo)?.readied)
        );
      } else {
        setValue(readiedFieldName, false);
      }
    }
  }, [equippedTo, isAccessory, setValue, readiedFieldName, getValues]);

  // Set the readied status for each accessory on parent readied change
  useEffect(() => {
    if (!isAccessory) {
      const armors = getValues('armors');
      const accessoryArmors = armors.filter((a) => a.equippedTo === id);
      accessoryArmors.forEach((ac) => {
        const accessoryArmorIndex = armors.findIndex((a) => a.id === ac.id);
        if (accessoryArmorIndex >= 0) {
          setValue(
            createArmorFieldName('readied', accessoryArmorIndex),
            readied
          );
        }
      });
    }
  }, [readied, isAccessory, getValues, id, setValue]);

  useEffect(() => {
    calculateAc();
  }, [accessories, calculateAc]);

  const setAC = (armorName: keyof CwnArmor, value: number) => {
    setValue(
      createArmorFieldName(armorName, index),
      guaranteeNumberValue(value)
    );
    calculateAc();
  };

  /**
   * If !name, title is ""
   * If there are accessories, add a "+" after the name (fallout style)
   * Add the weight and trait abbreviations
   *
   * ex. Plated Longcoat+ - Civilian, H
   */
  const title = name
    ? `${name}${accessories.length ? '+' : ''} - ${capitalize(weight)}${
        traits.length ? ', ' : ''
      }${traits.map((t) => ARMOR_TRAITS[t].abbreviation).join(', ')}`
    : '""';

  return (
    <AAMItemFormSection
      linkId={id}
      title={title}
      titleColor={readied ? 'text' : 'textAccent'}
      visibilityTitle={`${name}${index}`}
    >
      <FlexBox flexDirection="column" gap={{ base: 16, xs: 24 }}>
        <GridBox
          gridTemplateColumns={isXxs || isAccessory ? '1fr' : 'auto 1fr'}
        >
          {!isAccessory && (
            <CheckboxInput
              alwaysEditable
              customOnChange={() => {
                const armors = getValues('armors');
                setValue(readiedFieldName, !readied);
                // Only one armor can be worn at a time,
                // so unequip any other equipped armor when equipping this one
                armors.forEach((a, i) => {
                  if (id !== a.id && a.equippedTo !== id && a.readied) {
                    // Armor unequips armor, shields unequip shields
                    const shouldUnequip =
                      (weight === 'shield' && a.weight === 'shield') ||
                      (weight !== 'shield' && a.weight !== 'shield');
                    if (shouldUnequip) {
                      const otherEquippedName = createArmorFieldName(
                        'readied',
                        i
                      );
                      setValue(otherEquippedName, false);
                    }
                  }
                });
                calculateAc();
              }}
              inputLike
              isChecked={readied}
              label="Readied"
              name={readiedFieldName}
            />
          )}
          <FlexBox flexDirection="column" gap={4}>
            <AAMItemTitleAndDelete<CwnCharacterData>
              index={index}
              label="Name"
              name={nameFieldName}
              onDelete={(i: number) => {
                if (equippedTo) {
                  removeAccessoryFromParentArmor(id, equippedTo, {
                    setValue,
                    getValues,
                  });
                } else if (accessories.length) {
                  const armors = getValues('armors');
                  accessories.forEach((ac) => {
                    // Unready accessories and remove equippedTo
                    const accessoryArmorIndex = armors.findIndex(
                      (a) => a.id === ac
                    );
                    if (accessoryArmorIndex >= 0) {
                      setValue(
                        createArmorFieldName('equippedTo', accessoryArmorIndex),
                        ''
                      );
                      setValue(
                        createArmorFieldName('readied', accessoryArmorIndex),
                        false
                      );
                    }
                  });
                }

                if (linkedCyberware) {
                  const cyberwares = getValues('cyberware');
                  setValue(
                    'cyberware',
                    cyberwares.filter((r) => r.id !== linkedCyberware.id)
                  );
                }
                onDelete(i);
              }}
            />
            <LinkedCyberwareLink cyberware={linkedCyberware} id={id} />
          </FlexBox>
        </GridBox>
        <GridBox columns={isAccessory ? 2 : 1}>
          <SelectInput<CwnCharacterData>
            label="Type"
            name={createArmorFieldName('weight', index)}
            options={armorWeightOptions}
          />
          {isAccessory && (
            <EquippedToInput
              accessoryArmorId={id}
              equippedToFieldName={equippedToFieldName}
            />
          )}
        </GridBox>
        <GridBox columns={{ base: 2, sm: 4 }}>
          <NumberInput<CwnCharacterData>
            customOnChange={(e) =>
              setAC('ac_melee', guaranteeNumberValue(e.target.value))
            }
            label="AC Melee"
            min={0}
            name={createArmorFieldName('ac_melee', index)}
          />
          <NumberInput<CwnCharacterData>
            customOnChange={(e) =>
              setAC('ac_ranged', guaranteeNumberValue(e.target.value))
            }
            label={isXxs ? 'AC Range' : 'AC Ranged'}
            min={0}
            name={createArmorFieldName('ac_ranged', index)}
          />
          <NumberInput<CwnCharacterData>
            label={isXxs ? 'Dmg Soak' : 'Damage Soak'}
            min={0}
            name={createArmorFieldName('damage_soak', index)}
          />
          <NumberInput<CwnCharacterData>
            label={isXxs || mdUp ? 'Trauma Mod' : 'Trauma Target Mod'}
            min={0}
            name={createArmorFieldName('trauma_target_mod', index)}
          />
        </GridBox>
        <GridBox gridTemplateColumns={isXxs ? '1fr 1fr' : '3fr 1fr'}>
          <SelectInput<CwnCharacterData>
            label="Traits"
            multiple
            name={traitsFieldName}
            options={armorTraitOptions}
          />
          <NumberInput<CwnCharacterData>
            label="Encumbrance"
            min={0}
            name={createArmorFieldName('encumbrance', index)}
          />
        </GridBox>

        <TextAreaInput<CwnCharacterData>
          label="Description/Mods"
          name={createArmorFieldName('description', index)}
        />
      </FlexBox>
    </AAMItemFormSection>
  );
}
