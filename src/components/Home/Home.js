import React from "react";
import { Global, css } from "@emotion/core";
import axios from "axios";

class Home extends React.Component {
  state = {
    countries: [],
    loading: true
  };

  render() {
    const { countries, loading } = this.state;
    if (loading) {
      return (
        <section>
          <h1>Loading Countries</h1>
        </section>
      );
    }
    return (
      <>
        <Global
          styles={css`
            * {
              font-family: "Nunito Sans", sans-serif;
            }
          `}
        />
        <main
          css={css`
            max-width: 1200px;
            margin: 0 auto;
          `}
        >
          <section
            css={css`
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 20px;
            `}
          >
            {countries &&
              countries.map(country => {
                console.log(country);
                return (
                  <div key={country.name}>
                    <img
                      src={country.flag}
                      alt={country.name}
                      css={css`
                        max-width: 100%;
                        height: auto;
                      `}
                    />
                    <div>
                      <h3>{country.name}</h3>
                      <ul
                        css={css`
                          padding-left: 0;
                          list-style: none;
                        `}
                      >
                        <li>Population: {country.population}</li>
                        <li>Region: {country.region}</li>
                        <li>Capital: {country.capital}</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
          </section>
        </main>
      </>
    );
  }

  componentDidMount() {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(res => this.setState({ countries: res.data, loading: false }))
      .catch(console.error);
  }
}

export default Home;
