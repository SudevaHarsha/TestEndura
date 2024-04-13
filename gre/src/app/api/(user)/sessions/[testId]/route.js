import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    console.log(params.testId)
    /*     let InitialstudentSessions = await db.testSession.findMany({
      where: {
        profileId: params.studentId,
      },
      include: {
        test: {
          include: {
            analyticalWritingQuestions: {
              include: {
                questionType: true,
              },
            },
          },
        },
      },
    });

    const studentSessions = InitialstudentSessions.filter(
      (studentSession) => studentSession.test.analyticalWritingQuestions.length > 0
    );

    if (!InitialstudentSessions || InitialstudentSessions.length === 0) {
      return NextResponse.error(new Error("studentSessions not found"), {
        status: 404,
      });
    } */

    const testSessions = await prisma.testSession.findMany({
      where: {
        testId: params.testId,
      },
      include: {
        profile: true,
      },
    });

    if (!testSessions) {
      return NextResponse.error(new Error("student not found"), {
        status: 404,
      });
    }

    console.log("student fetched:", testSessions);
    return NextResponse.json({ testSessions });
  } catch (error) {
    console.error("Error fetching testSessions:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
