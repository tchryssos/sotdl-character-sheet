import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { Layout } from '~/components/meta/Layout';
import { SettingsNav } from '~/components/nav/SettingsNav';
import { ColorMode } from '~/components/settings/ColorMode';
import { ThemeContext } from '~/logic/contexts/themeContext';

export const colorModeKey = 'colorMode';

function SettingsPage() {
  const { colorMode } = useContext(ThemeContext);
  const defaultValues = {
    [colorModeKey]: colorMode,
  };

  return (
    <Layout meta="rpg sheet settings page" title="Settings">
      <SettingsNav />
      <GridBox columns={1} width="100%">
        <Form defaultValues={defaultValues} onSubmit={() => null}>
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

export default SettingsPage;
