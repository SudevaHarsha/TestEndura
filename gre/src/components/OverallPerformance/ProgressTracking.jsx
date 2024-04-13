// components/ProgressTracking.js

const ProgressTracking = () => {
    // Hardcoded progress data for demonstration
    const targetScore = 330;
    const currentScore = 320;
    const progressPercentage = Math.round((currentScore / targetScore) * 100);
  
    return (
      <div>
        <h2>Progress Tracking</h2>
        <p>Target Score: {targetScore}</p>
        <p>Current Score: {currentScore}</p>
        <p>Progress: {progressPercentage}%</p>
      </div>
    );
  };
  
  export default ProgressTracking;
  