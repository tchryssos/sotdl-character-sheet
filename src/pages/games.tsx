import styled from '@emotion/styled';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import { Pane } from '~/components/Pane';
import { Body } from '~/components/typography/Body';
import { Title } from '~/components/typography/Title';
import { SUPPORTED_GAMES } from '~/constants/supportedGames';

const GamesWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const Games = () => (
  <Layout meta="" title="Game selection">
    <GamesWrapper alignItems="flex-start" justifyContent="center">
      <Pane mt={16}>
        <Title mb={16}>Select a game</Title>
        <GridBox columns={1} rowGap={16}>
          {Object.keys(SUPPORTED_GAMES).map((key) => (
            <Link
              href={SUPPORTED_GAMES[key].link}
              isInternal
              key={SUPPORTED_GAMES[key].name}
            >
              <Body>{SUPPORTED_GAMES[key].name}</Body>
            </Link>
          ))}
        </GridBox>
      </Pane>
    </GamesWrapper>
  </Layout>
);

export default Games;
