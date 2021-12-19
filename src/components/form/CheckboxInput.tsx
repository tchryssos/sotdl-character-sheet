import styled from '@emotion/styled';
import startCase from 'lodash.startcase';
import { useFormContext } from 'react-hook-form';

import { CheckboxInputProps } from '~/components/form/typings';
import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { FlexBox } from '../box/FlexBox';
import { Check } from '../icons/Check';
import { Input } from './Input';
import { Label } from './Label';

const CheckInput = styled(Input)`
  width: ${({ theme }) => theme.spacing[40]};
  padding: 0;
  margin: 0;
  position: absolute;
  opacity: 0;
  z-index: -1;
`;

const WrapperLabel = styled(Label)`
  position: relative;
  cursor: pointer;
  width: fit-content;
`;

const FakeBox = styled(FlexBox)(({ theme }) => ({
  border: `${theme.colors.accentLight} solid ${theme.border.borderWidth[1]}`,
  width: theme.spacing[40],
  height: theme.spacing[40],
  borderRadius: pxToRem(4),
}));

export const CheckboxInput: React.FC<
  Omit<CheckboxInputProps, 'type' | 'customOnChange' | 'onChange'>
> = ({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  alwaysEditable,
}) => {
  const { watch, setValue } = useFormContext();
  const checked = watch(name);

  const onChange = () => {
    setValue(name, !checked);
  };

  return (
    <WrapperLabel
      label={hideLabel ? '' : label || startCase(name)}
      labelFor={name}
      onClick={onChange}
    >
      <CheckInput
        alwaysEditable={alwaysEditable}
        className={className}
        disabled={disabled || readOnly}
        hideLabel
        name={name}
        type="checkbox"
        validations={validations}
      />
      <FakeBox>
        {checked && (
          <Check
            color="text"
            title={`${name} checked`}
            titleId={`${name}-checked`}
          />
        )}
      </FakeBox>
    </WrapperLabel>
  );
};
