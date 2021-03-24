import express from 'express';
import { validationResult, body } from 'express-validator';
import { ApiRouter } from '../core/apiRouter';
import { Insurance } from './insurance';
import { ClientProfile } from './interfaces/ClientProfile';
import { RiskProfile } from './interfaces/RiskProfile';

export class InsuranceApi extends ApiRouter {
  private insurance: Insurance;

  constructor() {
    super();
    this.insurance = new Insurance();
  }

  public active(): boolean {
    return true;
  }

  public applyRoutes(router: express.Router): void {
    router.post(
      '/insurance/plansugestions',
      // FIXME: Should verify max age?
      body('age').isInt({ min: 1, max: 130 }).withMessage('Age must be greater than 0 and less or equal to 130').toInt(),
      body('dependents').isInt({ min: 0 }).withMessage('Dependents must be equal or greater then 0 ').toInt(),
      body('house.ownership_status').optional().isIn(['owned', 'mortgaged']).withMessage('Marital status must be must be "owned" or "mortgaged"'),
      body('income').isInt({ min: 0 }).withMessage('Income must be equal or greater than 0').toInt(),
      body('marital_status').isIn(['single', 'married']).withMessage('Marital status must be must be "single" or "married"'),
      //FIXME: Should validate max year (current/current +1)?
      body('vehicle.year').optional().isInt({ min: 0 }).withMessage('Vehicle year must be greater than 0').toInt(),
      body('risk_questions')
        .isArray({ min: 3, max: 3 })
        .custom((riskQuestion) => riskQuestion.reduce((result: boolean, item: number) => result && [0, 1].includes(item), true))
        .withMessage('Must be an array containing 3 zero or one values'),
      (req: express.Request, resp: express.Response, next: express.NextFunction) => {
        try {
          validationResult(req).throw();
          const clientProfile: ClientProfile = req.body;
          const insuranceSugestions: RiskProfile = this.insurance.sugestPlans(clientProfile);
          resp.status(200).send(insuranceSugestions);
          next();
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
