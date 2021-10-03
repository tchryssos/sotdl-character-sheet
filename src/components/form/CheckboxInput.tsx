import styled from '@emotion/styled';

import { CheckboxInputProps } from '~/components/form/typings';

import { Input } from './Input';

const CheckInput = styled(Input)`
  width: ${({ theme }) => theme.spacing[40]};
  padding: 0;
  margin: 0;
`;

export const CheckboxInput: React.FC<Omit<CheckboxInputProps, 'type'>> = ({
  label,
  name,
  readOnly,
  className,
  disabled,
  validations,
  hideLabel,
  customOnChange,
  alwaysEditable,
}) => (
  <CheckInput
    alwaysEditable={alwaysEditable}
    className={className}
    customOnChange={customOnChange}
    disabled={disabled}
    hideLabel={hideLabel}
    label={label}
    name={name}
    readOnly={readOnly}
    type="checkbox"
    validations={validations}
  />
);
