import styled from '@emotion/styled';
import { rulebook } from '@prisma/client';
import { useState } from 'react';

import { fetchRulebook } from '~/logic/api/client/fetchRulebook';

import { TextButton } from '../buttons/TextButton';
import { Form, FormBox } from '../form/Form';
import { FormSection } from '../form/FormSection';
import { TextAreaInput } from '../form/TextAreaInput';
import { TextInput } from '../form/TextInput';

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

export const Rulebooks: React.FC = () => {
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
    <Form<NewRulebook>
      defaultValues={defaultRulebook}
      noStyles
      onSubmit={onSubmit}
    >
      <RulebookSection title="Edit Rulebooks">
        <FormBox>
          <TextInput<NewRulebook> label="Name" name="fullName" />
          <TextInput<NewRulebook> label="Abbreviation" name="name" />
          <TextAreaInput<NewRulebook> name="description" />
          <TextButton label="Submit" type="submit" />
        </FormBox>
      </RulebookSection>
    </Form>
  );
};
