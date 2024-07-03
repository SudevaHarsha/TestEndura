import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense } from 'react';
import { db } from '@/lib/db';

// Dynamically import non-critical components
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Navbar = dynamic(() => import('@/components/sections/Navbar'), { ssr: false });
const TestCategories = dynamic(() => import('@/components/tests/TestCategories'), { ssr: false });

async function fetchTestData() {
  try {
    const testCategories = await db.testCategory.findMany();
    const sectionsByCategory = await db.testSection.findMany();
    return { testCategories, sectionsByCategory };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { testCategories: [], sectionsByCategory: [] };
  }
}

const Page = async () => {
  const { testCategories, sectionsByCategory } = await fetchTestData();

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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <TestCategories testCategories={testCategories} sectionsByCategory={sectionsByCategory} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Page;
