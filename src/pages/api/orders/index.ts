import { prisma } from '../../../clients/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const { body } = req;
        const orders = await prisma.orders.create({ data: JSON.parse(body) });

        return res.status(200).json(orders);
      } catch (error) {
        return res.status(422).json(error);
      }

    case 'GET':
      try {
        const orders = await prisma.orders.findMany({});

        return res.status(200).json(orders);
      } catch (error) {
        return res.status(422).json(error);
      }

    case 'DELETE':
      try {
        const { body } = req;
        const orders = await prisma.orders.delete({
          where: JSON.parse(body),
        });

        return res.status(200).json(orders);
      } catch (error) {
        return res.status(422).json(error);
      }

    case 'PATCH':
      try {
        const { body } = req;
        const orders = await prisma.orders.update({
          where: JSON.parse(body).where,
          data: JSON.parse(body).data,
        });

        return res.status(200).json(orders);
      } catch (error) {
        return res.status(422).json(error);
      }
  }

  res.end();
};
