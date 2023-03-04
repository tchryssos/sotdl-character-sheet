import styled from '@emotion/styled';
import Image from 'next/image';

interface RpgIconProps {
  coords: [number, number];
  size: number;
}

const sheetSize = 512;
const iconSize = 16;
const iconBlockSize = iconSize / 2;

const getIconOffset = (index: number, mod: number) => {
  const initialOffset = iconBlockSize;

  return (initialOffset + index * (iconSize + iconBlockSize)) * mod;
};

interface IconImageProps extends Pick<RpgIconProps, 'coords'> {
  sizeMod: number;
}

const IconImage = styled(Image)<IconImageProps>(({ coords, sizeMod }) => ({
  aspectRatio: '1/1',
  transform: `translate(-${getIconOffset(
    coords[0],
    sizeMod
  )}px, -${getIconOffset(coords[1], sizeMod)}px)`,
}));

const IconWrapper = styled.span<Pick<RpgIconProps, 'size'>>(({ size }) => ({
  height: size,
  width: size,
  overflow: 'hidden',
}));

export function RpgIcon({ coords, size }: RpgIconProps) {
  const sizeMod = size / iconSize;
  return (
    <IconWrapper size={size}>
      <IconImage
        alt="test"
        coords={coords}
        height={sheetSize * sizeMod}
        sizeMod={sizeMod}
        src="/icon-sheet.png"
        width={sheetSize * sizeMod}
      />
    </IconWrapper>
  );
}
