"use strict";

import { NonTerminalNode } from "occam-languages";

import { NAME_TOKEN_TYPE } from "../tokenTypes";
import { PARAMETER_RULE_NAME } from "../ruleNames";

export default class ProcedureReferenceNode extends NonTerminalNode {
  getName() {
    let name;

    const tokenType = NAME_TOKEN_TYPE;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent();

      name = content; ///

      return true;
    }, tokenType);

    return name;
  }

  getParameterNodes() {
    const ruleName = PARAMETER_RULE_NAME,
          parameterNodes = this.getNodesByRuleName(ruleName);

    return parameterNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ProcedureReferenceNode, ruleName, childNodes, opacity, precedence); }
}
