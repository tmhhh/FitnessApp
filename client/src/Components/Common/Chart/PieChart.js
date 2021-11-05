import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ listData }) => {
  const data = {
    labels: ["Supplement", "Equipment", "Cloth"],
    datasets: [
      {
        label: "# of Votes",
        data: listData,
        fill: false,
        backgroundColor: ["#fcc0c4", "#e0c3e2", "#b4e2e4"],
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        display: false,
        // beginAtZero: true,
      },
    },
  };
  return <Pie data={data} options={options} />;
};

export default PieChart;
