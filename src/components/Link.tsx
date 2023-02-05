import styled from '@emotion/styled';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  isInternal?: boolean;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
}

interface StyledProps extends Pick<LinkProps, 'underline'> {}

const StyledLink = styled.a<StyledProps>`
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
}: LinkProps) {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <StyledLink
        className={className}
        rel="noopener noreferrer"
        target={isInternal ? '_self' : '_blank'}
        underline={underline}
      >
        {children}
      </StyledLink>
    </NextLink>
  );
}
