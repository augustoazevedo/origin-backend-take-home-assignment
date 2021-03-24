import { InsuranceRiskRules } from '../insuranceRiskRules';
import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineHome extends InsuranceLine {
  constructor() {
    super();
  }

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return !!clientProfile.house;
  }

  public lineSpecificRiskRules(clientProfile: ClientProfile, riskScore: number): number {
    return new InsuranceRiskRules(clientProfile, riskScore).houseIsMortgaged(1).result();
  }
}
