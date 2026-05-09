"use strict";

import HeaderNode from "../../node/header";

export default class MetatheoremHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(MetatheoremHeaderNode, ruleName, childNodes, opacity, precedence); }
}
