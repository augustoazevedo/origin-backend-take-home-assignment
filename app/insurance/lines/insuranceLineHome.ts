import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineHome extends InsuranceLine {
  constructor() {
    super();
  }

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return !!clientProfile.house;
  }

  //TODO: Extract rule parameters to external variables
  public lineSpecificRiskRules(clientProfile: ClientProfile, baseScore: number): number {
    let riskScore = baseScore;
    if (clientProfile.house && clientProfile.house.ownership_status === 'mortgaged') riskScore = riskScore + 1;
    return riskScore;
  }
}
