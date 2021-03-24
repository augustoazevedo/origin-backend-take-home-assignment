import { InsuranceRiskRules } from '../insuranceRiskRules';
import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineLife extends InsuranceLine {
  constructor() {
    super();
  }

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return clientProfile.age < 60;
  }

  public lineSpecificRiskRules(clientProfile: ClientProfile, riskScore: number): number {
    return new InsuranceRiskRules(clientProfile, riskScore).hasDependents(1).isMarried(1).result();
  }
}
