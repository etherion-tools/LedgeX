# LedgerX – Web3 Expense Tracker

LedgerX is a futuristic expense and income tracking app with **Web3 wallet authentication**.  
Log in with your crypto wallet, view your token balances in real-time, and track financial transactions seamlessly.

Built with:
- **Next.js** (Frontend & API routes)
- **Material UI** (UI components)
- **PostgreSQL + Prisma** (Database)
- **ethers.js** (Wallet integration)
- **CoinGecko API** (Price conversion)

---

## 🚀 Features
- **Wallet Login** – Connect MetaMask to sign in
- **Token Balances** – View ETH/MATIC balance + USD equivalent
- **Expense/Income Tracking** – Add, view, and delete transactions
- **Data Visualization** – Charts for category & trend analysis
- **On-Chain Proof (Optional)** – Store expense hashes on blockchain

---

## 🛠 Tech Stack
- **Frontend:** Next.js, Material UI
- **Backend:** Next.js API routes, Node.js
- **Database:** PostgreSQL + Prisma
- **Web3:** ethers.js / wagmi, Infura/Alchemy
- **External APIs:** CoinGecko

---

## ⚙️ Installation
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ledgerx.git
cd ledgerx

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Fill in:
# DATABASE_URL=postgresql://user:password@localhost:5432/ledgerx
# NEXT_PUBLIC_INFURA_ID=your_infura_id
# COINGECKO_API_URL=https://api.coingecko.com/api/v3

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Start development server
npm run dev
````

---

## 🔑 Environment Variables

| Variable                 | Description                            |
| ------------------------ | -------------------------------------- |
| DATABASE\_URL            | PostgreSQL connection string           |
| NEXT\_PUBLIC\_INFURA\_ID | Infura Project ID (for blockchain RPC) |
| COINGECKO\_API\_URL      | CoinGecko API base URL                 |

---

## 🧑‍💻 Development Flow

1. Connect wallet using ethers.js
2. Store wallet address in PostgreSQL
3. Fetch balances & prices from blockchain + API
4. Implement transaction CRUD
5. Build charts & UI polish
6. (Bonus) Add smart contract for expense proof

---
