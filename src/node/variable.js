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

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(VariableNode, ruleName, childNodes, precedence, opacity); }
}
