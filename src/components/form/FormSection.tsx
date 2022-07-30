import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import { Theme } from '~/constants/theme';
import { EditContext } from '~/logic/contexts/editContext';
import { VisibilityContext } from '~/logic/contexts/visibilityContext';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { GridBox, GridBoxProps } from '../box/GridBox';
import { CollapseButton } from '../buttons/CollapseButton';
import { IconButton } from '../buttons/IconButton';
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
  visibilityTitle?: string;
  borderless?: boolean;
  gridTemplateColumns?: GridBoxProps['gridTemplateColumns'];
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
  overflow: hidden;
  height: 100%;
`;

const createCollapsibleStyles = (theme: Theme, borderless?: boolean) => css`
  border-color: ${borderless ? 'transparent' : theme.colors.accentHeavy};
  border-width: ${borderless ? 0 : theme.border.borderWidth[1]};
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

const Container = styled(GridBox)<{ isOpen?: boolean; borderless?: boolean }>`
  ${({ theme, borderless }) => createCollapsibleStyles(theme, borderless)};
  border-top-width: 0;
  height: 100%;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'collapse')};
  padding: ${({ isOpen }) => (isOpen ? '' : 0)};
  height: ${({ isOpen }) => (isOpen ? '' : 0)};
`;

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
  visibilityTitle,
  borderless,
  gridTemplateColumns,
}) => {
  const { getSectionVisibilityInfo, setSectionVisibilityInfo } =
    useContext(VisibilityContext);
  const { isVisible: initIsVisible, isExpanded: initIsExpanded } =
    getSectionVisibilityInfo(visibilityTitle || title) || {};

  const { isEditMode } = useContext(EditContext);

  // START - SECTION VISIBILITY - START
  const [isVisible, setIsVisible] = useState(true);

  const onChangeVisibility = () => {
    const nextVisibility = !isVisible;
    setIsVisible(nextVisibility);
    setSectionVisibilityInfo(
      visibilityTitle || title,
      'isVisible',
      nextVisibility
    );
  };

  useEffect(() => {
    if (initIsVisible !== undefined) {
      setIsVisible(initIsVisible);
    }
  }, [initIsVisible]);
  // END - SECTION VISIBILITY - END

  // START - SECTION EXPANDED STATUS - START
  const [isOpen, setIsOpen] = useState(true);

  const onChangeExpanded = () => {
    const nextOpenState = !isOpen;
    setIsOpen(nextOpenState);
    setSectionVisibilityInfo(
      visibilityTitle || title,
      'isExpanded',
      nextOpenState
    );
  };

  useEffect(() => {
    if (initIsExpanded !== undefined) {
      setIsOpen(initIsExpanded);
    }
  }, [initIsExpanded]);
  // END - SECTION COLLAPSED STATUST - END

  if ((!isEditMode && isVisible) || isEditMode) {
    return (
      <Section
        addMargin={isCollapsable || isEditMode}
        className={className}
        column
      >
        <FlexBox alignItems="flex-end" ml={borderless ? 0 : 4}>
          <TitleBox>
            {isCollapsable && (
              <CollapseButton
                isOpen={isOpen}
                title={title}
                onChangeExpanded={onChangeExpanded}
              />
            )}
            <Text isCollapsable={isCollapsable} isEditMode={isEditMode} italic>
              {title}
            </Text>
            {isEditMode && canToggleVisibility && (
              <VisibilityButton onClick={onChangeVisibility}>
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
          {!borderless && <Line ml={8} />}
        </FlexBox>
        <Container
          borderless={borderless}
          columns={columns}
          gridTemplateColumns={gridTemplateColumns}
          isOpen={isOpen}
          pt={borderless ? 16 : undefined}
          px={8}
          py={borderless ? 0 : 16}
        >
          {children}
        </Container>
        {!isOpen && !borderless && <Collapsed />}
      </Section>
    );
  }
  return null;
};
