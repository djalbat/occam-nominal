"use strict";

import ResolutionNode from "../../node/resolution";

export default class DeductionNode extends ResolutionNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return ResolutionNode.fromRuleNameChildNodesOpacityAndPrecedence(DeductionNode, ruleName, childNodes, opacity, precedence); }
}
