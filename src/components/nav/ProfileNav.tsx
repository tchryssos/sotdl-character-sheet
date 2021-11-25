import { useContext, useEffect } from 'react';

import { NavContext } from '~/logic/contexts/navContext';

interface ProfileNavProps {
  name?: string;
}

export const ProfileNav: React.FC<ProfileNavProps> = ({ name }) => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle(name || '');
  }, [setNavTitle, name]);

  return null;
};
