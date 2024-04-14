import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function GET(req, {params}) {
  /*  const {id} = await req.params; */

  try {

    console.log(params.id);
    const Test = await db.test.findUnique({
      where: { id : params.id },
    });
    if (!Test) {
      return NextResponse.error(new Error("Test not found"), { status: 404 });
    }
    return NextResponse.json({ Test });
  } catch (error) {
    console.error("Error getting test:", error);
    return NextResponse.error(error, { status: 500 });
  }
}

export async function PATCH(req, {params}) {
  /*  const {id} = await req.params; */

  try {

    const { name, description, durations, sections } = await req.json();
    const OverallDuration = durations.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);

    console.log(req.body.name);

    const updatedTest = await db.test.update({
      where : {
        id: params.id,
      },
      data: {
        name,
        description,
        sections,
        overallDuration: OverallDuration.toString(),
        sectionDuration: durations
      }
    });
    if (!updatedTest) {
      return NextResponse.error(new Error("updatedTest not found"), { status: 404 });
    }
    return NextResponse.json({ updatedTest });
  } catch (error) {
    console.error("Error getting updatedTest:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
export async function DELETE(req, {params}) {
  /*  const {id} = await req.params; */

  try {
    console.log(params.id);
    const deletedTest = await db.test.delete({
      where: { id : params.id },
    });
    if (!deletedTest) {
      return NextResponse.error(new Error("Test not found"), { status: 404 });
    }
    return NextResponse.json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
