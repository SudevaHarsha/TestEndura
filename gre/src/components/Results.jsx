'use client'

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from "axios";
import AllQuestions from './AllQuestions';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';

import MCQ from './Questions/MCQ';
import OpenEndedQuestions from './Questions/OpenEndedQuestions';
import QuantitativeQuestions from './Questions/QuantitativeQuestions';
import ReadingCompehension from './Questions/ReadingComprehension';
import AnalyticalWriting from './Questions/AnalyticalWriting';
import { Button } from './ui/button';
import DataInterpretationQuestions from './Questions/DataInterpretationQuestions';
import ScoreCard from './ScoreCard';
import NoQuestion from './Questions/NoQuestio';
import { FaBackward, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ResultsPage = () => {
  // Sample data for available tests
  const [resultSessions, setResultSessions] = useState([]);
  const [currentResultQuestion, setCurrentResultQuestion] = useState(0);
  const [testId, setTestId] = useState(null);
  const [section, setSection] = useState('');
  const [tests, setTests] = useState([]);
  const [resultCard, setResultCard] = useState(false);
  const [resultCardData, setResultCardData] = useState([]);
  const [viewWrongAnswers, setViewWrongAnswers] = useState(false);
  const [wrongQuestion, setWrongQuestion] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/finished-tests");
        const tests = await axios.get("/api/find-test");
        setResultSessions(response.data.results);
        setTests(tests.data.tests)

        console.log("Result Session", response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);


  const availableTests = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
    { id: 3, name: 'Test 3' },
    // Add more test data as needed
  ];

  // Sample data for default test results
  const defaultResults = [
    { id: 1, testName: 'Test 1', result: 'Your result for Test 1' },
    { id: 2, testName: 'Test 2', result: 'Your result for Test 2' },
    // Add more default result data as needed
  ];

  // State to track the selected test result for detailed view
  const [selectedResult, setSelectedResult] = useState(null);

  const { currentSection, currentQuestion, setCurrentQuestion, setCurrentSection, setResult, result, setPreviousLength } = useCurrentQuestion();
  const { setCurrentSession, currentSession } = useCurrentSession();

  /* const [questions, setQuestions] = useState([]); */

  /*  useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(`/api/session/${selectedResult.id}`);
 
         setQuestions(response.data.AllQuestions);
 
         console.log("Dashboard", response.data.AllQuestions);
       } catch (error) {
         console.error("Error fetching questions:", error);
       }
     };
 
     fetchData();
   }, [selectedResult]); */

  /* useEffect(() => {
    if (selectedResult) {
        const questions = [...selectedResult.test.Questions,...selectedResult.test.analyticalWritingQuestions,...selectedResult.test.quantitativeQuestions,...selectedResult.test.readingComprehensionQuestions,...selectedResult.test.multipleAnswerQuestions,...selectedResult.test.multipleChoiceQuestions];
 
  const sections = selectedResult.test.sections.reduce((acc, section) => {
    const sectionQuestions = questions.filter(
      (question) => question.section === section
    );
    acc[section] = sectionQuestions;
    return acc;
  }, {});
 
  console.log(sections);
  
      setQuestions(sections);
    }
  }, [selectedResult]); */

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setCurrentSession(result);
    setCurrentSection(result.test.sections[0])
    setResult(true);
  }

  const handleResultCardClick = async (id) => {
    const response = await axios.get(`/api/test-score-card/${id}`);

    setResultCardData(response.data.response);
    console.log(response.data.response);
    setResultCard(true);
  }


  let sections = [];

  const getResultQuestions = () => {
    if (selectedResult) {
      const questions = [
        ...selectedResult.test.Questions,
        ...selectedResult.test.analyticalWritingQuestions,
        ...selectedResult.test.quantitativeQuestions,
        ...selectedResult.test.readingComprehensionQuestions,
        ...selectedResult.test.multipleAnswerQuestions,
        ...selectedResult.test.multipleChoiceQuestions,
        ...selectedResult.test.dataInterpretationQuestions,
      ];

      sections = selectedResult.test.sections.reduce((acc, section) => {
        const sectionQuestions = questions.filter(
          (question) => question.section === section
        );
        acc[section] = sectionQuestions;
        return acc;
      }, {});

      const AllQuestions = selectedResult.test.sections.reduce((acc, section) => {
        return acc.concat([...sections[section]])
      }, []);

      return AllQuestions
    }
  }

  const fetchedQuestions = getResultQuestions();

  console.log(fetchedQuestions);
  let index = 0;
  const previousLengths = () => {
    const keysArray = Object.keys(sections); // Convert keys to array
    index = keysArray.indexOf(section);
    const valuesArray = Object.values(sections);

    const lengths = valuesArray.map((innerArray) => innerArray.length);

    console.log(lengths);

    const previousSectionsLengths = lengths.slice(0, index);
    return previousSectionsLengths.reduce((sum, current) => sum + current, 0);
  }

  const previousLength = previousLengths();

  const Testquestions = fetchedQuestions && fetchedQuestions.slice(previousLength, previousLength + sections[section].length);
  const questions = viewWrongAnswers ? Testquestions?.map((ques) => {
    const index = fetchedQuestions.indexOf(ques);
    const results = selectedResult.results;
    if (results[index] === false) {
      return ques
    } else {
      return {}
    }
  }) : Testquestions;

  console.log(questions);

  selectedResult && console.log(currentResultQuestion < questions.length - 1);

  const NextQuestion = () => {
    console.log(section, selectedResult.test.sections[selectedResult.test.sections.length - 1]);
    if (currentQuestion === questions.length - 1 && section === selectedResult.test.sections[selectedResult.test.sections.length - 1]) {
      console.log('last section')
      setSection(selectedResult.test.sections[0])
      setCurrentSection(selectedResult.test.sections[0]);
      setPreviousLength(0);
      setCurrentQuestion(0);
      setCurrentResultQuestion(0);
      return
    }
    if (currentQuestion === questions.length - 1) {
      console.log('if entered')
      setCurrentSection(section);
      setPreviousLength(previousLength + questions.length);
      setCurrentResultQuestion(previousLength + questions.length + 0);
      setCurrentQuestion(0);

      const keys = Object.keys(sections);
      setSection(index === keys.length - 1 ? keys[0] : keys[index + 1]);
      setCurrentSection(index === keys.length - 1 ? keys[0] : keys[index + 1]);
    } else {
      console.log("else");
      /* if (viewWrongAnswers) {
        const wrongquestion = questions[wrongQuestion + 1];
        const wrongIndex = fetchedQuestions.indexOf(wrongquestion);
        setWrongQuestion(wrongQuestion + 1);
        setCurrentQuestion(currentQuestion + 1);
        setCurrentResultQuestion(wrongIndex);
        return
      } */
      setCurrentResultQuestion(currentResultQuestion + 1)
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleSectionClick = async (section) => {
    const keysArray = Object.keys(sections); // Convert keys to array
    index = keysArray.indexOf(section);
    const valuesArray = Object.values(sections);

    const lengths = valuesArray.map((innerArray) => innerArray.length);
    const previousSectionsLengths = lengths.slice(0, index);
    const previous = previousSectionsLengths.reduce((sum, current) => sum + current, 0);
    setSection(section);
    setCurrentSection(section);
    setCurrentQuestion(0)
    setPreviousLength(previous)
    setCurrentResultQuestion(previous);
  }

  const time = (isoString) => {
    const isoTimestamp = isoString;
    const date = new Date(isoTimestamp);

    // Extracting date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Extracting time components
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Creating a formatted string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime
  }

  const router = useRouter();

  return <>

    < div className="min-h-screen bg-white " >
      <main className="sm:container sm:mx-auto sm:px-4 sm:py-8 px:0 py:0">
        {/* Available Tests */}
        <div className="sm:flex sm:justify-center sm:mb-6 flex flex-row gap:1 flex-wrap">
          {!resultCard && !selectedResult && tests.map(test => (
            <div key={test.id} className="mx-2">
              <Button className="sm:h-11 h-8 sm:min-w-24 min-w-18 text-white text-base sm:text-md  bg-strong hover:bg-strong/90 px:1 sm:px-3 sm:my-auto text-center mb-1" onClick={() => {
                setSelectedResult(null);
                setCurrentResultQuestion(0);
                setTestId(test.id);
                setSection(test.sections[0])
                setCurrentSection(test.sections[0])
              }}>{test.name}</Button>
            </div>
          ))}
        </div>

        {!resultCard && selectedResult && (
          <div className='flex sm:hidden justify-between items-center px-4'>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:hidden">
              <select
                className="block appearance-none border-2 border-blue-600 bg-white hover:bg-blue-600 hover:text-white text-black transition-all ease-linear font-bold py-1 px-1  text-sm"
                value={section}
                onChange={(e) => handleSectionClick(e.target.value)}
              >
                {selectedResult.test.sections.map((sect) => (
                  <option key={sect} value={sect} className='flex justify-between items-center'>
                    {sect}
                    <div>
                      <FaChevronDown className='text-black' />
                    </div>
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:hidden">
              <select
                className="block appearance-none border-2 border-strong bg-white hover:bg-strong hover:text-white text-black transition-all ease-linear font-bold py-1 px-1  text-sm" onChange={(e) => {
                  setViewWrongAnswers(e.target.value === 'wrongAnswers' ? true : false);
                  setCurrentQuestion(0);
                  setCurrentResultQuestion(0);
                  setPreviousLength(0);
                  setCurrentSection(selectedResult.test.sections[0])
                  setSection(selectedResult.test.sections[0]);
                }}
              >
                <option value='correctAnswers'>ReviewAll</option>
                <option value='wrongAnswers'>Wrong Answers</option>
              </select>
              {/* <div className="pointer-events-none flex items-center justify-center">
                <FaChevronDown className='text-black' />
              </div> */}
            </div>
          </div>)}

        {!resultCard && selectedResult && <div className='flex justify-between items-center '>
          <div className='hidden sm:block'>
            {!resultCard && selectedResult && selectedResult.test.sections.map((sect) => (
              <Button key={sect} className={`mr-4 bg-white hover:bg-blue-600 hover:text-white text-black border-2 border-blue-600 transition-all ease-linear font-bold py-2 px-4 rounded inline-flex items-center ${sect === section && 'bg-blue-600 text-white sm:d-no'}`} onClick={() => handleSectionClick(sect)}>{sect}</Button>
            ))}
          </div>

          <div className='hidden gap-4 sm:flex'>
            <Button className={`mr-4 bg-white hover:bg-strong hover:text-white text-black border-2 border-strong transition-all ease-linear font-bold py-2 px-4 rounded inline-flex items-center ${viewWrongAnswers === true && 'bg-strong text-white'}`} onClick={() => {
              setViewWrongAnswers(true);
              setCurrentQuestion(0);
              setCurrentResultQuestion(0);
              setPreviousLength(0);
              setCurrentSection(selectedResult.test.sections[0])
              setSection(selectedResult.test.sections[0]);
            }}>Review Wrong</Button>
            <Button className={`mr-4 bg-white hover:bg-strong hover:text-white text-black border-2 border-strong transition-all ease-linear font-bold py-2 px-4 rounded inline-flex items-center ${viewWrongAnswers === false && 'bg-strong text-white'}`} onClick={() => {
              setViewWrongAnswers(false);
              setCurrentQuestion(0);
              setCurrentResultQuestion(0);
              setPreviousLength(0);
              setCurrentSection(selectedResult.test.sections[0])
              setSection(selectedResult.test.sections[0]);
            }}>Review All</Button>
          </div>

          <div>
            <Button onClick={() => setSelectedResult(null)} className="h-11 text-white bg-secondary hover:bg-secondary/90 px-3 my-auto text-center"><FaBackward />Go Back</Button>
          </div>
        </div>}

        {/* Default Test Results */}
        {
          !resultCard && !selectedResult && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p:0 w-full">
            {resultSessions.length === 0 ? `No Results Found` :resultSessions.filter(resultSession => resultSession.test.id === testId).map(result => (
              <div key={result.id} className="bg-slate-100 p-6 rounded-lg shadow-md cursor-pointer sm:transition sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-105 sm:hover:shadow-xl sm:mx-0 mx-1">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{result.test.name}</h2>
                <p className="text-gray-600 mb-2">Result ID: {result.id}</p>
                <p className="text-gray-600 mb-2">Score: {result.resultMarks}</p>
                <p className="text-gray-600 mb-2">Date: {time(result.updatedAt)}</p>
                <div className='flex gap-5'>
                  <Button className="bg-slate-400 text-white" onClick={() => handleResultCardClick(result.id)}>Analysis</Button>
                  <Button className="h-11 text-white bg-secondary hover:bg-secondary/90 px-3 my-auto text-center" onClick={() => handleResultClick(result)}>Detailed Results</Button>
                </div>
              </div>
            ))}
          </div>
        }

        {/* Selected Result Detail View */}
        {/* {selectedResult && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Result</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{selectedResult.testName}</h2>
              <p className="text-gray-600">{selectedResult.result}</p>
            </div>
          </div>
        )} */}
        {resultCard && <ScoreCard setResultCard={setResultCard} resultCardData={resultCardData} />}
        {
          selectedResult && questions.map((question, index) => {
            console.log(question, index)
            if (index === currentQuestion) {

              if (Object.keys(question).length === 0) {
                return <NoQuestion key='noQuestion' NextQuestion={NextQuestion} />;
              }

              else {
                if (question.questionType.type === "MCQ") {
                  console.log('MCQ');
                  return <div key={index} className='flex flex-col justify-center items-center'>
                    <MCQ key={index} question={question} NextQuestion={NextQuestion} />
                    <div className="mb-4">
                      <p>Correct Answer: {question?.correctAnswer.join(',')}</p>
                      <p>Your Answer: {currentSession?.sessionAnswers[currentResultQuestion].join(',')}</p>
                    </div>

                    <div>
                      <h1>Description :</h1>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                    </div>
                  </div>;
                } else if (question.questionType.type === "MultipleAnswerQuestion" || question.type === "input" || question.type === "TextCompletion") {
                  return <div key={index} className='flex flex-col justify-center items-center'>
                    <OpenEndedQuestions key={index} question={question} NextQuestion={NextQuestion} />
                    <div className="mb-4">
                      <p>Correct Answer: {question?.correctAnswer.join(',')}</p>
                      <p>Your Answer: {currentSession?.sessionAnswers[currentResultQuestion].join(',')}</p>
                    </div>

                    <div>
                      <h1>Description :</h1>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                    </div>
                  </div>;
                } else if (question.questionType.type === "Quantitative") {
                  return <div key={index}>
                    <QuantitativeQuestions key={index} question={question} NextQuestion={NextQuestion} />
                    <div className="mb-4">
                      <p>Correct Answer: {question?.correctAnswer.join(',')}</p>
                      <p>Your Answer: {currentSession?.sessionAnswers[currentResultQuestion].join(',')}</p>
                    </div>

                    <div>
                      <h1>Description :</h1>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                    </div>
                  </div>;
                } else if (question.questionType.type === "Reading Comprehension") {
                  return <div key={index}>
                    <ReadingCompehension key={index} question={question} NextQuestion={NextQuestion} />
                    <div className="mb-4">
                      <p>Correct Answer: {question?.correctAnswer.join(',')}</p>
                      <p>Your Answer: {currentSession?.sessionAnswers[currentResultQuestion].join(',')}</p>
                    </div>

                    <div>
                      <h1>Description :</h1>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                    </div>
                  </div>;
                } else if (question.questionType.type === "AnalyticalWriting") {
                  return <div key={index}>
                    <AnalyticalWriting key={index} question={question} NextQuestion={NextQuestion} />
                    <div className="mb-4">
                      <p>Correct Answer: {question?.correctAnswer.join(',')}</p>
                      <p>Your Answer: {currentSession?.sessionAnswers[currentResultQuestion].join(',')}</p>
                    </div>

                    <div>
                      <h1>Description :</h1>
                      <p className='ml-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                    </div>
                  </div>;
                } else if (question.questionType.type === "DataInterpretation") {
                  console.log('entered');
                  return <div key={index}>
                    <DataInterpretationQuestions key={index} question={question} NextQuestion={NextQuestion} />
                    <div className="mb-4">
                      <p>Correct Answer: {question?.correctAnswer.join(',')}</p>
                      <p>Your Answer: {currentSession?.sessionAnswers[currentResultQuestion].join(',')}</p>
                    </div>

                    <div>
                      <h1>Description :</h1>
                      <p className='ml-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste doloremque pariatur, aliquam adipisci omnis fugiat blanditiis tempora minus aut odio soluta commodi, velit consequuntur non obcaecati labore natus eligendi ex!</p>
                    </div>
                  </div>;
                }
              }
            }
            return null; // Return null for unsupported question types
          })
        }

      </main >
    </div >
  </>;
};

export default ResultsPage;
