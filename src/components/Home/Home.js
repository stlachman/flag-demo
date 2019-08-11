import React from "react";
import { css } from "@emotion/core";
import axios from "axios";
import Loader from "react-loader-spinner";

import Navigation from "../Navigation/Navigation";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import GlobalStyles from "../GlobalStyles";

class Home extends React.Component {
  state = {
    countries: [],
    error: "",
    region: "",
    regions: ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"],
    country: ""
  };

  componentDidMount() {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(res => this.setState({ countries: res.data }))
      .catch(err => this.setState({ error: err.data }));
  }

  updateRegion = region => {
    if (region === "all") {
      axios
        .get(`https://restcountries.eu/rest/v2/all`)
        .then(res => this.setState({ countries: res.data, region: region }))
        .catch(err => this.setState({ error: err.data }));
    } else {
      axios
        .get(`https://restcountries.eu/rest/v2/region/${region}`)
        .then(res => this.setState({ countries: res.data, region: region }))
        .catch(err => this.setState({ error: err.data }));
    }
  };

  searchCountry = name => {
    const { countries } = this.state;
    this.setState({
      countries: countries.filter(country =>
        country.name.toLowerCase().includes(name)
      )
    });
  };

  render() {
    const { countries, region, regions } = this.state;
    if (countries.length === 0) {
      return (
        <main
          css={css`
            max-width: 1200px;
            margin: 7rem auto 0;
            display: flex;
            justify-content: center;
            padding: 0 1.5rem;
          `}
        >
          <Loader type="Plane" color="#AAB7B8" height={80} width={80} />
        </main>
      );
    }
    return (
      <>
        <GlobalStyles />
        <Navigation />
        <main
          css={css`
            max-width: 1200px;
            margin: 7rem auto 0;
            padding: 0 1.5rem;
          `}
        >
          <SearchBar
            region={region}
            updateRegion={this.updateRegion}
            regions={regions}
            searchCountry={this.searchCountry}
          />
          <section
            css={css`
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: 2rem;

              @media (min-width: 900px) {
                grid-template-columns: repeat(4, 1fr);
              }
            `}
          >
            {countries &&
              countries.map(country => {
                return <Card key={country.name} country={country} />;
              })}
          </section>
        </main>
      </>
    );
  }
}

export default Home;
