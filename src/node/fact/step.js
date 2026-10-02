"use strict";

import FactNode from "../../node/fact";

import { QUALIFICATION_RULE_NAME } from "../../ruleNames";

export default class StepNode extends FactNode {
  isStepNode() {
    const stepNode = true;

    return stepNode;
  }

  isSubproofNode() {
    const subproofNode = false;

    return subproofNode;
  }

  getReferenceNode() {
    let referenceNode = null;

    const qualificationNode = this.getQualificationNode();

    if (qualificationNode !== null) {
      referenceNode = qualificationNode.getReferenceNode();
    }

    return referenceNode;
  }

  getSchemaAssertionNode() {
    let schemaAssertionNode =  null;

    const qualificationNode = this.getQualificationNode();

    if (qualificationNode !== null) {
      schemaAssertionNode = qualificationNode.getSchemaAssertionNode();
    }

    return schemaAssertionNode;
  }

  getSignatureAssertionNode() {
    let signatureAssertionNode =  null;

    const qualificationNode = this.getQualificationNode();

    if (qualificationNode !== null) {
      signatureAssertionNode = qualificationNode.getSignatureAssertionNode();
    }

    return signatureAssertionNode;
  }

  getQualificationNode() {
    const ruleName = QUALIFICATION_RULE_NAME,
          qualificationNode = this.getNodeByRuleName(ruleName);

    return qualificationNode;
  }


  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return FactNode.fromRuleNameChildNodesPrecedenceAndOpacity(StepNode, ruleName, childNodes, precedence, opacity); }
}
