// import styled from '@emotion/styled';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';

import { Layout } from '~/components/meta/Layout';
import { CharacterSheet as SotdlCharacterSheet } from '~/components/rulebookSpecific/sotdl/CharacterSheet';
import { CharacterSheet as SwnCharacterSheet } from '~/components/rulebookSpecific/swn/CharacterSheet';
import {
  CREATE_ID,
  createCharacterRoute,
  NEW_ID,
} from '~/constants/routing/shared';
import { fetchCharacter } from '~/logic/api/client/fetchCharacter';
import { getAllRulebooks } from '~/logic/api/client/getAllRulebooks';
import { getRulebookAndIdFromLocation } from '~/logic/utils/url';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';
import { RulebookType } from '~/typings/rulebooks';

interface DisplaySheetProps {
  rulebook: RulebookType | null;
}

const DisplaySheet: React.FC<DisplaySheetProps> = ({ rulebook }) => {
  switch (rulebook) {
    case 'sotdl':
      return <SotdlCharacterSheet />;
    case 'swn':
      return <SwnCharacterSheet />;
    default:
      return null;
  }
};

const CharacterSheetPage: React.FC = () => {
  const [rulebook, setRulebook] = useState<RulebookType | null>(null);
  const {
    query: { id, rulebook: queryRulebook },
    push,
  } = useRouter();
  const { id: pathId, rulebook: pathRulebook } = getRulebookAndIdFromLocation();

  // On refresh, useRouter may be a render too slow
  // so we cross-reference the url bar
  const activeRulebook = queryRulebook || pathRulebook;
  const activeId = id || pathId;

  const figureOutRulebook = useCallback(async () => {
    /**
     * There are two valid ways to utilize this page:
     * EITHER you're making a new character OR editing an exisitng one
     */

    // If you're making a new character via a properly formatted link...
    if (activeId === NEW_ID && activeRulebook) {
      const rulebooks = await getAllRulebooks();
      // ... but you can't get rulebooks for some reason,
      // or the rulebook your query param is invalid...
      if (!rulebooks || !rulebooks.find((rb) => rb.name === activeRulebook)) {
        // ... return to create character page to try again
        push(createCharacterRoute(CREATE_ID));
      } else {
        // ... otherwise, set the rulebook to the one in the query
        setRulebook(activeRulebook as RulebookType);
      }
      // Otherwise, you're (hopefully) editing an existing character...
    } else {
      const character = await fetchCharacter(activeId as string);
      // ... but if we can't fetch the character for some reason ...
      if (!isSuccessfulCharacterResponse(character)) {
        // ... go back to the create character page and try again
        push(createCharacterRoute(CREATE_ID));
      } else {
        // ...otherwise use the rulebook of the current character
        setRulebook(character.rulebookName);
      }
    }
  }, [activeRulebook, activeId, push]);

  useEffect(() => {
    figureOutRulebook();
  }, [figureOutRulebook]);

  return (
    <Layout meta="character sheet" title="character sheet">
      <DisplaySheet rulebook={rulebook} />
    </Layout>
  );
};

export default CharacterSheetPage;
