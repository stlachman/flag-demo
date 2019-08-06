import React from "react";
import { Global, css } from "@emotion/core";

const GlobalStyles = () => {
  return (
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
          margin: 0;
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
  );
};

export default GlobalStyles;
