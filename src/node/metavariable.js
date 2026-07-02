"use strict";

import { NonTerminalNode } from "occam-languages";

import { TERM_RULE_NAME, TYPE_RULE_NAME } from "../ruleNames";

export default class MetavariableNode extends NonTerminalNode {
  getMetavariableName() {
    let metavariableName;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode, ///
              content = terminalNode.getContent();

        metavariableName = content; ///

        return true;
      }
    });

    return metavariableName;
  }

  getTermNode() {
    const ruleName = TERM_RULE_NAME,
          termNode = this.getNodeByRuleName(ruleName);

    return termNode;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(MetavariableNode, ruleName, childNodes, opacity, precedence); }
}
