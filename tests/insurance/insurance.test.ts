import { Insurance } from '../../app/insurance/insurance';

describe.each`
  description                            | input                                                                                                                                                                          | expected
  ${'Base test - Disability ineligible'} | ${'{"age": 35, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 1, 0], "vehicle": {"year": 2018}}'}    | ${'{"auto":"regular","home":"economic","disability":"ineligible","life":"regular"}'}
  ${'No car - Auto ineligible'}          | ${'{"age": 35, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 0, "marital_status": "married", "risk_questions": [0, 1, 0]}'}                               | ${'{"auto":"ineligible","home":"economic","disability":"ineligible","life":"regular"}'}
  ${'No house - Home ineligible'}        | ${'{"age": 35, "dependents": 2, "income": 0, "marital_status": "married", "risk_questions": [0, 1, 0], "vehicle": {"year": 2018}}'}                                            | ${'{"auto":"regular","home":"ineligible","disability":"ineligible","life":"regular"}'}
  ${'Income > 0 - Disability eligible'}  | ${'{"age": 35, "dependents": 2, "house": {"ownership_status": "owned"}, "income": 2000, "marital_status": "married", "risk_questions": [0, 1, 0], "vehicle": {"year": 2018}}'} | ${'{"auto":"regular","home":"economic","disability":"economic","life":"regular"}'}
  ${'Life - Score -3 - economic'}        | ${'{"age": 25, "dependents": 0, "income": 250000, "marital_status": "single", "risk_questions": [0, 0, 0]}'}                                                                   | ${'{"auto":"ineligible","home":"ineligible","disability":"economic","life":"economic"}'}
  ${'Life - Score -2 - economic'}        | ${'{"age": 25, "dependents": 0, "income": 0, "marital_status": "single", "risk_questions": [0, 0, 0]}'}                                                                        | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"economic"}'}
  ${'Life - Score -1 - economic'}        | ${'{"age": 35, "dependents": 0, "income": 0, "marital_status": "single", "risk_questions": [0, 0, 0]}'}                                                                        | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"economic"}'}
  ${'Life - Score 0 - economic'}         | ${'{"age": 42, "dependents": 0, "income": 0, "marital_status": "single", "risk_questions": [0, 0, 0]}'}                                                                        | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"economic"}'}
  ${'Life - Score 1 - regular'}          | ${'{"age": 42, "dependents": 0, "income": 0, "marital_status": "single", "risk_questions": [1, 0, 0]}'}                                                                        | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"regular"}'}
  ${'Life - Score 2 - regular'}          | ${'{"age": 42, "dependents": 0, "income": 0, "marital_status": "single", "risk_questions": [1, 1, 0]}'}                                                                        | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"regular"}'}
  ${'Life - Score 3 - responsable'}      | ${'{"age": 42, "dependents": 0, "income": 0, "marital_status": "single", "risk_questions": [1, 1, 1]}'}                                                                        | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"responsable"}'}
  ${'Life - Score 4 - responsable'}      | ${'{"age": 42, "dependents": 0, "income": 0, "marital_status": "married", "risk_questions": [1, 1, 1]}'}                                                                       | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"responsable"}'}
  ${'Life - Score 5 - responsable'}      | ${'{"age": 42, "dependents": 2, "income": 0, "marital_status": "married", "risk_questions": [1, 1, 1]}'}                                                                       | ${'{"auto":"ineligible","home":"ineligible","disability":"ineligible","life":"responsable"}'}
`('Insurance - sugestions', ({ description, input, expected }) => {
  const inputObj = JSON.parse(input);
  const expectedObj = JSON.parse(expected);
  it(description, () => expect(new Insurance().sugestPlans(inputObj)).toEqual(expectedObj));
});