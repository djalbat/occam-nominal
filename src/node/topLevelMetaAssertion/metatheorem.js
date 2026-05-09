"use strict";

import TopLevelMetaAssertionNode from "../../node/topLevelMetaAssertion";

import { METATHEOREM_BODY_RULE_NAME, METATHEOREM_HEADER_RULE_NAME } from "../../ruleNames";

export default class MetatheoremNode extends TopLevelMetaAssertionNode {
  static bodyRuleName = METATHEOREM_BODY_RULE_NAME;

  static headerRuleName = METATHEOREM_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return TopLevelMetaAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(MetatheoremNode, ruleName, childNodes, opacity, precedence); }
}
