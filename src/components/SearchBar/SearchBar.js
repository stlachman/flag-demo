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

  handleChange = e => {
    const { query } = this.state;
    this.setState({
      query: e.target.value
    });
    this.props.searchCountry(query);
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    this.props.searchCountry(query);
  };

  render() {
    const { query } = this.state;
    return (
      <div
        css={css`
          margin: 0 auto 2rem;
          max-width: 400px;
          text-align: center;
          @media (min-width: 900px) {
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
            align-items: center;
          }
        `}
      >
        <form onSubmit={this.handleSubmit}>
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
            value={query}
            onChange={this.handleChange}
            css={css`
              border: 1px solid #fafafa;
              padding: 0.8rem 2rem;
              border-radius: 4px;
              font-size: 1.4rem;
              box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
            `}
          />
        </form>

        <form
          css={css`
            margin: 2rem 0 0;
            @media (min-width: 900px) {
              margin: 0;
            }
          `}
        >
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
            htmlFor="region"
          >
            Region
          </label>
          <select
            id="region"
            onChange={e => this.props.updateRegion(e.target.value)}
            onBlur={e => this.props.updateRegion(e.target.value)}
            css={css`
              font-size: 1.4rem;
              display: inline-block;
              height: 35px;
              box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
              border: 1px solid #fafafa;
              border-radius: 4px;
            `}
          >
            {" "}
            <option>Filter By Region</option>
            {this.props.regions.map(region => (
              <option key={region} value={region.toLowerCase()}>
                {region}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

export default SearchBar;
