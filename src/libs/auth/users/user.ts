import { prisma } from "@/utils/prisma";
export async function userinfo() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        wallet_address: true,
        createdAt: true,
      },
    });
    if (users.length === 0) {
      return {
        success: false,
        error: "No users found",
        status: 200,
        users: [],
      };
    }
    return {
      success: true,
      error: null,
      status: 200,
      users,
    };
}


//User Creation(Prisma)
export async function createUser({wallet_address}: {wallet_address: string}){
 
  const user = await prisma.user.upsert({
    where: {wallet_address},
    update: {},
    create: {wallet_address}
  });
  return user;
}