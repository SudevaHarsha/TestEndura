'use client'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AttemptsExceeded = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/mock-tests');
    }, 2000); // Delay in milliseconds (2 seconds in this case)

    // Clear the timeout if the component is unmounted before the timeout completes
    return () => clearTimeout(timer);
  }, [router]);

  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <>
      <div>AtemptsExceeded</div>
      <div>click on below button if you does not redirect back</div>
      <button onClick={handleGoBack}>Go Back</button>
    </>
  );
};

export default AttemptsExceeded;
