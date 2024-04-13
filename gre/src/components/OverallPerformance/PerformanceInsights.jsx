// components/PerformanceInsights.js

const PerformanceInsights = ({ performanceData }) => {
    const { insights } = performanceData;
  
    return (
      <div>
        <h2>Performance Insights</h2>
        <p>Strengths: {insights.strengths.join(', ')}</p>
        <p>Weaknesses: {insights.weaknesses.join(', ')}</p>
      </div>
    );
  };
  
  export default PerformanceInsights;
  