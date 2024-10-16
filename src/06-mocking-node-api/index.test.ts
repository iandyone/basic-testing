// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

import path from 'path';
import fs from 'fs';

const filePath = path.join('folder', 'someFile.doc');
const customCallback = jest.fn();
const delay = 300;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(customCallback, delay);

    expect(timer).toHaveBeenCalledWith(customCallback, delay);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(customCallback, delay);
    jest.runAllTimers();

    expect(customCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(customCallback, delay);

    expect(interval).toHaveBeenCalledWith(customCallback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.clearAllTimers();
    doStuffByInterval(customCallback, delay);
    jest.advanceTimersByTime(delay + delay);

    expect(customCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinPath = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePath);

    expect(joinPath).toBeCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const result = await readFileAsynchronously(filePath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const textInFile = 'text';
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(textInFile);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    const result = await readFileAsynchronously(filePath);

    expect(result).toBe(textInFile);
  });
});
