// import axios from "axios";

// const url = "https://api.covid19api.com/summary";

// export const fetchData = async () => {
//   try {
//     const { data } = await axios.get(url);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(
//       "https://api.covidtracking.com/v1/us/daily.json"
//     );

//     return data.map(({ positive, recovered, death, dateChecked: date }) => ({
//       confirmed: positive,
//       recovered,
//       deaths: death,
//       date,
//     }));
//   } catch (error) {
//     return error;
//   }
// };
