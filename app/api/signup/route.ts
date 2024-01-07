import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utilities/db";

export const POST = async (req: Request) => {
  const { firstName, email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return NextResponse.json({ message: "User is already exist " });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createNewUser = await prisma.user.create({
    data: {
      name: firstName,
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(createNewUser);
};
