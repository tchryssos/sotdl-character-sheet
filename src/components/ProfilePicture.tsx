import styled from '@emotion/styled';
import Image from 'next/image';

import { IconButton } from './buttons/IconButton';

interface ProfilePictureProps {
  imageSrc?: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const ButtonFrame = styled(IconButton)<Pick<ProfilePictureProps, 'onClick'>>`
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  border: ${({ theme }) =>
    `${theme.border.borderWidth[1]} solid ${theme.colors.text}`};
`;

const DummyImage = styled.div`
  height: 100%;
  width: 100%;
`;

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageSrc,
  alt,
  onClick,
  className,
}) => (
  <ButtonFrame buttonLike={!onClick} className={className} onClick={onClick}>
    {imageSrc ? (
      <Image alt={alt} layout="fill" objectFit="contain" src={imageSrc} />
    ) : (
      <DummyImage />
    )}
  </ButtonFrame>
);
