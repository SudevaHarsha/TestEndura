"use client"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const CreateQuestionForm = ({ questionTypes, tests, question }) => {
/*   const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
 */  const editor = useRef(null);
  const ref = useRef(null);
  const [urls, setUrls] = useState([]);
  const subjects = ['Algebra', 'Verbal']
  const [formData, setFormData] = useState({
    testId: '',
    typeId: '',
    questionText: '',
    prompt: '',
    numberOfOptions: 0,
    options: [],
    correctAnswer: [],
    description: '',
    highlighted: false,
    blankType: '',
    select: false,
    image: false,
    section: '',
    numberOfBlanks: 0, // New state for number of blanks
    blankOptions: [],
    paragraph: '',
    highlightedSentence: '',
    correctSentence: '',
    Quantity1: '',
    Quantity2: '',
    ImageUrl: [],
    numerator: 0,
    denominator: 0,
    units: '',
    correctNumeric: 0,
    noOfImages: 0,
    optionType: '',
    marks: 0,
    question: '',
    subject: '',
  });
  const { edited } = useCurrentQuestion();

  useEffect(() => {
    if (edited && question) {
      setUrls([question?.ImageUrl1, question?.ImageUrl2])
      setFormData({
        testId: question.testId || '',
        typeId: question.typeId || '',
        questionText: question?.questionText || '',
        question: question?.question || '',
        prompt: question?.prompt || '',
        numberOfOptions: question?.options?.length || 0,
        options: question.options || [],
        correctAnswer: question?.correctAnswer || [],
        description: question?.description || '',
        highlighted: question?.highlighted || false,
        blankType: question?.blankType || '',
        select: question?.select || false,
        image: question?.image || false,
        section: question.section || '',
        numberOfBlanks: question?.blankOptions?.length / 3 || 0, // New state for number of blanks
        blankOptions: question?.blankOptions || [],
        paragraph: question.paragraph || '',
        highlightedSentence: question.highlightedSentence || '',
        correctSentence: question.correctSentence || '',
        Quantity1: question.Quantity1 || '',
        Quantity2: question.Quantity2 || '',
        numerator: question.numerator || 0,
        denominator: question.denominator || 0,
        units: question.units || '',
        correctNumeric: question.correctNumeric || 0,
        marks: question.marks || 0,
        optionType: question?.optionType || '',
        ImageUrl: [question?.ImageUrl1, question?.ImageUrl2] || [],
      });
    }
  }, [question, edited])

  /*   const [questionTypes, setQuestionTypes] = useState([]);
  
    useEffect(() => {
      fetchQuestionTypes();
    }, []);
  
    const fetchQuestionTypes = async () => {
      try {
        const response = await axios.get('/api/question-type');
        console.log(response);
        setQuestionTypes(response);
      } catch (error) {
        console.error('Error fetching question types:', error);
      }
    }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. get reference to the input element
    const input = ref.current;

    // 3. build form data
    const formData = new FormData();
    const files = Array.from(input.files ?? []);
    for (const file of files) {
      formData.append(file.name, file);
    }

    // 4. use axios to send the FormData

    await axios.post("/api/upload", formData);
    setUrls(files.map((file) => `/api/uploads/${file.name}`));
    setFormData((prevFormData) => ({
      ...prevFormData,
      ImageUrl: [...prevFormData.ImageUrl, ...files.map((file) => `/api/uploads/${file.name}`)],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' || type === 'radio' ? (type === 'checkbox' ? checked : value === 'true') : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const contentFieldChanaged = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      'question': data,
    }));
  }


  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      options: updatedOptions,
    }));
  };

  const handleNumberOfBlanksChange = (e) => {
    const numberOfBlanks = parseInt(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberOfBlanks,
      blankOptions: Array.from({ length: numberOfBlanks }, () => ''), // Reset blank options array
    }));
  };

  // Function to handle change in blank option
  const handleBlankOptionChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedBlankOptions = [...prevFormData.blankOptions];
      updatedBlankOptions[index] = value;
      return {
        ...prevFormData,
        blankOptions: updatedBlankOptions,
      };
    });
  };

  // Function to render blank option inputs
  const renderBlankOptionsInputs = () => {
    return Array.from({ length: formData.numberOfBlanks }).map((_, blankIndex) => (
      <div key={blankIndex} className="mb-4">
        Blank {blankIndex + 1} Options:
        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, optionIndex) => (
            <div key={optionIndex} className="mb-4">
              <input
                type="text"
                value={formData.blankOptions[blankIndex * 3 + optionIndex] || ''}
                onChange={(e) => handleBlankOptionChange(e, blankIndex * 3 + optionIndex)}
                className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              />
              <label className="block mt-2">
                <input
                  type="checkbox"
                  name={`correctOptions[${blankIndex}][${optionIndex}]`}
                  checked={formData.correctAnswer.includes(blankIndex * 3 + optionIndex)}
                  onChange={(e) => handleCorrectBlankOptionChange(e, blankIndex, optionIndex)}
                  className="mr-2"
                />
                Correct Option
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const handleCorrectOptionChange = (e, index) => {
    const { checked } = e.target;
    setFormData((prevFormData) => {
      const updatedcorrectAnswer = checked
        ? [...prevFormData.correctAnswer, index]
        : prevFormData.correctAnswer.filter((optionIndex) => optionIndex !== index);
      return {
        ...prevFormData,
        correctAnswer: updatedcorrectAnswer,
      };
    });
  };

  const handleCorrectBlankOptionChange = (e, blankIndex, optionIndex) => {
    const { checked } = e.target;
    setFormData((prevFormData) => {
      const updatedCorrectAnswers = [...prevFormData.correctAnswer];
      const optionPosition = blankIndex * 3 + optionIndex;
      if (checked) {
        updatedCorrectAnswers.push(optionPosition);
      } else {
        const indexToRemove = updatedCorrectAnswers.indexOf(optionPosition);
        if (indexToRemove !== -1) {
          updatedCorrectAnswers.splice(indexToRemove, 1);
        }
      }
      return {
        ...prevFormData,
        correctAnswer: updatedCorrectAnswers,
      };
    });
  };

  const handleCreateQuestion = async () => {
    try {
      // Send form data to backend for question creation
      console.log(formData);

      if (edited && question) {
        const response = axios.patch(`/api/questions/${question.id}/${question.typeId}`, { ...formData });
        console.log("Question edited successfully: ", (await response).data.Question);
        return
      }
      const response = await axios.post('/api/questions', { ...formData });
      console.log('Question created successfully:', response.data);
      // Reset form after successful creation
      setFormData({
        testId: '',
        typeId: '',
        questionText: '',
        prompt: '',
        numberOfOptions: 0,
        options: [],
        correctAnswer: [],
        description: '',
        highlighted: false,
        blankType: '',
        select: false,
        image: false,
        section: '',
        numberOfBlanks: 0, // New state for number of blanks
        blankOptions: [],
        paragraph: '',
        highlightedSentence: '',
        correctSentence: '',
        Quantity2: '',
        Quantity1: '',
        ImageUrl: [],
        numerator: 0,
        denominator: 0,
        units: '',
        correctNumeric: 0,
        noOfImages: 0,
        optionType: '',
        marks: 0,
        question: '',
        subject: '',
      });
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div className="mx-auto mt-8 p-4 bg-white shadow-md rounded-sm w-full">
      <h2 className="text-2xl font-bold mb-4">{edited ? "Edit" : "Create New"} Question</h2>
      <label className="block mb-4">
        Test:
        <select
          name="testId"
          value={formData.testId}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Test</option>
          {tests && tests?.map((test) => (
            <option key={test.id} value={test.id}>
              {test.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Section:
        <select
          name="section"
          value={formData.section}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Section</option>
          {formData.testId &&
            tests
              .find((test) => test.id === formData.testId)
              ?.sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
        </select>
      </label>

      <label className="block mb-4">
        Question Type:
        <select
          name="typeId"
          value={formData.typeId}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Question Type</option>
          {questionTypes && questionTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Subject:
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Subject</option>
          {subjects && subjects?.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Reading Comprehension' && (
        <label className="block mb-4">
          Paragraph:
          <textarea
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      )}

      <label className="block mb-4">
        Question Text:
        <input
          type="text"
          name="questionText"
          value={formData.questionText}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>

      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'DataInterpretation' && (
        <label className="block mb-4">
          Question:
          <JoditEditor
            ref={editor}
            value={formData.question}
            onChange={(newContent) => contentFieldChanaged(newContent)}
          />
        </label>
      )}
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'MultipleAnswerQuestion' && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Blank Type:</label>
          <select
            name="blankType"
            value={formData.blankType}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Blank Type</option>
            <option value="normal">Normal</option>
            <option value="numeric">Numeric</option>
            <option value="numeric units">Numeric Units</option>
            <option value="fraction">Fraction</option>
          </select>
        </div>
      )}
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'MultipleAnswerQuestion' && formData.blankType === 'normal' && (
        <>
          <label className="block mb-4">
            Number of Blanks:
            <input
              type="number"
              name="numberOfBlanks"
              value={formData.numberOfBlanks}
              onChange={handleNumberOfBlanksChange}
              className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          {/* Render blank options inputs */}
          {renderBlankOptionsInputs()}
        </>
      )}
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'DataInterpretation' && (
        <>
          <label className="block mb-2 font-bold">Option Type:</label>
          <select
            name="optionType"
            value={formData.optionType}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Blank Type</option>
            <option value="normal">Normal</option>
            <option value="numeric">Numeric</option>
            <option value="numeric units">Numeric Units</option>
            <option value="fraction">Fraction</option>
          </select>
        </>
      )}
      {!formData.select && questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type != 'AnalyticalWriting' && questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type != 'MultipleAnswerQuestion' && (formData.optionType === '' ? true : formData?.optionType === 'normal') && <label className="block mb-4">
        Number of Options:
        <input
          type="number"
          name="numberOfOptions"
          value={formData.numberOfOptions}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>}
      {(!formData.blankType === "numeric units" && !formData.blankType === "numeric") || formData.select && <label className="block mb-4">
        Correct Answer:
        <input
          type="text"
          name="correctSentence"
          value={formData.correctSentence}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>}
      {/* {Array.from({ length: formData.numberOfOptions }).map((_, index) => (
        <div key={index} className="mb-4">
          Option {index + 1}:
          <input
            type="text"
            value={formData.options[index] || ''}
            onChange={(e) => handleOptionChange(e, index)}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ))} */}
      {!formData.select && Array.from({ length: formData.numberOfOptions }).map((_, index) => (
        <div key={index} className="mb-4">
          Option {index + 1}:
          <input
            type="text"
            value={formData.options[index] || ''}
            onChange={(e) => handleOptionChange(e, index)}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label className="block mt-2">
            <input
              type="checkbox"
              name={`correctOptions[${index}]`}
              checked={formData.correctAnswer.includes(index)}
              onChange={(e) => handleCorrectOptionChange(e, index)}
              className="mr-2"
            />
            Correct Option
          </label>
        </div>
      ))}

      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Reading Comprehension' && (
        <>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Highlighted:</label>
            <input
              type="checkbox"
              name="highlighted"
              checked={formData.highlighted}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Select:</label>
            <input
              type="radio"
              name="select"
              value={true}
              checked={formData.select === true}
              onChange={handleChange}
            />{' '}
            Yes
            <input
              type="radio"
              name="select"
              value={false}
              checked={formData.select === false}
              onChange={handleChange}
            />{' '}
            No
          </div>
        </>
      )}
      {formData.highlighted && (
        <label className="block mb-4">
          Sentence to Highlight:
          <input
            type="text"
            name="highlightedSentence"
            value={formData.highlightedSentence}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      )}
      {(questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'MCQ' || questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Quantitative' || questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'DataInterpretation') && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Image:</label>
          <input
            type="checkbox"
            name="image"
            checked={formData.image}
            onChange={handleChange}
          />
        </div>
      )}
      {
        formData.image && <>
          <form onSubmit={handleSubmit}>
            <input type="file" name="files" ref={ref} multiple />
            <button
              type="submit"
              className="px-2 py-1 rounded bg-violet-50 text-violet-500"
            >
              Upload
            </button>
          </form>
          {/* display uploaded images */}
          <div className="relative">{console.log(urls)}
            {
              urls.map((url) => {
                return <div key={url}>{url}</div>
              })}
          </div>
        </>
      }
      {/* {
        formData.image && questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Quantitative' && <>
        <form onSubmit={handleSubmit}>
          <input type="file" name="files" ref={ref} multiple />
          <button
            type="submit"
            className="px-2 py-1 rounded bg-violet-50 text-violet-500"
          >
            Upload
          </button>
        </form>
        <div className="relative aspect-video max-h-[400px]">
          {urls.map((url) => {
            console.log(url);
            return (
              <Image
                key={url}
                src={url}
                alt={url}
                className="object-cover"
                fill
              />
            );
          })}
        </div>
      </>
      } */}
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Quantitative' && (
        <>
          <label className="block mb-4">
            Quantity 1:
            <input
              type="text"
              name="Quantity1"
              value={formData.Quantity1}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block mb-4">
            Quantity 2:
            <input
              type="text"
              name="Quantity2"
              value={formData.Quantity2}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </>
      )}
      {/* <label className="block mb-4">
        Correct Option:
        <input
          type="text"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label> */}
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'AnalyticalWriting' && (
        <label className="block mb-4">
          Prompt:
          <textarea
            name="prompt" // Corrected to lowercase "prompt"
            value={formData.prompt}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      )}
      {(formData.blankType === 'fraction' || formData.optionType === 'fraction') && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Correct Answer (Numerator):</label>
          <input
            type="number"
            name="numerator"
            value={formData.numerator}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}
      {(formData.blankType === 'fraction' || formData.optionType === 'fraction') && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Correct Answer (Denominator):</label>
          <input
            type="number"
            name="denominator"
            value={formData.denominator}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}
      {(formData.blankType === 'numeric' || formData.blankType === "numeric units" || formData.optionType === 'numeric' || formData.optionType === "numeric units") && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Correct Answer :</label>
          <input
            type="number"
            name="correctNumeric"
            value={formData.correctNumeric}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}
      {(formData.blankType === 'numeric units' || formData.optionType === 'numeric units') && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">units :</label>
          <input
            type="text"
            name="units"
            value={formData.units}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}
      {/* {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'DataInterpretation' && (
        <label className="block mb-4">
          Number of Images:
          <input
            type="number"
            name="noOfImages"
            value={formData.noOfImages}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      )} */}

      {/* {formData.noOfImages > 0 && Array.from({ length: formData.noOfImages }, () => 0).map((image, index) => (
        <div key={index}>
          <form onSubmit={handleSubmit}>
            <input type="file" name="files" ref={ref} multiple />
            <button
              type="submit"
              className="px-2 py-1 rounded bg-violet-50 text-violet-500"
            >
              Upload
            </button>
          </form>
          <div className="relative aspect-video max-h-[400px]">
            {urls.map((url) => {
              console.log(url);
              return <Image
                key={url}
                src={url}
                alt={url}
                className="object-cover"
                fill
              />
            })}
          </div>
        </div>
      ))} */}

      <label className="block mb-4">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>
      <label className="block mb-4">
        Marks:
        <input
          type="number"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>
      <button
        onClick={handleCreateQuestion}
        className="block mx-auto py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {edited ? "Edit" : "Create"} Question
      </button>
    </div>
  );
};

export default CreateQuestionForm
