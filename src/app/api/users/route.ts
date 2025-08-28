import { NextResponse } from "next/server";
import { createUser, userinfo } from "@/libs/auth/users/user";

export async function GET() {
  try {
    const result = await userinfo();
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        status: 500,
        users: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { wallet_address } = await req.json();

    if (!wallet_address) {
      return NextResponse.json(
        {
          success: false,
          error: "Wallet address is required",
          status: 400,
        },
        { status: 400 }
      );
    }

    const connectedUser = await createUser({ wallet_address });

    return NextResponse.json(
      {
        success: true,
        user: connectedUser,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        status: 500,
        users: [],
      },
      { status: 500 }
    );
  }
}
