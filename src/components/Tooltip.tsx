import styled from '@emotion/styled';
import { PropsWithChildren, useRef, useState } from 'react';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Box } from './box/Box';

interface TooltipProps {
  id: string;
  tipText: string;
}

const Target = styled.div``;

const Tip = styled.span`
  position: absolute;
  z-index: 999;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  top: 0;
  transform: translateY(calc(-100% - ${({ theme }) => theme.spacing[8]}));
  width: 200px;
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.text};
`;

export function Tooltip({
  id,
  children,
  tipText,
}: PropsWithChildren<TooltipProps>) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  return (
    <Box position="relative">
      {show && (
        <Tip id={id} role="tooltip">
          {tipText}
        </Tip>
      )}
      <Target
        aria-describedby={id}
        ref={targetRef}
        tabIndex={0}
        onBlur={() => setShow(false)}
        onFocus={() => setShow(true)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </Target>
    </Box>
  );
}
