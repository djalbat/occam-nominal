"use strict";

import { NonTerminalNode } from "occam-languages";

import { TERM_RULE_NAME } from "../ruleNames";

export default class GeneratorNode extends NonTerminalNode {
  getTermNode() {
    const ruleName = TERM_RULE_NAME,
          termNode = this.getNodeByRuleName(ruleName);

    return termNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(GeneratorNode, ruleName, childNodes, opacity, precedence); }
}
