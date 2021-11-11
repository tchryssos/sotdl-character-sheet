import styled from '@emotion/styled';

import { FlexBox } from '~/components/box/FlexBox';
import { Layout } from '~/components/meta/Layout';
import { Pane } from '~/components/Pane';
import { Body } from '~/components/typography/Body';

const GamesWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const Games = () => {
  <Layout meta="" title="Game selection">
    <GamesWrapper center>
      <Pane>
        <Body>hi</Body>
      </Pane>
    </GamesWrapper>
  </Layout>;
};

export default Games;
