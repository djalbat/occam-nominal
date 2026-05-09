"use strict";

import BodyNode from "../../node/body";

export default class TheoremBodyNode extends BodyNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BodyNode.fromRuleNameChildNodesOpacityAndPrecedence(TheoremBodyNode, ruleName, childNodes, opacity, precedence); }
}
