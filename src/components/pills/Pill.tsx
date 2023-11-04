import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { Color } from '~/typings/theme';

import { Text } from '../Text';

interface PillProps {
  variant?: ComponentProps<typeof Text>['variant'];
  className?: string;
  text: string;
  color?: Color;
  backgroundColor?: Color;
}

const PillText = styled(Text)(({ theme }) => ({
  padding: theme.spacing[8],
  borderRadius: theme.borderRadius['200'],
}));

export function Pill({
  variant = 'body-sm',
  className,
  text,
  color = 'background',
  backgroundColor = 'text',
}: PillProps) {
  return (
    <PillText
      as="p"
      backgroundColor={backgroundColor}
      className={className}
      color={color}
      display="block"
      variant={variant}
    >
      {text}
    </PillText>
  );
}
