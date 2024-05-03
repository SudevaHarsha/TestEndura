"use client"

import React, { useEffect, useRef, useState } from "react";

const SideNavbar = ({ users, setNavState, navState }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize state based on window width
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setIsOpen(false); // Swipe left to close sidebar
    } else if (touchEndX - touchStartX > 50) {
      setIsOpen(true); // Swipe right to open sidebar
    }
  };

  return <>
    <div
      className={`sm:hidden fixed top-0 left-0 bg-gray-100 text-black w-64 flex-col rounded-3xl min-h-screen h-auto transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      {/* Fields */}
      <div className="flex flex-col flex-grow">
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'dashboard' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('dashboard')}>Dashboard</div>
        <div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'users' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('users')}>Users</div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'tests' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('tests')}>Tests</div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'newTest' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('newTest')}>Make A Test</div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'question types' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('question types')}>Question Types</div>
        </div>
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'question' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('question')}>Create Question</div>
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'test' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('test')}>Create Test</div>
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'type' ? 'bg-gray-300' : ''}`} onClick={() => setNavState('type')}>Create Question Type</div>
        {/* Add more field links as needed */}
      </div>
    </div>
    <div className="bg-gray-100 text-black w-64 sm:flex flex-col rounded-3xl mr-2 min-h-[93vh] h-auto hidden">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      {/* Fields */}
      <div className="flex flex-col flex-grow">
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'dashboard' ? 'bg-gray-300' : ''}`} onClick={()=> setNavState('dashboard')}>Dashboard</div>
        <div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'users' ? 'bg-gray-300' : ''}`} onClick={()=> setNavState('users')}>Users</div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'tests' ? 'bg-gray-300' : ''}`} onClick={()=> setNavState('tests')}>Tests</div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'newTest' ? 'bg-gray-300' : ''}`} onClick={()=> setNavState('newTest')}>Make A Test</div>
          <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'question types' ? 'bg-gray-300' : ''}`} onClick={()=> setNavState('question types')}>Question Types</div>
        </div>
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'newSubject' ? 'bg-gray-300' : ''}`} onClick={()=>setNavState('newSubject')}>Create Subject</div>
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'question' ? 'bg-gray-300' : ''}`} onClick={()=>setNavState('question')}>Create Question</div>
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'test' ? 'bg-gray-300' : ''}`} onClick={()=>setNavState('test')}>Create Test</div>
        <div className={`px-4 py-2 hover:bg-gray-300 rounded cursor-pointer ${navState === 'type' ? 'bg-gray-300' : ''}`} onClick={()=>setNavState('type')}>Create Question Type</div>
        {/* Add more field links as needed */}
      </div>
    </div>
  </>
};

export default SideNavbar;
