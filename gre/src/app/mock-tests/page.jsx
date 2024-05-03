/* import VegetableCards from "@/components/VegetableCards"; */
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/sections/Navbar";
/* import RemainingCards from "@/components/RemainingCardsCaller"; */

import dynamic from 'next/dynamic'
import { db } from "@/lib/db";
import TestCategories from "@/components/tests/TestCategories";
import TestsCaller from "@/components/tests/TestsCaller";
const RemainingCards = dynamic(() => import('@/components/RemainingCardsCaller'))
const VegetableCards = dynamic(() => import('@/components/VegetableCards'))

/* export async function getData() {
  // Fetch data from external API
  const filteredSessions = await axios.get("/api/remaining-sessions");
  const tests = await axios.get("/api/find-test");

  // Returning the fetched data
  return { filteredSessions,tests };
} */

/* export async function getServerSideProps({ context }) {

  // Fetch data from external API
  const filteredSessionsreq = await fetch(`http://localhost:3000/api/remaining-sessions`);
  const filteredSessions = await filteredSessionsreq.json();
  const testsreq = await fetch(`http://localhost:3000/api/find-test`);
  const tests = await testsreq.json();

  // Returning the fetched data
  return { props: { filteredSessions, tests } }
} */

const page = async() => {
  /*   const {filteredSessions,tests} = getData();
   */

  const testCategories = await db.testCategory.findMany();
  console.log(testCategories);

  const sectionsByCategory = await db.testSection.findMany()

  console.log("sub tests",sectionsByCategory);

  return (
    <div className="w-[100%] px-4 overflow-hidden">
      <Navbar />
      <div className="h-[300px] w-[100%] sm:w-[90%] mx-auto sm:flex items-center bg-gradient-to-l from-primary via-secondary to-tertiary text-text p-5 sm:p-8 rounded-lg">
            <div className="w-[90%] sm:w-[55%]">
                <h1 className="text-xl sm:text-4xl font-bold mb-4 text-white">
                    About GRE Mock Test
                </h1>
                <p className="sm:text-lg text-sm text-white">
                    Learn, practice, and excel with our GRE mock tests at MJ Academy.
                    Prepare for success!
                </p>
            </div>
            <div className="w-[50%] h-[100%]  sm:ml-8">
                <Image
                    src="/gre4.jpeg"
                    width={400}
                    height={200}
                    alt="GRE Mock Test Image"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
        </div>
      <TestCategories testCategories={testCategories} sectionsByCategory={sectionsByCategory} />
      {/* <RemainingCards filteredSessions={filteredSessions} /> */}
{/*       <TestsCaller sectionsByCategory={sectionsByCategory} /> */}
      {/* <MockTestCard /> */}
      <Footer />
    </div>
  );
};

export default page;
