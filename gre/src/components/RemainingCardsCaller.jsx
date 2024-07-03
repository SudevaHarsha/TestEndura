import React, { useEffect, useState } from 'react';
import RemainingCards from './remainingCards/index';
import { useCurrentTest } from '@/providers/CurrentTestDetails';

const RemainingCardsCaller = () => {
  const { currentTestSection } = useCurrentTest();
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`/api/remaining-sessions/${currentTestSection?.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFilteredSessions(data.filteredSessions);
      } catch (error) {
        console.error('Error fetching remaining sessions:', error);
        // Handle error state if needed
      }
    };

    if (currentTestSection?.id) {
      fetchSessions();
    }
  }, [currentTestSection?.id]);

  return (
    currentTestSection?.id && <div className='flex items-center justify-center w-full'>
      <RemainingCards filteredSessions={filteredSessions} />
    </div>
  );
};

export default RemainingCardsCaller;
