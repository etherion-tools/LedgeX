"use client";

import TabbedNavigation from "@/component/TabbedNavigation";
import TransactionsCharts from "@/component/TransactionsCharts";
import WalletCards from "@/component/WalletCards";


export default function Page(){
  return (
   <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        LedgerX Dashboard
      </h1>
      <WalletCards />
      <TabbedNavigation />
      <TransactionsCharts />
    </main>
  );
}
