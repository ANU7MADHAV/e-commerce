import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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
  if (createNewUser) {
    const secretKey: string | undefined = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key not found");
      return NextResponse.json({ message: "Internal server error" });
    }
    const token = jwt.sign({ password }, secretKey, { expiresIn: "1h" });
    return NextResponse.json({ token, status: 200 });
  }
};
