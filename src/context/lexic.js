"use strict";

import { nodeUtilities } from "occam-languages";

import Context from "../context";

const { nodeAsString, nodesAsString } = nodeUtilities;

export default class LexicContext extends Context {
  constructor(context, tokens) {
    super(context);

    this.tokens = tokens;
  }

  getTokens() {
    return this.tokens;
  }

  setTokens(tokens) {
    this.tokens = tokens;
  }

  addAssignment(assignment) {
    ///
  }

  nodeAsString(node) {
    const string = nodeAsString(node, this.tokens);

    return string;
  }

  nodesAsString(nodes) {
    const string = nodesAsString(nodes, this.tokens);

    return string;
  }

  static fromNothing(context) {
    const tokens = null,
          lexicContext = new LexicContext(context, tokens);

    return lexicContext;
  }
}
