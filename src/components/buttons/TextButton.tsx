import { Body } from '../typography/Body';
import { BaseButton } from './BaseButton';
import { CoreButtonProps } from './types';

interface TextButtonProps extends CoreButtonProps {
  label: string;
}

export const TextButton: React.FC<TextButtonProps> = ({ label, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <BaseButton {...rest}>
    <Body>{label}</Body>
  </BaseButton>
);
