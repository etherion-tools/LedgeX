import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet_address = searchParams.get("address");
    const type = searchParams.get("type");
    console.log("Fetching transactions for wallet:", wallet_address);

    if (!wallet_address) {
      return NextResponse.json(
        { error: "Unauthorized: connect your wallet first" },
        { status: 401 }
      );
    }

    // Find the user by wallet address
    const user = await prisma.user.findUnique({
      where: { wallet_address },
    });
    console.log("User found:", user);

    if (!user) {
      return NextResponse.json(
        { error: "No user found for this wallet address" },
        { status: 404 }
      );
    }

    // Find transactions for the user
    const whereClause = type
      ? { userId: user.id, type: type as "INCOME" | "EXPENSE" }
      : { userId: user.id };
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: { user: true },
    });
    console.log("Transactions found:", transactions);

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
