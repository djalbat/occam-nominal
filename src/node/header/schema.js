"use strict";

import HeaderNode from "../../node/header";

export default class SchemaHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(SchemaHeaderNode, ruleName, childNodes, opacity, precedence); }
}
