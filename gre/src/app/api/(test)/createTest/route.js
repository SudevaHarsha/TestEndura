import { db } from "@/lib/db";

const { NextResponse } = require("next/server");
const { PrismaClient } = require("@prisma/client");

export async function GET(req, res) {
  try {
    const tests = await db.test.findMany();
    return new NextResponse(JSON.stringify(tests));
  } catch (error) {
    console.error("Error fetching tests:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const {
      name,
      description,
      durations,
      sections,
      totalAttempts,
      sectionId,
      testSectionId,
      overallInstructions
    } = await req.json();
    const OverallDuration = durations.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue),
      0
    );

    console.log(req.body.name);

    let finalArray = [];

    sections.forEach((str) => {
      finalArray.push(str + "Ins");
      finalArray.push(str);
    });

    const newTest = await db.test.create({
      data: {
        name,
        description,
        sections: finalArray,
        overallDuration: OverallDuration.toString(),
        sectionDuration: durations,
        totalAttempts: parseInt(totalAttempts),
        testSectionId: sectionId,
        testSectionId,
        overallInstructions
      },
    });

    return new NextResponse(JSON.stringify(newTest), { status: 201 });
  } catch (error) {
    console.error("Error creating test:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
