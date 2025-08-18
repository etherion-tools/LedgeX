"use client";
import WalletConnectButton from "../Button/WalletConnectButton";
import { useDisconnect } from "wagmi";

// Props for Header
type HeaderProps = {
  title: string;
  walletAddress: string;
  onConnect?: (address: string) => void;
  onDisconnect?: () => void; // Add disconnect handler
};

export default function Header({
  title,
  walletAddress,
  onConnect,
  onDisconnect,
}: HeaderProps) {
  const { disconnect } = useDisconnect();

  return (
    <header className="border-b shadow-md w-full py-4 px-6 bg-white dark:bg-gray-950 flex items-center justify-between">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </span>
      <span className="text-lg">
        {/* If wallet is connected, show address & disconnect button */}
        {walletAddress ? (
          <div className="flex items-center space-x-3">
            <span>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <button
              onClick={() => {
                disconnect(); // wagmi hook
                if (onDisconnect) onDisconnect();
              }}
              className="bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          // If not connected, show connect wallet button
          <WalletConnectButton onConnect={onConnect} />
        )}
      </span>
    </header>
  );
}
