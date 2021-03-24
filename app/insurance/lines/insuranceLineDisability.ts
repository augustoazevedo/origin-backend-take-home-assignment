import { InsuranceRiskRules } from '../insuranceRiskRules';
import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineDisability extends InsuranceLine {
  constructor() {
    super();
  }

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return clientProfile.income > 0 && clientProfile.age < 60;
  }

  public lineSpecificRiskRules(clientProfile: ClientProfile, riskScore: number): number {
    return new InsuranceRiskRules(clientProfile, riskScore).houseIsMortgaged(1).hasDependents(1).isMarried(-1).result();
  }
}
