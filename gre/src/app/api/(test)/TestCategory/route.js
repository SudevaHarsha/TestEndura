import { db } from "@/lib/db";

const { NextResponse } = require("next/server");

export async function POST(req, res) {
  try {
    const { name } = await req.json();

    const newTest = await db.testCategory.create({
      data: {
        name,
      },
    });

    return NextResponse.json({ newTest }, { status: 201 });
  } catch (error) {
    console.error("Error creating test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 600;
export async function GET(req, res) {
  try {
    const categories = await db.testCategory.findMany();
    console.log("backendc",categories);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error creating test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/* export async function DELETE(req, res) {
  try {
    const categories = await db.testCategory.findById();
    console.log("backendc",categories);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error creating test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} */
