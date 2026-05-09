"use strict";

import HeaderNode from "../../node/header";

export default class RuleHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(RuleHeaderNode, ruleName, childNodes, opacity, precedence); }
}
