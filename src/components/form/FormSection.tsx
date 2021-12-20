import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useState } from 'react';

import { Theme } from '~/constants/theme';
import { EditContext } from '~/logic/contexts/editContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { GridBox, GridBoxProps } from '../box/GridBox';
import { IconButton } from '../buttons/IconButton';
import { ChevRight } from '../icons/ChevRight';
import { Invisible } from '../icons/Invisible';
import { Visible } from '../icons/Visible';
import { Body } from '../typography/Body';

interface FormSectionProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  columns?: GridBoxProps['columns'];
  isCollapsable?: boolean;
  canToggleVisibility?: boolean;
  className?: string;
}

const TitleBox = styled(FlexBox)`
  position: relative;
`;

const Text = styled(Body)<
  Pick<FormSectionProps, 'isCollapsable'> & { isEditMode: boolean }
>(({ isEditMode, isCollapsable, theme }) => ({
  whiteSpace: 'nowrap',
  ...(isCollapsable && {
    paddingLeft: theme.spacing[32],
  }),
  ...(isEditMode && {
    paddingRight: theme.spacing[32],
  }),
}));

const Section = styled(FlexBox)<{ addMargin: boolean }>`
  height: 100%;
`;

const createCollapsibleStyles = (theme: Theme) => css`
  border-color: ${theme.colors.accentHeavy};
  border-width: ${theme.border.borderWidth[1]};
  border-style: solid;
`;

const Line = styled(Box)`
  height: 0;
  width: 100%;
  ${({ theme }) => createCollapsibleStyles(theme)};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const Container = styled(GridBox)<{ isOpen?: boolean }>`
  ${({ theme }) => createCollapsibleStyles(theme)};
  border-top-width: 0;
  height: 100%;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'collapse')};
  padding: ${({ isOpen }) => (isOpen ? '' : 0)};
  height: ${({ isOpen }) => (isOpen ? '' : 0)};
`;

const CollapseButton = styled(IconButton)<{ isOpen?: boolean }>(
  ({ isOpen }) => ({
    position: 'absolute',
    left: 0,
    bottom: 0,
    transform: `rotate(${isOpen ? '-' : ''}90deg) translateX(${
      isOpen ? '-' : ''
    }${pxToRem(6)})`,
  })
);

const Collapsed = styled.div`
  ${({ theme }) => createCollapsibleStyles(theme)};
  border-top-width: 0;
  height: ${({ theme }) => theme.spacing[24]};
  /* height: 0 on container still leaves a 1px space */
  transform: translateY(-1px);
`;

const VisibilityButton = styled(IconButton)`
  transform: translateY(${({ theme }) => theme.spacing[4]});
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  columns,
  isCollapsable = true,
  canToggleVisibility = true,
  className,
}) => {
  // const sectionVisibi = localStorage.getItem(
  //   'sectionVisibility'
  // )

  const [isOpen, setIsOpen] = useState(!isCollapsable);
  const [isVisible, setIsVisible] = useState(true);
  const { isEditMode } = useContext(EditContext);

  const onChangeVisibility = () => {
    setIsVisible(!isVisible);
  };

  if ((!isEditMode && isVisible) || isEditMode) {
    return (
      <Section
        addMargin={isCollapsable || isEditMode}
        className={className}
        column
      >
        <FlexBox alignItems="flex-end" ml={4}>
          <TitleBox>
            {isCollapsable && (
              <CollapseButton
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChevRight
                  title="Collapsable arrow"
                  titleId={`collapseable-arrow-icon-${title}`}
                />
              </CollapseButton>
            )}
            <Text isCollapsable={isCollapsable} isEditMode={isEditMode} italic>
              {title}
            </Text>
            {isEditMode && canToggleVisibility && (
              <VisibilityButton onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? (
                  <Visible
                    title="Form section visibility"
                    titleId={`${title}-visibility-${isVisible}`}
                  />
                ) : (
                  <Invisible
                    title="Form section visibility"
                    titleId={`${title}-visibility-${isVisible}`}
                  />
                )}
              </VisibilityButton>
            )}
          </TitleBox>
          <Line ml={8} />
        </FlexBox>
        <Container columns={columns} isOpen={isOpen} px={8} py={16}>
          {children}
        </Container>
        {!isOpen && <Collapsed />}
      </Section>
    );
  }
  return null;
};
