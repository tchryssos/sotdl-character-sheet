import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/cwn/form';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { getEquippedArmorAndAccessories } from '~/logic/utils/rulebookSpecific/cwn/getEquippedArmorAndAccessories';
import { calcAttributeBonus } from '~/logic/utils/rulebookSpecific/wwn/calcAttributeBonus';
import { CwnCharacterData } from '~/typings/cwn/characterData';

export interface AcContextInterface {
  rangedAc: number;
  meleeAc: number;
  calculateAc: () => void;
  acDescriptions: {
    ranged: string;
    melee: string;
  };
}

export const acDescriptionBreakChar = '#';

const defaultDescriptions: AcContextInterface['acDescriptions'] = {
  ranged: `Base: ${DEFAULT_VALUES.armor_class_ranged}`,
  melee: `Base: ${DEFAULT_VALUES.armor_class_melee}`,
};

export const AcContext = createContext<AcContextInterface>({
  meleeAc: DEFAULT_VALUES.armor_class_melee,
  rangedAc: DEFAULT_VALUES.armor_class_ranged,
  calculateAc: () => null,
  acDescriptions: defaultDescriptions,
});

type AcProviderProps = PropsWithChildren<unknown>;

export function AcProvider({ children }: AcProviderProps) {
  const [rangedAc, setRangedAc] = useState(DEFAULT_VALUES.armor_class_ranged);
  const [meleeAc, setMeleeAc] = useState(DEFAULT_VALUES.armor_class_melee);
  const [acDescriptions, setAcDescriptions] = useState(defaultDescriptions);

  const { getValues } = useFormContext<CwnCharacterData>();

  const calculateAc = useCallback(() => {
    const dexterity = getValues('attribute_dexterity');
    const dexBonus = calcAttributeBonus(dexterity);

    const armors = getValues('armors');
    const { armor: equippedArmor, accessories: relevantAccessories } =
      getEquippedArmorAndAccessories(armors);

    const accessoryBonuses = relevantAccessories.reduce(
      (bonusObj, currArmor) => ({
        melee: bonusObj.melee + (guaranteeNumberValue(currArmor.ac_melee) || 0),
        ranged:
          bonusObj.ranged + (guaranteeNumberValue(currArmor.ac_ranged) || 0),
      }),
      { melee: 0, ranged: 0 }
    );

    setRangedAc(
      dexBonus +
        guaranteeNumberValue(
          equippedArmor?.ac_ranged || DEFAULT_VALUES.armor_class_ranged
        ) +
        accessoryBonuses.ranged
    );
    setMeleeAc(
      dexBonus +
        guaranteeNumberValue(
          equippedArmor?.ac_melee || DEFAULT_VALUES.armor_class_melee
        ) +
        accessoryBonuses.melee
    );

    const armorDescriptions = {
      ranged: equippedArmor
        ? `${equippedArmor.name}: ${equippedArmor.ac_ranged}`
        : `Base: ${DEFAULT_VALUES.armor_class_ranged}`,
      melee: equippedArmor
        ? `${equippedArmor.name}: ${equippedArmor.ac_melee}`
        : `Base: ${DEFAULT_VALUES.armor_class_melee}`,
    };
    const accessoryDescriptions = {
      ranged: relevantAccessories
        .map((a) => `${a.name}: ${a.ac_ranged}`)
        .join(acDescriptionBreakChar),
      melee: relevantAccessories
        .map((a) => `${a.name}: ${a.ac_melee}`)
        .join(acDescriptionBreakChar),
    };
    const dexDescription = `Dex: ${dexBonus}`;
    setAcDescriptions({
      ranged: [
        armorDescriptions.ranged,
        accessoryDescriptions.ranged,
        dexDescription,
      ].join(acDescriptionBreakChar),
      melee: [
        armorDescriptions.melee,
        accessoryDescriptions.melee,
        dexDescription,
      ].join(acDescriptionBreakChar),
    });
  }, [getValues]);

  const providerValue = useMemo(
    () => ({
      meleeAc,
      rangedAc,
      calculateAc,
      acDescriptions,
    }),
    [rangedAc, meleeAc, calculateAc, acDescriptions]
  );

  return (
    <AcContext.Provider value={providerValue}>{children}</AcContext.Provider>
  );
}
