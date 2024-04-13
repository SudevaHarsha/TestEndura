import SectionWiseQuestions from '@/components/Questions/SectionWiseQuestions'
import { db } from '@/lib/db'
import React from 'react'

const page = async(sessionId) => {
  console.log(sessionId);
  const testSession = await db.testSession.findFirst({
    where: {
      id: sessionId.params.sessionId,
    },
    include: {
      test: {
        include: {
          Questions: {
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
          dataInterpretationQuestions: {
            include: {
              questionType: true,
            },
          },
        },
      },
    },
  });

  console.log(testSession,'hi');

  const questions = [
    ...testSession.test.Questions,
    ...testSession.test.quantitativeQuestions,
    ...testSession.test.readingComprehensionQuestions,
    ...testSession.test.multipleAnswerQuestions,
    ...testSession.test.multipleChoiceQuestions,
    ...testSession.test.dataInterpretationQuestions,
  ];

  const sections = testSession.test.sections.reduce((acc, section) => {
    const sectionQuestions = questions.filter(
      (question) => question.section === section
    );
    acc[section] = sectionQuestions;
    return acc;
  }, {});

  return (
    <SectionWiseQuestions test={testSession.test} testSession={testSession} questions={sections} />
  )
}

export default page