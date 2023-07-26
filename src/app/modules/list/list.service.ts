import { IList } from './list.interface';
import { ListModel } from './list.model';

const createList = async (order: IList): Promise<IList> => {
  try {
    const newOrder = await ListModel.create(order);
    return newOrder;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

const getList = async (): Promise<IList[]> => {
  try {
    const result = await ListModel.find();
    return result;
  } catch (error) {
    throw new Error('Failed to retrieve order');
  }
};

const getListById = async (id: string): Promise<IList | null> => {
  try {
    const result = await ListModel.findById(id);
    return result;
  } catch (error) {
    throw new Error('Failed to retrieve order');
  }
};

export const ListService = {
  createList,
  getList,
  getListById,
};
