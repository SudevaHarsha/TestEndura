import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function GET(req, { params }) {
  try {
    const tests = await db.test.findMany({
      where: {
        testSectionId: params.id,
      },
    });
    console.log('Tests',tests)
    return NextResponse.json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
