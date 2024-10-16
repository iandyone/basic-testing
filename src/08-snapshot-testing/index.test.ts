// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const ListWithNumberValues = {
  next: {
    next: {
      next: null,
      value: null,
    },
    value: 2,
  },
  value: 1,
};

const ListWithStringValues = {
  next: {
    next: {
      next: null,
      value: null,
    },
    value: 'B',
  },
  value: 'A',
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1, 2])).toStrictEqual(ListWithNumberValues);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(['A', 'B'])).toMatchSnapshot(
      ListWithStringValues,
    );
  });
});
