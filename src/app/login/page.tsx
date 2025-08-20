"use client"
import WalletConnectButton from "@/component/Button/WalletConnectButton";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace("/"); // Connected users should not see the login page 
    }
  }, [isConnected, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Please connect your wallet to continue</h2>
      <WalletConnectButton />
    </div>
  );
}
