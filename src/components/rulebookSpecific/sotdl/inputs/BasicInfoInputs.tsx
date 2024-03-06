import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/containers/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';

export function BasicInfoInputs() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection columns={1} title="Basic Info">
      <GridBox gridTemplateColumns={isLessThanSm ? '5fr 1fr' : '7fr 1fr'}>
        <TextInput<SotdlCharacterData> name="name" />
        <NumberInput<SotdlCharacterData> max={10} min={0} name="level" />
      </GridBox>
    </FormSection>
  );
}
