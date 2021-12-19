import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import axios from "axios";

const CountryPicker = () => {
  const [countries, setCountries] = useState([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchAPI = async () => {
      const url = "https://api.covid19api.com/summary";
      const { data } = await axios.get(url);
      setCountries(data.Countries);
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
    const from = formatDate(d.setDate(d.getDate() - 6));
    // console.log(from, to);
    coronaReportByDateRange(e.target.value, from, to);
  };

  const coronaReportByDateRange = async (countrySlug, from, to) => {
    try {
      const res = await axios.get(
        `https://api.covid19api.com/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const daysHandler = (e) => {
    setDays(e.target.value);
  };
  return (
    <>
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
    </>
  );
};

export default CountryPicker;
