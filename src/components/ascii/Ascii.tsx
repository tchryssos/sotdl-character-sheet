import styled from '@emotion/styled';

import { Color } from '~/typings/theme';

interface AsciiProps {
  className?: string;
  label: string;
  text: string;
  fontSize: number;
  color?: Color;
}

export const AsciiText = styled.pre<Pick<AsciiProps, 'fontSize' | 'color'>>(
  ({ theme, fontSize, color = 'text' }) => ({
    color: theme.colors[color],
    fontSize,
    userSelect: 'none',
    textSizeAdjust: 'none',
  })
);

interface AsciiFigureProps extends Pick<AsciiProps, 'className' | 'label'> {
  children: React.ReactNode;
}

export function AsciiFigure({ children, className, label }: AsciiFigureProps) {
  return (
    <figure aria-label={label} className={className} role="img">
      {children}
    </figure>
  );
}

export function Ascii({
  className,
  label,
  text,
  fontSize,
  color = 'text',
}: AsciiProps) {
  return (
    <AsciiFigure className={className} label={label}>
      <AsciiText color={color} fontSize={fontSize}>
        {text}
      </AsciiText>
    </AsciiFigure>
  );
}
