import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineDisability extends InsuranceLine {
  constructor() {
    super();
  }

  //TODO: Fetch externaly
  readonly MIN_DEPENDENTS = 1;

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return clientProfile.income > 0 && clientProfile.age < 60;
  }

  //TODO: Extract rule parameters to external variables
  public lineSpecificRiskRules(clientProfile: ClientProfile, baseScore: number): number {
    let riskScore = baseScore;
    if (clientProfile.house && clientProfile.house.ownership_status === 'mortgaged') riskScore = riskScore + 1;
    if (clientProfile.dependents >= this.MIN_DEPENDENTS) riskScore = riskScore + 1;
    if (clientProfile.marital_status == 'married') riskScore = riskScore - 1;
    return riskScore;
  }
}
