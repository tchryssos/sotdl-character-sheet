import styled from '@emotion/styled';
import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Form } from '~/components/form/Form';
import { FormSection } from '~/components/form/FormSection';
import { Layout } from '~/components/meta/Layout';
import { ColorModeToggle } from '~/components/nav/ColorModeToggle';
import { ThemeContext } from '~/logic/contexts/themeContext';

const SettingsWrapper = styled(GridBox)`
  width: 100%;
`;

const SettingsPage: React.FC = () => {
  const { colorMode } = useContext(ThemeContext);
  const defaulValues = {
    colorMode,
  };

  return (
    <Layout meta="rpg sheet settings page" title="Settings">
      <SettingsWrapper columns={1}>
        <Form defaultValues={defaulValues} onSubmit={() => null}>
          <FormSection canToggleVisibility={false} title="Personalization">
            <ColorModeToggle />
          </FormSection>
        </Form>
      </SettingsWrapper>
    </Layout>
  );
};

export default SettingsPage;
