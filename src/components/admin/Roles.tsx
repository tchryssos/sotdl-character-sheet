import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { User } from '~/typings/user';

import { Form, FormBox } from '../form/Form';
import { FormSection } from '../form/FormSection';
import { SelectInput } from '../form/SelectInput';

const RulebookSection = styled(FormSection)`
  width: 100%;
  height: unset;
`;

interface UserSelectProps {
  users: User[];
  setActiveUser: (u: User) => void;
  activeUser: User | null;
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

  return (
    <SelectInput
      disabled={isLoading}
      label="User"
      options={users.map((u) => ({
        label: u.authProviderData.nickname,
        value: String(u.id),
      }))}
      onChange={onChange}
    />
  );
};

type UserRole = Pick<User, 'role'>;

export const Roles: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
