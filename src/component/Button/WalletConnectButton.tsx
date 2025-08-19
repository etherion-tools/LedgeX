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
  const [loading, setLoading] = useState(false);

  async function onClickHandler() {
  if (!walletAddress) {
    if (!window.ethereum) {
      alert("Please install Metamask");
      return;
    }
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const connectedAddress = accounts[0];
      // Send POST request to /api/users
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet_address: connectedAddress }),
      });
      if (!response.ok) {
        throw new Error("Failed to create or fetch user");
      }
      const userData = await response.json();
      setUser(userData);
      if (onConnect) onConnect(connectedAddress);
    } catch (err) {
      console.error("User rejected connection or API error", err);
    } finally {
      setLoading(false);
    }
  }
};
  return (
    <main className="flex justify-center items-center">
      <Button
        variant="outlined"
        onClick={onClickHandler}
        disabled={loading}
      >
        {loading
          ? "Connecting ..."
          : walletAddress
          ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </Button>
      {user && null}
    </main>
  );
}
