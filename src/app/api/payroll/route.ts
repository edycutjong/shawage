import { NextRequest, NextResponse } from 'next/server';
import { parsePayrollCSV } from '@/lib/csv';
import { generateStealthTransfer } from '@/lib/umbra';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { csv?: unknown };

    if (!body.csv || typeof body.csv !== 'string') {
      return NextResponse.json({ error: 'csv field required' }, { status: 400 });
    }

    const rows = parsePayrollCSV(body.csv);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No valid rows found in CSV' }, { status: 400 });
    }

    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const transfers = rows.map((row, i) => ({
      id: i + 1,
      name: row.name,
      amount: row.amount,
      date,
      status: 'Sent (Stealth)',
      transferDetails: generateStealthTransfer(row.name, row.amount),
    }));

    return NextResponse.json({ transfers });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
