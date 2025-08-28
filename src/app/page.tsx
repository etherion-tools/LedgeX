"use client";
import ProtectedRoute from "@/component/ProtectedRoute";
import Header from "@/component/Header/Header";
import Navbar from "@/component/Navbar/navbar";
import ReusableCard from "@/component/ReusableCard/reusablecard";
import TransactionForm from "@/component/TransactionForm/TransactionForm";
import TransactionTable from "@/component/TransactionTable/transactiontable";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/component/Charts/linechart"), { ssr: false });
const PieChart = dynamic(() => import("@/component/Charts/piechart"), { ssr: false });

export default function Page() {
  return (
    <ProtectedRoute>
      <main>
        <Header title="LedgeX" />
        <Navbar />
        <TransactionForm />
        <TransactionTable />
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
