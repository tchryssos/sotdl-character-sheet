import { useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { ArmorInput } from '~/components/sotdl/gameInputs/ArmorInput';
import { AttributeInput } from '~/components/sotdl/gameInputs/AttributeInput';
import { CurrencyInputs } from '~/components/sotdl/gameInputs/CurrencyInputs';
import { DescriptionInputs } from '~/components/sotdl/gameInputs/DescriptionInputs';
import { EquipmentInputs } from '~/components/sotdl/gameInputs/EquipmentInputs';
import { EvilInputs } from '~/components/sotdl/gameInputs/EvilInputs';
import { FortuneFateInputs } from '~/components/sotdl/gameInputs/FortuneFateInputs';
import { GeneralNotesInputs } from '~/components/sotdl/gameInputs/GeneralNotesInputs';
import { HealthInputs } from '~/components/sotdl/gameInputs/HealthInputs';
import { HistoryInputs } from '~/components/sotdl/gameInputs/HistoryInputs';
import { MagicInputs } from '~/components/sotdl/gameInputs/MagicInputs';
import { PhysicalTraitsInputs } from '~/components/sotdl/gameInputs/PhysicalTraitsInputs';
import { WeaponInput } from '~/components/sotdl/gameInputs/WeaponInput';
import { DEFAULT_VALUES, FIELD_NAMES } from '~/constants/form';
import { ATTRIBUTES } from '~/constants/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { LoadingIntermediary } from '../form/LoadingIntermediary';
import { FormNav } from '../nav/FormNav';

export const CharacterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  return (
    <EditContext.Provider value={{ isEditMode, setIsEditMode }}>
      <FormComponent defaultValues={DEFAULT_VALUES} onSubmit={() => undefined}>
        <LoadingIntermediary isLoading={isLoading} setIsLoading={setIsLoading}>
          <FormNav />
          <GridBox gridTemplateColumns={isLessThanSm ? '5fr 1fr' : '7fr 1fr'}>
            <TextInput name={FIELD_NAMES.name} />
            <NumberInput max={10} min={0} name={FIELD_NAMES.level} />
          </GridBox>
          <HistoryInputs />
          <FormSection columns={isLessThanSm ? 2 : 4} title="Attributes">
            {ATTRIBUTES.map((a) => (
              <AttributeInput key={a} name={a} />
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
