import React, { MouseEventHandler } from 'react';

// TODO: We probably want to allow Buttons to receive all css props too
export interface CoreButtonProps {
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  transparent?: boolean;
  buttonLike?: boolean;
  severity?: 'normal' | 'warning' | 'danger' | 'success' | 'secondary';
}

export interface BaseButtonProps extends CoreButtonProps {
  children: React.ReactNode | React.ReactNode[];
}
