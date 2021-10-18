import styled from '@emotion/styled';
import NextLink from 'next/link';

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  display: inline-block;
`;

interface LinkProps {
  href: string;
  isInternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  isInternal,
  children,
  className,
}) => (
  <NextLink href={href} passHref>
    <StyledLink
      className={className}
      rel="noopener noreferrer"
      target={isInternal ? '_self' : '_blank'}
    >
      {children}
    </StyledLink>
  </NextLink>
);
