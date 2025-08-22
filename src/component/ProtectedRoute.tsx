"use client";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isConnected) {
      router.replace("/login"); // Public/login/connect-wallet page
    if (isConnected === false) {
      router.replace("/login");
    }
  }, [isConnected, router, isClient]);

  if (!isClient || !isConnected) return null;
  // Avoid hydration error: don't render until connection state known
  if (typeof isConnected === "undefined") return null;
  if (!isConnected) return null;

  return <>{children}</>;
}
