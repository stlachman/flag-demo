import React from "react";
import { css } from "@emotion/core";
import axios from "axios";

import Navigation from "../Navigation/Navigation";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import GlobalStyles from "../GlobalStyles";

class Home extends React.Component {
  state = {
    countries: [],
    error: "",
    region: "",
    regions: ["", "Africa", "Americas", "Asia", "Europe", "Oceania"],
    country: ""
  };

  componentDidMount() {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(res => this.setState({ countries: res.data }))
      .catch(err => this.setState({ error: err.data }));
  }

  updateRegion = region => {
    axios
      .get(`https://restcountries.eu/rest/v2/region/${region}`)
      .then(res => this.setState({ countries: res.data, region: region }))
      .catch(err => this.setState({ error: err.data }));
  };

  searchCountry = name => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(res => this.setState({ countries: res.data, country: name }))
      .catch(err => this.setState({ error: err.data }));
  };

  render() {
    const { countries, region, regions } = this.state;
    if (countries.length === 0) {
      return (
        <main
          css={css`
            max-width: 1200px;
            margin: 7rem auto 0;
          `}
        >
          <h1>Loading Countries</h1>
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
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 2rem;
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
