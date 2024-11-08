import styled from '@emotion/styled';
import { useState } from 'react';

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
  const [hasError, setHasError] = useState(false);
  const [loaded, setHasLoaded] = useState(false);

  return (
    <Box
      borderColor="textAccent"
      borderStyle="solid"
      borderWidth={borderless ? 0 : 1}
      className={className}
      height="fit-content"
    >
      <Portrait
        alt={alt}
        decoding="async"
        fetchPriority="low"
        height={height}
        loading="lazy"
        src={src}
        width={hasError || !loaded ? height : undefined}
        onError={() => setHasError(true)}
        onLoad={() => setHasLoaded(true)}
      />
    </Box>
  );
}
