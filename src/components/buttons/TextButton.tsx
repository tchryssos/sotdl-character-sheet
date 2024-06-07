import styled from '@emotion/styled';

import { Text, TextProps } from '../Text';
import { BaseButton } from './BaseButton';
import { CoreButtonProps } from './types';

export interface TextButtonProps
  extends CoreButtonProps,
    Pick<TextProps, 'variant'> {
  label: string;
  transparent?: boolean;
}

const StyledButton = styled(BaseButton)<Pick<TextButtonProps, 'transparent'>>(
  ({ transparent }) => ({
    ...(transparent && {
      backgroundColor: 'transparent',
      border: 'none',
      padding: 0,
    }),
  })
);

export function TextButton({
  label,
  variant = 'body',
  ...rest
}: TextButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton {...rest}>
      <Text as="span" variant={variant}>
        {label}
      </Text>
    </StyledButton>
  );
}
