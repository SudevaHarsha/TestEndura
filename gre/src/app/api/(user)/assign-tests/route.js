import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
    const {
        assignedTests,
        selectedUsers
      } = await req.json();
    
      try {
        // Update assignedTests for all selectedUsers
        console.log(assignedTests,selectedUsers);
        const updatedProfiles = await prisma.profile.updateMany({
          where: {
            id: {
              in: selectedUsers
            }
          },
          data: {
            assignedTests: assignedTests
          }
        });

    console.log(`${updatedProfiles.count} profiles updated successfully`);

    return NextResponse.json({ message: "Profiles updated successfully" });
} catch (error) {
  console.error("Error updating profiles:", error);
  return NextResponse.error(error, { status: 500 });
}
}
