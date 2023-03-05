import { useState } from 'react';

import { BaseDialog } from '~/components/dialog/BaseDialog';
import { Text } from '~/components/Text';
import { LoginItem } from '~/typings/loginItems';

import { LoginFormItem } from './LoginFormItem';

interface LoginItemsDialogProps {
  loginItems: LoginItem[];
}

const describedById = 'login-dialog-description';
const labeledById = 'login-dialog-title';

export function LoginItemsDialog({ loginItems }: LoginItemsDialogProps) {
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  if (!loginItems.length || loginItems.every((item) => item.completed)) {
    return null;
  }

  return (
    <BaseDialog
      aria-describedby={labeledById}
      aria-labelledby={describedById}
      gap={8}
      open
      size="md"
    >
      <Text as="h2" id={describedById} variant="title-sm">
        Complete your profile
      </Text>
      {loginItems.length !== 1 && (
        <Text as="p" variant="body">
          Step {activeItemIdx + 1} of {loginItems.length}:{' '}
          {loginItems[activeItemIdx].title}
        </Text>
      )}
      {loginItems.map((item, i) => (
        <LoginFormItem
          activeIdx={activeItemIdx}
          idx={i}
          item={item}
          key={item.id}
          setActiveIdx={setActiveItemIdx}
        />
      ))}
      {activeItemIdx + 1 === loginItems.length && (
        <Text as="p" variant="body-xs">
          You&apos;ll need to log out and log back in to see the changes to your
          profile
        </Text>
      )}
    </BaseDialog>
  );
}
