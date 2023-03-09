import { getSession, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { useContext, useState } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { LoadingButton } from '~/components/buttons/LoadingButton';
import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { IconImageUrlInput } from '~/components/form/IconImageUrlInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { SettingsNav } from '~/components/nav/SettingsNav';
import { ColorMode } from '~/components/settings/ColorMode';
import { createUserApiRoute } from '~/constants/routing/api';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { ThemeContext } from '~/logic/contexts/themeContext';
import { createNotification } from '~/logic/utils/notifications';
import { prisma } from '~/logic/utils/prisma';
import { StrictSessionUser, StrictUser } from '~/typings/user';

import { Text } from '../components/Text';
import { PatchUserData } from './api/users/[id]';

export const colorModeKey = 'colorMode';

interface SettingsPageProps {
  userMeta?: Pick<StrictUser, 'imageUrl' | 'displayName' | 'id'>;
}

function PersonalizationForm() {
  const { colorMode } = useContext(ThemeContext);

  const personalizationValues = {
    [colorModeKey]: colorMode,
  };

  return (
    <Form defaultValues={personalizationValues} onSubmit={() => null}>
      <FormSection
        canToggleVisibility={false}
        isCollapsible={false}
        title="Personalization"
      >
        <ColorMode colorModeKey={colorModeKey} />
      </FormSection>
    </Form>
  );
}

interface ProfileFormProps extends Pick<SettingsPageProps, 'userMeta'> {}

function ProfileForm({ userMeta }: ProfileFormProps) {
  const { user: sessionUser } = useUser();
  const { addNotifications } = useContext(NotificationsContext);
  const [loading, setIsLoading] = useState(false);
  const profileValues = {
    ...userMeta,
  };

  const onSubmit = async (values: typeof profileValues) => {
    setIsLoading(true);
    try {
      const { id, email, isPaid, role } = sessionUser as StrictSessionUser;
      const resp = await fetch(createUserApiRoute(id), {
        method: 'PATCH',
        body: JSON.stringify({
          email,
          role,
          isPaid: String(isPaid),
          ...values,
        } as PatchUserData),
      });

      if (resp.ok) {
        addNotifications([
          createNotification({
            type: 'success',
            title: 'Profile updated',
            message: 'Your profile has been updated.',
          }),
        ]);
      } else {
        throw new Error('Profile error');
      }
    } catch {
      addNotifications([
        createNotification({
          type: 'error',
          title: 'Profile update error',
          message:
            'Something went wrong updating your profile. Please try again.',
        }),
      ]);
    }
    setIsLoading(false);
  };

  return (
    <Form defaultValues={profileValues} onSubmit={onSubmit}>
      <FormSection
        canToggleVisibility={false}
        columns={1}
        isCollapsible={false}
        title="Profile"
      >
        <Text as="p" fontStyle="italic" variant="body-sm">
          You may need to log out and log back in for changes to take effect.
        </Text>
        <Text as="p" fontStyle="italic" variant="body-sm">
          Your profile is public, so don&apos;t include anything you
          wouldn&apos;t want others to see.
        </Text>
        <TextInput<Pick<StrictSessionUser, 'displayName'>>
          alwaysEditable
          label="Display Name"
          name="displayName"
        />
        <IconImageUrlInput name="imageUrl" />
        <LoadingButton label="Save" loading={loading} type="submit" />
      </FormSection>
    </Form>
  );
}

function SettingsPage({ userMeta }: SettingsPageProps) {
  return (
    <Layout meta="rpg sheet settings page" title="Settings">
      <SettingsNav />
      <GridBox columns={1} width="100%">
        <ProfileForm userMeta={userMeta} />
        <PersonalizationForm />
      </GridBox>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (
    context
  ): Promise<{ props: SettingsPageProps }> => {
    const session = getSession(context.req, context.res);

    let user: StrictUser | undefined;

    if (session?.user) {
      const dbUser = await prisma.user.findUnique({
        where: {
          // Since session users aren't updated until login/logout I'm not sure
          // that the sessionUser alone is reliable to track changes made to users
          // mid session, so we grab the DB user to be safe
          authId: (session.user as StrictSessionUser).authProviderData.sub,
        },
      });
      user = (dbUser as StrictUser) || undefined;
    }

    return {
      props: {
        userMeta: user
          ? {
              imageUrl: user.imageUrl,
              displayName: user.displayName,
              id: user.id,
            }
          : undefined,
      },
    };
  },
});

export default SettingsPage;
