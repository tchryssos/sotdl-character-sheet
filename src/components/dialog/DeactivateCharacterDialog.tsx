import { ConfirmationDialog } from './ConfirmationDialog';

interface DeactivateCharacterDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onDeactivate: () => void;
  isPaid: boolean;
}
export function DeactivateCharacterDialog({
  isOpen: isConfirmModalOpen,
  setIsOpen: setIsConfirmModalOpen,
  onDeactivate,
  isPaid,
}: DeactivateCharacterDialogProps) {
  return (
    <ConfirmationDialog
      cancel={{ onClick: () => setIsConfirmModalOpen(false) }}
      confirm={{
        onClick: onDeactivate,
        label: 'Deactivate',
        severity: 'danger',
      }}
      describedById="inactive-character-description"
      labeledById="inactive-character"
      message={`This character will be moved to your "Inactive Characters" list. ${
        isPaid
          ? 'You can restore them at any time, recycle them into a blank character, or delete them permanently from your profile page.'
          : 'Inactive characters still count against your character limit, but can be recycled into blank characters at any time from your profile page.'
      }`}
      open={isConfirmModalOpen}
      title="Deactivate character?"
    />
  );
}
