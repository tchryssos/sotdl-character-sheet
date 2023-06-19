/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';

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
  className?: string;
  absolute?: boolean;
} & (ControlledButtonProps | ThirdPartyButtonProps);

const Icon = styled(ChevRight)<{ isOpen?: boolean }>(({ isOpen }) => ({
  transform: `rotate(${isOpen ? '-' : ''}90deg)`,
  transformOrigin: 'center',
}));

const Button = styled(IconButton)<{ absolute?: boolean }>(({ absolute }) => ({
  position: absolute ? 'absolute' : 'relative',
  left: absolute ? 0 : '',
  bottom: absolute ? 0 : '',
}));

export function CollapseButton({
  isOpen,
  onChangeExpanded,
  title,
  buttonProps,
  className,
  absolute,
}: CollapseButtonProps) {
  return (
    <Button
      onClick={onChangeExpanded}
      {...buttonProps}
      absolute={absolute}
      className={className}
    >
      <Icon
        isOpen={isOpen}
        title="Collapsible arrow"
        titleId={`collapseable-arrow-icon-${title}`}
      />
    </Button>
  );
}
