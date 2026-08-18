"use strict";

import DeclarationNode from "../../node/declaration";

import { COMBINATOR_RULE_NAME } from "../../ruleNames";

export default class ContainedDeclarationNode extends DeclarationNode {
  isMalformed() {
    const combinatorNode = this.getCombinatorNode(),
          malformed = combinatorNode.isMalformed();

    return malformed;
  }

  getCombinatorNode() {
    const ruleName = COMBINATOR_RULE_NAME,
          combinatorNode = this.getNodeByRuleName(ruleName);

    return combinatorNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(ContainedDeclarationNode, ruleName, childNodes, opacity, precedence); }
}
