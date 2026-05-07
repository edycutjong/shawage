# Shawage — Product Requirements Document

> **Emotional Hook**: A DAO contributor's salary was doxxed when a blockchain sleuth traced their bi-weekly SOL transfers. They quit the next day. With Umbra, the transfers would've been invisible — but a tax auditor could still verify them.

## Problem Statement
Crypto payroll is fully public. Every employee's salary, frequency, and wallet are visible. This creates security risks (targeted phishing), privacy violations (salary comparison), and regulatory concerns (no audit trail for private payments).

## Solution Overview
Shawage is a compliance-first private payroll platform using Umbra Protocol. Employers batch-send salaries via stealth addresses. Employees receive funds privately. Compliance officers use scoped Viewing Keys to generate audit reports — without seeing the full payroll.

## Core Features (MVP)
1. **Private Payroll Batch** — Upload CSV (employee, amount) → batch stealth transfers via Umbra SDK
2. **Employee Dashboard** — Employees view their private payment history (decoded with personal key)
3. **Compliance Portal** — Auditor pastes scoped Viewing Key → sees authorized payroll records → generates PDF
4. **Split-Screen Proof** — Explorer shows nothing meaningful vs. Shawage shows full payroll
5. **Viewing Key Scoping** — Time-bound, employee-scoped, read-only access for auditors

## Target Users
- **Primary**: DAO treasuries, crypto-native companies (50-500 employees)
- **Secondary**: Tax auditors, compliance officers
- **Tertiary**: Freelancers receiving crypto payments

## Success Metrics
- Batch payroll of 5 employees executes via Umbra stealth addresses
- Explorer shows no connection between employer and employee wallets
- Viewing Key decrypts only authorized records
- PDF audit report generates with correct totals

## Out of Scope
- ❌ Real payroll integrations (QuickBooks, Gusto)
- ❌ Multi-currency support (SOL/USDC only)
- ❌ Mainnet deployment
- ❌ Employee onboarding flow
- ❌ Recurring payment scheduler
