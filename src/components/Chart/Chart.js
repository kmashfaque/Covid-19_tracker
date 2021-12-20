import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ yAxis, xAxis }) => {
  return (
    <div className={styles.container}>
      <Line
        data={{
          labels: xAxis.map((l) => l.substr(0, 10)),
          datasets: [
            {
              label: "My first datasets",
              fill: true,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: yAxis,
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;

// import React, { useState, useEffect } from "react";
// import { fetchDailyData } from "../../api";
// import { Line, Bar } from "react-chartjs-2";
// import styles from "./Chart.module.css";

// const Chart = () => {
//   const [dailyData, setDailyData] = useState([]);

//   useEffect(() => {
//     const fetchAPI = async () => {
//       const fetchedData = await fetchDailyData();
//       setDailyData(fetchedData);
//     };
//     fetchAPI();
//   }, [setDailyData]);

//   const lineChart = dailyData[0] ? (
//     <Line
//       data={{
//         labels: dailyData.map(({ dateChecked }) => dateChecked),
//         datasets: [
//           {
//             data: dailyData.map(({ positive }) => positive),
//             label: "Infected",
//             borderColor: "#3333ff",
//             fill: true,
//           },
//           {
//             data: dailyData.map(({ death }) => death),
//             label: "Infected",
//             borderColor: "red",
//             backgroundColor: "rgba(255,0,0,0.5)",
//             fill: true,
//           },
//         ],
//       }}
//     />
//   ) : null;
//   return (
//     <>
//       <h1>Chart</h1>
//       {dailyData.map((data) => {
//         return <h1>{data.dateChecked}</h1>;
//       })}
//     </>
//   );
// };
// export default Chart;

// // .map(({ positive, recovered, death, dateChecked: date }) => ({
// //   confirmed: positive,
// //   recovered,
// //   deaths: death,
// //   date,
// // }));
