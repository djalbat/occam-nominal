"use strict";

import { Query } from "occam-query";

export function nodeQuery(expressionString) {
  const query = Query.fromExpressionString(expressionString);

  return function(node) {
    const nodes = query.execute(node);

    node = nodes.shift() || null; ///

    return node;
  };
}

export function nodesQuery(expressionString) {
  const query = Query.fromExpressionString(expressionString);

  return function(node) {
    const nodes = query.execute(node);

    return nodes;
  };
}
