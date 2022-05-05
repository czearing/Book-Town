import { prisma } from '../../../clients/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { body } = req;
      const books = await prisma.books.create({ data: JSON.parse(body) });

      return res.status(200).json(books);
    } catch (error) {
      return res.status(422).json(error);
    }
  } else if (req.method === 'GET') {
    try {
      const books = await prisma.books.findMany({});

      return res.status(200).json(books);
    } catch (error) {
      return res.status(422).json(error);
    }
  }

  res.end();
};
