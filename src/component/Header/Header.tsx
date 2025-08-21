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

  // Truncate address
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <header className="border-b shadow-md w-full py-4 px-6 bg-blue-950 flex items-center justify-between">
      <span className="text-2xl font-bold text-white">{title}</span>
      <span className="text-lg flex items-center gap-2">
        {!isConnected ? (
          // Disconnected: show Connect Wallet button
          <>
            <button
              className="border px-4 py-2 rounded bg-white text-blue-900 font-bold hover:bg-gray-100"
              onClick={() => setOpenModal(true)}
            >
              Connect Wallet
            </button>
            {/* Modal*/}
            <WalletModal open={openModal} onClose={() => setOpenModal(false)}>
              <WalletConnectButton />
            </WalletModal>
          </>
        ) : (
          // Connected: show address + Disconnect button
          <>
            <span className="font-bold text-white">{shortAddress}</span>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold rounded px-4 py-2 transition"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </>
        )}
      </span>
    </header>
  );
}
