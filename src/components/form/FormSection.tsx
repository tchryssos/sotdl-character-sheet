import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useState } from 'react';

import theme from '~/constants/theme';
import { EditContext } from '~/logic/contexts/editContext';

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
}

const TitleBox = styled(FlexBox)`
  position: relative;
`;

const Text = styled(Body)<
  Pick<FormSectionProps, 'isCollapsable'> & { isEditMode: boolean }
>(({ isEditMode, isCollapsable }) => ({
  whiteSpace: 'nowrap',
  ...(isCollapsable && {
    paddingLeft: theme.spacing[48],
  }),
  ...(isEditMode && {
    paddingRight: theme.spacing[48],
  }),
}));

const Section = styled(FlexBox)<{ addMargin: boolean }>`
  height: 100%;
`;

const collapsableStyles = css`
  border-color: ${theme.colors.grey};
  border-width: ${theme.border.borderWidth[1]};
  border-style: solid;
`;

const Line = styled(Box)`
  height: 0;
  width: 100%;
  ${collapsableStyles};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const Container = styled(GridBox)<{ isOpen?: boolean }>`
  ${collapsableStyles};
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
    }${theme.spacing[8]})`,
    marginRight: theme.spacing[8],
  })
);

const Collapsed = styled.div`
  ${collapsableStyles};
  border-top-width: 0;
  height: ${theme.spacing[24]};
  /* height: 0 on container still leaves a 1px space */
  transform: translateY(-1px);
`;

const VisibilityButton = styled(IconButton)`
  margin-left: ${theme.spacing[8]};
  transform: translateY(${theme.spacing[8]});
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  columns,
  isCollapsable,
}) => {
  const [isOpen, setIsOpen] = useState(!isCollapsable);
  const [isVisible, setIsVisible] = useState(true);
  const isEditMode = useContext(EditContext);

  if ((!isEditMode && isVisible) || isEditMode) {
    return (
      <Section addMargin={isCollapsable || isEditMode} column>
        <FlexBox alignItems="flex-end" ml={4}>
          <TitleBox>
            {isCollapsable && (
              <CollapseButton
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChevRight
                  title="Collapsable arrow"
                  titleId="collapseable-arrow-icon"
                />
              </CollapseButton>
            )}
            <Text isCollapsable={isCollapsable} isEditMode={isEditMode} italic>
              {title}
            </Text>
            {isEditMode && (
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
