import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/utilities/db";

import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  const user = await prisma?.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    console.log("User not found");
    return NextResponse.json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    console.log("Password is incorrect");
    return NextResponse.json({ message: "Password is incorrect" });
  } else {
    console.log("Password is correct");
    const secretKey: string | undefined = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key not found");
      return NextResponse.json({ message: "Internal server error" });
    }
    const token = jwt.sign({ password }, secretKey, { expiresIn: "1h" });
    return NextResponse.json({ token, status: 200 });
  }
};
