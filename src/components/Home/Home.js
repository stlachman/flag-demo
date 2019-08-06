import React from "react";
import { css } from "@emotion/core";
import axios from "axios";

import Navigation from "../Navigation/Navigation";
import Card from "../Card/Card";
import GlobalStyles from "../GlobalStyles";

class Home extends React.Component {
  state = {
    countries: [],
    loading: true,
    error: ""
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
        <GlobalStyles />
        <Navigation />
        <main
          css={css`
            max-width: 1200px;
            margin: 7rem auto 0;
          `}
        >
          <div>
            <form>
              <input type="text" />
            </form>
          </div>
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

  componentDidMount() {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(res => this.setState({ countries: res.data, loading: false }))
      .catch(err => this.setState({ error: err.data, loading: false }));
  }
}

export default Home;
