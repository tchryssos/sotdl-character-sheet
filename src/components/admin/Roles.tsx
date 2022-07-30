import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { USERS_API_ROUTE } from '~/constants/routing/api';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { StrictUser } from '~/typings/user';

import { Form, FormBox } from '../form/Form';
import { FormSection } from '../form/FormSection';
import { SelectInput } from '../form/SelectInput';
import { LoadingSpinner } from '../LoadingSpinner';

const RulebookSection = styled(FormSection)`
  width: 100%;
  height: unset;
`;

interface UserSelectProps {
  users: StrictUser[];
  setActiveUser: (u: StrictUser) => void;
  activeUser: StrictUser | null;
  isLoading: boolean;
}

const UserSelect: React.FC<UserSelectProps> = ({
  users,
  setActiveUser,
  activeUser,
  isLoading,
}) => {
  const { reset } = useFormContext();

  useEffect(() => {
    if (activeUser) {
      reset(activeUser);
    }
  }, [reset, activeUser]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const u = users.find((us) => us.id === parseInt(e.target.value, 10));
    if (u) {
      setActiveUser(u);
    }
  };

  if (!users.length && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SelectInput
      disabled={isLoading}
      label="User"
      options={users.map((u) => ({
        label: u.email,
        value: String(u.id),
      }))}
      placeholder="Select a User"
      onChange={onChange}
    />
  );
};

type UserRole = Pick<StrictUser, 'role'>;

export const Roles: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');
  const [users, setUsers] = useState<StrictUser[]>([]);
  const [activeUser, setActiveUser] = useState<StrictUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      const res = await fetch(USERS_API_ROUTE, { method: 'GET' });
      const data = await res.json();
      setUsers(data);
      setIsLoading(false);
    };

    getUsers();
  }, []);

  const onSubmit = () => {
    const test = '';
  };

  return (
    <Form<UserRole>
      defaultValues={{ role: 'player' }}
      noStyles
      onSubmit={onSubmit}
    >
      <RulebookSection columns={isLessThanSm ? 1 : 2} title="Edit User Roles">
        <UserSelect
          activeUser={activeUser}
          isLoading={isLoading}
          setActiveUser={setActiveUser}
          users={users}
        />
        {activeUser && (
          <FormBox>
            <SelectInput
              name="role"
              options={[
                { value: 'player', label: 'Player' },
                { value: 'admin', label: 'Admin' },
              ]}
            />
          </FormBox>
        )}
      </RulebookSection>
    </Form>
  );
};
