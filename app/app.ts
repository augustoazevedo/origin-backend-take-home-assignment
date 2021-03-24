import express from 'express';
import helmet from 'helmet';
import { ApiRouter } from './core/apiRouter';
import { MainApi } from './main/main.api';
import { InsuranceApi } from './insurance/insurance.api';
import { errorHandler } from './core/error.expressHandler';

const getApiControllers = (): ApiRouter[] => [new MainApi(), new InsuranceApi()];

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

for (const router of getApiControllers()) {
  if (router.active()) {
    router.applyRoutes(app);
  }
}

app.use(errorHandler);

app.listen(3000, () => {
  if (app !== undefined) {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${3000}`);
  }
});
