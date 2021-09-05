/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { Form } from '~/components/form/Form';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { Body } from '~/components/typography/Body';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';

const Home: React.FC = () => {
  const breakpoints = useContext(BreakpointsContext);
  return (
    <Layout>
      <Form defaultValues={{ level: 1 }} onSubmit={() => undefined}>
        <FlexBox column>
          <FlexBox>
            <TextInput name="name" />
            <NumberInput max={10} min={1} name="level" />
          </FlexBox>
        </FlexBox>
      </Form>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
