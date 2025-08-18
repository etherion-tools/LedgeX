"use client";
import { Button } from "@mui/material";
import { ethers } from "ethers";

import { MetaMaskInpageProvider } from "@metamask/providers";

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
  async function onClickHandler() {
    if (!window.ethereum) {
      alert("Please install Metamask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (onConnect) onConnect(accounts[0]);
    } catch (err) {
      console.error("User rejected connection", err);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <Button variant="outlined" onClick={onClickHandler}>
        {walletAddress
          ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </Button>
    </main>
  );
}
