/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { useCombobox } from 'downshift';

import { FlexBox } from '../box/FlexBox';
import { CollapseButton } from '../buttons/CollapseButton';
import { Check } from '../icons/Check';
import { LoadingSpinner } from '../LoadingSpinner';
import { Body } from '../typography/Body';
import { StyledInput } from './Input';
import { Label } from './Label';
import { SelectOption } from './typings';

interface AutocompleteProps {
  onValueChange: (value?: string) => void;
  items: SelectOption[];
  label: string;
  className?: string;
  isLoading?: boolean;
}

const Wrapper = styled.div`
  position: relative;
`;

const SearchIconWrapper = styled(FlexBox)`
  position: absolute;
  width: fit-content;
  top: 0;
  /*
    A deeply nested bg hover color messes with the border of the input
    so we just shift the button 1px over so the two borders don't overlap
  */
  right: 1px;
  height: 100%;
`;

const Loading = styled(LoadingSpinner)`
  height: ${({ theme }) => theme.fontSize.body};
`;

const ComboBox = styled.div`
  display: flex;
  position: relative;
`;

const Search = styled(StyledInput)`
  appearance: none;
  // https://stackoverflow.com/questions/57011736/how-to-get-rid-of-the-x-on-the-search-bar
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }
  ::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  ::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
`;

const OptionsList = styled.ul<{ isVisible: boolean }>(
  ({ theme, isVisible }) => ({
    position: 'absolute',
    backgroundColor: theme.colors.background,
    borderTop: `${theme.borderWidth[1]} solid ${theme.colors.accentLight}`,
    width: '100%',
    paddingBottom: theme.spacing[8],
    transform: isVisible ? '' : 'translateY(99999px)',
  })
);

const Option = styled.li<{ isHighlighted: boolean; isSelected: boolean }>(
  ({ theme, isHighlighted, isSelected }) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
    border: `${theme.borderWidth[1]} solid ${theme.colors.accentLight}`,
    borderTop: 'none',
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: isHighlighted
      ? theme.colors.accentHeavy
      : isSelected
      ? theme.colors.accentLight
      : 'transparent',
  })
);

const SelectedCheck = styled(Check)(({ theme }) => ({
  height: theme.fontSize.body,
  width: 'fit-content',
  marginRight: theme.spacing[4],
}));

export const Autocomplete: React.FC<AutocompleteProps> = ({
  onValueChange,
  items,
  label,
  className,
  isLoading,
}) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange: ({ inputValue }) => {
      onValueChange(inputValue);
    },
    items,
    itemToString: (item) => item?.label || '',
  });
  // See https://www.downshift-js.com/use-combobox#basic-usage
  return (
    <Wrapper>
      <Label className={className} label={label} labelProps={getLabelProps()}>
        <ComboBox {...getComboboxProps()}>
          <Search {...getInputProps()} type="search" />
          <SearchIconWrapper center gap={8}>
            {isLoading && (
              <Loading
                title={`Loading ${label}`}
                titleId="autocomplete-loading"
              />
            )}
            {Boolean(items.length) && (
              <CollapseButton
                buttonProps={getToggleButtonProps()}
                isOpen={isOpen}
                title={`Toggle ${label} autocomplete`}
              />
            )}
          </SearchIconWrapper>
        </ComboBox>
        <OptionsList {...getMenuProps()} isVisible={isOpen && items.length}>
          {isOpen &&
            items.map((item, index) => (
              <Option
                {...getItemProps({ item, index })}
                isHighlighted={highlightedIndex === index}
                isSelected={selectedItem === item}
                // eslint-disable-next-line react/no-array-index-key
                key={`${item.value}${index}`}
              >
                {selectedItem === item && (
                  <SelectedCheck
                    color="text"
                    title="Selected Item"
                    titleId="selected-item-check"
                  />
                )}
                <Body>{item.label}</Body>
              </Option>
            ))}
        </OptionsList>
      </Label>
    </Wrapper>
  );
};
