import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

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