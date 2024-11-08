import { lowerCase } from 'lodash';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { Link } from '~/components/Link';
import { SetTabContext } from '~/components/tabs/SetTabContextProvider';
import { Text } from '~/components/Text';
import { CWN_TAB_LABELS, DEFAULT_VALUES, TabLabel } from '~/constants/cwn/form';
import { CyberwareAs } from '~/constants/cwn/game';

interface LinkedWeaponOrArmorLinkProps {
  id: string;
  cyberwareAs: CyberwareAs | null;
}

export function LinkedWeaponOrArmorLink({
  id,
  cyberwareAs,
}: LinkedWeaponOrArmorLinkProps) {
  const { asPath } = useRouter();
  const { setTab } = useContext(SetTabContext);

  if (!cyberwareAs) {
    return null;
  }

  const basePath = asPath.split('?')[0];
  const label: TabLabel = 'Combat';
  const href = `${basePath}?rulebook=${DEFAULT_VALUES.type}&tab=${lowerCase(
    label
  )}#${id}`;

  return (
    <Link
      href={href}
      underline
      onClick={() => {
        setTab(
          null,
          CWN_TAB_LABELS.findIndex((l) => l.label === label)
        );
      }}
    >
      <Text color="text" variant="body-xs">
        Linked {cyberwareAs === 'weapons' ? 'weapon' : 'armor'}
      </Text>
    </Link>
  );
}
