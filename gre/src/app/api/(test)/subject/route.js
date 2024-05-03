import { db } from "@/lib/db";

const { NextResponse } = require("next/server");
export async function GET(req, res) {
  try {
    const subjects = await db.subject.findMany();
    return new NextResponse(JSON.stringify(subjects));
  } catch (error) {
    console.error("Error fetching tests:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const {
      name,
    } = await req.json();

    const newSubject = await db.subject.create({
      data: {
        name,
      },
    });

    return new NextResponse(JSON.stringify(newSubject), { status: 201 });
  } catch (error) {
    console.error("Error creating test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
