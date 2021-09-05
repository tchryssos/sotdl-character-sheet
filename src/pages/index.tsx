/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import capitalize from 'lodash.capitalize';
import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { ANCESTRIES } from '~/constants/game';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';

const Home: React.FC = () => {
  const breakpoints = useContext(BreakpointsContext);
  return (
    <Layout>
      <Form defaultValues={{ level: 1 }} onSubmit={() => undefined}>
        <GridBox columnGap={16} gridTemplateColumns="3fr 1fr" mb={16} mt={32}>
          <TextInput label="Name" name="name" />
          <NumberInput label="Level" max={10} min={1} name="level" />
        </GridBox>
        <GridBox columnGap={8} columns={4} mb={16}>
          <SelectInput
            label="Ancestry"
            name="ancestry"
            options={ANCESTRIES.map((a) => ({
              label: capitalize(a),
              value: a,
            }))}
          />
          <TextInput label="Novice Path" name="novice_path" />
          <TextInput label="Expert Path" name="expert_path" />
          <TextInput label="Master Path" name="master_path" />
        </GridBox>
      </Form>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
