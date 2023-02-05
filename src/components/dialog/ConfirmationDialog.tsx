import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { TextButton } from '../buttons/TextButton';
import { Body } from '../typography/Body';
import { Title } from '../typography/Title';
import { BaseDialog, BaseDialogProps } from './BaseDialog';

interface DialogAction {
  label: string;
  onClick: () => void;
}

interface ConfirmationDialogProps extends BaseDialogProps {
  confirm: DialogAction;
  cancel: DialogAction;
  message: string;
  title: string;
  labeledById: string;
  describedById: string;
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
  return (
    <BaseDialog
      aria-describedby={labeledById}
      aria-labelledby={describedById}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <DialogTitle id={labeledById}>
        <Title>{title}</Title>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={describedById}>
          <Body>{message}</Body>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <TextButton label={confirm.label} onClick={confirm.onClick} />
        <TextButton label={cancel.label} onClick={cancel.onClick} />
      </DialogActions>
    </BaseDialog>
  );
}
