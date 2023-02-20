import styled from '@emotion/styled';
import { useContext, useEffect, useRef } from 'react';

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
  index: number;
}

const Item = styled(GridBox)`
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
      columnGap={16}
      gridTemplateColumns="auto 1fr auto"
      p={16}
      role="dialog"
      width={pxToRem(380)}
    >
      <NotificationIcon type={notification.type} />
      <FlexBox column gap={4}>
        <Body id={titleId}>{title}</Body>
        {message && (
          <SubBody color="textAccent" id={descriptionId}>
            {message}
          </SubBody>
        )}
        {createdOn && (
          <Caption color="textAccent">{timeAgo(createdOn)}</Caption>
        )}
      </FlexBox>
      <IconButton ref={buttonRef} onClick={removeNotification}>
        <Close title="Remove notification" />
      </IconButton>
    </Item>
  );
}
