import { db } from './db';

const testQuestions = async (sessionId) => {
    console.log(sessionId);
    const testSession = await db.testSession.findUnique({
        where: {
          id: sessionId,
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
        
    const questions = [
      ...testSession.test.Questions,
      ...testSession.test.analyticalWritingQuestions,
      ...testSession.test.quantitativeQuestions,
      ...testSession.test.readingComprehensionQuestions,
      ...testSession.test.multipleAnswerQuestions,
      ...testSession.test.multipleChoiceQuestions,
    ];
    
    const sections = testSession.test.sections.reduce((acc, section) => {
      const sectionQuestions = questions.filter(
        (question) => question.section === section
      );
      acc[section] = sectionQuestions;
      return acc;
    }, {});

    return sections
}

export default testQuestions
