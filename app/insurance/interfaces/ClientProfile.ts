//TODO Convert ownership_status and marital_status values to enum
export interface ClientProfile {
  age: number;
  dependents: number;
  house?: {
    ownership_status: 'owned' | 'mortgaged';
  };
  income: number;
  marital_status: 'single' | 'married';
  risk_questions: number[];
  vehicle?: {
    year: number;
  };
}
