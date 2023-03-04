import { capitalize } from 'lodash';
import { useState } from 'react';

import { FlexBox } from '../box/FlexBox';
import { TextButton } from '../buttons/TextButton';
import { BaseButtonProps } from '../buttons/types';
import { Text } from '../Text';
import { BaseDialog, BaseDialogProps } from './BaseDialog';

interface DialogAction {
  label?: string;
  onClick: () => void | Promise<void>;
  severity?: BaseButtonProps['severity'];
}

interface ConfirmationDialogProps extends Omit<BaseDialogProps, 'children'> {
  confirm: DialogAction;
  cancel: DialogAction;
  message: string;
  title: string;
  labeledById: string;
  describedById: string;
}

interface ActionButtonProps {
  action: DialogAction;
  type: 'confirm' | 'cancel';
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

function ActionButton({
  action,
  type,
  isLoading,
  setIsLoading,
}: ActionButtonProps) {
  const onClick = async () => {
    setIsLoading(true);
    await action.onClick();
    setIsLoading(false);
  };
  return (
    <TextButton
      disabled={isLoading}
      label={action.label || capitalize(type)}
      severity={type === 'cancel' ? 'secondary' : action.severity}
      onClick={onClick}
    />
  );
}

export function ConfirmationDialog({
  confirm,
  cancel,
  message,
  labeledById,
  describedById,
  title,
  ...rest
}: ConfirmationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <BaseDialog
      aria-describedby={labeledById}
      aria-labelledby={describedById}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <Text as="h2" id={labeledById}>
        {title}
      </Text>
      <Text as="p" id={describedById}>
        {message}
      </Text>
      <FlexBox gap={16} justifyContent="flex-end">
        <ActionButton
          action={confirm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type="confirm"
        />
        <ActionButton
          action={cancel}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type="cancel"
        />
      </FlexBox>
    </BaseDialog>
  );
}
