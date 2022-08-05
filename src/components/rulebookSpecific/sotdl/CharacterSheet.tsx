import { useEffect, useRef, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { ArmorInput } from '~/components/rulebookSpecific/sotdl/gameInputs/ArmorInput';
import { AttributeInput } from '~/components/rulebookSpecific/sotdl/gameInputs/AttributeInput';
import { CurrencyInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/CurrencyInputs';
import { DescriptionInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/DescriptionInputs';
import { EquipmentInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/EquipmentInputs';
import { EvilInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/EvilInputs';
import { FortuneFateInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/FortuneFateInputs';
import { GeneralNotesInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/GeneralNotesInputs';
import { HealthInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/HealthInputs';
import { HistoryInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/HistoryInputs';
import { MagicInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/MagicInputs';
import { PhysicalTraitsInputs } from '~/components/rulebookSpecific/sotdl/gameInputs/PhysicalTraitsInputs';
import { WeaponInput } from '~/components/rulebookSpecific/sotdl/gameInputs/WeaponInput';
import { DEFAULT_VALUES } from '~/constants/sotdl/form';
import { ATTRIBUTES } from '~/constants/sotdl/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';

import { LoadingIntermediary } from '../../form/LoadingIntermediary';
import { FormNav } from './FormNav';
import { BasicInfoInputs } from './gameInputs/BasicInfoInputs';

export const CharacterSheet: React.FC = () => {
  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    setIsLoading,
    isMyCharacter,
    setIsMyCharacter,
  } = useSheetState();

  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  useSheetHotkeys(isEditMode, setIsEditMode);

  return (
    <EditContext.Provider value={{ isEditMode, setIsEditMode }}>
      <FormComponent defaultValues={DEFAULT_VALUES} onSubmit={() => undefined}>
        <LoadingIntermediary
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsMyCharacter={setIsMyCharacter}
        >
          <FormNav isMyCharacter={isMyCharacter} />
          <BasicInfoInputs />
          <HistoryInputs />
          <FormSection columns={isLessThanSm ? 2 : 4} title="Attributes">
            {ATTRIBUTES.map((a) => (
              <AttributeInput key={a} name={`attribute_${a}`} />
            ))}
          </FormSection>
          <GridBox columns={isLessThanSm ? 1 : 2}>
            <FormSection title="Defenses">
              <HealthInputs />
            </FormSection>
            <GridBox columns={isLessThanXs ? 1 : 2}>
              <PhysicalTraitsInputs />
              <FormSection title="Metaphysical Traits">
                <EvilInputs />
                <FortuneFateInputs />
              </FormSection>
            </GridBox>
          </GridBox>
          <MagicInputs />
          <ArmorInput />
          <WeaponInput />
          <EquipmentInputs />
          <CurrencyInputs />
          <DescriptionInputs />
          <GeneralNotesInputs />
        </LoadingIntermediary>
      </FormComponent>
    </EditContext.Provider>
  );
};
