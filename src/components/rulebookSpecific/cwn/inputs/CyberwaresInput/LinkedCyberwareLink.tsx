import { lowerCase } from 'lodash';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { Link } from '~/components/Link';
import { SetTabContext } from '~/components/tabs/Tabs';
import { Text } from '~/components/Text';
import { CWN_TAB_LABELS, DEFAULT_VALUES, TabLabel } from '~/constants/cwn/form';
import { CwnCharacterData, CwnCyberware } from '~/typings/cwn/characterData';

interface LinkedCyberwareLinkProps {
  id: string;
  cyberware?: CwnCyberware | null;
}

export function LinkedCyberwareLink({
  id,
  cyberware,
}: LinkedCyberwareLinkProps) {
  const { asPath } = useRouter();
  const setTab = useContext(SetTabContext);
  const { getValues } = useFormContext<CwnCharacterData>();
  let linkedCyberware = cyberware;

  if (cyberware === undefined) {
    const cyberwares = getValues('cyberware');
    linkedCyberware = cyberwares.find((c) => c.id === id);
  }

  if (!linkedCyberware) {
    return null;
  }

  const basePath = asPath.split('?')[0];
  const label: TabLabel = 'Equipment';
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
        via Cyberware
      </Text>
    </Link>
  );
}
