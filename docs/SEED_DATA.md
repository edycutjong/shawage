# Shawage — Seed Data

## Demo Employees
```json
[
    {"label": "alice.sol", "amount": 500, "token": "SOL", "role": "Engineer"},
    {"label": "bob.sol", "amount": 350, "token": "SOL", "role": "Designer"},
    {"label": "carol.sol", "amount": 800, "token": "SOL", "role": "Lead"},
    {"label": "dave.sol", "amount": 450, "token": "SOL", "role": "DevOps"},
    {"label": "eve.sol", "amount": 600, "token": "SOL", "role": "PM"}
]
```

**Total batch**: 2,700 SOL (~$405K at $150/SOL)

## Demo Viewing Keys
- Scoped Key 1: Time=Q1 2026, Employees=all, Access=read-only
- Scoped Key 2: Time=Jan 2026 only, Employees=alice+bob, Access=read-only
- Scoped Key 3: Time=all, Employees=carol only, Access=read-only

## Batch Payroll History (3 months)
- January: 2,700 SOL across 5 employees
- February: 2,850 SOL across 5 employees (eve raise)
- March: 3,100 SOL across 6 employees (new hire frank.sol)
