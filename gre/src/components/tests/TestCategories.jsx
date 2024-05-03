"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useCurrentTest } from '@/providers/CurrentTestDetails'
import VegetableCards from '../VegetableCards'
import axios from 'axios';
import { useRouter } from 'next/navigation'

const TestCategories = ({ testCategories, tests }) => {

    const [isTest, setIsTest] = useState(false);
    const [actualTests, setActualTests] = useState([]);
    const [actualSections, setActualSections] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(testCategories[0].id);

    const [testSections, setTestSections] = useState([]);;
    const { setCurrentTestCategory, setCurrentTest, setCurrentTestSection, currentTestCategory, currentTestSection, currentTest } = useCurrentTest();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const tests = await axios.get(`/api/categoryWiseSections/${currentCategory}`);
                setTestSections(tests.data.testSections)
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        currentTestCategory && fetchData();
    }, [currentTestCategory]);

    const handleTestCategoryClick = (testCategory) => {
        console.log('ethg');
        setCurrentTestCategory(testCategory);
        setCurrentCategory(testCategory.id);
        setActualTests([]);
        setIsTest(false);
        setCurrentTest([]);
        setCurrentTestSection([]);
    }

    const router = useRouter();

    const handleClick = async (e, test) => {
        e.stopPropagation();
        if (currentTestCategory && currentTestSection && actualTests && isTest) {
            setCurrentTest(test);
            router.push(`/mock-tests/create-testsession/${test?.id}`)
            return
        }

        if (currentTestSection && !isTest) {
            const tests = await axios.get(`/api/sectionWiseTests/${test?.id}`);
            setActualTests(tests.data.tests)
            setCurrentTestSection(test)
            setIsTest(true);
            return
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tests = await axios.get(`/api/categoryWiseSections/${currentTestCategory.id}`);
                setActualSections(tests.data.testSections)

            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchData();
    }, []);

    console.log(testSections);

    return <>
        <h1 className="sm:text-3xl text-2md font-bold ml-16 mt-5">
            Mock Tests by <span className="text-strong">MJ Academy</span>
        </h1>
        {/* <SwipeCarousel /> */}
        <div className="w-[75%] flex mx-auto items-center justify-center gap-14 border-b-2 border-gradient-b mt-4">
            {
                testCategories.map((testCategory) => {
                    return <Button
                        theme="primary"
                        key={testCategory.id}
                        className={`mr-2 bg-white text-gray-500 font-bold hover:bg-strong/50 hover:text-white hover:font-extrabold ${testCategory.id ===currentCategory && "border-b-2 border-strong"}`}
                        onClick={() => handleTestCategoryClick(testCategory)}
                    >
                        {testCategory.name}
                    </Button>
                })
            }
        </div>
        {
            currentTestCategory && currentTestSection.length === 0 && <VegetableCards tests={testSections} handleClick={handleClick} />
        }
        {
            currentTestSection && <VegetableCards tests={actualTests} handleClick={handleClick} />
        }
    </>
}

export default TestCategories