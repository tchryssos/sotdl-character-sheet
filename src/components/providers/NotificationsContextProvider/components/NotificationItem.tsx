import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { IconButton } from '~/components/buttons/IconButton';
import { Close } from '~/components/icons/Close';
import { Body } from '~/components/typography/Body';
import { SubBody } from '~/components/typography/SubBody';
import {
  Notification,
  NotificationsContext,
} from '~/logic/contexts/notificationsContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { NotificationIcon } from './NotificationIcon';

interface NotificationItemProps {
  notification: Notification;
  removeNotifications: NotificationsContext['removeNotifications'];
}

export function NotificationItem({
  notification,
  removeNotifications,
}: NotificationItemProps) {
  const { id, message, title } = notification;

  const removeNotification = () => {
    removeNotifications([id]);
  };

  return (
    <GridBox
      backgroundColor="accentHeavy"
      borderColor="text"
      borderStyle="solid"
      borderWidth={1}
      columnGap={16}
      gridTemplateColumns="auto 1fr auto"
      p={16}
      width={pxToRem(380)}
    >
      <NotificationIcon type={notification.type} />
      <FlexBox column gap={4}>
        <Body>{title}</Body>
        {message && <SubBody color="textAccent">{message}</SubBody>}
      </FlexBox>
      <IconButton onClick={removeNotification}>
        <Close title="Remove notification" />
      </IconButton>
    </GridBox>
  );
}
