import styled from '@emotion/styled';

import { LoadingSpinner } from '../LoadingSpinner';
import { Text } from '../Text';
import { BaseButton } from './BaseButton';
import { TextButtonProps } from './TextButton';

type LoadingButtonBaseProps = Pick<
  TextButtonProps,
  'label' | 'disabled' | 'className'
> & {
  loading: boolean;
};

type ButtonLikeProps = {
  buttonLike: true;
  type?: never;
  onClick?: never;
};

type SubmitProps = {
  type: 'submit';
  onClick?: never;
  buttonLike?: never;
};

type ButtonProps = {
  type: 'button';
  onClick?: () => void;
  buttonLike?: never;
};

type LoadingButtonProps = LoadingButtonBaseProps &
  (SubmitProps | ButtonProps | ButtonLikeProps);

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

export function LoadingButton({
  disabled,
  loading,
  label,
  type = 'button',
  onClick,
  className,
  buttonLike,
}: LoadingButtonProps) {
  return (
    <Button
      buttonLike={buttonLike}
      className={className}
      disabled={disabled || loading}
      loading={loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <Spinner title="Loading" titleId="loading-button" />
      ) : (
        <Text as="span" variant="body">
          {label}
        </Text>
      )}
    </Button>
  );
}
