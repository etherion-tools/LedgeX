import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { walletAddress } = body;

  if (!walletAddress) {
    return NextResponse.json({ error: "Wallet Address missing" }, { status: 401 });
  }

  const transactionId = params.id;
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  if (
    transaction.userId.toLowerCase() !== walletAddress.toLowerCase()
  ) {
    return NextResponse.json({ error: "Forbidden - Not Owner" }, { status: 403 });
  }

  await prisma.transaction.delete({
    where: { id: transactionId },
  });

  return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
}
