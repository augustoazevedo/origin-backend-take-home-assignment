import { ClientProfile } from './interfaces/ClientProfile';

export class InsuranceRiskRules {
  clientProfile: ClientProfile;
  riskScore: number;

  constructor(clientProfile: ClientProfile, initialScore = 0) {
    this.clientProfile = clientProfile;
    this.riskScore = initialScore;
    return this;
  }

  public result(): number {
    return this.riskScore;
  }

  public hasDependents(scoreChanger: number): InsuranceRiskRules {
    if (this.clientProfile.dependents > 0) this.riskScore += scoreChanger;
    return this;
  }

  public isMarried(scoreChanger: number): InsuranceRiskRules {
    if (this.clientProfile.marital_status == 'married') this.riskScore += scoreChanger;
    return this;
  }

  public houseIsMortgaged(scoreChanger: number): InsuranceRiskRules {
    if (this.clientProfile.house && this.clientProfile.house.ownership_status === 'mortgaged') this.riskScore += scoreChanger;
    return this;
  }

  public vehicleProducedInLastFiveYears(scoreChanger: number): InsuranceRiskRules {
    const currentYear = new Date().getFullYear();
    if (this.clientProfile.vehicle && currentYear - this.clientProfile.vehicle.year < 5) this.riskScore += scoreChanger;
    return this;
  }

  public incomeOver(incomeValue: number, scoreChanger: number): InsuranceRiskRules {
    if (this.clientProfile.income > incomeValue) this.riskScore += scoreChanger;
    return this;
  }

  public ageUnder30(scoreChanger: number): InsuranceRiskRules {
    if (this.clientProfile.age < 30) this.riskScore += scoreChanger;
    return this;
  }

  public ageBetween30and39(scoreChanger: number): InsuranceRiskRules {
    if (this.clientProfile.age >= 30 && this.clientProfile.age <= 39) this.riskScore += scoreChanger;
    return this;
  }
}
