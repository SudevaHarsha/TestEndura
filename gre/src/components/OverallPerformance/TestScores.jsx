// components/TestScores.js

const TestScores = ({ performanceData }) => {
    const { testScores } = performanceData;
  
    return (
      <div>
        <h2>Test Scores</h2>
        <ul>
          {testScores.map((test) => (
            <li key={test.id}>{test.testName}: {test.score}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TestScores;
  