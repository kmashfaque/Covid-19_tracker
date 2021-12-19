import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import styles from "./Card.module.css";
import cx from "classnames";
import axios from "axios";

const Cards = () => {
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [date, setDate] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setLoading(false);
      const url = "https://api.covid19api.com/summary";
      const { data } = await axios.get(url);
      setTotalConfirmed(data.Global.TotalConfirmed);
      setTotalRecovered(data.Global.TotalRecovered);

      setTotalDeaths(data.Global.TotalDeaths);
      setDate(data.Global.Date);
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={totalConfirmed}
                duration={1.55}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(date).toDateString()}
            </Typography>
            <Typography variaant="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={totalRecovered}
                duration={1.55}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(date).toDateString()}
            </Typography>
            <Typography variaant="body2">
              Number of recoveries from COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={totalDeaths}
                duration={1.55}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(date).toDateString()}
            </Typography>
            <Typography variaant="body2">
              Number of deaths caused by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
