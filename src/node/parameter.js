"use strict";

import { NonTerminalNode } from "occam-languages";

import { NAME_TOKEN_TYPE, IDENTIFIER_TOKEN_TYPE } from "../tokenTypes";

export default class ParameterNode extends NonTerminalNode {
  getName() {
    let name = null;

    this.someTerminalNode((terminalNode, index) => {
      const type = terminalNode.getType();

      if (type === NAME_TOKEN_TYPE) {
        const content = terminalNode.getContent();

        name = content;  ///
      }

      if (index === 0) {
        return true;
      }
    });

    return name;
  }

  getIdentifier() {
    let identifier = null;

    this.someTerminalNode((terminalNode, index) => {
      const type = terminalNode.getType();

      if (type === IDENTIFIER_TOKEN_TYPE) {
        const content = terminalNode.getContent();

        identifier = content;  ///
      }

      if (index === 0) {
        return true;
      }
    });

    return identifier;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ParameterNode, ruleName, childNodes, precedence, opacity); }
}
