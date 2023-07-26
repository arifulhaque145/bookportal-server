import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    count: number;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: T | {} | null;
  error?: Error;
};

const sendResponse = <T>(res: Response, ResData: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: ResData.statusCode,
    success: ResData.success,
    message: ResData.message || null,
    meta: ResData.meta || null || undefined,
    data: ResData.data || {},
    error: ResData.error,
  };

  res.status(ResData.statusCode).json(responseData);
};

export default sendResponse;
