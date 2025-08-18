import WalletConnectButton from "../Button/WalletConnectButton";

type HeaderProps = {
  title: string;
  walletAddress: string;
  onConnect?: (address: string) => void;
};

export default function Header({ title, walletAddress, onConnect }: HeaderProps) {
  return (
    <header className="border border-foreground shadow-lg w-full h-24 py-2 rounded-md bg-background text-foreground">
      <nav>
        <ul className="flex flex-col justify-center items-center space-y-3">
          <li className="text-4xl font-bold">Title: {title}</li>
          <li className="text-lg">{walletAddress? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : <WalletConnectButton onConnect={onConnect} walletAddress={walletAddress} />}</li>
        </ul>
      </nav>
    </header>
  );
}
