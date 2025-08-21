"use client";
import Header from "@/component/Header/Header";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace("/"); // Connected user will be redirected to the main page
    }
  }, [isConnected, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header: auto modal trigger */}
      <Header title="Please Connect Your Wallet" />
      {/* Prompt message */}
      <div className="mt-10 text-lg text-gray-800 dark:text-white">
        Connect your wallet to continue to the dashboard.
      </div>
      <div className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
        Click &quot;Connect Wallet&quot; in the top right bar.
      </div>
    </div>
  );
}
