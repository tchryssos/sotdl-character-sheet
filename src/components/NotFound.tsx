import { NotFoundAscii } from './ascii/NotFoundAscii';
import { Pane } from './Pane';
import { Title } from './typography/Title';

interface NotFoundProps {
  content?: string;
}

export function NotFound({ content = '' }: NotFoundProps) {
  return (
    <Pane>
      <NotFoundAscii />
      <Title>
        {content}
        {content && ' '}Not Found
      </Title>
    </Pane>
  );
}
