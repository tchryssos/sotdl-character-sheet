import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { NumberInput } from '~/components/form/NumberInput';
import { TextInput } from '~/components/form/TextInput';
import { KeyName } from '~/components/form/typings';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';

export function BasicInfoInputs<T extends { name: string; level: number }>() {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return (
    <FormSection columns={1} title="Basic Info">
      <GridBox gridTemplateColumns={isLessThanSm ? '5fr 1fr' : '7fr 1fr'}>
        <TextInput<T> name={'name' as KeyName<T>} />
        <NumberInput<T> max={10} min={0} name={'level' as KeyName<T>} />
      </GridBox>
    </FormSection>
  );
}
