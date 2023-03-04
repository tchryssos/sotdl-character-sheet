import { startCase } from 'lodash';
import { useState } from 'react';

import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { TextInput } from '~/components/form/TextInput';
import { Text } from '~/components/Text';
import { LoginItem } from '~/typings/loginItems';

interface LoginFormItemProps {
  item: LoginItem;
}

export function LoginFormItem({ item }: LoginFormItemProps) {
  const [completed, setCompleted] = useState(false);

  const onSubmit = () => {
    setCompleted(true);
  };

  return (
    <Form defaultValues={item.defaultValues} noStyles onSubmit={onSubmit}>
      <FormSection
        canToggleVisibility={false}
        columns={1}
        title={startCase(item.type)}
      >
        <Text as="p" variant="body-sm">
          {item.description}
        </Text>
        <TextInput alwaysEditable label={item.title} name={item.type} />
      </FormSection>
    </Form>
  );
}
