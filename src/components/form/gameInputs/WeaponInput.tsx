import styled from '@emotion/styled';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { DeleteButton } from '~/components/buttons/DeleteButton';
import { SubBody } from '~/components/typography/SubBody';
import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

import { AddAnotherMultiField } from '../AddAnotherMultiField';
import { FormSection } from '../FormSection';
import { Label } from '../Label';
import { TextAreaInput } from '../TextAreaInput';
import { TextInput } from '../TextInput';

const RemoveButton = styled(DeleteButton)(({ theme }) => ({
  marginTop: theme.spacing[20],
  [theme.breakpoints.sm]: {
    marginTop: 0,
  },
}));

const WeaponCheckbox = styled.input`
  min-width: ${({ theme }) => theme.spacing[40]};
  min-height: ${({ theme }) => theme.spacing[40]};
  padding: 0;
  margin: 0;
`;

const SmWeaponActiveLabel = styled(Label)`
  width: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const AmmoContainer = styled(GridBox)`
//   max-width: 25%;
// `;

interface WeaponFieldProps {
  index: number;
  onDelete: (index: number) => void;
}

const createDefaultWeapon = () => ({
  [FIELD_NAMES.weapons.name]: '',
  [FIELD_NAMES.weapons.hands]: 'one',
  [FIELD_NAMES.weapons.damage]: '1d3',
  [FIELD_NAMES.weapons.notes]: '',
});

const weaponTemplateColumns = '3fr 1fr 1fr 3fr';

const WeaponField: React.FC<WeaponFieldProps> = ({ index, onDelete }) => {
  const { setValue, watch } = useFormContext();
  const isEditMode = useContext(EditContext);
  const isLessThanSm = useBreakpointsLessThan('sm');

  const activeWeaponIndex: number | undefined = watch(
    FIELD_NAMES.activeWeaponIndex
  );

  const onWeaponCheck = () => {
    const newVal = index === activeWeaponIndex ? undefined : index;
    setValue(FIELD_NAMES.activeWeaponIndex, newVal);
  };

  if (isLessThanSm) {
    return (
      <FlexBox>
        <SmWeaponActiveLabel
          label="Act."
          labelFor={FIELD_NAMES.activeArmorIndex}
        >
          <WeaponCheckbox
            checked={activeWeaponIndex === index}
            name={FIELD_NAMES.activeWeaponIndex}
            type="checkbox"
            onChange={onWeaponCheck}
          />
        </SmWeaponActiveLabel>
        <FlexBox column mx={8}>
          <GridBox gridTemplateColumns="6fr 2fr" mb={8}>
            <TextInput
              label="Name"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.name}`}
            />
            <TextInput
              label="Hands"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.hands}`}
            />
          </GridBox>
          <GridBox gridTemplateColumns="2fr 6fr">
            <TextInput
              label="Damage"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.damage}`}
            />
            <TextAreaInput
              label="Notes"
              name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.notes}`}
            />
          </GridBox>
        </FlexBox>
        {isEditMode && <RemoveButton onDelete={() => onDelete(index)} />}
      </FlexBox>
    );
  }

  return (
    <GridBox gridTemplateColumns={weaponTemplateColumns}>
      <GridBox gridTemplateColumns="1fr 7fr">
        <WeaponCheckbox
          checked={activeWeaponIndex === index}
          name={FIELD_NAMES.activeWeaponIndex}
          type="checkbox"
          onChange={onWeaponCheck}
        />
        <TextInput
          hideLabel
          name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.name}`}
        />
      </GridBox>
      <TextInput
        hideLabel
        name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.hands}`}
      />
      <TextInput
        hideLabel
        name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.damage}`}
      />
      <GridBox gridTemplateColumns={isEditMode ? '7fr 1fr' : '1fr'}>
        <TextAreaInput
          hideLabel
          name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.notes}`}
        />
        {isEditMode && <DeleteButton onDelete={() => onDelete(index)} />}
      </GridBox>
    </GridBox>
  );
};

const WeaponHeader: React.FC = () => (
  <GridBox gridTemplateColumns={weaponTemplateColumns}>
    <GridBox gridTemplateColumns="1fr 7fr">
      <SubBody>Active</SubBody>
      <SubBody bold>Name</SubBody>
    </GridBox>
    <SubBody bold>Hands</SubBody>
    <SubBody bold>Damage</SubBody>
    <SubBody bold>Notes</SubBody>
  </GridBox>
);

export const WeaponInput: React.FC = () => {
  const isLessThanSm = useBreakpointsLessThan('sm');

  // const weapons = watch(FIELD_NAMES.weapons.fieldName);
  return (
    <FormSection columns={1} isCollapsable title="Weapons">
      <AddAnotherMultiField
        HeaderRow={isLessThanSm ? undefined : WeaponHeader}
        createDefaultValue={createDefaultWeapon}
        parentFieldName={FIELD_NAMES.weapons.fieldName}
      >
        {({ index, onDelete }) => (
          <WeaponField index={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
      {/*
        Ammo tracker doesn't seem STRICTLY necessary
        and I need to figure out a good way to toggle them on and off
      */}
      {/* {Boolean(weapons?.length) && (
        <Label label="Ammo Trackers" labelFor="ammo_trackers">
          <AmmoContainer>
            <NumberInput
              hideLabel
              max={5}
              min={0}
              name={FIELD_NAMES.ammoTrackers.one}
            />
            {Boolean(weapons?.length > 1) && (
              <NumberInput
                hideLabel
                max={5}
                min={0}
                name={FIELD_NAMES.ammoTrackers.two}
              />
            )}
          </AmmoContainer>
        </Label>
      )} */}
    </FormSection>
  );
};
