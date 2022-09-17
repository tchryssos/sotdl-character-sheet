import styled from '@emotion/styled';

import { Color } from '~/typings/theme';

interface AsciiProps {
  className?: string;
  label: string;
  text: string;
  fontSize: string;
  color?: Color;
}

export const AsciiText = styled.pre<Pick<AsciiProps, 'fontSize' | 'color'>>(
  ({ theme, fontSize, color = 'text' }) => ({
    color: theme.colors[color],
    fontSize,
    userSelect: 'none',
  })
);

export const AsciiFigure: React.FC<Pick<AsciiProps, 'className' | 'label'>> = ({
  children,
  className,
  label,
}) => (
  <figure aria-label={label} className={className} role="img">
    {children}
  </figure>
);

export const Ascii: React.FC<AsciiProps> = ({
  className,
  label,
  text,
  fontSize,
  color = 'text',
}) => (
  <AsciiFigure className={className} label={label}>
    <AsciiText color={color} fontSize={fontSize}>
      {text}
    </AsciiText>
  </AsciiFigure>
);
