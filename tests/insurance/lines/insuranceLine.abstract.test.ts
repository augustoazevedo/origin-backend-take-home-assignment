import { InsuranceLineAuto } from '../../../app/insurance/lines/insuranceLineAuto';

describe.each`
  description                                       | input                                                                                                                                                                             | expected
  ${'Age 42 - score 0'}                             | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2016}}'}       | ${0}
  ${'Age < 30 - score -2'}                          | ${'{"age": 29, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2016}}'}       | ${-2}
  ${'Age 30 to 40 - score -1'}                      | ${'{"age": 36, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2016}}'}       | ${-1}
  ${'All questions =  0'}                           | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2016}}'}       | ${0}
  ${'2 questions = 0'}                              | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 1, 0], "vehicle": {"year": 2016}}'}       | ${1}
  ${'1 question = 0'}                               | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [1, 0, 1], "vehicle": {"year": 2016}}'}       | ${2}
  ${'All questions = 1'}                            | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [1, 1, 1], "vehicle": {"year": 2016}}'}       | ${3}
  ${'Age < 30 - All questions = 1'}                 | ${'{"age": 29, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [1, 1, 1], "vehicle": {"year": 2016}}'}       | ${1}
  ${'Age 42 - Income > 200k'}                       | ${'{"age": 42, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2016}}'}       | ${0}
  ${'Age < 30 - Income > 200k - All questions = 0'} | ${'{"age": 29, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 2000001, "marital_status": "married", "risk_questions": [0, 0, 0], "vehicle": {"year": 2016}}'} | ${-3}
`('InsuranceLine.abstract - assessRisk - commonRules', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  it(description, () => expect(new InsuranceLineAuto().assessRisk(inputObj)).toBe(expected));
});
