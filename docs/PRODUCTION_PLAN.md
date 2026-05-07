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
- [ ] Batch stealth transfer works (5 recipients)
- [ ] Viewing Key decrypts payroll table
- [ ] Split-screen explorer proof shows ciphertext
- [ ] Employee view decodes incoming payment
- [ ] PDF audit report generates
- [ ] Demo video recorded (< 3 min)
- [ ] bench.py latency results included
- [ ] README with architecture diagram
