import { BaseDialog } from '~/components/dialog/BaseDialog';
import { Text } from '~/components/Text';
import { LoginItem } from '~/typings/loginItems';

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
      open
      size="full"
    >
      <Text as="h2" id={labeledById}>
        LOGIN ITEMS
      </Text>
      <Text as="p">
        Something something something please do these login items now that you
        an thank you
      </Text>
    </BaseDialog>
  );
}
