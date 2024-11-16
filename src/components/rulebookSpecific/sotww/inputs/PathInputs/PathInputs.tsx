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
  const { isEditMode } = useContext(EditContext);

  const expertPath = watch('path_expert');
  const expertPathDetails = watch('path_expert_benefits');
  const masterPath = watch('path_master');
  const masterPathDetails = watch('path_master_benefits');

  const showExpert = Boolean(expertPath || expertPathDetails.length);
  const showMaster = Boolean(masterPath || masterPathDetails.length);

  return (
    <>
      <PathInput icon={iconMap.novice} pathType="novice" />
      {(showExpert || isEditMode) && (
        <PathInput icon={iconMap.expert} pathType="expert" />
      )}
      {(showMaster || isEditMode) && (
        <PathInput icon={iconMap.master} pathType="master" />
      )}
    </>
  );
}
