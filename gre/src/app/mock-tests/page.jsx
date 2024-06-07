import dynamic from 'next/dynamic';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/sections/Navbar';
import TestCategories from '@/components/tests/TestCategories';
import { db } from '@/lib/db';

// Dynamically import the client components
const RemainingCards = dynamic(() => import('@/components/RemainingCardsCaller'), { ssr: false });
const VegetableCards = dynamic(() => import('@/components/VegetableCards'), { ssr: false });

const Page = async () => {
  try {
    const testCategories = await db.testCategory.findMany();
    const sectionsByCategory = await db.testSection.findMany();

    return (
      <div className="w-[100%] px-4 overflow-hidden">
        <Navbar />
        <div className="h-[300px] w-[100%] sm:w-[90%] mx-auto sm:flex items-center bg-gradient-to-l from-primary via-secondary to-tertiary text-text p-5 sm:p-8 rounded-lg">
          <div className="w-[90%] sm:w-[55%]">
            <h1 className="text-xl sm:text-4xl font-bold mb-4 text-white">
              About GRE Mock Test
            </h1>
            <p className="sm:text-lg text-sm text-white">
              Learn, practice, and excel with our GRE mock tests at MJ Academy. Prepare for success!
            </p>
          </div>
          <div className="w-[50%] h-[100%] sm:ml-8">
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
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Failed to fetch data. Please try again later.</div>;
  }
};

export default Page;
