import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { LoadingButton } from '~/components/buttons/LoadingButton';
import { Form } from '~/components/form/Form';
import { Text } from '~/components/Text';
import { LoginItemsContext } from '~/logic/contexts/loginItemsContext';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { createNotification } from '~/logic/utils/notifications';
import { LoginItem, LoginItemValues } from '~/typings/loginItems';
import { StrictSessionUser } from '~/typings/user';

import { FormFieldSwitch } from './LoginItemFormFields/FormFieldSwitch';

interface LoginFormItemProps {
  item: LoginItem;
  activeIdx: number;
  idx: number;
  setActiveIdx: (idx: number) => void;
}

const SubmitButton = styled(LoadingButton)`
  ${({ theme }) => theme.breakpoints.sm} {
    width: fit-content;
  }
`;

interface SubmitProps {
  item: LoginItem;
  activeIdx: number;
  totalLength: number;
  loading: boolean;
}
function Submit({ item, activeIdx, totalLength, loading }: SubmitProps) {
  const { watch } = useFormContext();

  const hasValue = watch(item.type);

  return (
    <SubmitButton
      disabled={!hasValue}
      label={`Submit & ${
        activeIdx + 1 === totalLength ? 'Complete' : 'Continue'
      }`}
      loading={loading}
      type="submit"
    />
  );
}

export function LoginFormItem({
  item,
  idx,
  activeIdx,
  setActiveIdx,
}: LoginFormItemProps) {
  const { setLoginItems, loginItems } = useContext(LoginItemsContext);
  const { addNotifications } = useContext(NotificationsContext);
  const [loading, setIsLoading] = useState(false);
  const atLeastSm = useBreakpointsAtLeast('sm');
  const { user } = useUser();

  if (idx !== activeIdx) {
    return null;
  }

  const onSubmit = async (values: LoginItemValues) => {
    setIsLoading(true);
    let resp: Response;
    if (item.onSubmit === undefined) {
      resp = await item.createOnSubmit(user as StrictSessionUser)(values);
    } else {
      resp = await item.onSubmit(values);
    }
    if (resp.ok) {
      const newItems = [...loginItems];
      const index = newItems.findIndex((i) => i.id === item.id);
      newItems[index].completed = true;
      setLoginItems(newItems);
      if (activeIdx + 1 < loginItems.length) {
        setActiveIdx(activeIdx + 1);
      }
    } else {
      addNotifications([
        createNotification({
          type: 'error',
          title:
            'Something went wrong updating your profile. Please try again.',
        }),
      ]);
    }
    setIsLoading(false);
  };

  return (
    <Form defaultValues={item.defaultValues} noStyles onSubmit={onSubmit}>
      <FlexBox flexDirection="column" gap={8}>
        <Text as="p" variant={atLeastSm ? 'body' : 'body-sm'}>
          {item.description}
        </Text>
        <FormFieldSwitch item={item} />
        <Submit
          activeIdx={activeIdx}
          item={item}
          loading={loading}
          totalLength={loginItems.length}
        />
      </FlexBox>
    </Form>
  );
}
