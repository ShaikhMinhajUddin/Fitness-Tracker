import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, Title, CategoryScale);

const WorkoutChart = ({ weightData, frequencyData, historyData }) => {
  const weightChartData = {
    labels: weightData.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight Progress',
        data: weightData.map(entry => entry.weight),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const frequencyChartData = {
    labels: frequencyData.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Workout Frequency',
        data: frequencyData.map(entry => entry.count),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
      },
    ],
  };

  const historyChartData = {
    labels: historyData.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Exercise History',
        data: historyData.map(entry => entry.value),
        fill: false,
        backgroundColor: 'rgba(255,159,64,0.6)',
        borderColor: 'rgba(255,159,64,1)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Weight Chart */}
        <div className="chart-container bg-white border rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Workout Progress</h2>
          <div className="mb-8">
            <Line data={weightChartData} />
          </div>
        </div>

        {/* Frequency Chart */}
        <div className="chart-container bg-white border rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Workout Frequency</h2>
          <div className="mb-8">
            <Bar data={frequencyChartData} />
          </div>
        </div>
      </div>

      {/* History Chart */}
      <div className="chart-container bg-white border rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Exercise History</h2>
        <div className="mb-8">
          <Line data={historyChartData} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutChart;
