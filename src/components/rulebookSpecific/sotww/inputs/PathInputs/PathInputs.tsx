import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { RpgIcons } from '~/constants/icons';
import { SotwwPathType } from '~/constants/sotww/game';
import { EditContext } from '~/logic/contexts/editContext';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { PathInput } from './PathInput';

const iconMap: Record<SotwwPathType, RpgIcons> = {
  novice: RpgIcons.Sprout,
  expert: RpgIcons.Weed,
  master: RpgIcons.FlowerThree,
};

export function PathInputs() {
  const { watch } = useFormContext<SotwwCharacterData>();
  const level = watch('level');
  const { isEditMode } = useContext(EditContext);

  return (
    <>
      <PathInput icon={iconMap.novice} pathType="novice" />
      {(level >= 3 || isEditMode) && (
        <PathInput icon={iconMap.expert} pathType="expert" />
      )}
      {(level >= 7 || isEditMode) && (
        <PathInput icon={iconMap.master} pathType="master" />
      )}
    </>
  );
}
