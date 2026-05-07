# Shawage — Technical Architecture

## Tech Stack
| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19 |
| **Styling** | Tailwind CSS v4 |
| **Privacy** | Umbra SDK (stealth addresses, Viewing Keys) |
| **Database** | Supabase (payroll records, audit logs) |
| **PDF** | jsPDF |
| **Auth** | Solana wallet adapter |

## SDK Integration Map
| Umbra Feature | Use Case | Depth |
|---|---|---|
| **Stealth Addresses** | Generate per-employee stealth addr for each payment | Core |
| **Batch Transfers** | Send 5+ payments in one transaction | Core |
| **Viewing Keys** | Scoped disclosure for auditors (time-bound, employee-filtered) | Star Feature |
| **Key Registration** | Employees register receiving keys | Supporting |
| **Scan** | Employees scan for incoming stealth payments | Supporting |

## Database Schema
```sql
CREATE TABLE payroll_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_wallet TEXT NOT NULL,
    batch_name TEXT,
    total_amount NUMERIC NOT NULL,
    employee_count INT NOT NULL,
    umbra_tx_hash TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payroll_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES payroll_batches(id),
    employee_label TEXT NOT NULL,
    stealth_address TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    token TEXT DEFAULT 'SOL',
    viewing_key_hash TEXT
);

CREATE TABLE audit_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auditor_id TEXT NOT NULL,
    viewing_key_scope JSONB,
    entries_accessed UUID[],
    report_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Routes
| Method | Path | Description |
|---|---|---|
| POST | `/api/payroll/batch` | Create and execute batch payroll |
| GET | `/api/payroll/history` | Employer's batch history |
| GET | `/api/employee/payments` | Employee's private payment feed |
| POST | `/api/audit/decrypt` | Auditor decrypts with Viewing Key |
| POST | `/api/audit/report` | Generate PDF audit report |
