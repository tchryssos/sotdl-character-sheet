import styled from '@emotion/styled';
import DOMPurify from 'dompurify';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { createUserApiRoute, USERS_API_ROUTE } from '~/constants/routing/api';
import { createUsersRoute } from '~/constants/routing/shared';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { PatchUserData } from '~/pages/api/users/[id]';
import { StrictUser } from '~/typings/user';

import { FlexBox } from '../box/FlexBox';
import { LoadingButton } from '../buttons/LoadingButton';
import { Autocomplete } from '../form/Autocomplete';
import { FormSection } from '../form/containers/FormSection';
import { Form, FormBox } from '../form/Form';
import { SelectInput } from '../form/SelectInput';
import { TextInput } from '../form/TextInput';
import { Link } from '../Link';
import { Text } from '../Text';

const RolesSection = styled(FormSection)`
  width: 100%;
  height: unset;
  overflow: visible;
`;

interface UserSelectProps {
  users: StrictUser[] | null;
  setActiveUser: (u: StrictUser | null) => void;
  activeUser: StrictUser | null;
  isLoading: boolean;
  getUsers: (search: string) => Promise<StrictUser[]>;
}

function UserSelect({
  users,
  setActiveUser,
  activeUser,
  isLoading,
  getUsers,
}: UserSelectProps) {
  const { reset } = useFormContext();

  useEffect(() => {
    if (activeUser) {
      reset(activeUser);
    }
  }, [reset, activeUser]);

  const onValChange = debounce(async (val?: string) => {
    const newUsers = await getUsers(val || '');
    const match = newUsers.find((u) => u.email === val);
    if (match) {
      setActiveUser(match);
    } else if (activeUser) {
      setActiveUser(null);
    }
  }, 333);

  return (
    <Autocomplete
      isLoading={isLoading}
      items={
        users === null
          ? []
          : [
              ...users.map((u) => ({
                label: u.email,
                value: String(u.id),
              })),
            ]
      }
      label="Find User"
      onValueChange={onValChange}
    />
  );
}

interface UserDataProps {
  activeUser: StrictUser | null;
}

const UserLink = styled(Link)`
  width: fit-content;
`;

function UserData({ activeUser }: UserDataProps) {
  if (!activeUser) {
    return null;
  }

  return (
    <FlexBox flexDirection="column" gap={8}>
      <FlexBox flexDirection="column">
        {Object.keys(activeUser).map((k) => {
          if ((k as keyof StrictUser) === 'authId') {
            return null;
          }
          return (
            <Text as="p" key={k}>
              <Text color="textAccent">{k}:</Text>{' '}
              {String(activeUser[k as keyof StrictUser])}
            </Text>
          );
        })}
      </FlexBox>
      <UserLink href={createUsersRoute(activeUser.id)} underline>
        <Text>Link to Profile</Text>
      </UserLink>
    </FlexBox>
  );
}

type UserAdmin = Omit<PatchUserData, 'email'>;

export function User() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  const [users, setUsers] = useState<StrictUser[] | null>(null);
  const [activeUser, setActiveUser] = useState<StrictUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async (search: string) => {
    setIsLoading(true);
    let returnData: StrictUser[] = [];
    const res = await fetch(
      `${USERS_API_ROUTE}${search ? `?search=${search}` : ''}`,
      { method: 'GET' }
    );
    if (res.status >= 200 && res.status <= 300) {
      returnData = await res.json();
      setUsers(returnData);
    }
    setIsLoading(false);
    return returnData;
  };

  const onSubmit = async (values: UserAdmin) => {
    if (activeUser) {
      setIsLoading(true);
      const resp = await fetch(createUserApiRoute(activeUser.id), {
        method: 'PATCH',
        body: JSON.stringify({
          role: values.role,
          isPaid: values.isPaid,
          displayName: DOMPurify.sanitize(values.displayName),
          imageUrl: DOMPurify.sanitize(values.imageUrl),
        } as PatchUserData),
      });
      if (resp.status >= 200 && resp.status <= 300) {
        const updatedUser: StrictUser = await resp.json();
        setActiveUser(updatedUser);
      }
      setIsLoading(false);
    }
  };

  return (
    <Form<UserAdmin>
      defaultValues={{ role: 'player', isPaid: 'false' }}
      noStyles
      onSubmit={onSubmit}
    >
      <RolesSection
        columns={isLessThanSm ? 1 : 2}
        overflow="visible"
        title="Edit User"
      >
        <FlexBox flexDirection="column" gap={8}>
          <UserSelect
            activeUser={activeUser}
            getUsers={getUsers}
            isLoading={isLoading}
            setActiveUser={setActiveUser}
            users={users}
          />
          <UserData activeUser={activeUser} />
        </FlexBox>
        {activeUser && (
          <FormBox>
            <TextInput<UserAdmin> alwaysEditable name="displayName" />
            <SelectInput<UserAdmin>
              alwaysEditable
              name="role"
              options={[
                { value: 'player', label: 'Player' },
                { value: 'admin', label: 'Admin' },
              ]}
            />
            <SelectInput<UserAdmin>
              alwaysEditable
              label="Is Paid User?"
              name="isPaid"
              options={[
                { value: 'true', label: 'Paid' },
                { value: 'false', label: 'Not Paid' },
              ]}
            />
            <TextInput<UserAdmin> alwaysEditable name="imageUrl" />
            <LoadingButton label="Submit" loading={isLoading} type="submit" />
          </FormBox>
        )}
      </RolesSection>
    </Form>
  );
}
