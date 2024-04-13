import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {

    const profiles = await prisma.profile.findMany();
      

    if (!profiles) {
      return NextResponse.error(new Error("student not found"), {
        status: 404,
      });
    }

    console.log("student fetched:", profiles);
    return NextResponse.json({ profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
