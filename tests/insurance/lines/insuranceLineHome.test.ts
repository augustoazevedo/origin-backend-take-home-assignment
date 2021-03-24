import { InsuranceLineHome } from '../../../app/insurance/lines/insuranceLineHome';

describe.each`
  description                                | input                                                                                                                                                                       | expected
  ${'Client has house - eligible'}           | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'} | ${true}
  ${'Client doesnt have house - ineligible'} | ${'{"age": 42, "dependents": 2, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0]}'}                                                                    | ${false}
`('InsuranceLineHome - isClientEligible', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineHome().isClientEligible(inputObj)).toBe(expected));
});

describe.each`
  description                     | input                                                                                                                                                                           | expected
  ${'Home is owned - do nothing'} | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'}     | ${0}
  ${'Home is mortgaged - add 1'}  | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "mortgaged"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2017}}'} | ${1}
`('InsuranceLineHome - lineSpecificRiskRules', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineHome().lineSpecificRiskRules(inputObj, 0)).toBe(expected));
});
