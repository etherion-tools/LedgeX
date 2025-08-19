"use client";

import { Button } from "@mui/material";
import { ethers } from "ethers";

import { MetaMaskInpageProvider } from "@metamask/providers";
import { useState } from "react";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

type WalletConnectButtonProps = {
  onConnect?: (address: string) => void;
  walletAddress?: string;
};

export default function WalletConnectButton({
  onConnect,
  walletAddress,
}: WalletConnectButtonProps) {
  const [user, setUser] = useState<object | null>(null);

  async function onClickHandler() {
    if (!window.ethereum) {
      alert("Please install Metamask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const walletAddress = accounts[0];
      // Send POST request to /api/users
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet_address: walletAddress }),
      });
      if (!response.ok) {
        throw new Error("Failed to create or fetch user");
      }
      const userData = await response.json();
      setUser(userData);
      if (onConnect) onConnect(walletAddress);
    } catch (err) {
      console.error("User rejected connection or API error", err);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <Button variant="outlined" onClick={onClickHandler}>
        {walletAddress
          ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </Button>
      {user && (
        <div className="mt-4 p-2 border rounded bg-gray-100 text-gray-800">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
