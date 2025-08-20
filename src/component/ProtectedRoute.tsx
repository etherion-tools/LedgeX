"use client";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/login"); // Public/login/connect-wallet page
    }
  }, [isConnected, router]);

  if (!isConnected) return null;

  return <>{children}</>;
}
