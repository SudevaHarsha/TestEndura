import { db } from "@/lib/db";

const { NextResponse } = require("next/server");

export async function PUT(req, { params }) {
  try {
    const { name } = await req.json();

    const updatedSubject = await prisma.subject.update({
      where: {
        id: params.subjectId,
      },
      data: {
        name,
      },
    });

    return new NextResponse(JSON.stringify(updatedSubject), { status: 200 });
  } catch (error) {
    console.error("Error updating subject:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.subject.delete({
      where: {
        id: params.subjectId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting subject:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
