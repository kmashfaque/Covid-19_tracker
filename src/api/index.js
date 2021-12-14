import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return modifiedData;
  } catch (error) {
    console.error(error);
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     const modifiedData = data.map((dailyData) => ({
//       confirmed: dailyData.confirmed.total,
//       deaths: dailyData.deaths.total,
//       date: dailyData.reportDate,
//     }));

//     return modifiedData;
//   } catch (error) {
//     return error;
//   }
// };

export const fetchDailyData = async () => {
  try {
    const {
      data: { positive, recovered, death, dateChecked },
    } = await axios.get("https://api.covidtracking.com/v1/us/daily.json");

    const modifiedData = {
      positive,
      recovered,
      death,
      dateChecked,
    };
    console.log(modifiedData);
    return modifiedData;
  } catch (error) {
    return error;
  }
};
