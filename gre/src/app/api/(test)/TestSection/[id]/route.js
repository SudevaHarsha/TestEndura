import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function GET(req, { params }) {
    try {
      const section = await db.testSection.findUnique({
        where: {
          id: params.id,
        },
      });
      console.log("backend", section);
      return NextResponse.json({ section });
    } catch (error) {
      console.error("Error getting test section:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  
  export async function PATCH(req, { params }) {
    try {
      const { name,categoryId } = await req.json();
      const section = await db.testSection.update({
        where: {
          id: params.id,
        },
        data: {
          name,
          categoryId
        },
      });
      console.log("backendc", section);
      return NextResponse.json({ section });
    } catch (error) {
      console.error("Error getting test:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  
  export async function DELETE(req, { params }) {
    try {
      const section = await db.testSection.delete({
        where: {
          id: params.id,
        },
      });
      console.log("backendc", section);
      return NextResponse.json({ section });
    } catch (error) {
      console.error("Error deleting test:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  