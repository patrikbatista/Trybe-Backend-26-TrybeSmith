import { Request, Response, NextFunction } from 'express';

export default function error(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  if (Number.isNaN(Number(err.name))) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(+err.name).json({ message: err.message });
}