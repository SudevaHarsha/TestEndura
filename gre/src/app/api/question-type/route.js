// pages/api/questionTypes.js

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Extract data from request body
    const { type } =
      await req.json();
    console.log(type);

    // Create new question type
    const newQuestionType = await db.QuestionType.create({
      data: {
        type: type,
      },
    });

    console.log(newQuestionType);

    // Return success response
    return new NextResponse(201,newQuestionType);
  } catch (error) {
    // Return error response
    console.log(error);
    return new NextResponse(500, { error: "Could not create question type" });
  }
}

export async function GET(req) {
  try {
    // Retrieve all question types from the database
    const allQuestionTypes = await db.questionType.findMany();
    
    // Return the question types as a JSON response
    return new NextResponse(200, {data:allQuestionTypes});
  } catch (error) {
    // Return error response if there's an issue fetching question types
    return new NextResponse(500, { error: "Could not fetch question types" });
  }
}
