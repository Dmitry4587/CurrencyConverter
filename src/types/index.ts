export interface IConverResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    timestamp: number;
    rate: number;
  };
  date: string;
  result: number;
}

export interface IHeaderRate {
  from: string;
  to: string;
  res?: number;
}

export type TCurrency = 'UAH' | 'USD' | 'EUR';

export const isConvertRes = (res: unknown): res is IConverResponse => {
  return (res as IConverResponse).query !== undefined;
};

export const isConvertResErr = (res: unknown): res is IConverResponse => {
  return (res as IConverResponse).query !== undefined;
};
