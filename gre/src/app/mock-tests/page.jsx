import VegetableCards from "@/components/VegetableCards";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/sections/Navbar";
import RemainingCards from "@/components/RemainingCardsCaller";

/* import dynamic from 'next/dynamic'
const RemainingCards = dynamic(() => import('@/components/RemainingCardsCaller'))
const VegetableCards = dynamic(() => import('@/components/VegetableCards')) */

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

const page = () => {
  /*   const {filteredSessions,tests} = getData();
   */
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
        <div className="w-full h-[80%] sm:w-1/3 sm:ml-8">
          <Image
            src="/gre4.jpeg"
            width={400}
            height={200}
            alt="GRE Mock Test Image"
            className="w-full object-cover rounded-md sm:h-auto sm:w-auto"
          />
        </div>
      </div>

      {/* <SwipeCarousel /> */}
      <div className="w-[75%] flex mx-auto items-center justify-center gap-14 border-b-2 border-gradient-b mt-4">
        <Button
          theme="primary"
          className="mr-2 bg-white text-gray-500 font-bold hover:bg-strong/50 hover:text-white hover:font-extrabold"
        >
          Mock Tests
        </Button>
        <Button
          theme="success"
          className="mr-2 bg-white text-gray-500 font-bold hover:bg-strong/50 hover:text-white hover:font-extrabold"
        >
          Previous test scores
        </Button>
        <Button
          theme="danger"
          className="mr-2 bg-white text-gray-500 font-bold hover:bg-strong/50 hover:text-white hover:font-extrabold"
        >
          practice
        </Button>
      </div>
      <h1 className="sm:text-3xl text-2md font-bold ml-16 mt-5">
        Mock Tests by <span className="text-strong">MJ Academy</span>
      </h1>
      <RemainingCards /* filteredSessions={filteredSessions} */ />
      <VegetableCards /* tests={tests} */ />
      {/* <MockTestCard /> */}
      <Footer />
    </div>
  );
};

export default page;
