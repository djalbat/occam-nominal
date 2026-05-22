"use strict";

import BodyNode from "../../node/body";

export default class SchemaBodyNode extends BodyNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BodyNode.fromRuleNameChildNodesOpacityAndPrecedence(SchemaBodyNode, ruleName, childNodes, opacity, precedence); }
}
