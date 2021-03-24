import { InsuranceLineDisability } from '../../../app/insurance/lines/insuranceLineDisability';

describe.each`
  description                   | input                                                                                                                                                                          | expected
  ${'Age < 60 - eligible'}      | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'} | ${true}
  ${'Age >= 60 - ineligible'}   | ${'{"age": 60, "dependents": 2, "income": 20000, "marital_status": "married", "risk_questions": [0, 0, 0]}'}                                                                   | ${false}
  ${'Income > 0 - eligible'}    | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'} | ${true}
  ${'Income == 0 - ineligible'} | ${'{"age": 42, "dependents": 2, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0]}'}                                                                       | ${false}
`('InsuranceLineDisability - isClientEligible', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineDisability().isClientEligible(inputObj)).toBe(expected));
});

describe.each`
  description                       | input                                                                                                                                                                             | expected
  ${'Home is owned - do nothing'}   | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'}     | ${0}
  ${'Home is mortgaged - add 1'}    | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "mortgaged"}, "income": 2000, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2017}}'} | ${1}
  ${'Client is sigle - do nothing'} | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'}     | ${0}
  ${'Client is married - remove 1'} | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2017}}'}    | ${-1}
  ${'Dependents == 0 - do nothing'} | ${'{"age": 42, "dependents": 0, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'}     | ${0}
  ${'Dependents > 0 - add 1'}       | ${'{"age": 42, "dependents": 1, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "single", "risk_questions": [0, 0, 0], "vehicle": {"year": 2017}}'}     | ${1}
`('InsuranceLineDisability - lineSpecificRiskRules', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineDisability().lineSpecificRiskRules(inputObj, 0)).toBe(expected));
});
