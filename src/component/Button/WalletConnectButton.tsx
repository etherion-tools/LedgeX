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
};

export default function WalletConnectButton({ onConnect }: WalletConnectButtonProps) {
  async function onClickHandler() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (onConnect) onConnect(accounts[0]);
    } catch (err: unknown) { 
      // type guard for MetaMask error object structure
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code: number }).code === 4001
      ) {
        alert("Wallet connection cancelled. Please approve your wallet to connect.");
        return;
      }
      alert("Failed to connect wallet. Please try again.");
      // No console.error here
    }
  }

  return (
    <Button variant="outlined" onClick={onClickHandler}>
      Connect Wallet
    </Button>
  );
}
