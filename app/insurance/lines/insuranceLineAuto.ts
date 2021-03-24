import { InsuranceRiskRules } from '../insuranceRiskRules';
import { ClientProfile } from '../interfaces/ClientProfile';
import { InsuranceLine } from './insuranceLine.abstract';

export class InsuranceLineAuto extends InsuranceLine {
  constructor() {
    super();
  }

  public isClientEligible(clientProfile: ClientProfile): boolean {
    return !!clientProfile.vehicle;
  }

  public lineSpecificRiskRules(clientProfile: ClientProfile, riskScore: number): number {
    return new InsuranceRiskRules(clientProfile, riskScore).vehicleProducedInLastFiveYears(1).result();
  }
}
