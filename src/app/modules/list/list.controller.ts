import { Request, Response } from 'express';
import { statusObject } from '../../../helpers/status.helper';
import { User } from '../users/users.model';
import { ListModel } from './list.model';
import { ListService } from './list.service';

const createList = async (req: Request, res: Response) => {
  try {
    const { book, user } = req.body;
    const newOrder = await ListService.createList({ book, user });
    res.status(201).json({
      ...statusObject(201, true, 'Create an order successfully!'),
      data: newOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      ...statusObject(500, false, 'Failed to create an order'),
    });
  }
};

const getList = async (req: Request, res: Response) => {
  try {
    const result = await ListService.getList();
    if (result) {
      res.status(200).json({
        ...statusObject(200, true, 'All orders found successfully!'),
        length: result.length,
        data: result,
      });
    } else {
      res.status(404).json({
        ...statusObject(404, false, 'Order not found'),
      });
    }
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({
      ...statusObject(500, false, 'Failed to retrieve order'),
    });
  }
};

const getListById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const verifiedUser = req.user;

  try {
    let result = await ListService.getListById(id);
    const cow = await ListModel.findOne(result?.book);
    const user = await User.findOne(result?.user);

    if (verifiedUser?.role !== user?.role) {
      result = null;
    }

    if (result) {
      res.status(200).json({
        ...statusObject(200, true, 'Order information retrieved successfully'),
        data: { cow, buyer: user },
      });
    } else {
      res.status(404).json({ ...statusObject(404, false, 'Order not found') });
    }
  } catch (error) {
    console.error('Error retrieving order:', error);
    res
      .status(500)
      .json({ ...statusObject(500, false, 'Failed to retrieve order') });
  }
};

export const ListController = {
  createList,
  getList,
  getListById,
};
