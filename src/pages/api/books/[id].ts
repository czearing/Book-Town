import { prisma } from '../../../clients/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const title = parseInt(req.query.id as string);

    try {
      const books = await prisma.books.findMany({
        where: {
          id: title,
        },
      });

      return res.status(200).json(books);
    } catch (error) {
      console.log(error);

      return res.status(422).json(error);
    }
  }

  res.end();
};
