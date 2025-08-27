"use client";
import ProtectedRoute from "@/component/ProtectedRoute";
import Header from "@/component/Header/Header";
import Navbar from "@/component/Navbar/navbar";
import ReusableCard from "@/component/ReusableCard/reusablecard";
import TransactionForm from "@/component/TransactionForm/TransactionForm";
import TransactionTable from "@/component/TransactionTable/transactiontable";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/component/Charts/linechart"), {
  ssr: false,
});
const PieChart = dynamic(() => import("@/component/Charts/piechart"), {
  ssr: false,
});

export default function Page() {
  return (
    <ProtectedRoute>
      <main className="bg-foreground min-h-screen">
        <Header title="LedgeX" />
        <Navbar />
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

        <ReusableCard name="Abdul Karim" walletAddress="0xabcd1234ef567890" />
      </main>
    </ProtectedRoute>
  );
}
