import styled from '@emotion/styled';
import { rulebook } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { Link } from '~/components/Link';
import { LoadingPageSpinner } from '~/components/LoadingSpinner';
import { Layout } from '~/components/meta/Layout';
import { Title } from '~/components/typography/Title';
import { ALL_RULEBOOKS_API_PATH } from '~/constants/routing/api';
import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { NavContext } from '~/logic/contexts/navContext';

const RulebookList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
`;

const RulebookBox = styled(FlexBox)(({ theme }) => ({
  border: `${theme.border.borderWidth[1]} solid ${theme.colors.text}`,
  padding: theme.spacing[24],
  [theme.breakpoints.md]: {
    padding: theme.spacing[40],
  },
}));

const NewCharacterNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('New Character');
  }, [setNavTitle]);

  return null;
};

interface SelectRulebookProps {
  rulebooks: rulebook[];
}

const SelectRulebook: React.FC<SelectRulebookProps> = ({ rulebooks }) => (
  <RulebookList>
    {rulebooks.map((rb) => (
      <li key={rb.id}>
        <Link href={createCharacterRoute(NEW_ID, rb.name)}>
          <RulebookBox>
            <Title>{rb.fullName}</Title>
          </RulebookBox>
        </Link>
      </li>
    ))}
  </RulebookList>
);

const emptyRbs: rulebook[] = [];

const NewCharacterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rulebooks, setRulebooks] = useState<rulebook[]>([]);
  const [hasError, setHasError] = useState(false);

  const getRulebooks = async () => {
    setIsLoading(true);
    const resp = await fetch(ALL_RULEBOOKS_API_PATH, {
      method: 'GET',
    });

    if (resp.status >= 200 && resp.status <= 300) {
      const respData = await resp.json();
      setRulebooks(respData);
      setHasError(false);
    } else {
      setRulebooks(emptyRbs);
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRulebooks();
  }, []);

  return (
    <Layout
      meta="Select a rulebook for your new character"
      title="New Character"
    >
      <NewCharacterNav />
      {isLoading ? (
        <LoadingPageSpinner
          title="Loading rulebooks"
          titleId="new-char-rulebook-loading"
        />
      ) : (
        <SelectRulebook rulebooks={rulebooks} />
      )}
    </Layout>
  );
};

export default NewCharacterPage;
