import { ButtonUnstyledProps } from '@mui/base';
import React, { MouseEventHandler } from 'react';

export interface CoreButtonProps {
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  transparent?: boolean;
  buttonLike?: boolean;
  severity?: 'normal' | 'warning' | 'danger' | 'success' | 'secondary';
}

export interface BaseButtonProps
  extends CoreButtonProps,
    Omit<ButtonUnstyledProps, 'color'> {
  children: React.ReactNode | React.ReactNode[];
}
