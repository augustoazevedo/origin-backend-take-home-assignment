import { ClientProfile } from './interfaces/ClientProfile';
import { InsuranceLines, InsurancePlanOptions } from './interfaces/InsuranceLines';
import { RiskProfile } from './interfaces/RiskProfile';
import { InsuranceLineLife } from './lines/insuranceLineLife';
import { InsuranceLineDisability } from './lines/insuranceLineDisability';
import { InsuranceLineHome } from './lines/insuranceLineHome';
import { InsuranceLineAuto } from './lines/insuranceLineAuto';
import { ERROR_CLIENT_INELIGIBLE } from './insurance.errors';

export class Insurance {
  //TODO: Load InsuranceLine subclasses automatically.
  //TODO: Make the insurance line identifies (auto, home, life, disability) an atribute of the class
  readonly INSURANCE_LINES: InsuranceLines = {
    auto: new InsuranceLineAuto(),
    disability: new InsuranceLineDisability(),
    home: new InsuranceLineHome(),
    life: new InsuranceLineLife(),
  };

  public sugestPlans(clientProfile: ClientProfile): RiskProfile {
    const insurancePlansSugestion: RiskProfile = {};

    (Object.keys(this.INSURANCE_LINES) as Array<keyof RiskProfile>).forEach((key) => {
      try {
        const insuranceLine = this.INSURANCE_LINES[key] ? this.INSURANCE_LINES[key] : null;
        if (insuranceLine) {
          insurancePlansSugestion[key] = this.mapPlan(insuranceLine.assessRisk(clientProfile));
        }
      } catch (e) {
        //FIXME: Make it simpler to compare
        if (e.code === ERROR_CLIENT_INELIGIBLE[0]) insurancePlansSugestion[key] = InsurancePlanOptions.INELIGIBLE;
        else throw e;
      }
    });

    return insurancePlansSugestion;
  }

  //TODO: Unit tests
  private mapPlan(riskScore: number) {
    if (riskScore <= 0) return InsurancePlanOptions.ECONOMIC;
    else if (riskScore >= 3) return InsurancePlanOptions.RESPONSABLE;
    return InsurancePlanOptions.REGULAR;
  }
}
