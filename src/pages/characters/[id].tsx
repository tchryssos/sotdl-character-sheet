import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useRef, useState } from 'react';

import { Layout } from '~/components/meta/Layout';
import { NotFound } from '~/components/NotFound';
import { CwnCharacterSheet } from '~/components/rulebookSpecific/cwn/CharacterSheet';
import { CharacterSheet as SotdlCharacterSheet } from '~/components/rulebookSpecific/sotdl/CharacterSheet';
import { CharacterSheet as SotwwCharacterSheet } from '~/components/rulebookSpecific/sotww/CharacterSheet';
import { CharacterSheet as WwnCharacterSheet } from '~/components/rulebookSpecific/wwn/CharacterSheet';
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
import { CharacterData, StrictCharacter } from '~/typings/characters';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { NotificationBody } from '~/typings/notifications';
import { RulebookType, StrictRulebook } from '~/typings/rulebooks';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';
import { SotwwCharacterData } from '~/typings/sotww/characterData';
import { WwnCharacterData } from '~/typings/wwn/characterData';

interface DisplaySheetProps {
  rulebook: RulebookType | null;
  character?: StrictCharacter<CharacterData>;
}

function DisplaySheet({ rulebook, character }: DisplaySheetProps) {
  if (!character && !rulebook) {
    return <NotFound content="Character" />;
  }
  switch (rulebook) {
    case 'sotdl':
      return (
        <SotdlCharacterSheet
          character={character as StrictCharacter<SotdlCharacterData>}
        />
      );
    case 'wwn':
      return (
        <WwnCharacterSheet
          character={character as StrictCharacter<WwnCharacterData>}
        />
      );
    case 'sotww':
      return (
        <SotwwCharacterSheet
          character={character as StrictCharacter<SotwwCharacterData>}
        />
      );
    case 'cwn':
      return (
        <CwnCharacterSheet
          character={character as StrictCharacter<CwnCharacterData>}
        />
      );
    default:
      return <NotFound content="Character" />;
  }
}

interface CharacterSheetPageProps {
  character?: StrictCharacter<CharacterData>;
  availableRulebooks: StrictRulebook[];
}

function CharacterSheetPage({
  character,
  availableRulebooks,
}: CharacterSheetPageProps) {
  const [rulebook, setRulebook] = useState<RulebookType | null | undefined>(
    undefined
  );
  const hasFetchedCharacter = useRef(false);

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
      hasFetchedCharacter.current = true;
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
      // Having no rulebook AND no character leads to a 404
      // so we only want to set rulebook to false on a missing character
      // if we haven't already fetched the character this session
      if (!hasFetchedCharacter.current) {
        setRulebook(null);
      }
      addNotifications([
        createNotification(ERRORS[ErrorTypes.CharacterNotFound]),
      ]);
    }
  }, [
    character,
    activeId,
    push,
    activeRulebook,
    availableRulebooks,
    addNotifications,
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

export const getServerSideProps: GetServerSideProps<
  CharacterSheetPageProps
> = async (context) => {
  try {
    // Character
    const { params } = context;

    let character: StrictCharacter<CharacterData> | undefined;

    if (params?.id && params.id !== NEW_ID) {
      const parsedId = parseInt(params.id as string, 10);

      if (!Number.isNaN(parsedId)) {
        const dbCharacter = await prisma.character.findUnique({
          where: {
            id: parseInt(params.id as string, 10),
          },
        });
        if (!dbCharacter?.deleted && !dbCharacter?.inactive) {
          character = dbCharacter as StrictCharacter<CharacterData>;
        }
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
  } catch (e) {
    const error: NotificationBody = {
      title: 'Something went wrong loading this character',
      type: 'error',
    };
    return {
      props: {
        character: undefined,
        availableRulebooks: [],
        error,
      },
    };
  }
};

export default CharacterSheetPage;
