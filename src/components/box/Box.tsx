/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';

import {
  AllowedCommonCssProps,
  AllowedFlexboxCssProps,
  AllowedGridBoxCssProps,
} from '~/constants/css';
import { makeCssPropStyles } from '~/logic/utils/styles/css';

type BoxProps = AllowedCommonCssProps &
  AllowedFlexboxCssProps &
  AllowedGridBoxCssProps & {
    className?: string;
  };

export const Box: React.FC<BoxProps> =
  styled('div')<BoxProps>(makeCssPropStyles);
