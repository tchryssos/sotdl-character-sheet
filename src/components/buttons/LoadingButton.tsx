import styled from '@emotion/styled';

import { LoadingSpinner } from '../LoadingSpinner';
import { Body } from '../typography/Body';
import { BaseButton } from './BaseButton';

type LoadingButtonBaseProps = {
  disabled?: boolean;
  loading: boolean;
  label: string;
};

type SubmitProps = {
  type: 'submit';
  onClick?: never;
};

type ButtonProps = {
  type: 'button';
  onClick: () => void;
};

type LoadingButtonProps = LoadingButtonBaseProps & (SubmitProps | ButtonProps);

const Spinner = styled(LoadingSpinner)`
  max-height: ${({ theme }) => theme.fontSize.body};
`;

const Button = styled(BaseButton)<Pick<LoadingButtonProps, 'loading'>>(
  ({ loading }) => ({
    ...(loading && {
      display: 'flex',
      alignItems: 'center',
    }),
  })
);

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  disabled,
  loading,
  label,
  type = 'button',
  onClick,
}) => (
  <Button
    disabled={disabled || loading}
    loading={loading}
    type={type}
    onClick={onClick}
  >
    {loading ? (
      <Spinner title="Loading" titleId="loading-button" />
    ) : (
      <Body>{label}</Body>
    )}
  </Button>
);
