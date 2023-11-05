import { FlexBox } from '~/components/box/FlexBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FORM_ROW_GAP } from '~/constants/styles';
import {
  SotwwCharacterData,
  SotwwMagicTradition,
} from '~/typings/sotww/characterData';

import { TraditionInputItem } from './TraditionInputItem';

const createDefaultTradition = (): SotwwMagicTradition => ({
  tradition_name: 'Aeromancy',
  tradition_spells: [],
  tradition_talents: [],
});

export function MagicTraditionInputs() {
  return (
    <FlexBox flexDirection="column" gap={FORM_ROW_GAP}>
      <AddAnotherMultiField<SotwwCharacterData>
        addLabel="+ Add a new Tradition"
        createDefaultValue={createDefaultTradition}
        parentFieldName="magic_traditions"
      >
        {({ index, onDelete }) => (
          <TraditionInputItem postSortIndex={index} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </FlexBox>
  );
}
