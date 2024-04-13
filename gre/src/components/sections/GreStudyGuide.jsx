"use client";

import { Button } from "@/components/ui/button";
import Image from 'next/image';

const GreStudyGuide = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">AI-Powered GRE Study Guide</h2>
            <p className="mt-3 text-lg text-text">Enhance Your Learning Experience</p>
            <p className="mt-6 text-lg text-text">Master every GRE question type with 32 lectures and 210 practice questions. TestGlider AI tailors your practice based on your progress.</p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2 md:pl-8">
            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" className="w-full bg-strong text-white hover:bg-white hover:border-2 hover:border-strong hover:text-text">
                Practice Questions: 210
              </Button>
              <Button size="lg"  className="w-full bg-white border-2 border-strong text-text hover:bg-strong hover:text-white hover:border-0">
                Lectures: 32
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreStudyGuide;
