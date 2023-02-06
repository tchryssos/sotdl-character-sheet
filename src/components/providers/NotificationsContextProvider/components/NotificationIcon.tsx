import { FlexBox } from '~/components/box/FlexBox';
import { Check } from '~/components/icons/Check';
import { Danger } from '~/components/icons/Danger';
import { Info } from '~/components/icons/Info';
import { Notification } from '~/logic/contexts/notificationsContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

interface NotificationIconProps {
  type: Notification['type'];
}

const size = pxToRem(24);

export function NotificationIcon({ type }: NotificationIconProps) {
  return (
    <FlexBox height={size} width={size}>
      {type === 'error' && <Danger color="danger" title="error" />}
      {type === 'info' && <Info color="text" title="info" />}
      {type === 'success' && <Check color="success" title="error" />}
    </FlexBox>
  );
}
