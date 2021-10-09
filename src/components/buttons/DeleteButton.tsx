import { Delete } from '../icons/Delete';
import { IconButton } from './IconButton';

interface DeleteButtonProps {
  onDelete: () => void;
  className?: string;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  className,
}) => (
  <IconButton className={className} onClick={onDelete}>
    <Delete title="Delete" titleId="delete-icon" />
  </IconButton>
);
