import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { DEFAULT_VALUES } from '~/constants/wwn/form';
import { ATTRIBUTES } from '~/constants/wwn/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { useSheetHotkeys } from '~/logic/hooks/useSheetHotkeys';
import { useSheetState } from '~/logic/hooks/useSheetState';
import { StrictCharacter } from '~/typings/characters';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { AttributeInput } from './inputs/AttributeInput';
import { BackgroundInputs } from './inputs/BackgroundInputs';
import { BasicInfoInputs } from './inputs/BasicInfoInputs';
import { ClassInputs } from './inputs/ClassInputs';
import { DefenseInputs } from './inputs/DefenseInputs';
import { FociInputs } from './inputs/FociInputs';
import { HealthInputs } from './inputs/HealthInputs';

interface WwnCharacterSheetProps {
  character: StrictCharacter<WwnCharacterData>;
}

export function CharacterSheet({ character }: WwnCharacterSheetProps) {
  const {
    isEditMode,
    setIsEditMode,
    // isLoading,
    // setIsLoading,
    // isMyCharacter,
    setIsMyCharacter,
    editProviderVal,
  } = useSheetState();
  useSheetHotkeys(isEditMode, setIsEditMode);

  const { user } = useUser();

  useEffect(() => {
    setIsMyCharacter(character?.playerId === user?.id);
  }, [character?.playerId, setIsMyCharacter, user?.id]);

  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  return (
    <EditContext.Provider value={editProviderVal}>
      <FormComponent
        defaultValues={character?.characterData || DEFAULT_VALUES}
        onSubmit={() => undefined}
      >
        <div>FormNav!</div>
        <GridBox columns={isLessThanSm ? 1 : 2}>
          <BasicInfoInputs />
          <BackgroundInputs />
        </GridBox>
        <ClassInputs />
        <FociInputs />
        <FormSection
          columns={isLessThanSm ? 2 : 3}
          icon={RpgIcons.Barbell}
          title="Attributes"
        >
          {ATTRIBUTES.map((a) => (
            <AttributeInput key={a} name={`attribute_${a}`} />
          ))}
        </FormSection>
        <GridBox columns={isLessThanSm ? 1 : 2}>
          <HealthInputs />
          <DefenseInputs />
        </GridBox>
      </FormComponent>
    </EditContext.Provider>
  );
}
