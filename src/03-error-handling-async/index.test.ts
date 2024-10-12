// Uncomment the code below and write your tests
import {
  throwError,
  resolveValue,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(13);
    expect(result).toBe(13);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', async () => {
    try {
      throwError('My error');
    } catch (error) {
      expect((error as Error).message).toMatch('My error');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error) {
      expect((error as Error).message).toMatch('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});
