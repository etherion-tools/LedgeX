"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Replace with your real INFURA API key
const INFURA_API_KEY = "your_infura_api_key"; 

const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
    [polygon.id]: http("https://polygon-rpc.com"),
  },
  
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
