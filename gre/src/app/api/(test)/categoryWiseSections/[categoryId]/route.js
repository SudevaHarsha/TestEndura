import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function GET(req, { params }) {
  try {
    const testSections = await db.testSection.findMany({
      where: {
        categoryId: params.categoryId,
      },
    });
    console.log('Tests',testSections)
    return NextResponse.json({ testSections });
  } catch (error) {
    console.error("Error fetching testSections:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
