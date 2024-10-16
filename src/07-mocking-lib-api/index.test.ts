// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import path from 'path';

const baseURL = 'https://jsonplaceholder.typicode.com';
const userDataMock = { id: 1, name: 'username' };
const usersPath = path.resolve(__dirname, 'users');
const $axios = axios.Axios.prototype;

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    jest.spyOn($axios, 'get').mockResolvedValueOnce({ data: userDataMock });

    await throttledGetDataFromApi(usersPath);
    jest.runAllTimers();

    expect(axiosSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest
      .spyOn($axios, 'get')
      .mockResolvedValueOnce({ data: userDataMock });

    await throttledGetDataFromApi(usersPath);
    jest.runAllTimers();

    expect(axiosGetSpy).toHaveBeenCalledWith(usersPath);
  });

  test('should return response data', async () => {
    jest.spyOn($axios, 'get').mockResolvedValueOnce({ data: userDataMock });

    const result = await throttledGetDataFromApi(usersPath);
    jest.runAllTimers();

    expect(result).toEqual(userDataMock);
  });
});
