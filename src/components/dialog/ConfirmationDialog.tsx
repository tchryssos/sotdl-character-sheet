import { FlexBox } from '../box/FlexBox';
import { TextButton } from '../buttons/TextButton';
import { Body } from '../typography/Body';
import { Title } from '../typography/Title';
import { BaseDialog, BaseDialogProps } from './BaseDialog';

interface DialogAction {
  label?: string;
  onClick: () => void;
}

interface ConfirmationDialogProps extends Omit<BaseDialogProps, 'children'> {
  confirm: DialogAction;
  cancel: DialogAction;
  message: string;
  title: string;
  labeledById: string;
  describedById: string;
  severity?: 'danger' | 'normal';
}

export function ConfirmationDialog({
  confirm,
  cancel,
  message,
  labeledById,
  describedById,
  title,
  severity = 'normal',
  ...rest
}: ConfirmationDialogProps) {
  return (
    <BaseDialog
      aria-describedby={labeledById}
      aria-labelledby={describedById}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <Title id={labeledById}>{title}</Title>
      <Body id={describedById}>{message}</Body>
      <FlexBox gap={16} justifyContent="flex-end">
        <TextButton
          label={confirm.label || 'Confirm'}
          severity={severity}
          onClick={confirm.onClick}
        />
        <TextButton
          label={cancel.label || 'Cancel'}
          severity="secondary"
          onClick={cancel.onClick}
        />
      </FlexBox>
    </BaseDialog>
  );
}
