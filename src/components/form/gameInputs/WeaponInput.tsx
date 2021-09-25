import styled from '@emotion/styled';
import { useContext } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { Button } from '~/components/Button';
import { Body } from '~/components/typography/Body';
import { FIELD_NAMES } from '~/constants/form';
import { ReactHookFormContext } from '~/logic/contexts/rhfContext';

import { AddAnotherMultiField } from '../AddAnotherMultiField';
import { FormSection } from '../FormSection';
import { Label } from '../Label';
import { NumberInput } from '../NumberInput';
import { TextAreaInput } from '../TextAreaInput';
import { TextInput } from '../TextInput';

const AddRemoveButton = styled(Button)`
  max-width: ${({ theme }) => theme.spacing[128]};
  max-height: ${({ theme }) => theme.spacing[40]};
`;

const WeaponCheckbox = styled.input`
  min-width: ${({ theme }) => theme.spacing[40]};
  min-height: ${({ theme }) => theme.spacing[40]};
  padding: 0;
  margin: 0;
`;

const AmmoContainer = styled(GridBox)`
  max-width: 25%;
`;

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
  const { setValue, watch } = useContext(ReactHookFormContext);

  const activeWeaponIndex: number | undefined = watch?.(
    FIELD_NAMES.activeWeaponIndex
  );

  const onWeaponCheck = () => {
    const newVal = index === activeWeaponIndex ? undefined : index;
    setValue(FIELD_NAMES.activeWeaponIndex, newVal);
  };

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
      <GridBox gridTemplateColumns="7fr 1fr">
        <TextAreaInput
          hideLabel
          name={`${FIELD_NAMES.weapons.fieldName}.${index}.${FIELD_NAMES.weapons.notes}`}
        />
        <AddRemoveButton label="X" onClick={() => onDelete(index)} />
      </GridBox>
    </GridBox>
  );
};

const WeaponHeader: React.FC = () => (
  <GridBox gridTemplateColumns={weaponTemplateColumns}>
    <GridBox gridTemplateColumns="1fr 7fr">
      <Body>Active</Body>
      <Body bold>Name</Body>
    </GridBox>
    <Body bold>Hands</Body>
    <Body bold>Damage</Body>
    <Body bold>Notes</Body>
  </GridBox>
);

export const WeaponInput: React.FC = () => {
  const { watch } = useContext(ReactHookFormContext);

  const weapons = watch?.(FIELD_NAMES.weapons.fieldName);
  return (
    <FormSection columns={1} title="Weapons">
      <AddAnotherMultiField
        HeaderRow={WeaponHeader}
        createDefaultValue={createDefaultWeapon}
        parentFieldName={FIELD_NAMES.weapons.fieldName}
      >
        {({ index, onDelete }) => (
          <WeaponField index={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
      {Boolean(weapons?.length) && (
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
      )}
    </FormSection>
  );
};
