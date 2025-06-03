import { Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors';

export const errorHandler = (
  err: any,
  res: Response,
) => {
    if (err instanceof BadRequestError) {
        return res.status(400).json({ error: err.message });
    }
    
    if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
    }

    if (err instanceof UnauthorizedError)
      {
        return res.status(401).json({ error: err.message });
      }

    return res.status(500).json({ error: err.message });
};