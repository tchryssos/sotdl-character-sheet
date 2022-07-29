import { NextApiHandler } from 'next';

import { prisma } from '~/logic/utils/prisma';
import { RulebookSaveData } from '~/typings/rulebooks';

const getRulebook: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;

    const rulebook = await prisma.rulebook.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    });

    res.status(200).json(rulebook);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

const createRulebook: NextApiHandler = async (req, res) => {
  try {
    const body: RulebookSaveData = await JSON.parse(req.body);

    const now = new Date();

    const newRulebook = await prisma.rulebook.create({
      data: {
        createdOn: now,
        lastModifiedOn: now,
        name: body.name,
        fullName: body.fullName,
        description: body.description,
      },
    });

    res.status(200).json(newRulebook);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

const updateRulebook: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const body: RulebookSaveData = await JSON.parse(req.body);

    const rulebook = await prisma.rulebook.update({
      where: {
        id: parseInt(id as string, 10),
      },
      data: {
        name: body.name,
        fullName: body.fullName,
        description: body.description,
        lastModifiedOn: new Date(),
      },
    });

    res.status(200).json(rulebook);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      await updateRulebook(req, res);
      break;
    case 'POST':
      await createRulebook(req, res);
      break;
    default:
      await getRulebook(req, res);
      break;
  }
};

export default handleRequest;
