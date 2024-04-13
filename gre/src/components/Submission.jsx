// pages/submission.js

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Submission = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Test Submitted!</h1>

      <Card className="mt-4 rounded-xl p-6">
        <CardHeader>
          <CardTitle>Thank you for completing the GRE mock test.</CardTitle>
        </CardHeader>
        <CardDescription>
          <p>Your test has been successfully submitted.</p>
          <p>If you&apos;d like to review your answers or retake the test, please click the button below:</p>
        </CardDescription>
      </Card>

      <div className="mt-8 flex gap-7">
        <Link href="/">
          <Button variant="primary" className="flex justify-center items-center m-0">Return to Home</Button>
        </Link>
        <Link href='/mock-tests/results'>
          <Button className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center mb-0" >View Results</Button>
        </Link>
      </div>
    </div>
  );
};

export default Submission;
