import { CwnArmor } from '~/typings/cwn/characterData';

export const getEquippedArmorAndAccessories = (armors: CwnArmor[]) => {
  const equippedArmor = armors.find(
    (a) => a.weight !== 'accessory' && a.weight !== 'shield' && a.readied
  );
  const equippedAccessories = armors.filter(
    (a) => equippedArmor && a.equippedTo === equippedArmor.id
  );
  const shield = armors.find((a) => a.weight === 'shield' && a.readied);

  const relevantAccessories = [...equippedAccessories, shield].filter(
    Boolean
  ) as CwnArmor[];

  return { armor: equippedArmor, accessories: relevantAccessories };
};
