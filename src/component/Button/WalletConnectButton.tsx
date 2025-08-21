"use client";
import { Button } from "@mui/material";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

// Ethereum declaration for (for chainId usage)
declare global {
  interface Window {
    ethereum?: {
      chainId?: string;
    };
  }
}

export default function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.chainId) {
      setChainId(parseInt(window.ethereum.chainId, 16));
    }
  }, [isConnected]);

  // Log user info when connected
  useEffect(() => {
    if (isConnected) {
      console.log("User info:", { address, chainId, isConnected });
    }
  }, [isConnected, address, chainId]);

  // SSR/CSR mismatch prevention
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // Connect button Always show "Connect Wallet" label
  if (!isConnected) {
    return (
      <>
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            variant="outlined"
            onClick={() => connect({ connector })}
            disabled={status === "pending"}
          >
            Connect Wallet
            {status === "pending" ? " (connecting...)" : ""}
          </Button>
        ))}
      </>
    );
  }

  // Connected: show address, chain info, disconnect button
  return (
    <div>
      <span>
        <strong>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </strong>
        {" | "}
        {chainId ? `Chain ID: ${chainId}` : "Chain: Unknown"}
      </span>
      <Button
        color="error"
        variant="contained"
        onClick={() => disconnect()}
        sx={{ marginLeft: 2 }}
      >
        Disconnect
      </Button>
    </div>
  );
}
