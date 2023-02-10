import styled from '@emotion/styled';
import upperFirst from 'lodash.upperfirst';

import { NotFoundAscii } from './ascii/NotFoundAscii';
import { Pane } from './Pane';
import { Title } from './typography/Title';

interface NotFoundProps {
  content?: string;
}

const NotFoundText = styled(Title)(({ theme }) => ({
  marginTop: theme.spacing[8],
}));

export function NotFound({ content = '' }: NotFoundProps) {
  return (
    <Pane>
      <NotFoundAscii />
      <NotFoundText>
        {upperFirst(content)}
        {content && ' '}Not Found
      </NotFoundText>
    </Pane>
  );
}
