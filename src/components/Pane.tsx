import styled from '@emotion/styled';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FlexBox, FlexBoxProps } from './box/FlexBox';

interface PaneProps extends FlexBoxProps {
  shadowed?: boolean;
}

const StyledPane = styled(FlexBox)<Pick<PaneProps, 'shadowed'>>(
  ({ theme, shadowed }) => ({
    borderColor: theme.colors.accentLight,
    borderWidth: theme.border.borderWidth[1],
    borderRadius: theme.spacing[4],
    borderStyle: 'solid',
    boxShadow: shadowed
      ? `${pxToRem(4)} ${pxToRem(6)} ${theme.colors.accentHeavy}`
      : 'none',
    minWidth: pxToRem(256),
  })
);

export const Pane: React.FC<PaneProps> = ({
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
