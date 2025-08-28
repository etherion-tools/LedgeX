"use client";
import Header from "@/component/Header/Header";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      router.replace("/"); // Connected user will be redirected to the main page
    }
    const fetchAddress = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet_address: address }),
        });
        if (!res.ok) {
          setError("Failed to send address");
        } else {
          setError(null);
        }
      } catch (err) {
        console.error(err);
        setError("Network Error");
      }
    };
    if (address) {
      fetchAddress();
    }
  }, [isConnected, router, address]);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
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
