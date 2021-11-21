import styled from '@emotion/styled';
import Image from 'next/image';

import { IconButton } from './buttons/IconButton';

interface ProfilePictureProps {
  imageSrc: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const ButtonFrame = styled(IconButton)`
  border-radius: 50%;
`;

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageSrc,
  alt,
  onClick,
  className,
}) => (
  <ButtonFrame buttonLike={!onClick} className={className} onClick={onClick}>
    <Image alt={alt} layout="fill" objectFit="contain" src={imageSrc} />
  </ButtonFrame>
);
