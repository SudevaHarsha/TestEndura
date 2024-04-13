import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function DELETE(req, {params}) {
  /*  const {id} = await req.params; */

  try {
    const deletedType = await db.questionType.delete({
      where: { id : params.typeId },
    });
    if (!deletedType) {
      return NextResponse.error(new Error("Question Type not found"), { status: 404 });
    }
    return NextResponse.json({ message: "Questipn type deleted successfully" });
  } catch (error) {
    console.error("Error deleting Question type:", error);
    return NextResponse.error(error, { status: 500 });
  }
}