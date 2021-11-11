import styled from '@emotion/styled';

import { pxToRem } from '~/utils/styles';

import { FlexBox, FlexBoxProps } from './box/FlexBox';

const StyledPane = styled(FlexBox)(({ theme }) => ({
  borderColor: theme.colors.accentLight,
  borderWidth: theme.border.borderWidth[1],
  borderRadius: theme.spacing[4],
  borderStyle: 'solid',
  boxShadow: `${pxToRem(6)} ${pxToRem(4)} ${theme.colors.accentHeavy}`,
}));

export const Pane: React.FC<FlexBoxProps> = ({
  px = 24,
  py = 16,
  center = true,
  column = true,
  children,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledPane center={center} column={column} px={px} py={py} {...rest}>
    {children}{' '}
  </StyledPane>
);
