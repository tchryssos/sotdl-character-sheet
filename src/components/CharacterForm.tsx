import styled from '@emotion/styled';
import { useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { ArmorInput } from '~/components/form/gameInputs/ArmorInput';
import { AttributeInput } from '~/components/form/gameInputs/AttributeInput';
import { CurrencyInputs } from '~/components/form/gameInputs/CurrencyInputs';
import { DescriptionInputs } from '~/components/form/gameInputs/DescriptionInputs';
import { EquipmentInputs } from '~/components/form/gameInputs/EquipmentInputs';
import { EvilInputs } from '~/components/form/gameInputs/EvilInputs';
import { FortuneFateInputs } from '~/components/form/gameInputs/FortuneFateInputs';
import { GeneralNotesInputs } from '~/components/form/gameInputs/GeneralNotesInputs';
import { HealthInputs } from '~/components/form/gameInputs/HealthInputs';
import { HistoryInputs } from '~/components/form/gameInputs/HistoryInputs';
import { MagicInputs } from '~/components/form/gameInputs/MagicInputs';
import { PhysicalTraitsInputs } from '~/components/form/gameInputs/PhysicalTraitsInputs';
import { WeaponInput } from '~/components/form/gameInputs/WeaponInput';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { FIELD_NAMES } from '~/constants/form';
import { ATTRIBUTES } from '~/constants/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { FormToolbar } from './FormToolbar';

const Form = styled(FormComponent)`
  max-width: ${({ theme }) => theme.breakpointValues.lg}px;
  margin-top: ${({ theme }) => theme.spacing[64]};
`;

export const CharacterForm: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  return (
    <EditContext.Provider value={isEditMode}>
      <Form onSubmit={() => undefined}>
        <FormToolbar isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
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
      </Form>
    </EditContext.Provider>
  );
};
