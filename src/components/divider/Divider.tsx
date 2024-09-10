import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Box } from '../box/Box';
import { DividerWrapper, Label, Segment } from './components';
import { DividerProps } from './types';

export function Divider({
  color = 'text',
  vertical,
  className,
  label,
}: DividerProps) {
  if (vertical) {
    return (
      <Box
        backgroundColor={color}
        className={className}
        height="100%"
        width={pxToRem(1)}
      />
    );
  }

  return (
    <DividerWrapper center className={className}>
      {label && (
        <>
          <Segment color={color} />
          <Label as="p" variant="body">
            {label}
          </Label>
        </>
      )}
      <Segment color={color} />
    </DividerWrapper>
  );
}
