import { Color } from '~/typings/theme';

export type BaseIconProps = {
  className?: string;
  viewBox?: string;
  title: string;
  titleId: string;
  children: React.ReactNode;
};

export type IconProps = Pick<
  BaseIconProps,
  'title' | 'titleId' | 'className'
> & {
  color?: Color;
};
