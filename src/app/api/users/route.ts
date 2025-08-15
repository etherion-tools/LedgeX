import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        wallet_address: true,
        createdAt: true,
      },
    });
    if (users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 200 });
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
