import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id: transactionId } = params;

  const body = await request.json();
  const { walletAddress } = body;

  if (!walletAddress) {
    return NextResponse.json({ error: "Wallet Address missing" }, { status: 401 });
  }

  // First, fetch user with this wallet address
  const user = await prisma.user.findUnique({
    where: { wallet_address: walletAddress }
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Then fetch the transaction
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  // Now do UUID-based owner check (no more address string): transaction.userId vs user.id
  if (transaction.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden - Not Owner" }, { status: 403 });
  }

  await prisma.transaction.delete({
    where: { id: transactionId },
  });

  return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
}
