import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet_address = searchParams.get("wallet_address");

    if (!wallet_address) {
      return NextResponse.json(
        { error: "Unauthorized: connect your wallet first" },
        { status: 401 }
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: { user: { wallet_address } },
      include: { user: true }, // optional
    });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
