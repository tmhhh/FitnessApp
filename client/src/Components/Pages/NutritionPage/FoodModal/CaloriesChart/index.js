import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function CaloriesChart({ chartData: { carbs, fat, protein } }) {
  return (
    <>
      <Doughnut
        className="calories_item_summary"
        data={{
          // labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [
            {
              //   label: "Population (millions)",
              backgroundColor: ["#8bd2d5", "#debee0", "#fcbec2"],
              data: [carbs, fat, protein],
            },
          ],
        }}
        //   option={{
        //     title: {
        //       display: true,
        //       text: "Predicted world population (millions) in 2050",
        //     },
        //   }}
      />
    </>
  );
}
