import { db } from "@/lib/db";
import { types } from "sass";
const { NextResponse } = require("next/server");

export async function GET(req, { params }) {
  /*  const {id} = await req.params; */

  try {
    const type = await db.questionType.findUnique({
      where: { id: params.typeId },
    });
    if (!type) {
      return NextResponse.error(new Error("Question Type not found"), {
        status: 404,
      });
    }
    return NextResponse.json({ type });
  } catch (error) {
    console.error("Error getting Question type:", error);
    return NextResponse.error(error, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { type } = await req.json();

  try {
    const Editedtype = await db.questionType.update({
      where: { id: params.typeId },
      data: {
        type: type,
      },
    });
    if (!Editedtype) {
      return NextResponse.error(new Error("Question Type not found"), {
        status: 404,
      });
    }
    return NextResponse.json({ Editedtype });
  } catch (error) {
    console.error("Error getting Question type:", error);
    return NextResponse.error(error, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  /*  const {id} = await req.params; */

  try {
    const deletedType = await db.questionType.delete({
      where: { id: params.typeId },
    });
    if (!deletedType) {
      return NextResponse.error(new Error("Question Type not found"), {
        status: 404,
      });
    }
    return NextResponse.json({ message: "Questipn type deleted successfully" });
  } catch (error) {
    console.error("Error deleting Question type:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
