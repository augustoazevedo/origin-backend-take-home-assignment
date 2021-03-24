import express from 'express';
import { ErrorTypes, ErrorResponseInterface } from './error';

//FIXME: Json parse error not beeing displayed correctly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: Record<string, any>, req: express.Request, resp: express.Response, next: express.NextFunction): void => {
  if (err.errors) {
    resp.status(417).send(err);
  } else {
    switch (err.name) {
      case ErrorTypes.TYPE_BUSINESS_ERROR:
        break;
      default:
        err.statusCode = 500;
        err.toJSON = (): ErrorResponseInterface => ({
          errors: [
            {
              code: '-1',
              source: (err.stack as string).split('\n')[1].replace('at', '').trim(),
              message: err.message ? err.message : 'Something went wrong.',
            },
          ],
        });
        resp.status(err.statusCode).send(err.toJSON());
    }
    next();
  }
};
