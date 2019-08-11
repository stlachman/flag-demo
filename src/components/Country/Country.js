import React from "react";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

import Navigation from "../Navigation/Navigation";
import GlobalStyles from "../GlobalStyles";

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      code: [],
      borders: [],
      name: ""
    };
  }
  componentDidMount() {
    const name = this.props.match.params.id;
    this.fetchCountry(name);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.props.history.push(`/country/${this.state.name.toLowerCase()}`);
      this.fetchCountry(this.state.name);
    }
  }

  fetchCountry = name => {
    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${name}?fields=name;flag;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders`
      )
      .then(res => {
        this.setState({
          country: res.data[0],
          code: { abbreviations: res.data[0].borders },
          borders: []
        });
      })
      .then(() =>
        this.state.code.abbreviations.map(border =>
          axios
            .get(`https://restcountries.eu/rest/v2/alpha/${border}?fields=name`)
            .then(res =>
              this.setState({
                borders: [...this.state.borders, res.data.name]
              })
            )
        )
      )
      .catch(console.error);
  };

  render() {
    const { country, borders } = this.state;
    const renderMultipleItems = arr => {
      return arr.length > 1 ? arr.map(item => item + ",") : arr[0];
    };

    const renderObj = (arr, key) => {
      return arr[0][key];
    };

    if (country.length === 0) {
      return (
        <>
          <GlobalStyles />
          <Navigation />
          <main
            css={css`
              max-width: 1200px;
              margin: 7rem auto 0;
              display: flex;
              justify-content: center;
            `}
          >
            <Loader type="Plane" color="#AAB7B8" height={80} width={80} />
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
              justify-content: center;
              @media (min-width: 900px) {
                justify-content: flex-start;
              }
            `}
          >
            <div
              css={css`
                width: 55%;
                @media (min-width: 900px) {
                  width: 35%;
                }
              `}
            >
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
                width: 55%;
                margin: 2rem 0 0 0;

                @media (min-width: 900px) {
                  width: 58%;
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  grid-template-rows: 2fr 1fr;
                  margin: 0 0 0 4rem;
                }
              `}
            >
              <div
                css={css`
                  align-self: center;
                `}
              >
                <h2>{country.name}</h2>
                <p>
                  <span
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    Native Name:
                  </span>{" "}
                  {country.nativeName}
                </p>
                <p>
                  <span
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    Population:
                  </span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    Region:
                  </span>{" "}
                  {country.region}
                </p>
                <p>
                  <span
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    Capital:
                  </span>{" "}
                  {country.capital}
                </p>
              </div>
              <div
                css={css`
                  align-self: center;
                `}
              >
                <p>
                  <span
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    Top Level Domain:
                  </span>{" "}
                  {renderMultipleItems(country.topLevelDomain)}
                </p>
                <p>
                  <span
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    Currencies:
                  </span>{" "}
                  {renderObj(country.currencies, "name")}
                </p>
                <p>
                  <span
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    Languages:
                  </span>{" "}
                  {renderObj(country.languages, "name")}
                </p>
              </div>
              <div
                css={css`
                  @media (min-width: 900px) {
                    grid-column: 1 / 3;
                  }
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                  `}
                >
                  <h3
                    css={css`
                      width: 100%;
                      text-align: center;
                    `}
                  >
                    Border Countries:
                  </h3>{" "}
                  {borders.map(border => (
                    <span
                      css={css`
                        margin: 0 1.5rem;
                        padding: 1rem 2rem;
                        font-weight: 600;
                        display: inline-block;
                        font-size: 1.4rem;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
                        margin: 1rem 0.5rem;
                      `}
                      key={border}
                    >
                      <span
                        css={css`
                          &:hover {
                            cursor: pointer;
                          }
                        `}
                        onClick={() => {
                          this.setState({
                            borders: [],
                            country: [],
                            code: [],
                            name: border
                          });
                        }}
                      >
                        {border}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Country;
