import React from "react";
import { css } from "@emotion/core";

const Navigation = () => {
  return (
    <header
      css={css`
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
      `}
    >
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
        `}
      >
        <nav>
          <h2
            css={css`
              font-size: 1.8rem;
            `}
          >
            Where in the world?
          </h2>
        </nav>
        <div>
          <button
            css={css`
              border: 0;
              font-size: 1.6rem;
              font-weight: 600;

              &:hover {
                cursor: pointer;
              }
            `}
          >
            Dark Mode
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
