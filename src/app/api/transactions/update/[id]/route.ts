// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/utils/prisma";

// export async function PUT(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   const { params } = context;
//   const id = params.id;
//   const body = await request.json();
//   console.log("Update Transaction ID:", id);
//   console.log("Update Transaction Body:", body);
//   const { userId, type, category, amount, description, date } = body;

//   const tx = await prisma.transaction.findUnique({ where: { id } });
//   if (!tx) {
//     return NextResponse.json(
//       { error: "Transaction not found" },
//       { status: 404 }
//     );
//   }
//   if (!userId || tx.userId !== userId) {
//     return NextResponse.json(
//       { error: "You are not authorized to update this transaction" },
//       { status: 403 }
//     );
//   }
//   try {
//     const updatedTx = await prisma.transaction.update({
//       where: { id },
//       data: { type, category, amount, description, date },
//     });
//     return NextResponse.json({ transaction: updatedTx }, { status: 200 });
//   } catch (err) {
//     console.error("Transaction update failed:", err);
//     return NextResponse.json(
//       { error: "Could not update transaction" },
//       { status: 500 }
//     );
//   }
// }
