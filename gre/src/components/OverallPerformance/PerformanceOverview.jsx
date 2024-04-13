// components/PerformanceOverview.js

const PerformanceOverview = ({ performanceData }) => {
    const { overallScore, verbalScore, quantitativeScore, analyticalWritingScore } = performanceData;
  
    return (
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-2">Performance Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Overall Score: {overallScore}</p>
            <p>Verbal Score: {verbalScore}</p>
          </div>
          <div>
            <p>Quantitative Score: {quantitativeScore}</p>
            <p>Analytical Writing Score: {analyticalWritingScore}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PerformanceOverview;
  