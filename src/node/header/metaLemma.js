"use strict";

import HeaderNode from "../../node/header";

export default class MetaLemmaHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(MetaLemmaHeaderNode, ruleName, childNodes, opacity, precedence); }
}
