import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const parsedInfo = await req.json();
    if (!parsedInfo || Object.keys(parsedInfo).length === 0) {
      return NextResponse.json({ error: "Couldn't fetch parsedInfo" }, { status: 400 });
    }
    const address = parsedInfo.wallet || parsedInfo.userId;
    if (!address) {
      return NextResponse.json({ error: "Wallet address missing" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { wallet_address: address } });
    if (!user) {
      return NextResponse.json({ error: "Couldn't find user" }, { status: 401 });
    }
    const addtrx = await prisma.transaction.create({
      data: {
        amount: parsedInfo.amount,
        category: parsedInfo.category,
        description: parsedInfo.description,
        userId: user.id, // set UUID from user table!
        date: new Date(parsedInfo.date),
        type: parsedInfo.type.toUpperCase() as "INCOME" | "EXPENSE",
      }
    });
    return NextResponse.json({ addtrx }, { status: 200 });
  } catch (error) {
    console.error("Error in addtransactions API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
