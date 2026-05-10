import { describe, it, expect } from 'vitest';
import { parsePayrollCSV, SAMPLE_CSV } from '@/lib/csv';

describe('parsePayrollCSV', () => {
  it('parses a simple CSV without header', () => {
    const csv = 'Alice Dev,5000\nBob Ops,4200';
    const rows = parsePayrollCSV(csv);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ name: 'Alice Dev', amount: '5,000 USDC' });
    expect(rows[1]).toEqual({ name: 'Bob Ops', amount: '4,200 USDC' });
  });

  it('parses CSV with name/amount header row', () => {
    const csv = 'name,amount\nAlice Dev,5000\nBob Ops,4200';
    const rows = parsePayrollCSV(csv);
    expect(rows).toHaveLength(2);
    expect(rows[0].name).toBe('Alice Dev');
    expect(rows[1].name).toBe('Bob Ops');
  });

  it('parses CSV with employee header row', () => {
    const csv = 'employee,salary\nAlice,5000';
    const rows = parsePayrollCSV(csv);
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe('Alice');
  });

  it('strips non-numeric characters from amounts with thousands separator', () => {
    const csv = 'Carol,$ 4,500.00';
    const rows = parsePayrollCSV(csv);
    expect(rows).toHaveLength(1);
    expect(rows[0].amount).toBe('4,500 USDC');
  });

  it('skips empty lines', () => {
    const csv = 'Alice,5000\n\nBob,4000\n';
    const rows = parsePayrollCSV(csv);
    expect(rows).toHaveLength(2);
  });

  it('skips rows with fewer than two columns', () => {
    const csv = 'Alice\nBob,4000';
    const rows = parsePayrollCSV(csv);
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe('Bob');
  });

  it('returns an empty array for empty input', () => {
    expect(parsePayrollCSV('')).toEqual([]);
    expect(parsePayrollCSV('   ')).toEqual([]);
  });

  it('handles Windows-style CRLF line endings', () => {
    const csv = 'Alice Dev,5000\r\nBob Ops,4200';
    const rows = parsePayrollCSV(csv);
    expect(rows).toHaveLength(2);
  });

  it('SAMPLE_CSV parses into 5 rows', () => {
    const rows = parsePayrollCSV(SAMPLE_CSV);
    expect(rows).toHaveLength(5);
    expect(rows[0].name).toBe('Alice Dev');
    expect(rows[4].name).toBe('Eve Security');
  });
});
