import React from "react";
import { css } from "@emotion/core";
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
                </div>
              );
            })}
        </section>
      </main>
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
