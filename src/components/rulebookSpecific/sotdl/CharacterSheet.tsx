import { GridBox } from '~/components/box/GridBox';
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
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

import { BaseCharacterSheet } from '../shared/BaseCharacterSheet';
import { BasicInfoInputs } from '../shared/gameInputs/BasicInfoInputs';
import { FormNav } from './FormNav';

export const CharacterSheet: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');
  const isLessThanXs = useBreakpointsLessThan('xs');

  return (
    <BaseCharacterSheet defaultValues={DEFAULT_VALUES}>
      {({ isMyCharacter }) => (
        <>
          <FormNav isMyCharacter={isMyCharacter} />
          <BasicInfoInputs<SotdlCharacterData> />
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
        </>
      )}
    </BaseCharacterSheet>
  );
};
