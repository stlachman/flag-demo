import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";

const Card = props => {
  return (
    <div
      css={css`
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        background: #fefefe;
      `}
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
        <Link
          css={css`
            text-decoration: none;
          `}
          to={`/country/${props.country.name.toLowerCase()}`}
        >
          <h3
            css={css`
              font-size: 1.6rem;
            `}
          >
            {props.country.name}
          </h3>
        </Link>
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
            {props.country.population}
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
    </div>
  );
};

export default Card;
