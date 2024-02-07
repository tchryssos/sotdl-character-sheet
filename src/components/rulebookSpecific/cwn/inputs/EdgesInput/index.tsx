import { PropsWithChildren } from 'react';

import { GridBox } from '~/components/box/GridBox';
import { AddAnotherMultiField } from '~/components/form/AddAnotherMultiField';
import { FormSection } from '~/components/form/FormSection';
import { RpgIcons } from '~/constants/icons';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { CwnCharacterData, CwnEdge } from '~/typings/cwn/characterData';

import { EdgeInputItem } from './EdgeInputItem';

const createDefaultValue = () =>
  ({
    name: '',
    description: '',
  } satisfies CwnEdge);

function EdgeChildWrapper({ children }: PropsWithChildren<unknown>) {
  const isLessThanSm = useBreakpointsLessThan('sm');
  return <GridBox columns={isLessThanSm ? 1 : 2}>{children}</GridBox>;
}

export function EdgesInput() {
  return (
    <FormSection columns={1} icon={RpgIcons.PuzzlePiece} title="Edges">
      <AddAnotherMultiField<CwnCharacterData>
        ChildWrapper={EdgeChildWrapper}
        createDefaultValue={createDefaultValue}
        parentFieldName="edges"
      >
        {({ index, onDelete, fieldId }) => (
          <EdgeInputItem
            key={fieldId}
            postSortIndex={index}
            onDelete={onDelete}
          />
        )}
      </AddAnotherMultiField>
    </FormSection>
  );
}
