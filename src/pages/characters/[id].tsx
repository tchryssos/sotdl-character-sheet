import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';

import { Layout } from '~/components/meta/Layout';
import { NotFound } from '~/components/NotFound';
import { CharacterSheet as SotdlCharacterSheet } from '~/components/rulebookSpecific/sotdl/CharacterSheet';
import { CharacterSheet as SwnCharacterSheet } from '~/components/rulebookSpecific/swn/CharacterSheet';
import { ERRORS, ErrorTypes } from '~/constants/notifications/errors';
import {
  CREATE_ID,
  createCharacterRoute,
  NEW_ID,
} from '~/constants/routing/shared';
import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { createNotification } from '~/logic/utils/notifications';
import { prisma } from '~/logic/utils/prisma';
import { getRulebookAndIdFromLocation } from '~/logic/utils/url';
import { StrictCharacter } from '~/typings/characters';
import { RulebookType, StrictRulebook } from '~/typings/rulebooks';

interface DisplaySheetProps {
  rulebook: RulebookType | null;
  character?: StrictCharacter;
}

function DisplaySheet({ rulebook, character }: DisplaySheetProps) {
  if (!character) {
    return <NotFound content="Character" />;
  }
  switch (rulebook) {
    case 'sotdl':
      return <SotdlCharacterSheet character={character} />;
    case 'swn':
      return <SwnCharacterSheet />;
    default:
      return <NotFound content="Character" />;
  }
}

interface CharacterSheetPageProps {
  character?: StrictCharacter;
  availableRulebooks: StrictRulebook[];
}

function CharacterSheetPage({
  character,
  availableRulebooks,
}: CharacterSheetPageProps) {
  const [rulebook, setRulebook] = useState<RulebookType | null | undefined>(
    undefined
  );
  const {
    query: { id, rulebook: queryRulebook },
    push,
  } = useRouter();
  const { id: pathId, rulebook: pathRulebook } = getRulebookAndIdFromLocation();
  const { addNotifications } = useContext(NotificationsContext);

  // On refresh, useRouter may be a render too slow
  // so we cross-reference the url bar
  const activeId = id || pathId;
  const activeRulebook = (queryRulebook || pathRulebook) as RulebookType;

  useEffect(() => {
    if (character) {
      setRulebook(character.rulebookName);
    } else if (activeId === NEW_ID) {
      if (
        activeRulebook &&
        availableRulebooks.find((rb) => rb.name === activeRulebook)
      ) {
        setRulebook(activeRulebook as RulebookType);
      } else {
        push(createCharacterRoute(CREATE_ID));
      }
    } else {
      addNotifications([
        createNotification(ERRORS[ErrorTypes.CharacterNotFound]),
      ]);
    }
  }, [
    character,
    addNotifications,
    activeId,
    push,
    activeRulebook,
    availableRulebooks,
  ]);

  if (rulebook === undefined) {
    return null;
  }

  return (
    <Layout meta="character sheet" title="character sheet">
      <DisplaySheet character={character} rulebook={rulebook} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<{ props: CharacterSheetPageProps }> => {
  // Character
  const { params } = context;

  let character: StrictCharacter | undefined;

  if (params?.id && params.id !== NEW_ID) {
    const dbCharacter = await prisma.character.findUnique({
      where: {
        id: parseInt(params.id as string, 10),
      },
    });
    if (!dbCharacter?.deleted) {
      character = dbCharacter as StrictCharacter;
    }
  }

  // Rulebooks
  const availableRulebooks =
    (await prisma.rulebook.findMany()) as StrictRulebook[];

  return {
    props: {
      character,
      availableRulebooks,
    },
  };
};

export default CharacterSheetPage;
