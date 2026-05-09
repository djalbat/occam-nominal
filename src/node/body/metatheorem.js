"use strict";

import BodyNode from "../../node/body";

export default class MetatheoremBodyNode extends BodyNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BodyNode.fromRuleNameChildNodesOpacityAndPrecedence(MetatheoremBodyNode, ruleName, childNodes, opacity, precedence); }
}
