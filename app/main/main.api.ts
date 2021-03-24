import express from 'express';
import { ApiRouter } from '../core/apiRouter';

export class MainApi extends ApiRouter {
  constructor() {
    super();
  }

  public active(): boolean {
    return true;
  }

  public applyRoutes(server: express.Application): void {
    server.get('/', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
      try {
        resp.json({
          app: {
            name: process.env.npm_package_name || 'origin-backend-task-home-assignment',
            version: process.env.npm_package_version || '?.?.?',
          },
          paths: {
            main: '/',
            insurance: '/insurance/plansugestions',
          },
        });
        return next();
      } catch (error) {
        next(error);
      }
    });
  }
}
