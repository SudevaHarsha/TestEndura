'use client'

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const CreateTestForm = ({ test }) => {

  const [state, setState] = useState('test');
  const editor = useRef(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfSections, setNumberOfSections] = useState(0);
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [sections, setSections] = useState([]);
  const [durations, setDurations] = useState([]);
  const [sectionId, setSectionId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [overallInstructions, setOverallInstructions] = useState();

  const { edited } = useCurrentQuestion();

  const [testSections, setTestSections] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tests = await axios.get(`/api/categoryWiseSections/${categoryId}`);
        setTestSections(tests.data.testSections)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    categoryId && fetchData();
  }, [categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tests = await axios.get("/api/TestCategory");
        setCategories(tests.data.categories)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (test && edited) {
      setName(test?.name);
      setDescription(test?.description);
      setDurations(test?.sectionDuration);
      setNumberOfSections(test?.sections?.length);
      setSections(test?.sections);
      setNumberOfAttempts(test?.totalAttempts)
    }
  }, [edited, test])

  const handleSectionChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = value;
    setSections(updatedSections);
  };

  const handleDurationChange = (index, value) => {
    const updatedDurations = [...durations];
    updatedDurations[index] = value;
    setDurations(updatedDurations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edited && test) {
        const response = axios.patch(`/api/test/${test.id}`, {
          name: name,
          description: description,
          numberOfSections: numberOfSections,
          sections: sections,
          durations: durations,
          totalAttempts: numberOfAttempts
        });
        console.log("Question edited successfully: ", (await response).data.updatedTest);
        return
      }
      const response = await axios.post('/api/createTest', {
        name: name,
        description: description,
        numberOfSections: numberOfSections,
        sections: sections,
        durations: durations,
        sectionId: sectionId,
        testSectionId: sectionId,
        overallInstructions: overallInstructions
      });
      console.log('Test created:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating test:', error.response.data.error);
      // Handle error
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      /* if (edited && test) {
        const response = axios.patch(`/api/test/${test.id}`, {
          name: name,
        });
        console.log("Question edited successfully: ", (await response).data.updatedTest);
        return
      } */
      console.log('category create');
      const response = await axios.post('/api/TestCategory', {
        name: name,
      });
      console.log('Test Ctegory created:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating test:', error.response.data.error);
      // Handle error
    }
  };

  const handleSubmitSection = async (e) => {
    e.preventDefault();
    try {
      /* if (edited && test) {
        const response = axios.patch(`/api/test/${test.id}`, {
          name: name,
        });
        console.log("Question edited successfully: ", (await response).data.updatedTest);
        return
      } */
      console.log('category create');
      const response = await axios.post('/api/TestSection', {
        name: name,
        categoryId: categoryId
      });
      console.log('Test Ctegory created:', response.data.newSection);
      // Handle success
    } catch (error) {
      console.error('Error creating test:', error.response.data.error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' || type === 'radio' ? (type === 'checkbox' ? checked : value === 'true') : value;
    setSectionId(newValue);
  };

  const contentFieldChanaged = (data) => {
    setOverallInstructions(data);
  }

  const sectionNames = ['AnalyticalWriting', 'VerbalReasoning1', 'VerbalReasoning2', 'QuantativeReasoning1', 'QuantativeReasoning2']

  return (
    <div className='w-full h-full flex items-center'>
      <div className="w-[50%] mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className='flex justify-between items-center mb-5 mt-4'>
          <div className="text center">
            <Button className={`h-8 w-15 text-sm/4 rounded-[8px] text-black bg-white hover:bg-blue-600 hover:text-white border border-blue-600 ${state === 'category' && `bg-blue-600 text-white `} px-3 my-auto text-center`} onClick={() => { setState('category') }}>Create New Category</Button>
          </div>
          <div className="text center">
            <Button className={`h-8 w-15 text-sm /4 rounded-[8px] text-black bg-white hover:bg-blue-600 hover:text-white border border-blue-600 ${state === 'section' && `bg-blue-600  text-white`} px-3 my-auto text-center`} onClick={() => { setState('section') }}>Create New Section</Button>
          </div>
          <div className="text center">
            <Button className={`h-8 w-15 text-sm/4 rounded-[8px] text-black bg-white hover:bg-blue-600 hover:text-white border border-blue-600 ${state === 'test' && `bg-blue-600 text-white`} px-3 my-auto text-center`} onClick={() => { setState('test') }}>Create New Test</Button>
          </div>
        </div>
        {state === 'category' && <>
          <h2 className="text-2xl font-semibold mb-4">Create New Test Category</h2>
          <form onSubmit={handleSubmitCategory} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200">{edited ? "Edit" : "Create"} Category</button>
          </form>
        </>
        }
        {state === 'section' && <>
          <h2 className="text-2xl font-semibold mb-4">Create New Test Category</h2>
          <form onSubmit={handleSubmitSection} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-gray-700">
                Category:
                <select
                  name="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Category</option>
                  {categories && categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200">{edited ? "Edit" : "Create"} Category</button>
          </form>
        </>
        }
        {state === 'test' && <>
          <h2 className="text-2xl font-semibold mb-4">Create New Test</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-gray-700">
                Category:
                <select
                  name="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Category</option>
                  {categories && categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="sectionId" className="block text-gray-700">
                Sub Test:
                <select
                  name="sectionId"
                  value={sectionId}
                  onChange={handleChange}
                  className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Test</option>
                  {testSections && testSections?.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">Description:</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <div>
              <label htmlFor="numberOfAttempts" className="block text-gray-700">Number of Attempts:</label>
              <input type="number" id="numberOfAttempts" value={numberOfAttempts} onChange={(e) => setNumberOfAttempts(parseInt(e.target.value))} min="0" className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="numberOfSections" className="block text-gray-700">Number of Sections:</label>
              <input type="number" id="numberOfSections" value={numberOfSections} onChange={(e) => setNumberOfSections(parseInt(e.target.value))} min="0" className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            {Array.from({ length: numberOfSections }).map((_, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-grow">
                  <label htmlFor={`section-${index}`} className="block text-gray-700">{`Section ${index + 1}:`}</label>
                  {/* <input type="text" id={`section-${index}`} value={sections[index] || ''} onChange={(e) => handleSectionChange(index, e.target.value)} className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" /> */}
                  <select
                    name="testId"
                    value={sections[index] || ''}
                    onChange={(e) => handleSectionChange(index, e.target.value)}
                    className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Test</option>
                    {sectionNames && sectionNames?.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`duration-${index}`} className="block text-gray-700">{`Duration:`}</label>
                  <input type="text" id={`duration-${index}`} value={durations[index] || ''} onChange={(e) => handleDurationChange(index, e.target.value)} className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            ))
            }
            <label className="block mb-4">
              Question:
              <JoditEditor
                ref={editor}
                value={overallInstructions}
                onChange={(newContent) => contentFieldChanaged(newContent)}
              />
            </label>
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200">{edited ? "Edit" : "Create"} Test</button>
          </form >
        </>
        }
      </div >
    </div >
  );
};

export default CreateTestForm;
