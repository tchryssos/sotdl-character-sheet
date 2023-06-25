import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { ArmorInput } from '~/components/rulebookSpecific/sotdl/inputs/ArmorInput';
import { AttributeInput } from '~/components/rulebookSpecific/sotdl/inputs/AttributeInput';
import { CurrencyInputs } from '~/components/rulebookSpecific/sotdl/inputs/CurrencyInputs';
import { DescriptionInputs } from '~/components/rulebookSpecific/sotdl/inputs/DescriptionInputs';
import { EquipmentInputs } from '~/components/rulebookSpecific/sotdl/inputs/EquipmentInputs';
import { EvilInputs } from '~/components/rulebookSpecific/sotdl/inputs/EvilInputs';
import { FortuneFateInputs } from '~/components/rulebookSpecific/sotdl/inputs/FortuneFateInputs';
import { GeneralNotesInputs } from '~/components/rulebookSpecific/sotdl/inputs/GeneralNotesInputs';
import { HealthInputs } from '~/components/rulebookSpecific/sotdl/inputs/HealthInputs';
import { HistoryInputs } from '~/components/rulebookSpecific/sotdl/inputs/HistoryInputs';
import { MagicInputs } from '~/components/rulebookSpecific/sotdl/inputs/MagicInputs';
import { PhysicalTraitsInputs } from '~/components/rulebookSpecific/sotdl/inputs/PhysicalTraitsInputs';
import { WeaponInput } from '~/components/rulebookSpecific/sotdl/inputs/WeaponInput';
import { DEFAULT_VALUES } from '~/constants/sotdl/form';
import { ATTRIBUTES } from '~/constants/sotdl/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { StrictCharacter } from '~/typings/characters';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { FormNav } from './FormNav';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';

interface SotdlCharacterSheetProps {
  character?: StrictCharacter<SotdlCharacterData>;
}

export function CharacterSheet({ character }: SotdlCharacterSheetProps) {
  const {
    isEditMode,
    setIsEditMode,
    isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
  } = useSheetState();

  const { user } = useUser();

  useEffect(() => {
    setIsMyCharacter(character?.playerId === user?.id);
  }, [character?.playerId, setIsMyCharacter, user?.id]);

  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  useSheetHotkeys(isEditMode, setIsEditMode);

  return (
    <EditContext.Provider value={editProviderVal}>
      <FormComponent
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
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
      </FormComponent>
    </EditContext.Provider>
  );
}
