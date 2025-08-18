"use client";
import React, { useState } from "react";
import Header from "@/component/Header/Header";
import TabbedNavigation from "@/component/TabbedNavigation";
import TransactionsCharts from "@/component/TransactionsCharts";
import WalletCards from "@/component/WalletCards";

export default function Page() {
  // Manage walletAddress state (empty string when disconnected)
  const [walletAddress, setWalletAddress] = useState("");

  // Handler for disconnect -- clear the walletAddress (wagmi will clear session)
  const handleDisconnect = () => setWalletAddress("");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header
        title="My Dapp"
        walletAddress={walletAddress}
        onConnect={setWalletAddress}
        onDisconnect={handleDisconnect} // Pass disconnect handler
      />
      <div className="flex flex-col items-center px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-2">
          LedgerX Dashboard
        </h1>
        <WalletCards />
        <TabbedNavigation />
        <TransactionsCharts />
      </div>
    </main>
  );
}
