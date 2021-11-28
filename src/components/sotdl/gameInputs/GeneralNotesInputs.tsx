import styled from '@emotion/styled';

import { FIELD_NAMES } from '~/constants/form';

import { TextAreaInput } from '../../form/TextAreaInput';

const NotesInput = styled(TextAreaInput)`
  height: ${({ theme }) => theme.spacing[80]};
`;

export const GeneralNotesInputs: React.FC = () => (
  <NotesInput name={FIELD_NAMES.generalNotes} />
);
