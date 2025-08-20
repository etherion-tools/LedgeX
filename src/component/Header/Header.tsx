"use client";
import WalletConnectButton from "../Button/WalletConnectButton";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="border-b shadow-md w-full py-4 px-6 bg-white dark:bg-gray-950 flex items-center justify-between">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </span>
      <span className="text-lg">
        <WalletConnectButton />
      </span>
    </header>
  );
}
