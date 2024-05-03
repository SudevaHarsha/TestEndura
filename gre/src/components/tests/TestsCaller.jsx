"use client"

import React from 'react'
import VegetableCards from '../VegetableCards'
import TestCards from './TestsCards'
import { useCurrentTest } from '@/providers/CurrentTestDetails'

const TestsCaller = ({tests,sectionsByCategory}) => {

    const { currentTestCategory, currentTestSection } = useCurrentTest();

    if (currentTestCategory && !currentTestSection) {
        return <VegetableCards tests={sectionsByCategory} />
    } else if (currentTestSection) {
        return <TestCards tests={tests} />
    }
}

export default TestsCaller