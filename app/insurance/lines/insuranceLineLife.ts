import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineLife extends InsuranceLine {
  constructor() {
    super();
  }

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return clientProfile.age < 60;
  }

  //TODO: Extract rule parameters to external variables
  public lineSpecificRiskRules(clientProfile: ClientProfile, baseScore: number): number {
    let riskScore = baseScore;
    if (clientProfile.dependents > 0) riskScore = riskScore + 1;
    if (clientProfile.marital_status == 'married') riskScore = riskScore + 1;
    return riskScore;
  }
}
