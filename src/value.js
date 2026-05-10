"use strict";

export default class Value {
  constructor(context, string, node) {
    this.context = context;
    this.string = string;
    this.node = node;
  }

  getContext() {
    return this.context;
  }

  getString() {
    return this.string;
  }

  getNode() {
    return this.node;
  }

  static fromNode(node, context) {
    const string = context.nodeAsString(node),
          value = new Value(context, string, node);

    return value;
  }

  static fromSubstitution(substitution) {
    const replacementNode = substitution.getReplacementNode(),
          specificContext = substitution.getSpecificContext(),
          node = replacementNode, ///
          context = specificContext,  ///
          string = context.nodeAsString(node),
          value = new Value(context, string, node);

    return value;
  }
}
