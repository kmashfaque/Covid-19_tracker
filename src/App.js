import React from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";

class App extends React.Component {
  state = {
    country: "",
  };

  handleCountryChange = async (country) => {
    console.log(country);
    //fetch the data
    // set the state
  };
  render() {
    return (
      <div className={styles.container}>
        <Cards />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart />
      </div>
    );
  }
}

export default App;
