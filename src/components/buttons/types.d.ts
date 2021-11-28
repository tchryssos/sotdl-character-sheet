import React, { MouseEventHandler } from 'react';

export interface CoreButtonProps {
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  transparent?: boolean;
  buttonLike?: boolean;
}

export interface BaseButtonProps extends CoreButtonProps {
  children: React.ReactNode | React.ReactNode[];
}
