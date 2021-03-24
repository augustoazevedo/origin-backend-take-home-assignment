import { BusinessError } from '../../core/error.business';
import { ERROR_CLIENT_INELIGIBLE } from '../insurance.errors';
import { InsuranceRiskRules } from '../insuranceRiskRules';
import { ClientProfile } from '../interfaces/ClientProfile';

export abstract class InsuranceLine {
  public assessRisk(clientProfile: ClientProfile): number {
    if (!this.isClientEligible(clientProfile)) throw new BusinessError(...ERROR_CLIENT_INELIGIBLE);

    const baseScore = clientProfile.risk_questions.reduce((sum, question) => sum + (question ? 1 : 0));
    const riskScore = this.commonRiskRules(clientProfile, baseScore);
    return this.lineSpecificRiskRules(clientProfile, riskScore);
  }

  private commonRiskRules(clientProfile: ClientProfile, riskScore: number): number {
    return new InsuranceRiskRules(clientProfile, riskScore).ageUnder30(-2).ageBetween30and39(-1).incomeOver(200000, -1).result();
  }

  public abstract isClientEligible(clientProfile: ClientProfile): boolean;

  public abstract lineSpecificRiskRules(clientProfile: ClientProfile, riskScore: number): number;
}
