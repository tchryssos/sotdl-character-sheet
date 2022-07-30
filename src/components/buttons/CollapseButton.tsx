/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { ChevRight } from '../icons/ChevRight';
import { IconButton } from './IconButton';

type ControlledButtonProps = {
  onChangeExpanded: () => void;
  buttonProps?: never;
};

type ThirdPartyButtonProps = {
  onChangeExpanded?: never;
  buttonProps: Record<string, unknown>;
};

type CollapseButtonProps = {
  isOpen: boolean;
  title: string;
} & (ControlledButtonProps | ThirdPartyButtonProps);

const Button = styled(IconButton)<{ isOpen?: boolean }>(({ isOpen }) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  transform: `rotate(${isOpen ? '-' : ''}90deg) translateX(${
    isOpen ? '-' : ''
  }${pxToRem(6)})`,
}));

export const CollapseButton: React.FC<CollapseButtonProps> = ({
  isOpen,
  onChangeExpanded,
  title,
  buttonProps,
}) => (
  <Button isOpen={isOpen} onClick={onChangeExpanded} {...buttonProps}>
    <ChevRight
      title="Collapsable arrow"
      titleId={`collapseable-arrow-icon-${title}`}
    />
  </Button>
);
