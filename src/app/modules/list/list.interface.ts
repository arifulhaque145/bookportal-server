import { Types } from 'mongoose';
export enum Status {
  Reading = 'Currently Reading',
  Not_Read = 'Not Read',
  Want_To_Read = 'Want To Read',
  Plan_To_Read = 'Plan To Read',
  Finished = 'Finished',
}

export type IList = {
  book: Types.ObjectId;
  user: Types.ObjectId;
  status?: Status;
};

export type ListDocument = IList & Document;
