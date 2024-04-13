import { db } from '@/lib/db';
import React from 'react'
import RemainingCards from './remainingCards/index';

const RemainingCardsCaller = async() => {
    const filteredSessions = await db.testSession.findMany({
        where: {
          finished: false
        },
        include: {
          test: {
            include: {
              Questions: {
                include: {
                  questionType: true,
                }
              },
              analyticalWritingQuestions: {
                include: {
                  questionType: true,
                }
              },
              quantitativeQuestions: {
                include: {
                  questionType: true,
                }
              },
              readingComprehensionQuestions: {
                include: {
                  questionType: true,
                }
              },
              multipleAnswerQuestions: {
                include: {
                  questionType: true,
                }
              },
              multipleChoiceQuestions: {
                include: {
                  questionType: true,
                }
              },
            },
          },
        },
      });
      
/*       const testSessions = filteredSessions.filter(session => {
        // Convert duration and endTime to appropriate types if necessary
        const duration = new Date(session.duration);
        const endTime = new Date(session.endTime);
      
        // Compare the duration with endTime
        return duration < endTime;
      }); */

        return <div className='flex items-center justify-center w-full'>
          <RemainingCards filteredSessions={filteredSessions} />
        </div>
}

export default RemainingCardsCaller