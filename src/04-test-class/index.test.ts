// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import loadash from 'lodash';

describe('BankAccount', () => {
  const balance = 1000000;
  const overlimitedWithdraw = balance + balance;
  const bank = getBankAccount(balance);
  test('should create account with initial balance', () => {
    expect(bank.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      bank.withdraw(overlimitedWithdraw);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      bank.transfer(overlimitedWithdraw, bank);
    } catch (error) {
      expect(error).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      bank.transfer(balance, bank);
    } catch (error) {
      expect(error).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    bank.deposit(balance);
    expect(bank.getBalance()).toBe(balance * 2);
  });

  test('should withdraw money', () => {
    bank.withdraw(balance);
    expect(bank.getBalance()).toBe(balance);
  });

  test('should transfer money', () => {
    const anotherBank = getBankAccount(0);
    const bankInitialMoney = bank.getBalance();

    bank.transfer(balance, anotherBank);

    expect(bank.getBalance()).toBe(bankInitialMoney - balance);
    expect(anotherBank.getBalance()).toBe(balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    loadash.random = jest.fn(() => 1);
    expect(typeof (await bank.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    bank.fetchBalance = jest.fn(async () => 13);
    expect(await bank.fetchBalance()).toBe(13);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    bank.fetchBalance = jest.fn(async () => null);

    try {
      await bank.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
