"use strict";

import ResolutionNode from "../../node/resolution";

export default class ConclusionNode extends ResolutionNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return ResolutionNode.fromRuleNameChildNodesOpacityAndPrecedence(ConclusionNode, ruleName, childNodes, opacity, precedence); }
}
