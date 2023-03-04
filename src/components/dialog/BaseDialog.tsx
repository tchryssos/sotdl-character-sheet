/* eslint-disable react/jsx-props-no-spreading */
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FocusTrap } from '@mui/base';
import ModalUnstyled, { ModalUnstyledProps } from '@mui/base/ModalUnstyled';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FlexBox } from '../box/FlexBox';

export interface BaseDialogProps extends Omit<ModalUnstyledProps, 'children'> {
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

// https://mui.com/base/react-modal/#basics
const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.filters.darken};
  -webkit-tap-highlight-color: transparent;
`;

const StyledDialog = styled(ModalUnstyled)<BaseDialogProps>({
  zIndex: 9999,
  position: 'fixed',
  right: 0,
  left: 0,
  bottom: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const DialogBox = styled(FlexBox)(({ theme }) => ({
  borderColor: theme.colors.accentLight,
  borderStyle: 'solid',
  borderWidth: theme.borderWidth[1],
}));

export function BaseDialog({
  children,
  size = 'md',
  open,
  ...rest
}: BaseDialogProps) {
  let maxWidth = pxToRem(500);
  const theme = useTheme();

  switch (size) {
    case 'sm':
      maxWidth = pxToRem(400);
      break;
    case 'lg':
      maxWidth = pxToRem(600);
      break;
    case 'full':
      maxWidth = pxToRem(theme.breakpointValues.lg);
      break;
    case 'md':
    default:
      break;
  }
  return (
    <FocusTrap open={open}>
      <StyledDialog {...rest} open={open} slots={{ backdrop: Backdrop }}>
        <DialogBox
          backgroundColor="background"
          flexDirection="column"
          gap={16}
          margin={16}
          maxWidth={maxWidth}
          padding={32}
          width="100%"
        >
          {children}
        </DialogBox>
      </StyledDialog>
    </FocusTrap>
  );
}
