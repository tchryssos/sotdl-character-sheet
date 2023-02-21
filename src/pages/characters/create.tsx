/* eslint-disable no-nested-ternary */
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { rulebook } from '@prisma/client';
import sample from 'lodash.sample';
import { useContext, useEffect, useState } from 'react';

import { AsciiFigure, AsciiText } from '~/components/ascii/Ascii';
import { FlexBox } from '~/components/box/FlexBox';
import { FormSection } from '~/components/form/FormSection';
import { Link } from '~/components/Link';
import { LoadingPageSpinner } from '~/components/LoadingSpinner';
import { Layout } from '~/components/meta/Layout';
import { Body } from '~/components/typography/Body';
import { Title } from '~/components/typography/Title';
import * as ASCII_ART from '~/constants/ascii';
import { ALL_RULEBOOKS_API_PATH } from '~/constants/routing/api';
import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { RULEBOOK_QUERY_PARAM } from '~/constants/search';
import { SOTDL_NAME } from '~/constants/sotdl/game';
import { NavContext } from '~/logic/contexts/navContext';

const RulebookSection = styled(FormSection)`
  height: fit-content;
`;

const RulebookList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
`;

const AsciiSlide = keyframes`
from {
  transform: rotate(0deg) translate(0, 0) scale(1, 1);
}
to {
  transform: rotate(2deg) translate(-100%, -100%) scale(2, 2)
}
`;

// This is styled so that it can be called more easily
// in the animation below in RulebookLink
const RulebookAscii = styled(AsciiText)``;

const RulebookTitle = styled(Title)`
  z-index: 2;
`;

const RulebookFigure = styled(AsciiFigure)`
  visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  filter: blur(2px);
`;

const RulebookLink = styled(Link)`
  width: 100%;
  :hover {
    ${RulebookFigure} {
      visibility: visible;
    }
    ${RulebookAscii} {
      animation: ${AsciiSlide} 60s linear infinite;
    }
  }
`;

const RulebookBox = styled(FlexBox)(({ theme }) => ({
  border: `${theme.borderWidth[1]} solid ${theme.colors.text}`,
  position: 'relative',
  padding: theme.spacing[24],
  [theme.breakpoints.md]: {
    padding: theme.spacing[40],
  },
}));

function NewCharacterNav() {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('New Character');
  }, [setNavTitle]);

  return null;
}

interface SelectRulebookProps {
  rulebooks: rulebook[];
}

function SelectRulebook({ rulebooks }: SelectRulebookProps) {
  return (
    <RulebookSection
      columns={1}
      isCollapsible={false}
      title="Select a rulebook"
    >
      <RulebookList>
        {rulebooks.map((rb) => (
          <li key={rb.id}>
            <RulebookLink
              href={`${createCharacterRoute(NEW_ID)}?${RULEBOOK_QUERY_PARAM}=${
                rb.name
              }`}
            >
              <RulebookBox>
                <RulebookFigure label="Rulebook background">
                  <RulebookAscii color="accentHeavy" fontSize={16}>
                    {/* Grab any ascii except the logo */}
                    {sample(Object.values(ASCII_ART).slice(0))}
                  </RulebookAscii>
                </RulebookFigure>
                <RulebookTitle>{rb.fullName}</RulebookTitle>
              </RulebookBox>
            </RulebookLink>
          </li>
        ))}
      </RulebookList>
    </RulebookSection>
  );
}

const emptyRbs: rulebook[] = [];

function NewCharacterPage() {
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
      ) : hasError ? (
        <Body>Error fetching rulebooks, try again later</Body>
      ) : (
        <SelectRulebook
          rulebooks={rulebooks.filter((r) => r.name === SOTDL_NAME)}
        />
      )}
    </Layout>
  );
}

export default NewCharacterPage;
