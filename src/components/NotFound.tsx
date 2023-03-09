import styled from '@emotion/styled';
import { upperFirst } from 'lodash';

import { NotFoundAscii } from './ascii/NotFoundAscii';
import { Pane } from './Pane';
import { Text } from './Text';

interface NotFoundProps {
  content?: string;
}

const NotFoundText = styled(Text)(({ theme }) => ({
  marginTop: theme.spacing[8],
}));

export function NotFound({ content = '' }: NotFoundProps) {
  return (
    <Pane>
      <NotFoundAscii />
      <NotFoundText as="h1">
        {upperFirst(content)}
        {content && ' '}Not Found
      </NotFoundText>
    </Pane>
  );
}
