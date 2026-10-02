"use strict";

import BodyNode from "../../node/body";

export default class LemmaBodyNode extends BodyNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return BodyNode.fromRuleNameChildNodesPrecedenceAndOpacity(LemmaBodyNode, ruleName, childNodes, precedence, opacity); }
}
