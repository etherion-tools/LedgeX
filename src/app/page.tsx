"use client";

import TabbedNavigation from "@/component/TabbedNavigation";
import TransactionsCharts from "@/component/TransactionsCharts";
import WalletCards from "@/component/WalletCards";


export default function Page(){
  return (
    <main>
      <WalletCards />
      <TabbedNavigation />
      <TransactionsCharts />
    </main>
  )
}