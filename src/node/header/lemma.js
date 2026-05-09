"use strict";

import HeaderNode from "../../node/header";

export default class LemmaHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(LemmaHeaderNode, ruleName, childNodes, opacity, precedence); }
}
