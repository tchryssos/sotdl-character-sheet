import styled from '@emotion/styled';
import { rulebook } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ALL_RULEBOOKS_API_PATH } from '~/constants/routing/api';
import { NEW_ID } from '~/constants/routing/shared';
import { fetchRulebook } from '~/logic/api/client/fetchRulebook';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { LoadingButton } from '../buttons/LoadingButton';
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
  isLoading: boolean;
}

const RulebookSelect: React.FC<RulebookSelectProps> = ({
  rulebooks,
  setActiveRulebook,
  activeRulebook,
  isLoading,
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
      disabled={isLoading}
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
  const isLessThanSm = useBreakpointsLessThan('sm');

  const [rulebooks, setRulebooks] = useState<rulebook[]>([]);
  const [activeRulebook, setActiveRulebook] = useState<rulebook | NewRulebook>(
    defaultRulebook
  );
  const [isLoading, setIsLoading] = useState(false);

  const getRulebooks = async () => {
    setIsLoading(true);
    const resp = await fetch(ALL_RULEBOOKS_API_PATH, {
      method: 'GET',
    });

    const respData = await resp.json();

    setRulebooks(respData);
    setIsLoading(false);
  };

  useEffect(() => {
    getRulebooks();
  }, []);

  const onSubmit = async (values: NewRulebook | rulebook) => {
    setIsLoading(true);
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
    await getRulebooks();
  };

  return (
    <Form<NewRulebook>
      defaultValues={defaultRulebook}
      noStyles
      onSubmit={onSubmit}
    >
      <RulebookSection columns={isLessThanSm ? 1 : 2} title="Edit Rulebooks">
        <RulebookSelect
          activeRulebook={activeRulebook}
          isLoading={isLoading}
          rulebooks={rulebooks}
          setActiveRulebook={setActiveRulebook}
        />
        <FormBox>
          <TextInput<NewRulebook> alwaysEditable label="Name" name="fullName" />
          <TextInput<NewRulebook>
            alwaysEditable
            label="Abbreviation"
            name="name"
          />
          <TextAreaInput<NewRulebook> alwaysEditable name="description" />
          <LoadingButton label="Submit" loading={isLoading} type="submit" />
        </FormBox>
      </RulebookSection>
    </Form>
  );
};
