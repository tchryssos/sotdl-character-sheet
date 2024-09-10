import styled from '@emotion/styled';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { PropsWithChildren, useState } from 'react';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Box } from './box/Box';

interface TooltipProps {
  id: string;
  tipText: string;
  isLabeled: boolean;
}

const Target = styled.div``;

const Tip = styled.span`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: ${pxToRem(200)};
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.text};
`;

export function Tooltip({
  id,
  children,
  tipText,
  isLabeled,
}: PropsWithChildren<TooltipProps>) {
  const [show, setShow] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: show,
    whileElementsMounted: autoUpdate,
    onOpenChange: setShow,
    middleware: [offset(10), flip(), shift()],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: isLabeled ? 'tooltip' : 'label',
  });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <Box position="relative">
      {show && (
        <Tip
          id={id}
          ref={refs.setFloating}
          role="tooltip"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {tipText}
        </Tip>
      )}
      <Target
        aria-describedby={id}
        ref={refs.setReference}
        tabIndex={0}
        {...getReferenceProps()}
      >
        {children}
      </Target>
    </Box>
  );
}
