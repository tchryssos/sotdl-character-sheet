import startCase from 'lodash.startcase';

import { GridBox } from '~/components/box/GridBox';
import { FIELD_NAMES } from '~/constants/form';
import { ANCESTRIES } from '~/constants/game';

import { FormSection } from '../FormSection';
import { SelectInput } from '../SelectInput';
import { TextAreaInput } from '../TextAreaInput';
import { ExpertPathInput } from './ExpertPathInput';
import { MasterPathInput } from './MasterPathInput';
import { NovicePathInput } from './NovicePathInput';

export const HistoryInputs: React.FC = () => (
  <FormSection columns={1} title="History">
    <GridBox columns={4}>
      <SelectInput
        name={FIELD_NAMES.ancestry}
        options={ANCESTRIES.map((a) => ({
          label: startCase(a),
          value: a,
        }))}
      />
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
