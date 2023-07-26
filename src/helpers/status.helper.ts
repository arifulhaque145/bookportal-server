type Status = {
  statusCode: number;
  success: boolean;
  message: string;
};

export const statusObject = (
  code: number,
  succ: boolean,
  mess: string
): Status => {
  return { statusCode: code, success: succ, message: mess };
};
