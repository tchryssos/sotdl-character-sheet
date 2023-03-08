import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { IconImageUrlInput } from '~/components/form/IconImageUrlInput';
import { TextInput } from '~/components/form/TextInput';
import { Layout } from '~/components/meta/Layout';
import { SettingsNav } from '~/components/nav/SettingsNav';
import { ColorMode } from '~/components/settings/ColorMode';
import { ThemeContext } from '~/logic/contexts/themeContext';
import { prisma } from '~/logic/utils/prisma';
import { StrictSessionUser, StrictUser } from '~/typings/user';

export const colorModeKey = 'colorMode';

interface SettingsPageProps {
  userMeta?: Pick<StrictUser, 'imageUrl' | 'displayName' | 'id'>;
}

function SettingsPage({ userMeta }: SettingsPageProps) {
  const { colorMode } = useContext(ThemeContext);
  const defaultValues = {
    [colorModeKey]: colorMode,
    ...userMeta,
  };

  return (
    <Layout meta="rpg sheet settings page" title="Settings">
      <SettingsNav />
      <GridBox columns={1} width="100%">
        <Form defaultValues={defaultValues} onSubmit={() => null}>
          <FormSection
            canToggleVisibility={false}
            columns={1}
            isCollapsible={false}
            title="Profile"
          >
            <TextInput<Pick<StrictSessionUser, 'displayName'>>
              alwaysEditable
              label="Display Name"
              name="displayName"
            />
            <IconImageUrlInput name="imageUrl" />
          </FormSection>
          <FormSection
            canToggleVisibility={false}
            isCollapsible={false}
            title="Personalization"
          >
            <ColorMode colorModeKey={colorModeKey} />
          </FormSection>
        </Form>
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
