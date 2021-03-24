import { InsuranceLineLife } from '../../../app/insurance/lines/insuranceLineLife';

describe.each`
  description                 | input                                                                                                                                                                       | expected
  ${'Age < 60 - eligible'}    | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'} | ${true}
  ${'Age >= 60 - ineligible'} | ${'{"age": 60, "dependents": 2, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0]}'}                                                                    | ${false}
`('InsuranceLineLife - isClientEligible', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineLife().isClientEligible(inputObj)).toBe(expected));
});

describe.each`
  description                        | input                                                                                                                                                                           | expected
  ${'Dependents == 0 - do nothing'}  | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'}      | ${0}
  ${'Dependents > 0 - add 1'}        | ${'{"age": 42, "dependents": 1, "house": {"ownership_status": "mortgaged"}, "income": 0, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2017}}'}  | ${1}
  ${'Client is single - do nothing'} | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'}      | ${0}
  ${'Client is married - add 1'}     | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "mortgaged"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2017}}'} | ${1}
`('InsuranceLineLife - lineSpecificRiskRules', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineLife().lineSpecificRiskRules(inputObj, 0)).toBe(expected));
});
