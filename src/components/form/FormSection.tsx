import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';

import { RpgIcons } from '~/constants/icons';
import { Theme } from '~/constants/theme';
import { EditContext } from '~/logic/contexts/editContext';
import { VisibilityContext } from '~/logic/contexts/visibilityContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { Color } from '~/typings/theme';

import { Box } from '../box/Box';
import { FlexBox } from '../box/FlexBox';
import { GridBox, GridBoxProps } from '../box/GridBox';
import { CollapseButton } from '../buttons/CollapseButton';
import { IconButton } from '../buttons/IconButton';
import { Invisible } from '../icons/Invisible';
import { RpgIcon } from '../icons/RpgIcon';
import { Visible } from '../icons/Visible';
import { Text } from '../Text';

interface FormSectionProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  columns?: GridBoxProps['columns'];
  isCollapsible?: boolean;
  canToggleVisibility?: boolean;
  className?: string;
  visibilityTitle?: string;
  borderless?: boolean;
  gridTemplateColumns?: GridBoxProps['gridTemplateColumns'];
  defaultExpanded?: boolean;
  icon?: RpgIcons;
  gridTemplateRows?: GridBoxProps['gridTemplateRows'];
  isNested?: boolean;
  titleColor?: Color;
}

const TitleBox = styled(FlexBox)`
  position: relative;
  overflow: hidden;
  width: auto;
`;

const FormTitle = styled(Text)<
  Pick<FormSectionProps, 'isCollapsible'> & { isEditMode: boolean }
>(({ isEditMode, isCollapsible, theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  ...(isCollapsible && {
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
  border-color: ${borderless ? 'transparent' : theme.colors.textAccent};
  border-width: ${borderless ? 0 : theme.borderWidth[1]};
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
  align-items: start;
  overflow: hidden;
`;

const VisibilityButton = styled(IconButton)`
  transform: translateY(${({ theme }) => theme.spacing[4]});
  position: absolute;
  right: 0;
  bottom: 0;
`;

const CollapseToggle = styled(CollapseButton)`
  bottom: -${pxToRem(6)};
`;

export function FormSection({
  title,
  children,
  columns,
  isCollapsible = true,
  canToggleVisibility = true,
  className,
  visibilityTitle,
  borderless,
  gridTemplateColumns,
  defaultExpanded = true,
  icon,
  gridTemplateRows = 'min-content',
  isNested,
  titleColor,
}: FormSectionProps) {
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
  const [isOpen, setIsOpen] = useState(defaultExpanded);

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
  // END - SECTION COLLAPSED STATUS - END

  if ((!isEditMode && isVisible) || isEditMode) {
    return (
      <Section
        addMargin={isCollapsible || isEditMode}
        className={className}
        flexDirection="column"
      >
        <GridBox
          alignItems="flex-end"
          color={titleColor}
          gap={8}
          gridTemplateColumns={`auto${icon ? ` ${pxToRem(24)}` : ''}${
            borderless ? '' : ' 1fr'
          }`}
          marginLeft={borderless ? 0 : 4}
        >
          <TitleBox>
            {isCollapsible && (
              <CollapseToggle
                absolute
                isOpen={isOpen}
                title={title}
                onChangeExpanded={onChangeExpanded}
              />
            )}
            <FormTitle
              fontStyle="italic"
              isCollapsible={isCollapsible}
              isEditMode={isEditMode}
              paddingRight={2}
              variant={isNested ? 'body-lg' : 'title-sm'}
            >
              {title}
            </FormTitle>

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
          {icon && (
            <Box
              height="100%"
              maxHeight={pxToRem(24)}
              maxWidth={pxToRem(24)}
              width="100%"
            >
              <RpgIcon iconIndex={icon} />
            </Box>
          )}
          {!borderless && <Line />}
        </GridBox>
        <Container
          borderless={borderless}
          columns={columns}
          gridTemplateColumns={gridTemplateColumns}
          gridTemplateRows={gridTemplateRows}
          isOpen={isOpen}
          paddingX={20}
          paddingY={borderless ? 12 : 20}
        >
          {children}
        </Container>
      </Section>
    );
  }
  return null;
}
