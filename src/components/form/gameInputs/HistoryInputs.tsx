import { GridBox } from '~/components/box/GridBox';
import { FIELD_NAMES } from '~/constants/form';

import { FormSection } from '../FormSection';
import { TextAreaInput } from '../TextAreaInput';
import { TextInput } from '../TextInput';
import { ExpertPathInput } from './ExpertPathInput';
import { MasterPathInput } from './MasterPathInput';
import { NovicePathInput } from './NovicePathInput';

export const HistoryInputs: React.FC = () => (
  <FormSection columns={1} title="History">
    <GridBox columns={4}>
      <TextInput name={FIELD_NAMES.ancestry} />
      <NovicePathInput />
      <ExpertPathInput />
      <MasterPathInput />
    </GridBox>
    <GridBox alignItems="start">
      <TextAreaInput name={FIELD_NAMES.ancestryBenefits} />
      <TextAreaInput name={FIELD_NAMES.languages} />
      <TextAreaInput name={FIELD_NAMES.professions} />
      <TextAreaInput name={FIELD_NAMES.pathBenefits} />
    </GridBox>
  </FormSection>
);
