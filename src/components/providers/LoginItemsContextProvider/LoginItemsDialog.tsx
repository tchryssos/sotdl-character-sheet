import { BaseDialog } from '~/components/dialog/BaseDialog';
import { Text } from '~/components/Text';
import { LoginItem } from '~/typings/loginItems';

import { LoginFormItem } from './LoginFormItem';

interface LoginItemsDialogProps {
  loginItems: LoginItem[];
}

const labeledById = 'login-dialog-title';
const describedById = 'login-dialog-description';

export function LoginItemsDialog({ loginItems }: LoginItemsDialogProps) {
  if (!loginItems.length || loginItems.every((item) => item.completed)) {
    return null;
  }

  return (
    <BaseDialog
      aria-describedby={labeledById}
      aria-labelledby={describedById}
      open={false}
      size="full"
    >
      <Text as="h2" id={labeledById}>
        {loginItems.length === 1 ? 'one more thing' : 'a few more things'}
      </Text>
      <Text as="p">
        rpgsheet requires additional data to consider your account
        &quot;complete&quot;. Please complete the following to proceed.
      </Text>
      {loginItems.map((item) => (
        <LoginFormItem item={item} key={item.id} />
      ))}
    </BaseDialog>
  );
}
