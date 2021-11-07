import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ listData, listLabels }) => {
  const data = {
    labels: listLabels,
    datasets: [
      {
        label: "Revenue",
        data: listData,
        fill: false,
        backgroundColor: "#fcc0c4",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    // plugins: {
    //   title: {
    //     display: true,
    //     text: "TEXT",
    //   },
    // },
    scales: {
      x: {
        display: true,
        // title: {
        //   display: true,
        //   text: "Month",
        //   color: "#911",
        //   font: {
        //     family: "Comic Sans MS",
        //     size: 20,
        //     style: "bold",
        //     lineHeight: 1.2,
        //   },
        //   padding: { top: 20, left: 0, right: 0, bottom: 0 },
        // },
        ticks: {
          callback: function (value, index, values) {
            // Hide the label of every 2nd dataset
            return index % 2 !== 0 ? this.getLabelForValue(value) : "";
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
export default LineChart;
