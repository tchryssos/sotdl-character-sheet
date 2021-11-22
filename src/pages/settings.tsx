import styled from '@emotion/styled';
import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { Layout } from '~/components/meta/Layout';
import { SettingsNav } from '~/components/nav/SettingsNav';
import { ColorMode } from '~/components/settings/ColorMode';
import { ThemeContext } from '~/logic/contexts/themeContext';

const SettingsWrapper = styled(GridBox)`
  width: 100%;
`;

export const colorModeKey = 'colorMode';

const SettingsPage: React.FC = () => {
  const { colorMode } = useContext(ThemeContext);
  const defaulValues = {
    [colorModeKey]: colorMode,
  };

  return (
    <Layout meta="rpg sheet settings page" title="Settings">
      <SettingsNav />
      <SettingsWrapper columns={1}>
        <Form defaultValues={defaulValues} onSubmit={() => null}>
          <FormSection canToggleVisibility={false} title="Personalization">
            <ColorMode colorModeKey={colorModeKey} />
          </FormSection>
        </Form>
      </SettingsWrapper>
    </Layout>
  );
};

export default SettingsPage;
