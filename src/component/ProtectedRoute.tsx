"use client";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected === false) {
      router.replace("/login");
    }
  }, [isConnected, router]);

  // Avoid hydration error: don't render until connection state known
  if (typeof isConnected === "undefined") return null;
  if (!isConnected) return null;

  return <>{children}</>;
}
