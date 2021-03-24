import { InsurancePlanOptions, InsuranceLineKeys } from '../interfaces/InsuranceLines';

export type RiskProfile = {
  [K in InsuranceLineKeys]?: InsurancePlanOptions;
};
