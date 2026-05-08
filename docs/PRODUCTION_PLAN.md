# Shawage — Production Plan

## Deployment
| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Supabase |
| Chain | Solana devnet |

## Verification Scripts

### `scripts/bench.py`
- Stealth address generation latency (p50/p95)
- Batch transfer latency (5 recipients)
- Viewing Key decryption latency

### `scripts/verify_offline.py`
- Umbra SDK responds
- Supabase tables seeded (employees, payrolls)
- Stealth addresses generate correctly
- Viewing Key decrypts sample payroll

## Pre-Submission Checklist
- [x] Batch stealth transfer works (5 recipients)
- [x] Viewing Key decrypts payroll table
- [x] Split-screen explorer proof shows ciphertext
- [x] Employee view decodes incoming payment
- [x] PDF audit report generates
- [x] Demo video recorded (< 3 min)
- [x] bench.py latency results included
- [x] README with architecture diagram
