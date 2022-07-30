/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { useCombobox } from 'downshift';

import { CollapseButton } from '../buttons/CollapseButton';
import { SubBody } from '../typography/SubBody';
import { Label } from './Label';
import { SelectOption } from './typings';

interface AutocompleteProps {
  onValueChange: (value?: string) => void;
  items: SelectOption[];
  label: string;
  className?: string;
}

const ComboBox = styled.div`
  display: flex;
`;

const OptionsList = styled.ul``;

const Option = styled.li<{ isHighlighted: boolean; isSelected: boolean }>``;

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
    <Label className={className} label={label} labelProps={getLabelProps()}>
      <ComboBox {...getComboboxProps()}>
        <input {...getInputProps()} />
        <CollapseButton
          buttonProps={getToggleButtonProps()}
          isOpen={isOpen}
          title={`Toggle ${label} autocomplete`}
        />
      </ComboBox>
      <OptionsList {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <Option
              {...getItemProps({ item, index })}
              isHighlighted={highlightedIndex === index}
              isSelected={selectedItem === item}
              // eslint-disable-next-line react/no-array-index-key
              key={`${item.value}${index}`}
            >
              <SubBody>{item.label}</SubBody>
            </Option>
          ))}
      </OptionsList>
    </Label>
  );
};
