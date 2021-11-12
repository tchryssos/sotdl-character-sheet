import styled from '@emotion/styled';

interface AuthLinkProps {
  type: 'login' | 'logout';
  children: React.ReactNode;
  className?: string;
}

const PlainATag = styled.a(({ theme }) => ({
  color: theme.colors.text,
  textDecoration: 'none',
  cursor: 'pointer',
}));

export const AuthLink: React.FC<AuthLinkProps> = ({
  type,
  children,
  className,
}) => (
  <PlainATag aria-label={type} className={className} href={`/api/auth/${type}`}>
    {children}
  </PlainATag>
);
