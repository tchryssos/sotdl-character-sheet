import { useContext, useEffect } from 'react';

import { NavContext } from '~/logic/contexts/navContext';

export const HomeNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('rsdg');
  }, [setNavTitle]);

  return null;
};
