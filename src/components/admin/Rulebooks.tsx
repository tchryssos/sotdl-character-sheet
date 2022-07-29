import styled from '@emotion/styled';
import { rulebook } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { NEW_ID } from '~/constants/routing/shared';
import { fetchRulebook } from '~/logic/api/client/fetchRulebook';

import { TextButton } from '../buttons/TextButton';
import { Form, FormBox } from '../form/Form';
import { FormSection } from '../form/FormSection';
import { SelectInput } from '../form/SelectInput';
import { TextAreaInput } from '../form/TextAreaInput';
import { TextInput } from '../form/TextInput';

type NewRulebook = Omit<rulebook, 'id' | 'createdOn' | 'lastModifiedOn'>;

const defaultRulebook: NewRulebook = {
  fullName: '',
  name: '',
  description: '',
};

interface RulebookSelectProps {
  rulebooks: rulebook[];
  setActiveRulebook: (rb: rulebook | NewRulebook) => void;
  activeRulebook: rulebook | NewRulebook;
}

const RulebookSelect: React.FC<RulebookSelectProps> = ({
  rulebooks,
  setActiveRulebook,
  activeRulebook,
}) => {
  const { reset } = useFormContext();

  useEffect(() => {
    reset(activeRulebook);
  }, [reset, activeRulebook]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === NEW_ID) {
      setActiveRulebook(defaultRulebook);
    }
    const rb = rulebooks.find(
      (book) => book.id === parseInt(e.target.value, 10)
    );
    if (rb) {
      setActiveRulebook(rb);
    }
  };

  return (
    <SelectInput
      label="Rulebook"
      options={[
        { label: 'New Rulebook', value: NEW_ID },
        ...rulebooks.map((rb) => ({
          value: String(rb.id),
          label: rb.fullName,
        })),
      ]}
      onChange={onChange}
    />
  );
};

const RulebookSection = styled(FormSection)`
  width: 100%;
  height: unset;
`;

export const Rulebooks: React.FC = () => {
  const [rulebooks, setRulebooks] = useState<rulebook[]>([]);
  const [activeRulebook, setActiveRulebook] = useState<rulebook | NewRulebook>(
    defaultRulebook
  );

  const onSubmit = async (values: NewRulebook | rulebook) => {
    let rulebookBody;

    if ((activeRulebook as rulebook).id) {
      rulebookBody = {
        method: 'PATCH' as const,
        rulebook: {
          ...activeRulebook,
          ...values,
        } as rulebook,
        id: (activeRulebook as rulebook).id,
      };
    } else {
      rulebookBody = {
        method: 'POST' as const,
        rulebook: values as NewRulebook,
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
        <RulebookSelect
          activeRulebook={activeRulebook}
          rulebooks={rulebooks}
          setActiveRulebook={setActiveRulebook}
        />
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
