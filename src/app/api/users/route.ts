import { NextResponse } from "next/server";
import { userinfo } from "@/libs/auth/users/user";

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