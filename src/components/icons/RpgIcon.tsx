import styled from '@emotion/styled';
import Image from 'next/image';

interface RpgIconProps {
  coords: [number, number];
  size: number;
}

const sheetSize = 512;
const iconsRowCols = 21;
const iconBlockSize = 8;

const getIconOffset = (index: number, mod: number) => {
  const initialOffset = iconBlockSize;
  const iconSize = iconBlockSize * 2;

  return initialOffset + index * (iconSize + iconBlockSize);
};

const IconImage = styled(Image)<Pick<RpgIconProps, 'coords'>>(({ coords }) => ({
  aspectRatio: '1/1',
  transform: `translate(-${getIconOffset(
    coords[0],
    iconsRowCols
  )}px, -${getIconOffset(coords[1], iconsRowCols)}px)`,
}));

const IconWrapper = styled.span<Pick<RpgIconProps, 'size'>>(({ size }) => ({
  height: size,
  width: size,
  overflow: 'hidden',
  border: '1px solid red',
}));

export function RpgIcon({ coords, size }: RpgIconProps) {
  return (
    <IconWrapper size={size}>
      <IconImage
        alt="test"
        coords={coords}
        height={sheetSize}
        src="/icon-sheet.png"
        width={sheetSize}
      />
    </IconWrapper>
  );
}
