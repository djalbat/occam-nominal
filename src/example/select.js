"use strict";

import withStyle from "easy-with-style";  ///

import { Select } from "easy";

export default withStyle(Select)`

  border: 1px solid darkgrey;
  padding: 0.25rem;
  font-size: 1.2rem;
  font-family: monospace;
  margin-bottom: 0.8rem;
  
  :last-child {
    margin-bottom: 0;
  }

`;
