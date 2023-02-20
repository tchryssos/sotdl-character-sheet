import styled from '@emotion/styled';

import { SHY } from '~/constants/characterEntities';

import { TextButton } from '../buttons/TextButton';
import { Label } from './Label';

const StyledButton = styled(TextButton)`
  border: ${({ theme }) =>
    `${theme.borderWidth[1]} dashed ${theme.colors.accentLight}`};
  height: ${({ theme }) => theme.spacing[40]};
  width: 100%;
  :hover {
    background-color: ${({ theme }) => theme.colors.smudge};
  }
`;

interface AddAnotherButtonProps {
  onClick: () => void;
  includeLabel?: boolean;
  label?: string;
  className?: string;
}

interface WrapperProps extends Pick<AddAnotherButtonProps, 'includeLabel'> {
  children: React.ReactNode;
}

const ButtonWrapper: React.FC<WrapperProps> = ({ includeLabel, children }) => {
  if (includeLabel) {
    return <Label label={SHY}>{children}</Label>;
  }
  return <>{children}</>;
};

export const AddAnotherButton: React.FC<AddAnotherButtonProps> = ({
  onClick,
  includeLabel,
  label = '+',
  className,
}) => (
  <ButtonWrapper includeLabel={includeLabel}>
    <StyledButton
      className={className}
      label={label}
      transparent
      onClick={onClick}
    />
  </ButtonWrapper>
);
