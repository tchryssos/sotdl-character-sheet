import styled from '@emotion/styled';
import Dialog, {
  DialogProps as MaterialDialogProps,
} from '@mui/material/Dialog';

export interface BaseDialogProps extends MaterialDialogProps {
  labeledBy: string;
  describedBy: string;
}

export const BaseDialog = styled(Dialog)<BaseDialogProps>(({ theme }) => ({
  backgroundColor: theme.colors.background,
  fontFamily: theme.fontFamily.normal,
}));
