import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { ReactNode } from "react";

const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http("https://mainnet.infura.io/v3"),
    [polygon.id]: http("https://polygon-rpc.com"),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
