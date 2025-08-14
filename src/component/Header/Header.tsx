type HeaderProps = {
  title: string;
  walletAddress: string;
};

export default function Header({ title, walletAddress }: HeaderProps) {
  return (
    <header className="border border-foreground shadow-lg w-full h-24 py-2 rounded-md bg-background text-foreground">
      <nav>
        <ul className="flex flex-col justify-center items-center space-y-3">
          <li className="text-4xl font-bold">Title: {title}</li>
          <li className="text-lg">Wallet Address: {walletAddress}</li>
        </ul>
      </nav>
    </header>
  );
}
