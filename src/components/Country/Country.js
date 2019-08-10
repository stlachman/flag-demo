import React from "react";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import axios from "axios";

import Navigation from "../Navigation/Navigation";
import GlobalStyles from "../GlobalStyles";

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: []
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchCountry(id);
  }

  fetchCountry = name => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(res => {
        this.setState({ country: res.data[0] });
      })
      .catch(console.error);
  };
  render() {
    const { country } = this.state;
    console.log(country);
    if (country.length === 0) {
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
              <h1>Loading Country</h1>
            </div>
          </main>
        </>
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
            <Link to="/">Back</Link>

            <img src={country.flag} alt={country.name} />
          </div>

          <div>
            <h2>{this.state.country.name}</h2>
          </div>
        </main>
      </>
    );
  }
}

export default Country;
