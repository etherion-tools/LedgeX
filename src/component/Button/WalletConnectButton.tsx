"use client";
import { Button } from "@mui/material";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

// Chain ID declare
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

  // SSR/CSR mismatch prevention
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // If not connected: show connect options (multi-wallet future-ready)
  if (!isConnected) {
    return (
      <>
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            variant="outlined"
            onClick={() => connect({ connector })}
            disabled={status === "pending"}
            style={{ marginBottom: 8 }}
          >
            {`Connect Wallet${connector.name ? ` (${connector.name})` : ""}`}
            {status === "pending" ? " (connecting...)" : ""}
          </Button>
        ))}
      </>
    );
  }

  // If connected: show wallet info and disconnect
  return (
    <div className="flex items-center gap-4">
      <span>
        <strong>{address?.slice(0, 6)}...{address?.slice(-4)}</strong>
        {" | "}
        {chainId ? `Chain ID: ${chainId}` : "Chain: Unknown"}
      </span>
      <Button
        color="error"
        variant="contained"
        onClick={() => disconnect()}
        style={{ marginLeft: 8 }}
      >
        Disconnect
      </Button>
    </div>
  );
}
