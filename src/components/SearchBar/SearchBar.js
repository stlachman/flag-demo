import React from "react";
import { css } from "@emotion/core";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.region !== prevProps.region) {
      this.props.updateRegion(this.props.region);
    }
  }

  render() {
    return (
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
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
            // value={country}
            // onChange={e => setCountry(e.target.value)}
          />

          <button>Search</button>
        </form>

        <form>
          <label htmlFor="region">Region</label>
          <select
            id="region"
            onChange={e => this.props.updateRegion(e.target.value)}
            onBlur={e => this.props.updateRegion(e.target.value)}
          >
            {" "}
            {this.props.regions.map(region => (
              <option key={region} value={region.toLowerCase()}>
                {region === "" ? "All" : region}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

export default SearchBar;
