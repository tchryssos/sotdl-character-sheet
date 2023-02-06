import { FlexBox } from '~/components/box/FlexBox';
import { Check } from '~/components/icons/Check';
import { Close } from '~/components/icons/Close';
import { Info } from '~/components/icons/Info';
import { Notification } from '~/logic/contexts/notificationsContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

interface NotificationIconProps {
  type: Notification['type'];
}

export function NotificationIcon({ type }: NotificationIconProps) {
  const size = pxToRem(40);
  return (
    <FlexBox height={size} width={size}>
      {type === 'error' && <Close color="danger" title="error" />}
      {type === 'info' && <Info color="text" title="info" />}
      {type === 'success' && <Check color="success" title="error" />}
    </FlexBox>
  );
}
