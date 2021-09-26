/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import startCase from 'lodash.startcase';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { Form as FormComponent } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { ArmorInput } from '~/components/form/gameInputs/ArmorInput';
import { AttributeInput } from '~/components/form/gameInputs/AttributeInput';
import { CurrencyInputs } from '~/components/form/gameInputs/CurrencyInputs';
import { EvilInputs } from '~/components/form/gameInputs/EvilInputs';
import { ExpertPathInput } from '~/components/form/gameInputs/ExpertPathInput';
import { FortuneFateInputs } from '~/components/form/gameInputs/FortuneFateInputs';
import { HealthInputs } from '~/components/form/gameInputs/HealthInputs';
import { HistoryInputs } from '~/components/form/gameInputs/HistoryInputs';
import { MasterPathInput } from '~/components/form/gameInputs/MasterPathInput';
import { NovicePathInput } from '~/components/form/gameInputs/NovicePathInput';
import { PerceptionInput } from '~/components/form/gameInputs/PerceptionInput';
import { PhysicalTraitsInputs } from '~/components/form/gameInputs/PhysicalTraitsInputs';
import { WeaponInput } from '~/components/form/gameInputs/WeaponInput';
import { NumberInput } from '~/components/form/NumberInput';
import { SelectInput } from '~/components/form/SelectInput';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { FIELD_NAMES } from '~/constants/form';
import { ANCESTRIES, ATTRIBUTES } from '~/constants/game';

const Form = styled(FormComponent)`
  max-width: ${({ theme }) => theme.breakpointValues.lg}px;
`;

const Home: React.FC = () => (
  <Layout>
    <FlexBox center flex={1}>
      <Form onSubmit={() => undefined}>
        <GridBox gridTemplateColumns="7fr 1fr">
          <TextInput name={FIELD_NAMES.name} />
          <NumberInput max={10} min={0} name={FIELD_NAMES.level} />
        </GridBox>
        <HistoryInputs />
        <FormSection columns={4} title="Attributes">
          {ATTRIBUTES.map((a) => (
            <AttributeInput key={a} name={a} />
          ))}
        </FormSection>
        <GridBox>
          <FormSection title="Defenses">
            <HealthInputs />
          </FormSection>
          <GridBox>
            <PhysicalTraitsInputs />
            <FormSection title="Metaphysical Traits">
              <EvilInputs />
              <FortuneFateInputs />
            </FormSection>
          </GridBox>
        </GridBox>
        <ArmorInput />
        <WeaponInput />
        <CurrencyInputs />
      </Form>
    </FlexBox>
  </Layout>
);

// eslint-disable-next-line import/no-default-export
export default Home;
