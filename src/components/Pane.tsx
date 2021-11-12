import styled from '@emotion/styled';

import { pxToRem } from '~/utils/styles';

import { FlexBox, FlexBoxProps } from './box/FlexBox';

const StyledPane = styled(FlexBox)(({ theme }) => ({
  borderColor: theme.colors.accentLight,
  borderWidth: theme.border.borderWidth[1],
  borderRadius: theme.spacing[4],
  borderStyle: 'solid',
  boxShadow: `${pxToRem(4)} ${pxToRem(6)} ${theme.colors.accentHeavy}`,
  minWidth: pxToRem(256),
}));

export const Pane: React.FC<FlexBoxProps> = ({
  px = 24,
  py = 16,
  justifyContent = 'center',
  alignItems = 'center',
  column = true,
  children,
  ...rest
}) => (
  <StyledPane
    alignItems={alignItems}
    column={column}
    justifyContent={justifyContent}
    px={px}
    py={py}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {children}{' '}
  </StyledPane>
);
