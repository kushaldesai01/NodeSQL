import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error: any) {
    console.log(error.message);
  }
};
