import { GridBox } from '~/components/box/GridBox';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SwnCharacterData } from '~/typings/swn/characterData';

import { FormSection } from '../../../form/FormSection';
import { TextAreaInput } from '../../../form/TextAreaInput';
import { TextInput } from '../../../form/TextInput';
import { ClassBenefitsInput } from './ClassBenefitsInput';

export const HistoryInputs: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection columns={2} title="History">
      <GridBox alignItems="start" columns={1} gridTemplateRows="auto 1fr">
        <TextInput<SwnCharacterData> name="background" />
        <TextAreaInput<SwnCharacterData> name="background_description" />
      </GridBox>
      <GridBox alignItems="start" columns={1}>
        <TextInput<SwnCharacterData> name="class" />
        <ClassBenefitsInput />
      </GridBox>
    </FormSection>
  );
};
