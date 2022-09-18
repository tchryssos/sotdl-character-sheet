import styled from '@emotion/styled';
import { useContext } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SwnCharacterData, SwnClassBenefit } from '~/typings/swn/characterData';

const createBenefitFieldName = (
  name: keyof SwnClassBenefit,
  index: number
): `class_benefits.${number}.${keyof SwnClassBenefit}` =>
  `class_benefits.${index}.${name}`;

interface BenefitFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

const RemoveButton = styled(DeleteButton)`
  margin-top: ${({ theme }) => theme.spacing[16]};
`;

const BenefitField: React.FC<BenefitFieldProps> = ({ index, onDelete }) => {
  const { isEditMode } = useContext(EditContext);
  return (
    <FlexBox gap={8}>
      <TextAreaInput
        label={`Benefit ${index + 1}`}
        name={createBenefitFieldName('description', index)}
      />
      {isEditMode && <RemoveButton onDelete={() => onDelete(index)} />}
    </FlexBox>
  );
};

const createDefaultBenefit = (): SwnClassBenefit => ({
  description: '',
});

export const ClassBenefitsInput: React.FC = () => (
  <FormSection
    borderless
    canToggleVisibility={false}
    columns={1}
    isCollapsable
    title="Class Benefits"
  >
    <AddAnotherMultiField<SwnCharacterData>
      createDefaultValue={createDefaultBenefit}
      parentFieldName="class_benefits"
    >
      {({ index, onDelete }) => (
        <BenefitField index={index} onDelete={onDelete} />
      )}
    </AddAnotherMultiField>
  </FormSection>
);
