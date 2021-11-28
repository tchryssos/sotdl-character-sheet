import { useContext, useEffect } from 'react';

import { NavContext } from '~/logic/contexts/navContext';

export const ProfileNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('Profile');
  }, [setNavTitle]);

  return null;
};
