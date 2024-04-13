// pages/results.js

import Results from "@/components/Results";
import Navbar from "@/components/sections/Navbar";
import Head from "next/head";
import Link from "next/navigation";

const ResultsPage = () => {
  return (
    <>
      <Navbar />
      <Results />
    </>
  );
};

export default ResultsPage;
