import { Color } from '~/typings/theme';

type HorizDividerProps = {
  label?: string;
  vertical?: never | false;
};

type VerticalDividerProps = {
  label?: never;
  vertical: true;
};

export type DividerProps = {
  color?: Color;
  className?: string;
} & (HorizDividerProps | VerticalDividerProps);
