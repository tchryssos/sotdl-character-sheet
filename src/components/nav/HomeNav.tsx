import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { NavContext } from '~/logic/contexts/navContext';

export const HomeNav: React.FC = () => {
  const { setNavTitle, portalRef } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('rpgs');
  }, [setNavTitle]);

  if (portalRef.current) {
    return createPortal(<div>whatever</div>, portalRef.current);
  }
  return null;
};
