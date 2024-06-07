import styled from '@emotion/styled';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  isInternal?: boolean;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  onClick?: () => void;
  title?: string;
}

interface StyledProps extends Pick<LinkProps, 'underline'> {}

const StyledLink = styled(NextLink)<StyledProps>`
  color: ${({ theme }) => theme.colors.text};
  display: inline-block;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  :hover {
    filter: brightness(${({ theme }) => theme.filters.brightnessMod});
  }
`;

export function Link({
  href,
  isInternal = true,
  children,
  className,
  underline,
  onClick,
  title,
}: LinkProps) {
  return (
    <StyledLink
      className={className}
      href={href}
      rel="noopener noreferrer"
      target={isInternal ? '_self' : '_blank'}
      title={title}
      underline={underline}
      onClick={onClick}
    >
      {children}
    </StyledLink>
  );
}
