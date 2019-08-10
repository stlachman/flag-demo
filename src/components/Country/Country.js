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
      country: [],
      borders: []
    };
  }
  componentDidMount() {
    const name = this.props.match.params.id;
    this.fetchCountry(name);
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

  // convertBorder = inititals => {
  //   axios
  //     .get(`https://restcountries.eu/rest/v2/alpha/${inititals}`)
  //     .then(res =>
  //       this.setState({
  //         borders: [this.state.borders, ...res.data.name]
  //       })
  //     )
  //     .catch(console.error);
  // };

  render() {
    const { country } = this.state;
    const renderMultipleItems = arr => {
      return arr.length > 1 ? arr.map(item => item + ",") : arr[0];
    };

    const renderObj = (arr, key) => {
      return arr[0][key];
    };
    // console.log(country);
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
              display: flex;
              flex-wrap: wrap;
            `}
          >
            <div>
              <Link
                to="/"
                css={css`
                  padding: 1rem 2rem;
                  font-weight: 600;
                  font-size: 1.6rem;
                  text-decoration: none;
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
                  margin: 0 0 1rem;
                  display: inline-block;
                `}
              >
                Back
              </Link>

              <img
                css={css`
                  max-width: 100%;
                  height: auto;
                  display: block;
                `}
                src={country.flag}
                alt={country.name}
              />
            </div>

            <div
              css={css`
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: 3fr 1fr;
                margin-left: 10%;
              `}
            >
              <div
                css={css`
                  align-self: center;
                `}
              >
                <h2>{country.name}</h2>
                <p>Native Name: {country.nativeName}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
              <div
                css={css`
                  align-self: center;
                `}
              >
                <p>
                  Top Level Domain:{" "}
                  {renderMultipleItems(country.topLevelDomain)}
                </p>
                <p>Currencies: {renderObj(country.currencies, "name")}</p>
                <p>Languages: {renderObj(country.languages, "name")}</p>
              </div>
              <div
                css={css`
                  grid-column: 1 / 3;
                `}
              >
                <p>
                  Border Countries:{" "}
                  {country.borders.map(border => (
                    <span
                      css={css`
                        margin: 0 1.5rem;
                        padding: 1rem 2rem;
                        font-weight: 600;
                        font-size: 1.4rem;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
                      `}
                      key={border}
                    >
                      {this.convertBorder(border)}
                    </span>
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
