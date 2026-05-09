"use strict";

import { NonTerminalNode } from "occam-languages";

import { NAME_TOKEN_TYPE, IDENTIFIER_TOKEN_TYPE } from "../tokenTypes";

export default class ParameterNode extends NonTerminalNode {
  getName() {
    let name = null;

    this.someChildNode((childNode, index) => {
      const terminalNode = childNode, ///
            type = terminalNode.getType();

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

    this.someChildNode((childNode, index) => {
      const terminalNode = childNode, ///
            type = terminalNode.getType();

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

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ParameterNode, ruleName, childNodes, opacity, precedence); }
}
