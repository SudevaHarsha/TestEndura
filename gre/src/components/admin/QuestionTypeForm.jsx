"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useToast } from '@/providers/ToastContext';

const QuestionTypeForm = ({ typeId }) => {

  const [type, setType] = useState('');
  const { edited } = useCurrentQuestion();
  const { showToast } = useToast();

  const handleChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    const fetchQuestionType = async () => {
      if (edited) {
        const type = await axios.get(`/api/question-type/${typeId}`);
        setType(type.data.type.type);
      }
    }
    if(edited) {
      fetchQuestionType();
    }
  }, [])

  const handleCreateQuestionType = async () => {
    try {

      if (edited) {
        const response = await axios.patch(`/api/question-type/${typeId}`, { type });
        showToast('Question type updated sucessfylly', 'success');
        return
      }

      const response = await axios.post('/api/question-type', { type });
      setType(''); // Reset type after successful creation
      // Handle success
      showToast("Question type created sucessfully", 'success')
    } catch (error) {
      console.error('Error creating question type:', error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto mt-8 my-auto">
      <h1 className="text-3xl font-bold mb-4">Create Question Type</h1>
      {/* <select
        name="type"
        value={type}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
      >
        <option value="">Select Question Type</option>
        <option value="Analytical Writing">Analytical Writing</option>
        <option value="Reading Comprehension">Reading Comprehension</option>
        <option value="MCQ">MCQ</option>
        <option value="Quantitative">Quantitative</option>
        <option value="Blank">Blank</option>
      </select>
 */}
      <input type='text' name='type' value={type} onChange={handleChange} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" />
      <button
        onClick={handleCreateQuestionType}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        {edited ? "Edit" : "Create"} Question Type
      </button>
    </div>
  );
};

export default QuestionTypeForm;
