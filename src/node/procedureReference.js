"use strict";

import { NonTerminalNode } from "occam-languages";

import { NAME_TOKEN_TYPE } from "../tokenTypes";
import { PARAMETER_RULE_NAME } from "../ruleNames";

export default class ProcedureReferenceNode extends NonTerminalNode {
  getName() {
    let name;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode, ///
              type = terminalNode.getType(),
              typeNameTokenType = (type === NAME_TOKEN_TYPE);

        if (typeNameTokenType) {
          const content = terminalNode.getContent();

          name = content; ///

          return true;
        }
      }
    });

    return name;
  }

  getParameterNodes() {
    const ruleName = PARAMETER_RULE_NAME,
          parameterNodes = this.getNodesByRuleName(ruleName);

    return parameterNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ProcedureReferenceNode, ruleName, childNodes, opacity, precedence); }
}
