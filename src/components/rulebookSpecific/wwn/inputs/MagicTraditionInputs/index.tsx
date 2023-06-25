import { FlexBox } from '~/components/box/FlexBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FORM_ROW_GAP } from '~/constants/styles';
import { WwnCharacterData, WwnTradition } from '~/typings/wwn/characterData';

import { TraditionInputItem } from './TraditionInputItem';

const createDefaultTradition = (): WwnTradition => ({
  tradition_name: '',
  tradition_spells: [],
  tradition_arts: [],
});

export function MagicTraditionInputs() {
  return (
    <FlexBox flexDirection="column" gap={FORM_ROW_GAP}>
      <AddAnotherMultiField<WwnCharacterData>
        addLabel="+ Add a new tradition"
        createDefaultValue={createDefaultTradition}
        parentFieldName="magic_traditions"
      >
        {({ index, onDelete, fieldId }) => (
          <TraditionInputItem index={index} key={fieldId} onDelete={onDelete} />
        )}
      </AddAnotherMultiField>
    </FlexBox>
  );
}
