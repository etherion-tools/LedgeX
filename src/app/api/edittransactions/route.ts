import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const { id, amount, type, category, description, date } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        wallet_address: address,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const usertrx = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });

    if (!usertrx || usertrx.userId !== user.id) {
      return NextResponse.json(
        { error: "Transaction not found or not owned by this user" },
        { status: 403 }
      );
    }
    const edittrx = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        amount,
        type,
        category,
        description,
        date: new Date(date),
      },
    });
    return NextResponse.json(edittrx, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
