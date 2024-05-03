"use client"
// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaApple, FaCarrot, FaPepperHot, FaMushroom, FaLeaf, FaEggplant } from 'react-icons/fa'; // Import vegetable icons
import TestCard from '../VegetableCards/TestCard';

const TestCards = ({tests}) => {

/*   const [tests,setTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tests = await axios.get("/api/find-test");
        setTests(tests.data.tests)

      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []); */

  console.log(tests);

  return (
    <div className="container sm:mx-auto mt-4 sm:py-8 py-0 px-0 grid sm:grid-cols-3 grid-cols-1 gap-4">
      {tests?.map((test, index) => (
        <TestCard key={index} test={test} index={index} />
      ))}
    </div>
  );
};

export default TestCards;
