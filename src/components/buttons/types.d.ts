import React from 'react';

export interface CoreButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  transparent?: boolean;
  buttonLike?: boolean;
}

export interface BaseButtonProps extends CoreButtonProps {
  children: React.ReactNode | React.ReactNode[];
}
