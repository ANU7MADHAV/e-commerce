import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);
  return NextResponse.json(data);
};
