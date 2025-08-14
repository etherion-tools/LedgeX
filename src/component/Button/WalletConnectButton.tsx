"use client";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
  
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function WalletConnectButton() {
  const [address, setAddress] = useState<string | null>(null);

  async function onClickHandler() {
    if (!window.ethereum) {
      alert("Please install Metamask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
    } catch (err) {
      console.error("User rejected connection", err);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <Button variant="outlined" onClick={onClickHandler}>
        {address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : "Connect Wallet"}
      </Button>
    </main>
  );
}
