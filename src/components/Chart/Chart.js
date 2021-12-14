import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { positive, recovered, death, dateChecked } }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      const dataDaily = await fetchDailyData();
      setDailyData(dataDaily);
    };

    fetchAPI();
  }, [setDailyData]);

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ dateChecked }) =>
          new Date(dateChecked).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.positive),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.death),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};
export default Chart;
