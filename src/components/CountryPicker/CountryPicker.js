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

  const handleCountryChange = (e) => {
    console.log(e.target.value);
    //fetch the data
    // set the state
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
        <NativeSelect value={days}>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default CountryPicker;
