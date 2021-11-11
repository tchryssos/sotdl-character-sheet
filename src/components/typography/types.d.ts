import { FontVariant } from '~/typings/theme';

export type TypographyProps = {
  className?: string;
  children: string | (string | React.ReactElement)[];
  bold?: boolean;
  italic?: boolean;
  variant?: FontVariant;
};
