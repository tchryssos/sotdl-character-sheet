import { useContext, useEffect } from 'react';

import { NavContext } from '~/logic/contexts/navContext';

export const SettingsNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('Settings');
  }, [setNavTitle]);

  return null;
};
