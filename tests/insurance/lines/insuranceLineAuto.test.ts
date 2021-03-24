import { InsuranceLineAuto } from '../../../app/insurance/lines/insuranceLineAuto';

describe.each`
  description                                  | input                                                                                                                                                                       | expected
  ${'Client has vehicle - eligible'}           | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'} | ${true}
  ${'Client doesnt have vehicle - ineligible'} | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0]}'}                            | ${false}
`('InsuranceLineAuto - isClientEligible', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineAuto().isClientEligible(inputObj)).toBe(expected));
});

describe.each`
  description                                    | input                                                                                                                                                                       | expected
  ${'Car year over 5 years - do nothing - 2014'} | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2014}}'} | ${0}
  ${'Car year over 5 years - do nothing - 2015'} | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2015}}'} | ${0}
  ${'Car year over 5 years - do nothing - 2016'} | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2016}}'} | ${0}
  ${'Car year under 5 years - add 1 - 2017'}     | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2017}}'} | ${1}
  ${'Car year under 5 years - add 1 - 2018'}     | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2018}}'} | ${1}
  ${'Car year under 5 years - add 1 - 2019'}     | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2019}}'} | ${1}
  ${'Car year under 5 years - add 1 - 2020'}     | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2020}}'} | ${1}
  ${'Car year under 5 years - add 1 - 2021'}     | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2021}}'} | ${1}
`('InsuranceLineAuto - lineSpecificRiskRules', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineAuto().lineSpecificRiskRules(inputObj, 0)).toBe(expected));
});
