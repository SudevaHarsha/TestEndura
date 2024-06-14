import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function GET(req, { params }) {
  try {
    const category = await db.testCategory.findUnique({
      where: {
        id: params.id,
      },
    });
    console.log("backendc", category);
    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error getting test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { name } = await req.json();
    const category = await db.testCategory.update({
      where: {
        id: params.id,
      },
      data: {
        name,
      },
    });
    console.log("backendc", category);
    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error getting test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const categories = await db.testCategory.delete({
      where: {
        id: params.id,
      },
    });
    console.log("backendc", categories);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error deleting test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
