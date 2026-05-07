# Shawage — Build Plan (3-Day Sprint)

## Day 1: Umbra Core (8h)
| Hour | Task |
|------|------|
| 0-1 | Scaffold (Next.js 16, Tailwind v4, Supabase, wallet adapter) |
| 1-3 | Umbra stealth address generation + single transfer |
| 3-5 | Batch payroll: CSV upload → 5 stealth transfers |
| 5-7 | Employee dashboard: scan + decode incoming payments |
| 7-8 | Checkpoint: batch transfer works on devnet |

**Gate**: Can we send a stealth transfer on devnet? If NO → check SDK version, simplify to single transfer.

## Day 2: Compliance (8h)
| Hour | Task |
|------|------|
| 0-2 | Viewing Key generation and scoping (time-bound, employee-filter) |
| 2-4 | Compliance portal: paste key → decrypted payroll table |
| 4-5 | PDF audit report (jsPDF) |
| 5-7 | Split-screen explorer proof |
| 7-8 | End-to-end flow test |

**Gate**: Does the Viewing Key decrypt the correct subset? If NO → reduce scoping to all-or-nothing.

## Day 3: Polish + Demo (8h)
| Hour | Task |
|------|------|
| 0-2 | Dark HR dashboard UI, glassmorphism |
| 2-3 | Seed data population |
| 3-5 | Demo video recording (3-act: Employer → Explorer → Auditor) |
| 5-7 | README, screenshots, architecture diagrams |
| 7-8 | Deploy + submit |

## Must-Have ✅
- Batch stealth transfers via Umbra
- Viewing Key compliance portal
- Split-screen explorer proof
- Employee payment decoder

## Nice-to-Have 🟡
- PDF audit report
- Scoped Viewing Keys (time-bound, employee-filter)
- Batch history timeline
