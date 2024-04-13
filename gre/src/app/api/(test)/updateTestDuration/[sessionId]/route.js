// pages/api/updateTestSession/[sessionId].js

import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function PUT(req, { params }) {    
    try {
        // Fetch the test session from the database
        const {currentQuestion,currentSection,finished,sessionAnswers} = await req.json();
        const testSession = await db.testSession.findUnique({
            where: {
                id: params.sessionId,
            },
        });

        if (!testSession) {
            return new NextResponse(404, { error: 'Test session not found' });
        }

        const currentDate = new Date();
        // Update the sectionEndTimes
        const sectionEndTimes = [...testSession.sectionEndTimes, currentDate.toString()];
        const updatedTestSession = await db.testSession.update({
            where: {
                id: testSession.id,
            },
            data: {
                sectionEndTimes: sectionEndTimes,
                currentQuestion:currentQuestion,
                currentSection:currentSection,
                finished:false,
                sessionAnswers:sessionAnswers
            },
        });

        console.log(updatedTestSession,currentQuestion,currentSection);

        return new NextResponse(200, { message: 'Test session updated successfully', testSession: updatedTestSession });
    } catch (error) {
        return new NextResponse(500, { error: 'Internal server error', details: error.message });
    }
}
