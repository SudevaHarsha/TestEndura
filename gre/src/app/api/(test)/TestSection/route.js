import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function POST(req, res) {
  try {
    const { name,categoryId } = await req.json();

    const newSection = await db.testSection.create({
      data: {
        name,
        categoryId
      },
    });

    return NextResponse.json({ newSection }, { status: 201 });
  } catch (error) {
    console.error("Error creating test Scetion:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 600;
export async function GET(req) {
  try {
    const testSections = await db.testSection.findMany();
    if (!testSections) {
      return NextResponse.error(new Error("Test not found"), { status: 404 });
    }
    return NextResponse.json({ testSections });
  } catch (error) {
    console.error("Error getting testSections:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
