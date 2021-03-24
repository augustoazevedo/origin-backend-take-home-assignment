import { InsuranceLine } from '../lines/insuranceLine.abstract';

//TODO: Convert to enum
export type InsuranceLineKeys = 'auto' | 'disability' | 'home' | 'life';

export type InsuranceLines = {
  [K in InsuranceLineKeys]?: InsuranceLine;
};

export enum InsurancePlanOptions {
  INELIGIBLE = 'ineligible',
  ECONOMIC = 'economic',
  REGULAR = 'regular',
  RESPONSABLE = 'responsable',
}
