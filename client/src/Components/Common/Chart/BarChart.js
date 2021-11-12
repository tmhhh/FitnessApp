import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ listData }) => {
  const data = {
    labels: listData.map((e) => e.prodName),
    datasets: [
      {
        label: "Favorite Count",
        data: listData.map((e) => e.prodRating.favorite_count),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Top Favorite Products ",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number",
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
};
export default BarChart;
