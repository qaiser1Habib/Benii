
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const data = {
    labels: ['Children', 'Adolescents', 'Adults', 'Seniors'],
    datasets: [
      {
        label: '', 
        backgroundColor: '#6f688d',
        borderColor: 'transparent',
        borderWidth: 2,
        data: [50, 70, 90, 80,100],
        barThickness: 20
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false 
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
