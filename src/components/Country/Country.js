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
      .get(
        `https://restcountries.eu/rest/v2/name/${name}?fields=name;flag;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders`
      )
      .then(res => {
        this.setState({ country: res.data[0] });
      })
      .catch(console.error);
  };

  render() {
    const { country } = this.state;
    const renderMultipleItems = arr => {
      return arr.length > 1 ? arr.map(item => item + ",") : arr[0];
    };

    const renderObj = (arr, key) => {
      return arr[0][key];
    };
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
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              grid-gap: 20px;
            `}
          >
            <div>
              <Link to="/">Back</Link>

              <img
                css={css`
                  max-width: 100%;
                  height: auto;
                `}
                src={country.flag}
                alt={country.name}
              />
            </div>

            <div>
              <h2>{country.name}</h2>

              <div>
                <p>Native Name: {country.nativeName}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
              <div>
                <p>
                  Top Level Domain:{" "}
                  {renderMultipleItems(country.topLevelDomain)}
                </p>
                <p>Currencies: {renderObj(country.currencies, "name")}</p>
                <p>Languages: {renderObj(country.languages, "name")}</p>
              </div>
              <div>
                <p>
                  Border Countries:{" "}
                  {country.borders.map(border => (
                    <span key={border}>{border}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Country;
