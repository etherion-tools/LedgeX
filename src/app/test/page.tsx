"use client";
import WalletConnectButton from "@/component/Button/WalletConnectButton";
import Header from "@/component/Header/Header";
import ReusableCard from "@/component/ReusableCard/reusablecard";
import { useState } from "react";

export default function Page() {
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  function onConnect(address: string) {
    setWalletAddress(address);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Header
        title="Test Page"
        walletAddress={walletAddress || ""}
        onConnect={onConnect}
      />
      <ReusableCard name="TestXXX" walletAddress="abcdxxxx0000" />
    </div>
  );
}
