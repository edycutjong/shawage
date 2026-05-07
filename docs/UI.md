# Shawage — UI Specification

## Design System
| Token | Value |
|---|---|
| **Primary** | Cyan (#06b6d4) — Privacy/Umbra |
| **Secondary** | Purple (#a855f7) — HR/Compliance |
| **Success** | Green (#22c55e) — Payment confirmed |
| **Warning** | Amber (#f59e0b) — Viewing Key active |
| **Background** | Slate-950 (#020617) |
| **Surface** | Slate-900/80 backdrop-blur |
| **Typography** | JetBrains Mono (amounts), Inter (labels) |
| **Aesthetic** | "HR for Crypto" — Professional dark dashboard |

## Pages

### 1. Employer Dashboard (`/`)
- CSV upload area (drag & drop)
- Batch history timeline
- Total payroll stats (current month, YTD)
- Employee count, average salary

### 2. Employee View (`/employee`)
- Private payment feed (decoded amounts with personal key)
- Payment history chart
- "Only you can see this" privacy badge

### 3. Compliance Portal (`/audit`)
- Viewing Key input field
- Decrypted payroll table (appears after valid key)
- Scope indicators (time window, employee filter)
- "Generate Audit Report" → PDF download

### 4. Explorer Proof (`/proof`)
- Split-screen: left = Solana Explorer (5 random addresses), right = Shawage payroll (names, amounts)
- "This is what the blockchain sees vs. what we know"

## Key Components
| Component | Description |
|---|---|
| `CSVUploader` | Drag-drop CSV with employee preview |
| `BatchTimeline` | Monthly payroll batches with status |
| `ViewingKeyInput` | Paste field with validation indicator |
| `SplitScreenProof` | Left: explorer ciphertext, Right: decoded table |
| `PayslipCard` | Employee name, amount, token, date |
| `AuditPDF` | Generate downloadable compliance report |

## Animations
- Batch transfer: sequential check marks (alice ✅, bob ✅, ...)
- Viewing Key: table rows decrypt one-by-one (typewriter effect)
- Split-screen: explorer side blurs, Shawage side sharpens
- Privacy badge: subtle pulse to emphasize "private"
