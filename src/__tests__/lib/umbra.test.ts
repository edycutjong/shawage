import { describe, it, expect } from 'vitest';
import {
  generateStealthTransfer,
  simulateAuditorDecryption,
  DEMO_RECEIVER_ADDRESS,
} from '@/lib/umbra';

describe('generateStealthTransfer', () => {
  it('returns an object with the correct shape', () => {
    const result = generateStealthTransfer('Alice', '5,000 USDC');
    expect(result).toMatchObject({
      employeeId: 'Alice',
      amount: '5,000 USDC',
    });
    expect(typeof result.stealthAddress).toBe('string');
    expect(typeof result.payload).toBe('string');
  });

  it('generates a valid Ethereum-style stealth address', () => {
    const result = generateStealthTransfer('Bob', '4,200 USDC');
    expect(result.stealthAddress).toMatch(/^0x[0-9a-fA-F]{40}$/);
  });

  it('generates a hex payload', () => {
    const result = generateStealthTransfer('Charlie', '4,500 USDC');
    expect(result.payload).toMatch(/^0x[0-9a-fA-F]+$/);
  });

  it('generates unique stealth addresses for the same recipient', () => {
    const a = generateStealthTransfer('Alice', '5,000 USDC');
    const b = generateStealthTransfer('Alice', '5,000 USDC');
    expect(a.stealthAddress).not.toBe(b.stealthAddress);
  });
});

describe('simulateAuditorDecryption', () => {
  it('decrypts successfully with the valid viewing key', () => {
    const transfer = generateStealthTransfer('Carol', '3,000 USDC');
    const result = simulateAuditorDecryption(transfer, 'UMBRA-VIEW-KEY-2026');
    expect(result.verifiedEmployee).toBe('Carol');
    expect(result.verifiedAmount).toBe('3,000 USDC');
    expect(result.isAuthorized).toBe(true);
    expect(result.trueReceiverAddress).toBe(DEMO_RECEIVER_ADDRESS);
  });

  it('throws for an invalid viewing key', () => {
    const transfer = generateStealthTransfer('Dave', '2,000 USDC');
    expect(() => simulateAuditorDecryption(transfer, 'WRONG-KEY')).toThrow('Invalid Viewing Key');
  });

  it('throws for an empty viewing key', () => {
    const transfer = generateStealthTransfer('Eve', '1,500 USDC');
    expect(() => simulateAuditorDecryption(transfer, '')).toThrow('Invalid Viewing Key');
  });
});
