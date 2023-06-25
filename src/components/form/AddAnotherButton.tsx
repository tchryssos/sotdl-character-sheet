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

function ButtonWrapper({ includeLabel, children }: WrapperProps) {
  if (includeLabel) {
    return <Label label={SHY}>{children}</Label>;
  }
  return <>{children}</>;
}

export function AddAnotherButton({
  onClick,
  includeLabel,
  label = '+',
  className,
}: AddAnotherButtonProps) {
  return (
    <ButtonWrapper includeLabel={includeLabel}>
      <StyledButton
        className={className}
        label={label}
        transparent
        onClick={onClick}
      />
    </ButtonWrapper>
  );
}
