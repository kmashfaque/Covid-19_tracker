import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import Cards from "../Cards/Cards";
import styles from "./CountryPicker.module.css";
import axios from "axios";
import Chart from "../Chart/Chart";

const CountryPicker = () => {
  const [countries, setCountries] = useState([]);
  const [days, setDays] = useState(7);
  const [coronaCount, setCoronaCount] = useState([]);
  const [covidSummery, setCovidSummery] = useState({});
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [label, setLabel] = useState([]);
  const [country, setCountry] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.covid19api.com/summary";
      const { data } = await axios.get(url);
      setTotalConfirmed(data.Global.TotalConfirmed);
      setTotalRecovered(data.Global.TotalRecovered);
      setTotalDeaths(data.Global.TotalDeaths);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const url = "https://api.covid19api.com/summary";
      const { data } = await axios.get(url);

      setCountries(data.Countries);
      setCovidSummery(data);
    };

    fetchAPI();
  }, [setCountries]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  };

  const handleCountryChange = (e) => {
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days + 1));
    // console.log(from, to);
    coronaReportByDateRange(e.target.value, from, to);
  };

  const coronaReportByDateRange = async (countrySlug, from, to) => {
    try {
      const res = await axios.get(
        `https://api.covid19api.com/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      );

      const yAxisCoronaCount = res.data.map((d) => d.Cases);
      setCoronaCount(yAxisCoronaCount);

      const covidDetails = covidSummery.Countries.find(
        (country) => country.Slug === countrySlug
      );

      const xAxisLabel = res.data.map((d) => d.Date);

      setTotalConfirmed(covidDetails.TotalConfirmed);
      setTotalRecovered(covidDetails.TotalRecovered);
      setTotalDeaths(covidDetails.TotalDeaths);
      setLabel(xAxisLabel);
      setCountry(countrySlug);
    } catch (error) {
      console.error(error);
    }
  };

  const daysHandler = (e) => {
    setDays(e.target.value);
  };
  return (
    <>
      <h1 className={styles.countryName}>
        {country ? country : "Global Corona Report"}
      </h1>
      <Cards
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
      />
      <FormControl>
        <NativeSelect defaultValue="" onChange={handleCountryChange}>
          <option value="global">Global</option>
          {countries.map((country) => (
            <option value={country.Slug} key={country.ID}>
              {country.Slug}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl>
        <NativeSelect value={days} onChange={daysHandler}>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </NativeSelect>
      </FormControl>
      <Chart yAxis={coronaCount} xAxis={label} />
    </>
  );
};

export default CountryPicker;
