# SAH.ID

A decentralized crypto agreement platform built on Base blockchain with IDRX stablecoin integration. SAH.ID provides transparent, immutable, and legally-verifiable proof of agreements and payments between parties.

## Overview

SAH.ID addresses the regulatory gap in cryptocurrency transactions, particularly in regions where crypto regulations are still developing. The platform creates a trustless environment where both parties can engage in crypto transactions with verifiable proof recorded on the blockchain.

### Problem Statement

- Cryptocurrency transactions often lack legal protection due to unclear regulations
- Traditional payment agreements are susceptible to manipulation and disputes
- No standardized way to create binding crypto payment agreements
- Difficulty in proving transaction authenticity in legal proceedings

### Solution

SAH.ID provides:

- Immutable agreement records on Base blockchain
- Two-party consent mechanism before payment execution
- Publicly verifiable transaction history
- Exportable proof documents for legal purposes
- Stablecoin integration (IDRX) for value stability

## Key Features

### Agreement Management
- Create detailed payment agreements with terms and conditions
- Share agreements via unique public links
- Two-party approval system prevents unauthorized transactions
- Real-time status tracking (Pending, Approved, Paid)

### Blockchain Integration
- Built on Base (Ethereum L2) for low fees and fast transactions
- IDRX stablecoin for IDR-pegged value stability
- All agreements recorded on-chain for immutability
- Transaction hash verification for payment proof

### Legal Compliance Support
- Timestamped agreement creation and approval
- Wallet address verification for both parties
- Exportable PDF receipts with transaction details
- Immutable audit trail for dispute resolution

### Public Accessibility
- Agreement links accessible without wallet connection
- Receipt/proof of payment shareable to anyone
- No authentication required to view transaction proof
- Permanent links that work across all devices

## Benefits

### For Users
- Protection against fraud through mutual consent mechanism
- Permanent proof of agreements that cannot be altered
- No intermediary fees or delays
- Access agreements from any device via public links

### For Legal Purposes
- Blockchain records serve as timestamped evidence
- Immutable transaction history for dispute resolution
- Verifiable on public blockchain explorers (BaseScan)
- PDF export for offline documentation

## User Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SAH.ID USER FLOW                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STEP 1     │     │   STEP 2     │     │   STEP 3     │     │   STEP 4     │
│              │     │              │     │              │     │              │
│   Connect    │────▶│    Create    │────▶│    Share     │────▶│   Approve    │
│   Wallet     │     │  Agreement   │     │    Link      │     │  Agreement   │
│              │     │              │     │              │     │              │
│  (Creator)   │     │  (Creator)   │     │  (Creator)   │     │ (Recipient)  │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                      │
                                                                      ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STEP 8     │     │   STEP 7     │     │   STEP 6     │     │   STEP 5     │
│              │     │              │     │              │     │              │
│   Verify     │◀────│    Share     │◀────│   Receipt    │◀────│   Execute    │
│  on-chain    │     │   Receipt    │     │  Generated   │     │   Payment    │
│              │     │              │     │              │     │              │
│  (Anyone)    │     │   (Anyone)   │     │   (System)   │     │  (Creator)   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Detailed Flow

1. Creator connects wallet (MetaMask or compatible)
2. Creator fills agreement details (title, description, amount, recipient address)
3. System generates unique shareable link with embedded data
4. Creator shares link to recipient
5. Recipient verifies details and approves by entering their wallet address
6. Creator executes payment in IDRX
7. System records transaction on Base blockchain
8. Receipt generated with transaction hash, shareable to anyone

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SAH.ID ARCHITECTURE                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Landing   │  │  Dashboard  │  │  Agreement  │  │   Receipt   │        │
│  │    Page     │  │    Page     │  │    View     │  │    View     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                     React + TypeScript + Vite                    │       │
│  └─────────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              STATE MANAGEMENT                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │  WalletContext  │  │ AgreementContext│  │  ToastContext   │             │
│  │                 │  │                 │  │                 │             │
│  │ - Connection    │  │ - CRUD Ops      │  │ - Notifications │             │
│  │ - Address       │  │ - Status Mgmt   │  │ - Feedback      │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐          │
│  │      URL Encoded Data       │  │      Local Storage          │          │
│  │                             │  │                             │          │
│  │ - Public shareable links    │  │ - Agreement cache           │          │
│  │ - No backend required       │  │ - User preferences          │          │
│  │ - Base64 encoded JSON       │  │ - Session data              │          │
│  └─────────────────────────────┘  └─────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            BLOCKCHAIN LAYER                                 │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                        BASE NETWORK (L2)                         │       │
│  │                                                                  │       │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │       │
│  │  │    IDRX      │    │  Transaction │    │   BaseScan   │       │       │
│  │  │  Stablecoin  │    │   Records    │    │  Verification│       │       │
│  │  └──────────────┘    └──────────────┘    └──────────────┘       │       │
│  │                                                                  │       │
│  └─────────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Radix UI |
| State | React Context API |
| Routing | React Router v6 (Hash Router) |
| Blockchain | Base Network (Ethereum L2) |
| Token | IDRX Stablecoin |
| PDF Export | jsPDF, html2canvas |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Clone repository
git clone https://github.com/davizofficial/SAH.ID.git
cd SAH.ID

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## Deployment

The project is configured for Vercel deployment:

1. Push to GitHub repository
2. Connect repository to Vercel
3. Deploy with default Vite settings

Configuration files included:
- `vercel.json` - SPA routing configuration
- `vite.config.ts` - Build configuration

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── AppShell.tsx    # Main app layout
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── Topbar.tsx      # Top navigation bar
├── contexts/           # React Context providers
│   ├── WalletContext   # Wallet connection state
│   ├── AgreementContext# Agreement CRUD operations
│   └── ToastContext    # Notification system
├── screens/            # Page components
│   ├── LandingScreen   # Public landing page
│   ├── Dashboard       # User dashboard
│   ├── CreateAgreement # Agreement creation form
│   ├── PublicAgreementView # Public agreement page
│   └── PaymentSuccess  # Receipt/proof page
├── utils/              # Utility functions
│   └── agreementEncoder# URL encoding/decoding
└── App.tsx             # Root component with routing
```

## License

MIT License

## Author

Daviz.dev

---

SAH.ID - Transparent Crypto Agreements on Base Blockchain
