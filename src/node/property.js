"use strict";

import { NonTerminalNode } from "occam-languages";

import { TERM_RULE_NAME, STUFF_RULE_NAME } from "../ruleNames";

export default class PropertyNode extends NonTerminalNode {
  isMalformed() {
    const stuffNode = this.getStuffNode(),
          malformed = (stuffNode !== null);

    return malformed;
  }

  getTermNode() {
    const ruleName = TERM_RULE_NAME,
          termNode = this.getNodeByRuleName(ruleName);

    return termNode;
  }

  getStuffNode() {
    const ruleName = STUFF_RULE_NAME,
          stuffNode = this.getNodeByRuleName(ruleName);

    return stuffNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(PropertyNode, ruleName, childNodes, opacity, precedence); }
}
