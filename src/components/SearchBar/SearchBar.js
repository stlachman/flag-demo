import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";

const SearchBar = props => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div>
      <form>
        <label
          css={css`
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
          `}
          htmlFor="country"
        >
          Country
        </label>
        <input
          id="country"
          type="text"
          placeholder="Search for a country..."
          value={country}
          onChange={e => setCountry(e.target.value)}
        />

        <button>Search</button>
      </form>

      <form>
        <label htmlFor="region">Region</label>
        <select
          id="region"
          onChange={e => setRegion(e.target.value)}
          onBlur={e => setRegion(e.target.value)}
        >
          {" "}
          {props.countries
            .reduce(
              (unique, country) =>
                unique.includes(country.region)
                  ? unique
                  : [...unique, country.region],
              []
            )
            .sort()
            .map(region => (
              <option key={region} value={region}>
                {region === "" ? "All" : region}
              </option>
            ))}
        </select>
      </form>
    </div>
  );
};

export default SearchBar;
