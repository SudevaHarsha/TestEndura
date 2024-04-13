"use client"

import { CheckCircleIcon, UsersIcon, SparklesIcon, AcademicCapIcon } from '@heroicons/react/solid';

const SuccessCard = ({ icon, title, description }) => {
  return (
    <div style={{
      boxShadow: '0 4px 6px -1px var(--secondary), 0 2px 4px -1px var(--secondary)',
    }} className="bg-tertiary/55 rounded-lg p-6 flex flex-col items-center justify-center text-center">
      {icon}
      <h3 className="text-lg font-bold mt-4 text-text">{title}</h3>
      <p className="text-text mt-2">{description}</p>
    </div>
    
  );
};

const Success = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Success Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SuccessCard
          icon={<CheckCircleIcon className="w-12 h-12 text-green-500 mb-4" />}
          title="High Score Achievers"
          description="Our students consistently achieve high scores in the GRE, unlocking doors to top universities worldwide."
        />
        <SuccessCard
          icon={<UsersIcon className="w-12 h-12 text-blue-500 mb-4" />}
          title="Community Support"
          description="Join a supportive community of learners and mentors, helping each other succeed in their GRE journey."
        />
        <SuccessCard
          icon={<SparklesIcon className="w-12 h-12 text-yellow-500 mb-4" />}
          title="Personalized Learning"
          description="Experience personalized learning with customized study plans tailored to your strengths and weaknesses."
        />
        <SuccessCard
          icon={<AcademicCapIcon className="w-12 h-12 text-purple-500 mb-4" />}
          title="Expert Guidance"
          description="Receive expert guidance from experienced tutors who are dedicated to helping you reach your GRE goals."
        />
      </div>
    </div>
  );
};

export default Success;
