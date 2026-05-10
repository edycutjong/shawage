export interface PayrollRow {
  name: string;
  amount: string;
}

export function parsePayrollCSV(content: string): PayrollRow[] {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length === 0 || (lines.length === 1 && !lines[0])) return [];

  const firstCell = lines[0]?.split(',')[0]?.trim().toLowerCase() ?? '';
  const startIdx = ['name', 'employee'].includes(firstCell) ? 1 : 0;

  const rows: PayrollRow[] = [];
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(',');
    if (parts.length < 2) continue;
    const name = parts[0].trim();
    const rawAmount = parts.slice(1).join(',').trim().replace(/[^\d.]/g, '');
    if (!name || !rawAmount) continue;
    const num = parseFloat(rawAmount);
    if (isNaN(num)) continue;
    rows.push({ name, amount: `${num.toLocaleString('en-US')} USDC` });
  }

  return rows;
}

export const SAMPLE_CSV = `name,amount
Alice Dev,5000
Bob Ops,4200
Charlie Design,4500
Dave Marketing,3800
Eve Security,6000`;
