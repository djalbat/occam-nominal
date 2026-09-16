"use strict";

import { NonTerminalNode } from "occam-languages";

export default class VariableNode extends NonTerminalNode {
  getVariableIdentifier() {
    let variableIdentifier;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent();

      variableIdentifier = content; ///

      return true;
    });

    return variableIdentifier;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(VariableNode, ruleName, childNodes, opacity, precedence); }
}
