import { Delete } from '../icons/Delete';
import { IconButton, IconButtonProps } from './IconButton';

interface DeleteButtonProps extends Pick<IconButtonProps, 'size'> {
  onDelete: () => void;
  className?: string;
  disabled?: boolean;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  className,
  size = 'md',
  disabled,
}) => (
  <IconButton
    className={className}
    disabled={disabled}
    size={size}
    onClick={onDelete}
  >
    <Delete title="Delete" titleId="delete-icon" />
  </IconButton>
);
