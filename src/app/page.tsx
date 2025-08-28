"use client";
import ProtectedRoute from "@/component/ProtectedRoute";
import Header from "@/component/Header/Header";
import Navbar from "@/component/Navbar/navbar";
import ReusableCard from "@/component/ReusableCard/reusablecard";
import TransactionForm from "@/component/TransactionForm/TransactionForm";
import TransactionTable from "@/component/TransactionTable/transactiontable";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";

const LineChart = dynamic(() => import("@/component/Charts/linechart"), {
  ssr: false,
});
const PieChart = dynamic(() => import("@/component/Charts/piechart"), {
  ssr: false,
});

export default function Page() {
  const { address, isConnected } = useAccount();

  return (
    <ProtectedRoute>
      <main className="bg-foreground min-h-screen">
        <Header title="LedgeX" />
        <div className="relative">
          <Navbar />
          <div className="absolute right-0 top-0 m-4">
            <ReusableCard
              name={isConnected ? "Wallet Owner" : "No Wallet Connected"}
              walletAddress={isConnected && address ? address : "0x000...000"}
            />
          </div>
        </div>

        <div className="flex gap-20 items-stretch justify-center">
          <TransactionForm />
          <TransactionTable />
        </div>
        {/* CHART FLEX CONTAINER */}
        <div className="chart-row">
          <div className="chart-card chart-line">
            <LineChart />
          </div>
          <div className="chart-card chart-pie">
            <PieChart />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
