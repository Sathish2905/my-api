import { Response } from 'express';

export const handleError = (res: Response, error: unknown) => {
  console.error('Error:', error);
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'An unknown error occurred' });
};

export const handleNotFound = (res: Response, entity: string) => {
  return res.status(404).json({ error: `${entity} not found` });
};

export const sendSuccess = (res: Response, data: any, status = 200) => {
  return res.status(status).json(data);
}; 