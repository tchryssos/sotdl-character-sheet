import styled from '@emotion/styled';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Delete } from '../icons/Delete';
import { IconButton, IconButtonProps } from './IconButton';

interface DeleteButtonProps extends Pick<IconButtonProps, 'size'> {
  onDelete: () => void;
  className?: string;
  disabled?: boolean;
}
export function DeleteButton({
  onDelete,
  className,
  size = 'md',
  disabled,
}: DeleteButtonProps) {
  return (
    <IconButton
      className={className}
      disabled={disabled}
      size={size}
      onClick={onDelete}
    >
      <Delete title="Delete" titleId="delete-icon" />
    </IconButton>
  );
}

export const AddAnotherMultiDelete = styled(DeleteButton)`
  margin-top: ${pxToRem(17)};
`;
