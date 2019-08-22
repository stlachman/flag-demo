import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";

const Card = props => {
  // console.log(props);
  return (
    <Link
      css={css`
        text-decoration: none;
        color: hsl(200, 15%, 8%);
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        background: #fefefe;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        max-width: 300px;
        margin: 0 auto;

        @media (min-width: 900px) {
          display: block;
          max-width: initial;
        }
      `}
      to={`/country/${props.country.alpha3Code}`}
    >
      <img
        src={props.country.flag}
        alt={props.country.name}
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
            color: hsl(200, 15%, 8%);
          `}
        >
          {props.country.name}
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
            {props.country.population.toLocaleString()}
          </li>
          <li>
            <span
              css={css`
                font-weight: 800;
              `}
            >
              Region:
            </span>{" "}
            {props.country.region}
          </li>
          <li>
            <span
              css={css`
                font-weight: 800;
              `}
            >
              Capital:
            </span>{" "}
            {props.country.capital}
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default Card;
