import styled from '@emotion/styled';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { LoadingPageSpinner } from '~/components/LoadingSpinner';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { Body } from '~/components/typography/Body';
import { fetchProfile } from '~/logic/api/client/fetchProfile';
import { isSuccessfulProfileResponse } from '~/typings/profiles.guards';
import { User } from '~/typings/user';

import FourOhFour from '../404';

const ProfileWrapper = styled(GridBox)`
  width: 100%;
`;

const ProfilePage = () => {
  const {
    query: { id },
  } = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { name, nickname } = profile?.authProviderData || {};
  const profileName = nickname || name;

  useEffect(() => {
    if (id) {
      const loadProfile = async () => {
        setIsLoading(true);
        const resp = await fetchProfile(id as string);
        if (isSuccessfulProfileResponse(resp)) {
          setProfile(resp);
        }
        setIsLoading(false);
      };

      loadProfile();
    }
  }, [id]);

  if (!isLoading && !profile) {
    return <FourOhFour />;
  }

  return (
    <Layout
      meta="rpg sheet profile"
      title={`${profileName ? `${profileName}'s ` : ''}Profile`}
    >
      {isLoading ? (
        <LoadingPageSpinner title="Profile loading" titleId="profile-loading" />
      ) : (
        <>
          <ProfileNav name={profileName} />
          <ProfileWrapper columns={1}>
            <FormSection canToggleVisibility={false} title="Profile Info">
              <Body>Some data</Body>
            </FormSection>
          </ProfileWrapper>
        </>
      )}
    </Layout>
  );
};

export default ProfilePage;
