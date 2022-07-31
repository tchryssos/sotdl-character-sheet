import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { USERS_API_ROUTE } from '~/constants/routing/api';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { StrictUser } from '~/typings/user';

import { LoadingButton } from '../buttons/LoadingButton';
import { Autocomplete } from '../form/Autocomplete';
import { Form, FormBox } from '../form/Form';
import { FormSection } from '../form/FormSection';
import { Label } from '../form/Label';
import { SelectInput } from '../form/SelectInput';
import { LoadingSpinner } from '../LoadingSpinner';

const RolesSection = styled(FormSection)`
  width: 100%;
  height: unset;
  overflow: visible;
`;

const UsersSpinner = styled(LoadingSpinner)`
  max-height: ${({ theme }) => theme.spacing[48]};
`;

interface UserSelectProps {
  users: StrictUser[] | null;
  setActiveUser: (u: StrictUser) => void;
  activeUser: StrictUser | null;
  isLoading: boolean;
  getUsers: (search: string) => void;
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

  // const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const u = users.find((us) => us.id === parseInt(e.target.value, 10));
  //   if (u) {
  //     setActiveUser(u);
  //   }
  // };

  const onValChange = debounce((val?: string) => {
    getUsers(val || '');
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

  const getUsers = async (search?: string) => {
    setIsLoading(true);
    const res = await fetch(
      `${USERS_API_ROUTE}${search ? `?search=${search}` : ''}`,
      { method: 'GET' }
    );
    const data = await res.json();
    setUsers(data);
    setIsLoading(false);
  };

  const onSubmit = () => {
    const test = '';
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
