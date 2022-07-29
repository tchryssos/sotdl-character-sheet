import styled from '@emotion/styled';
import { rulebook } from '@prisma/client';
import { useContext, useEffect } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { NavContext } from '~/logic/contexts/navContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

const AdminNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('Admin Console');
  }, [setNavTitle]);

  return null;
};

type NewRulebook = Omit<rulebook, 'id' | 'createdOn' | 'lastModifiedOn'>;

const defaultRulebook: NewRulebook = {
  fullName: '',
  name: '',
  description: '',
};

const RulebookSubmit = styled(TextButton)`
  width: 30%;
  min-width: ${pxToRem(256)};
`;

const AdminRulebookForm: React.FC = () => {
  const onSubmit = (values: NewRulebook) => {
    // console.log(values);
  };

  return (
    <FlexBox column width="100%">
      <Form<NewRulebook> defaultValues={defaultRulebook} onSubmit={onSubmit}>
        <FormSection columns={1} title="Add a Rulebook">
          <TextInput<NewRulebook> label="Name" name="fullName" />
          <TextInput<NewRulebook> label="Abbreviation" name="name" />
          <TextAreaInput<NewRulebook> name="description" />
          <RulebookSubmit label="Submit" type="submit" />
        </FormSection>
      </Form>
    </FlexBox>
  );
};

const AdminPage: React.FC = () => (
  <Layout meta="rpgsheet dot games admin console" title="Admin Console">
    <AdminNav />
    <AdminRulebookForm />
  </Layout>
);

export default AdminPage;
