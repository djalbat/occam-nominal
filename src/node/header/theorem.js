"use strict";

import HeaderNode from "../../node/header";

export default class TheoremHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(TheoremHeaderNode, ruleName, childNodes, opacity, precedence); }
}
