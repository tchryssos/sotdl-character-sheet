/* eslint-disable react/jsx-props-no-spreading */
// import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { AttributeInput } from '~/components/form/gameInputs/AttributeInput';
import { ExpertPathInput } from '~/components/form/gameInputs/ExpertPathInput';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { FIELD_NAMES } from '~/constants/form';
import { ANCESTRIES, ATTRIBUTES, NOVICE_PATHS } from '~/constants/game';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';

const defaultValues = {
  [FIELD_NAMES.level]: 1,
  [FIELD_NAMES.attributes.strength]: 10,
  [FIELD_NAMES.attributes.will]: 10,
  [FIELD_NAMES.attributes.intellect]: 10,
  [FIELD_NAMES.attributes.agility]: 10,
};

const colGap = 16;

const Home: React.FC = () => {
  const breakpoints = useContext(BreakpointsContext);

  return (
    <Layout>
      <Form defaultValues={defaultValues} onSubmit={() => undefined}>
        <GridBox columnGap={colGap} gridTemplateColumns="7fr 1fr" mt={32}>
          <TextInput name={FIELD_NAMES.name} />
          <NumberInput max={10} min={0} name={FIELD_NAMES.level} />
        </GridBox>
        <GridBox columnGap={colGap} columns={4}>
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
          <TextInput name={FIELD_NAMES.paths.master_path} />
        </GridBox>
        <GridBox alignItems="start" columnGap={colGap}>
          <TextAreaInput name={FIELD_NAMES.professions} />
          <TextAreaInput name={FIELD_NAMES.languages} />
        </GridBox>
        <GridBox columnGap={colGap} columns={4}>
          {ATTRIBUTES.map((a) => (
            <AttributeInput key={a} name={a} />
          ))}
        </GridBox>
      </Form>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
