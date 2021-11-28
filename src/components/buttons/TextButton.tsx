import styled from '@emotion/styled';

import { Body } from '../typography/Body';
import { BaseButton } from './BaseButton';
import { CoreButtonProps } from './types';

interface TextButtonProps extends CoreButtonProps {
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

export const TextButton: React.FC<TextButtonProps> = ({ label, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledButton {...rest}>
    <Body>{label}</Body>
  </StyledButton>
);
