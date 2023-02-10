import styled from '@emotion/styled';
import { useContext } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { IconButton } from '~/components/buttons/IconButton';
import { Close } from '~/components/icons/Close';
import { Body } from '~/components/typography/Body';
import { Caption } from '~/components/typography/Caption';
import { SubBody } from '~/components/typography/SubBody';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { ThemeContext } from '~/logic/contexts/themeContext';
import { timeAgo } from '~/logic/utils/dates/timeAgo';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { RpgNotification } from '~/typings/notifications';

import { NotificationIcon } from './NotificationIcon';

interface NotificationItemProps {
  notification: RpgNotification;
  removeNotifications: NotificationsContext['removeNotifications'];
}

const Item = styled(GridBox)`
  box-shadow: 6px 4px ${({ theme }) => theme.colors.smudge};
`;

export function NotificationItem({
  notification,
  removeNotifications,
}: NotificationItemProps) {
  const { colorMode } = useContext(ThemeContext);
  const { id, message, title, createdOn } = notification;

  const removeNotification = () => {
    removeNotifications([id]);
  };

  return (
    <Item
      backgroundColor={colorMode === 'dark' ? 'background' : 'accentLight'}
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
        {createdOn && (
          <Caption color="textAccent">{timeAgo(createdOn)}</Caption>
        )}
      </FlexBox>
      <IconButton onClick={removeNotification}>
        <Close title="Remove notification" />
      </IconButton>
    </Item>
  );
}
