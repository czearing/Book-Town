import { prisma } from '../../../clients/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const { body } = req;
        const userItems = await prisma.userItems.create({ data: JSON.parse(body) });

        return res.status(200).json(userItems);
      } catch (error) {
        return res.status(422).json(error);
      }

    case 'GET':
      try {
        const userItems = await prisma.userItems.findMany({});

        return res.status(200).json(userItems);
      } catch (error) {
        return res.status(422).json(error);
      }

    case 'DELETE':
      try {
        const { body } = req;
        const userItems = await prisma.userItems.delete({
          where: JSON.parse(body),
        });

        return res.status(200).json(userItems);
      } catch (error) {
        return res.status(422).json(error);
      }

    case 'PATCH':
      try {
        const { body } = req;
        const userItems = await prisma.userItems.update({
          where: JSON.parse(body).where,
          data: JSON.parse(body).data,
        });

        return res.status(200).json(userItems);
      } catch (error) {
        return res.status(422).json(error);
      }
  }

  res.end();
};
