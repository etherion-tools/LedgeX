import React from "react";

type WalletModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function WalletModal({ open, onClose, children }: WalletModalProps) {
  if (!open) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-foreground bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background dark:bg-foreground rounded-lg shadow-lg p-6 min-w-[320px] relative">
        <button
          className="absolute top-1 right-1 text-2xl font-bold text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
