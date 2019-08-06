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

            html {
              font-size: 62.5%;
            }

            body {
              background: hsl(0, 0%, 98%);
              color: hsl(200, 15%, 8%);
            }

            h1,
            h2,
            h3 {
              margin: 0;
            }

            p,
            li {
              font-size: 1.4rem;
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
              grid-gap: 2rem;
            `}
          >
            {countries &&
              countries.map(country => {
                console.log(country);
                return (
                  <div
                    css={css`
                      border-radius: 5px;
                      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
                      background: #fefefe;
                    `}
                    key={country.name}
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      css={css`
                        max-width: 100%;
                        width: 285px;
                        height: 170px;
                      `}
                    />
                    <div
                      css={css`
                        padding: 2rem;
                      `}
                    >
                      <h3
                        css={css`
                          font-size: 1.6rem;
                        `}
                      >
                        {country.name}
                      </h3>
                      <ul
                        css={css`
                          padding-left: 0;
                          list-style: none;
                        `}
                      >
                        <li>
                          <span
                            css={css`
                              font-weight: 800;
                            `}
                          >
                            Population:
                          </span>{" "}
                          {country.population}
                        </li>
                        <li>
                          <span
                            css={css`
                              font-weight: 800;
                            `}
                          >
                            Region:
                          </span>{" "}
                          {country.region}
                        </li>
                        <li>
                          <span
                            css={css`
                              font-weight: 800;
                            `}
                          >
                            Capital:
                          </span>{" "}
                          {country.capital}
                        </li>
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
