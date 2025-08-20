"use client";
import ProtectedRoute from "@/component/ProtectedRoute"; 
import Header from "@/component/Header/Header";
import TabbedNavigation from "@/component/TabbedNavigation";
import TransactionsCharts from "@/component/TransactionsCharts";
import WalletCards from "@/component/WalletCards";

export default function Page() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header title="My Dapp" />
        <div className="flex flex-col items-center px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-2">
            LedgerX Dashboard
          </h1>
          <WalletCards />
          <TabbedNavigation />
          <TransactionsCharts />
        </div>
      </main>
    </ProtectedRoute>
  );
}
