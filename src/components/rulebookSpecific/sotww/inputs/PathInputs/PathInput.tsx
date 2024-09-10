import { upperFirst } from 'lodash';
import { PropsWithChildren, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiDelete } from '~/components/buttons/DeleteButton';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/containers/FormSection';
import { Label } from '~/components/form/Label';
import { TextAreaInput } from '~/components/form/TextAreaInput';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { SotwwPathType } from '~/constants/sotww/game';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { makeNestedFieldNameFn } from '~/logic/utils/form/makeNestedFieldNameFn';
import { SortableAddAnotherChildProps } from '~/typings/form';
import {
  SotwwCharacterData,
  SotwwPathBenefit,
} from '~/typings/sotww/characterData';

interface PathInputProps {
  pathType: SotwwPathType;
  icon: RpgIcons;
}

const createDefaultValue = (): SotwwPathBenefit => ({
  path_benefit_description: '',
  path_benefit_name: '',
});

interface PathBenefitInputProps
  extends Omit<SortableAddAnotherChildProps, 'sortIndexMap' | 'fieldId'>,
    Pick<PathInputProps, 'pathType'> {}

function PathBenefitInput({
  onDelete,
  postSortIndex,
  pathType,
}: PathBenefitInputProps) {
  const { isEditMode } = useContext(EditContext);
  const { watch } = useFormContext<SotwwCharacterData>();

  const pathBenefitName = `path_${pathType}_benefits` as const;

  const makePathBenefitFieldName = makeNestedFieldNameFn<
    SotwwCharacterData,
    typeof pathBenefitName
  >(pathBenefitName);

  const benefitNameFieldName = makePathBenefitFieldName(
    'path_benefit_name',
    postSortIndex
  );

  return (
    <FormSection
      borderless
      columns={1}
      isNested
      title={watch(benefitNameFieldName)}
      visibilityTitle={`${pathType}${postSortIndex}${postSortIndex}`}
    >
      <GridBox
        alignItems="end"
        gridTemplateColumns={isEditMode ? '1fr auto' : '1fr'}
      >
        <FlexBox flexDirection="column" gap={16}>
          <TextInput<SotwwCharacterData>
            label="Name"
            name={benefitNameFieldName}
          />
        </FlexBox>
        {isEditMode && (
          <AddAnotherMultiDelete onDelete={() => onDelete(postSortIndex)} />
        )}
      </GridBox>
      <TextAreaInput<SotwwCharacterData>
        label="Description"
        name={makePathBenefitFieldName(
          'path_benefit_description',
          postSortIndex
        )}
      />
    </FormSection>
  );
}

function BenefitChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

export function PathInput({ pathType, icon }: PathInputProps) {
  return (
    <FormSection columns={1} icon={icon} title={`${upperFirst(pathType)} Path`}>
      <TextInput<SotwwCharacterData>
        label={`${upperFirst(pathType)} Path`}
        name={`path_${pathType}`}
      />
      <Label<SotwwCharacterData>
        label="Path Benefits"
        labelFor={`path_${pathType}_benefits`}
      >
        <AddAnotherMultiField<SotwwCharacterData>
          ChildWrapper={BenefitChildWrapper}
          createDefaultValue={createDefaultValue}
          parentFieldName={`path_${pathType}_benefits`}
        >
          {({ index, onDelete }) => (
            <PathBenefitInput
              pathType={pathType}
              postSortIndex={index}
              onDelete={onDelete}
            />
          )}
        </AddAnotherMultiField>
      </Label>
    </FormSection>
  );
}
