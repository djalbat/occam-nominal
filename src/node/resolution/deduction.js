"use strict";

import ResolutionNode from "../../node/resolution";

export default class DeductionNode extends ResolutionNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return ResolutionNode.fromRuleNameChildNodesPrecedenceAndOpacity(DeductionNode, ruleName, childNodes, precedence, opacity); }
}
