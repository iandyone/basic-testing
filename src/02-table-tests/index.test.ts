// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: 'invalid action', expected: null },
  { a: 'invalid', b: 'arguments', action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)(
    'should return the expected result',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
