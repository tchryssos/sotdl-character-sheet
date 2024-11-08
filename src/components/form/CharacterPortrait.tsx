import styled from '@emotion/styled';

import { Box } from '../box/Box';

interface CharacterPortraitProps {
  alt: string;
  height: number;
  src: string;
  borderless?: boolean;
  className?: string;
}

const Portrait = styled('img')`
  display: block;
`;

export function CharacterPortrait({
  alt,
  height,
  src,
  className,
  borderless,
}: CharacterPortraitProps) {
  return (
    <Box
      borderColor="textAccent"
      borderStyle="solid"
      borderWidth={borderless ? 0 : 1}
      className={className}
      height="fit-content"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Portrait
        alt={alt}
        decoding="async"
        fetchPriority="low"
        height={height}
        loading="lazy"
        src={src}
      />
    </Box>
  );
}
