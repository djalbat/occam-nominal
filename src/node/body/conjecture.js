"use strict";

import BodyNode from "../../node/body";

export default class ConjectureBodyNode extends BodyNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BodyNode.fromRuleNameChildNodesOpacityAndPrecedence(ConjectureBodyNode, ruleName, childNodes, opacity, precedence); }
}
