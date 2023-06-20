import { useFormContext } from 'react-hook-form';

import { FormSection } from '~/components/form/FormSection';
import { TextInput } from '~/components/form/TextInput';
import { RpgIcons } from '~/constants/icons';
import { WwnCharacterData, WwnTradition } from '~/typings/wwn/characterData';

interface TraditionInputItemProps {
  index: number;
  onDelete: (index: number) => void;
}

const createTraditionFieldName = (
  fieldName: keyof WwnTradition,
  index: number
): `magic_traditions.${number}.${keyof WwnTradition}` =>
  `magic_traditions.${index}.${fieldName}`;

export function TraditionInputItem({
  index,
  onDelete,
}: TraditionInputItemProps) {
  const { watch } = useFormContext<WwnCharacterData>();

  const nameFieldName = createTraditionFieldName('tradition_name', index);
  const name = watch(nameFieldName) as string;

  return (
    <FormSection
      columns={1}
      icon={RpgIcons.WandLight}
      title={`Tradition - ${name}`}
    >
      <TextInput<WwnCharacterData> label="Name" name={nameFieldName} />
    </FormSection>
  );
}
