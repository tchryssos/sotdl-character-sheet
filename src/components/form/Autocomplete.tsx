/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { useCombobox } from 'downshift';

import { CollapseButton } from '../buttons/CollapseButton';
import { Check } from '../icons/Check';
import { Body } from '../typography/Body';
import { SubBody } from '../typography/SubBody';
import { StyledInput } from './Input';
import { Label } from './Label';
import { SelectOption } from './typings';

interface AutocompleteProps {
  onValueChange: (value?: string) => void;
  items: SelectOption[];
  label: string;
  className?: string;
}

const Wrapper = styled.div`
  position: relative;
`;

const OpenButton = styled(CollapseButton)`
  top: 0;
  /*
    A deeply nested bg hover color messes with the border of the input
    so we just shift the button 1px over so the two borders don't overlap
  */
  right: 1px;
  left: unset;
`;

const ComboBox = styled.div`
  display: flex;
  position: relative;
`;

const Search = styled(StyledInput)`
  -webkit-appearance: none;
`;

const OptionsList = styled.ul<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'absolute',
  backgroundColor: theme.colors.background,
  border: isOpen
    ? `${theme.border.borderWidth[1]} solid ${theme.colors.accentLight}`
    : 'none',
  width: '100%',
}));

const Option = styled.li<{ isHighlighted: boolean; isSelected: boolean }>(
  ({ theme, isHighlighted, isSelected }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing[4],
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
          <OpenButton
            buttonProps={getToggleButtonProps()}
            isOpen={isOpen}
            title={`Toggle ${label} autocomplete`}
          />
        </ComboBox>
        <OptionsList {...getMenuProps()} isOpen={isOpen}>
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
