"use strict";

import ResolutionNode from "../../node/resolution";

export default class ConclusionNode extends ResolutionNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return ResolutionNode.fromRuleNameChildNodesPrecedenceAndOpacity(ConclusionNode, ruleName, childNodes, precedence, opacity); }
}
