import styled from '@emotion/styled';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { CheckboxInput } from '~/components/form/CheckboxInput';
import { FormSection } from '~/components/form/containers/FormSection';
import { RpgIcons } from '~/constants/icons';
import { EditContext } from '~/logic/contexts/editContext';
import { useFilterUnreadied } from '~/logic/utils/rulebookSpecific/cwn/useFilterUnreadied';
import { CwnArmor, CwnCharacterData } from '~/typings/cwn/characterData';

import { AcContext } from '../../AcProvider';
import { ArmorInputItem } from './ArmorInputItem';
import { DEFAULT_ARMOR } from './consts';

const HideCheckbox = styled(CheckboxInput)`
  justify-self: end;
  text-align: end;
`;

const createDefaultValue = (): CwnArmor => ({
  ...DEFAULT_ARMOR,
  id: uuid4(),
});

function ArmorChildWrapper({ children }: PropsWithChildren<unknown>) {
  return <GridBox columns={1}>{children}</GridBox>;
}

export function ArmorsInput() {
  const { watch } = useFormContext<CwnCharacterData>();
  const { calculateAc } = useContext(AcContext);

  const {
    filterUnreadied: filterUnequippedArmor,
    hideUnreadied: hideUnequipped,
    onToggleHide,
  } = useFilterUnreadied<CwnCharacterData>('armors');

  const { isEditMode } = useContext(EditContext);

  const armors = watch('armors');

  useEffect(() => {
    calculateAc();
  }, [armors, calculateAc]);

  return (
    <FormSection columns={1} icon={RpgIcons.ArmorHead} title="Armors">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={ArmorChildWrapper}
        createDefaultValue={createDefaultValue}
        filterFn={filterUnequippedArmor}
        parentFieldName="armors"
      >
        {({ index, onDelete, fieldId }) => (
          <ArmorInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
      {!isEditMode && (
        <HideCheckbox
          alwaysEditable
          customOnChange={onToggleHide}
          inputLike
          isChecked={hideUnequipped}
          name="Hide Unequipped"
          size="sm"
        />
      )}
    </FormSection>
  );
}
