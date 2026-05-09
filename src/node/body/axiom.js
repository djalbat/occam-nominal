"use strict";

import BodyNode from "../../node/body";

export default class AxiomBodyNode extends BodyNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BodyNode.fromRuleNameChildNodesOpacityAndPrecedence(AxiomBodyNode, ruleName, childNodes, opacity, precedence); }
}
