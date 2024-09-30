import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

const TransactionChart = ({ transactions }) => {
  
  if (!transactions || transactions.length === 0) {
    return <p>No transactions available</p>; 
  }

  
  const chartData = {
    labels: transactions.map((t) => new Date(t.date).toLocaleDateString()), 
    datasets: [
      {
        label: 'Income',
        data: transactions
          .filter((t) => t.type === 'income')
          .map((t) => t.amount),
        borderColor: 'green',
        fill: false, 
      },
      {
        label: 'Expense',
        data: transactions
          .filter((t) => t.type === 'expense')
          .map((t) => t.amount),
        borderColor: 'red',
        fill: false, 
      },
    ],
  };

  const options = {
    responsive: true, 
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Transaction Chart', 
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TransactionChart;