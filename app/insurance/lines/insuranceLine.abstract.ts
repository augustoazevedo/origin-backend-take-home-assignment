import { BusinessError } from '../../core/error.business';
import { ERROR_CLIENT_INELIGIBLE } from '../insurance.errors';
import { ClientProfile } from '../interfaces/ClientProfile';

export abstract class InsuranceLine {
  //TODO: Fetch externaly
  readonly REDUCED_RISK__MIN_INCOME = 200000;
  readonly LOWER_RISK__MAX_AGE = 29;
  readonly LOW_RISK__MIN_AGE = 30;
  readonly LOW_RISK__MAX_AGE = 39;

  public assessRisk(clientProfile: ClientProfile): number {
    if (!this.isClientEligible(clientProfile)) throw new BusinessError(...ERROR_CLIENT_INELIGIBLE);

    const baseScore = clientProfile.risk_questions.reduce((sum, question) => sum + (question ? 1 : 0));
    let riskScore = this.commonRiskRules(clientProfile, baseScore);
    riskScore = this.lineSpecificRiskRules(clientProfile, riskScore);
    return riskScore;
  }

  private commonRiskRules(clientProfile: ClientProfile, riskScore: number): number {
    if (clientProfile.age <= this.LOWER_RISK__MAX_AGE) riskScore = riskScore - 2;
    else if (clientProfile.age >= this.LOW_RISK__MIN_AGE && clientProfile.age <= this.LOW_RISK__MAX_AGE) riskScore = riskScore - 1;

    if (clientProfile.income > this.REDUCED_RISK__MIN_INCOME) riskScore = riskScore - 1;
    return riskScore;
  }

  public abstract isClientEligible(clientProfile: ClientProfile): boolean;

  public abstract lineSpecificRiskRules(clientProfile: ClientProfile, riskScore: number): number;
}
