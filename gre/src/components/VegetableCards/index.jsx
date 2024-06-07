"use client";

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { FaApple, FaCarrot, FaPepperHot, FaMushroom, FaLeaf, FaEggplant } from 'react-icons/fa'; // Import vegetable icons

const TestCard = dynamic(() => import('./TestCard'));

const VegetableCards = ({ tests, handleClick }) => {

  const memoizedTests = useMemo(() => tests, [tests]);

  return (
    <div className="container sm:mx-auto mt-4 sm:py-8 py-0 px-0 grid sm:grid-cols-3 grid-cols-1 gap-4">
      {memoizedTests?.map((test, index) => (
        <TestCard key={index} test={test} index={index} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default VegetableCards;
