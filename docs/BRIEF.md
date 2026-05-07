# Shawage — Build Plan, Submission, Seed Data, Sponsor Defense, Production Plan, UI

## BUILD PLAN (3-Day Sprint)

### Day 1: Umbra Core (8h)
| Hour | Task |
|------|------|
| 0-1 | Scaffold (Next.js 16, Tailwind v4, Supabase, wallet adapter) |
| 1-3 | Umbra stealth address generation + single transfer |
| 3-5 | Batch payroll: CSV upload → 5 stealth transfers |
| 5-7 | Employee dashboard: scan + decode incoming payments |
| 7-8 | Checkpoint: batch transfer works on devnet |

### Day 2: Compliance (8h)
| Hour | Task |
|------|------|
| 0-2 | Viewing Key generation and scoping (time-bound, employee-filter) |
| 2-4 | Compliance portal: paste key → decrypted payroll table |
| 4-5 | PDF audit report (jsPDF) |
| 5-7 | Split-screen explorer proof |
| 7-8 | End-to-end flow test |

### Day 3: Polish + Demo (8h)
| Hour | Task |
|------|------|
| 0-2 | Dark HR dashboard UI, glassmorphism |
| 2-3 | Seed data population |
| 3-5 | Demo video recording (3-act: Employer → Explorer → Auditor) |
| 5-7 | README, screenshots, architecture diagrams |
| 7-8 | Deploy + submit |

---

## SUBMISSION

**Short**: Compliance-first private payroll: batch stealth transfers via Umbra + scoped Viewing Keys for auditors + PDF audit reports.

**Hook**: A DAO contributor's salary was doxxed on-chain. They quit. Shawage makes payroll invisible to everyone except authorized auditors.

**Demo Script (2.5 min)**:
| Time | Scene |
|------|-------|
| 0:00 | "This DAO pays 5 people. Here's what the blockchain sees: nothing." |
| 0:15 | Upload CSV → batch stealth transfer |
| 0:35 | Solana Explorer: 5 unrelated addresses, no pattern |
| 0:50 | Employee view: "You received 500 SOL" (decoded with personal key) |
| 1:10 | Compliance officer pastes Viewing Key |
| 1:30 | Decrypted payroll table appears |
| 1:45 | "Generate Audit Report" → PDF download |
| 2:00 | "Umbra Viewing Keys: privacy WITHOUT the lawsuits" |

---

## SEED DATA

### Demo Employees
```json
[
    {"label": "alice.sol", "amount": 500, "token": "SOL", "role": "Engineer"},
    {"label": "bob.sol", "amount": 350, "token": "SOL", "role": "Designer"},
    {"label": "carol.sol", "amount": 800, "token": "SOL", "role": "Lead"},
    {"label": "dave.sol", "amount": 450, "token": "SOL", "role": "DevOps"},
    {"label": "eve.sol", "amount": 600, "token": "SOL", "role": "PM"}
]
```
Total batch: 2,700 SOL (~$405K at $150/SOL)

---

## SPONSOR DEFENSE

**Q: "Why not just use a mixer?"**
A: Mixers are illegal in most jurisdictions. Umbra stealth addresses are compliant by design — the Viewing Key provides a legal audit trail.

**Q: "Can the employer see employee balances?"**
A: No. Stealth addresses are one-way. The employer knows they sent to Alice, but can't see Alice's total balance or other incoming payments.

**Q: "How is the Viewing Key scoped?"**
A: Three dimensions: (1) Time window (Q1 2026 only), (2) Employee filter (Alice + Bob only), (3) Read-only access. The auditor cannot modify or send funds.

---

## PRODUCTION PLAN

- Vercel frontend, Supabase backend, Solana devnet
- `scripts/bench.py`: stealth generation + batch transfer latency
- `scripts/verify_offline.py`: tables seeded, Umbra SDK responds
- Checklist: batch works, Viewing Key decrypts, PDF generates, demo video recorded

---

## UI SPECIFICATION

| Token | Value |
|---|---|
| **Primary** | Cyan (#06b6d4) — Privacy/Umbra |
| **Secondary** | Purple (#a855f7) — HR/Compliance |
| **Background** | Slate-950 |
| **Aesthetic** | "HR for Crypto" — Professional dark dashboard |

### Pages
1. **Employer Dashboard** (`/`) — CSV upload, batch history, total payroll stats
2. **Employee View** (`/employee`) — Private payment feed, decoded amounts
3. **Compliance Portal** (`/audit`) — Viewing Key input → decrypted table → PDF export
4. **Explorer Proof** (`/proof`) — Split-screen: Solana Explorer vs. Shawage payroll
