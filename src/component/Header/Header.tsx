"use client";
import { useState } from "react";
import WalletModal from "../Modal/WalletModal";
import WalletConnectButton from "../Button/WalletConnectButton";
import { useAccount, useDisconnect } from "wagmi";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const [openModal, setOpenModal] = useState(false);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  // Short address
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <header className="border-b shadow-md w-full py-4 px-6 bg-blue-950 dark:bg-foreground flex items-center justify-between">
      <span className="text-2xl font-bold text-white">
        {title}
      </span>
      <span className="text-lg">
        {!isConnected ? (
          // Show Connect Wallet button if not connected
          <button
            className="border px-4 py-2 rounded bg-white text-blue-900 font-bold hover:bg-gray-100"
            onClick={() => setOpenModal(true)}
          >
            Connect Wallet
          </button>
        ) : (
          // Show address and disconnect button if connected
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">{shortAddress}</span>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </div>
        )}
      </span>

      {/* Modal: Only open on connect wallet button click */}
      <WalletModal open={openModal} onClose={() => setOpenModal(false)}>
        <WalletConnectButton />
      </WalletModal>
    </header>
  );
}
