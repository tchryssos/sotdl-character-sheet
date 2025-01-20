import styled from '@emotion/styled';
import { useContext, useEffect, useRef } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { IconButton } from '~/components/buttons/IconButton';
import { Close } from '~/components/icons/Close';
import { Text } from '~/components/Text';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { ThemeContext } from '~/logic/contexts/themeContext';
import { timeAgo } from '~/logic/utils/dates/timeAgo';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { RpgNotification } from '~/typings/notifications';

import { NotificationIcon } from './NotificationIcon';

interface NotificationItemProps {
  notification: RpgNotification;
  removeNotifications: NotificationsContext['removeNotifications'];
  index: number;
}

const Item = styled(FlexBox)`
  box-shadow: 6px 4px ${({ theme }) => theme.colors.smudge};
`;

export function NotificationItem({
  notification,
  removeNotifications,
  index,
}: NotificationItemProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const initializedRef = useRef(false);
  const { colorMode } = useContext(ThemeContext);
  const { id, message, title, createdOn } = notification;

  const removeNotification = () => {
    removeNotifications([id]);
  };

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role#required_javascript_features
      buttonRef.current?.focus();
    }
  }, []);

  const titleId = `dialog-title-${index}`;
  const descriptionId = `dialog-description-${index}`;

  return (
    <Item
      aria-describedby={message ? descriptionId : undefined}
      aria-labelledby={titleId}
      backgroundColor={colorMode === 'dark' ? 'background' : 'accentLight'}
      borderColor="text"
      borderStyle="solid"
      borderWidth={1}
      flexDirection="column"
      gap={16}
      padding={16}
      role="dialog"
      width={pxToRem(380)}
    >
      <FlexBox alignItems="center" gap={16}>
        <NotificationIcon type={notification.type} />
        <Text as="h3" id={titleId} variant="body">
          {title}
        </Text>
        <IconButton ref={buttonRef} onClick={removeNotification}>
          <Close title="Remove notification" />
        </IconButton>
      </FlexBox>
      {message && (
        <Text as="p" color="textAccent" id={descriptionId} variant="body-sm">
          {message}
        </Text>
      )}
      {createdOn && (
        <Text as="p" color="textAccent" variant="body-xs">
          {timeAgo(createdOn)}
        </Text>
      )}
    </Item>
  );
}
