import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineAuto extends InsuranceLine {
  constructor() {
    super();
  }

  //TODO: Fetch externaly
  readonly HIGHER_RISK__MAX_VEHICLE_AGE = 5;

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return !!clientProfile.vehicle;
  }

  public lineSpecificRiskRules(clientProfile: ClientProfile, baseScore: number): number {
    let riskScore = baseScore;
    const currentYear = new Date().getFullYear();
    // Vehicle was porduced in the last five years
    if (clientProfile.vehicle && currentYear - clientProfile.vehicle.year < this.HIGHER_RISK__MAX_VEHICLE_AGE) riskScore = riskScore + 1;
    return riskScore;
  }
}
