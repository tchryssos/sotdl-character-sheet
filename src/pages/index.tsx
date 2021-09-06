/* eslint-disable react/jsx-props-no-spreading */
// import styled from '@emotion/styled';
import startCase from 'lodash.startcase';

import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { AttributeInput } from '~/components/form/gameInputs/AttributeInput';
import { ExpertPathInput } from '~/components/form/gameInputs/ExpertPathInput';
import { HealthInputs } from '~/components/form/gameInputs/HealthInputs';
import { MasterPathInput } from '~/components/form/gameInputs/MasterPathInput';
import { PerceptionInput } from '~/components/form/gameInputs/PerceptionInput';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { DEFAULT_VALUES, FIELD_NAMES } from '~/constants/form';
import { ANCESTRIES, ATTRIBUTES, NOVICE_PATHS } from '~/constants/game';

const Home: React.FC = () => (
  <Layout>
    <Form defaultValues={DEFAULT_VALUES} onSubmit={() => undefined}>
      <GridBox gridTemplateColumns="7fr 1fr">
        <TextInput name={FIELD_NAMES.name} />
        <NumberInput max={10} min={0} name={FIELD_NAMES.level} />
      </GridBox>
      <GridBox columns={4}>
        <SelectInput
          name={FIELD_NAMES.ancestry}
          options={ANCESTRIES.map((a) => ({
            label: startCase(a),
            value: a,
          }))}
        />
        <SelectInput
          name={FIELD_NAMES.paths.novice_path}
          options={NOVICE_PATHS.map((p) => ({
            label: startCase(p),
            value: p,
          }))}
        />
        <ExpertPathInput />
        <MasterPathInput />
      </GridBox>
      <GridBox alignItems="start">
        <TextAreaInput name={FIELD_NAMES.professions} />
        <TextAreaInput name={FIELD_NAMES.languages} />
      </GridBox>
      <GridBox columns={4}>
        {ATTRIBUTES.map((a) => (
          <AttributeInput key={a} name={a} />
        ))}
      </GridBox>
      <GridBox columns={2}>
        <HealthInputs />
        <GridBox>
          <PerceptionInput />
          <NumberInput min={0} name={FIELD_NAMES.speed} />
        </GridBox>
      </GridBox>
    </Form>
  </Layout>
);

// eslint-disable-next-line import/no-default-export
export default Home;
