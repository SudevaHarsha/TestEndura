import QuestionForm from '@/components/admin/QuestionForm';
import { db } from '@/lib/db';
import React from 'react'

const CreateQuestionPage = async() => {

  const allQuestionTypes = await db.questionType.findMany();
  const allTests= await db.test.findMany();
    
/*   console.log(allQuestionTypes); */
  return <QuestionForm questionTypes={allQuestionTypes} tests={allTests} />
};

export default CreateQuestionPage;
