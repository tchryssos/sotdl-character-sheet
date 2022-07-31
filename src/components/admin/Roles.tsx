import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { createUserApiRoute, USERS_API_ROUTE } from '~/constants/routing/api';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { PatchUserData } from '~/pages/api/users/[id]';
import { StrictUser } from '~/typings/user';

import { LoadingButton } from '../buttons/LoadingButton';
import { Autocomplete } from '../form/Autocomplete';
import { Form, FormBox } from '../form/Form';
import { FormSection } from '../form/FormSection';
import { SelectInput } from '../form/SelectInput';

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

const UserSelect: React.FC<UserSelectProps> = ({
  users,
  setActiveUser,
  activeUser,
  isLoading,
  getUsers,
}) => {
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
};

type UserRole = Pick<StrictUser, 'role'>;

export const Roles: React.FC = () => {
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

  const onSubmit = async (values: UserRole) => {
    if (activeUser) {
      setIsLoading(true);
      const resp = await fetch(createUserApiRoute(activeUser.id), {
        method: 'PATCH',
        body: JSON.stringify({
          email: activeUser.email,
          role: values.role,
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
    <Form<UserRole>
      defaultValues={{ role: 'player' }}
      noStyles
      onSubmit={onSubmit}
    >
      <RolesSection columns={isLessThanSm ? 1 : 2} title="Edit User Roles">
        <UserSelect
          activeUser={activeUser}
          getUsers={getUsers}
          isLoading={isLoading}
          setActiveUser={setActiveUser}
          users={users}
        />
        {activeUser && (
          <FormBox>
            <SelectInput<UserRole>
              alwaysEditable
              name="role"
              options={[
                { value: 'player', label: 'Player' },
                { value: 'admin', label: 'Admin' },
              ]}
            />
            <LoadingButton label="Submit" loading={isLoading} type="submit" />
          </FormBox>
        )}
      </RolesSection>
    </Form>
  );
};
