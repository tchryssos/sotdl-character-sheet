import styled from '@emotion/styled';
import { rulebook } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { NEW_ID } from '~/constants/routing/shared';
import { fetchRulebook } from '~/logic/api/client/fetchRulebook';
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

const RulebookSection = styled(FormSection)`
  width: 100%;
  height: unset;
`;

const Rulebooks: React.FC = () => {
  const [activeRulebook, setActiveRulebook] =
    useState<Partial<rulebook>>(defaultRulebook);

  const onSubmit = async (values: NewRulebook | rulebook) => {
    let rulebookBody;

    if (!activeRulebook.id) {
      rulebookBody = {
        method: 'POST' as const,
        rulebook: values as NewRulebook,
      };
    } else {
      rulebookBody = {
        method: 'PATCH' as const,
        rulebook: values as rulebook,
        id: activeRulebook.id,
      };
    }
    await fetchRulebook(rulebookBody);
  };

  return (
    <RulebookSection title="Edit Rulebooks">
      <FlexBox column>
        <Form<NewRulebook> defaultValues={defaultRulebook} onSubmit={onSubmit}>
          <TextInput<NewRulebook> label="Name" name="fullName" />
          <TextInput<NewRulebook> label="Abbreviation" name="name" />
          <TextAreaInput<NewRulebook> name="description" />
          <TextButton label="Submit" type="submit" />
        </Form>
      </FlexBox>
    </RulebookSection>
  );
};

const AdminPage: React.FC = () => (
  <Layout meta="rpgsheet dot games admin console" title="Admin Console">
    <AdminNav />
    <Rulebooks />
  </Layout>
);

export default AdminPage;
