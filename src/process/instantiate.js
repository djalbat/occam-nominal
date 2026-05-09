"use strict";

import { ruleFromRuleName } from "../utilities/bnf";
import { TERM_RULE_NAME,
         TYPE_RULE_NAME,
         FRAME_RULE_NAME,
         LABEL_RULE_NAME,
         PREMISE_RULE_NAME,
         VARIABLE_RULE_NAME,
         EQUALITY_RULE_NAME,
         PROPERTY_RULE_NAME,
         JUDGEMENT_RULE_NAME,
         DEDUCTION_RULE_NAME,
         PARAMETER_RULE_NAME,
         STATEMENT_RULE_NAME,
         REFERENCE_RULE_NAME,
         SIGNATURE_RULE_NAME,
         COMBINATOR_RULE_NAME,
         CONCLUSION_RULE_NAME,
         HYPOTHESIS_RULE_NAME,
         ASSUMPTION_RULE_NAME,
         TYPE_PREFIX_RULE_NAME,
         SUPPOSITION_RULE_NAME,
         CONSTRUCTOR_RULE_NAME,
         EQUIVALENCE_RULE_NAME,
         METAVARIABLE_RULE_NAME,
         TYPE_ASSERTION_RULE_NAME,
         PROCEDURE_CALL_RULE_NAME,
         PROPERTY_RELATION_RULE_NAME,
         DEFINED_ASSERTION_RULE_NAME,
         TERM_SUBSTITUTION_RULE_NAME,
         PROPERTY_ASSERTION_RULE_NAME,
         SUBPROOF_ASSERTION_RULE_NAME,
         FRAME_SUBSTITUTION_RULE_NAME,
         PROCEDURE_REFERENCE_RULE_NAME,
         CONTAINED_ASSERTION_RULE_NAME,
         SIGNATURE_ASSERTION_RULE_NAME,
         META_LEVEL_ASSUMPTION_RULE_NAME,
         STATEMENT_SUBSTITUTION_RULE_NAME,
         REFERENCE_SUBSTITUTION_RULE_NAME } from "../ruleNames";

const termPlaceholderRule = ruleFromRuleName(TERM_RULE_NAME),
      typePlaceholderRule = ruleFromRuleName(TYPE_RULE_NAME),
      framePlaceholderRule = ruleFromRuleName(FRAME_RULE_NAME),
      labelPlaceholderRule = ruleFromRuleName(LABEL_RULE_NAME),
      premisePlaceholderRule = ruleFromRuleName(PREMISE_RULE_NAME),
      variablePlaceholderRule = ruleFromRuleName(VARIABLE_RULE_NAME),
      equalityPlaceholderRule = ruleFromRuleName(EQUALITY_RULE_NAME),
      propertyPlaceholderRule = ruleFromRuleName(PROPERTY_RULE_NAME),
      judgementlaceholderRule = ruleFromRuleName(JUDGEMENT_RULE_NAME),
      deductionPlaceholderRule = ruleFromRuleName(DEDUCTION_RULE_NAME),
      parameterPlaceholderRule = ruleFromRuleName(PARAMETER_RULE_NAME),
      statementPlaceholderRule = ruleFromRuleName(STATEMENT_RULE_NAME),
      referencePlaceholderRule = ruleFromRuleName(REFERENCE_RULE_NAME),
      signaturePlaceholderRule = ruleFromRuleName(SIGNATURE_RULE_NAME),
      combinatorPlaceholderRule = ruleFromRuleName(COMBINATOR_RULE_NAME),
      conclusionPlaceholderRule = ruleFromRuleName(CONCLUSION_RULE_NAME),
      hypothesisPlaceholderRule = ruleFromRuleName(HYPOTHESIS_RULE_NAME),
      assumptionPlaceholderRule = ruleFromRuleName(ASSUMPTION_RULE_NAME),
      typePrefixPlaceholderRule = ruleFromRuleName(TYPE_PREFIX_RULE_NAME),
      suppositionPlaceholderRule = ruleFromRuleName(SUPPOSITION_RULE_NAME),
      constructorPlaceholderRule = ruleFromRuleName(CONSTRUCTOR_RULE_NAME),
      equivalencePlaceholderRule = ruleFromRuleName(EQUIVALENCE_RULE_NAME),
      metavariablePlaceholderRule = ruleFromRuleName(METAVARIABLE_RULE_NAME),
      typeAssertionPlaceholderRule = ruleFromRuleName(TYPE_ASSERTION_RULE_NAME),
      procedureCallPlaceholderRule = ruleFromRuleName(PROCEDURE_CALL_RULE_NAME),
      propertyRelationlaceholderRule = ruleFromRuleName(PROPERTY_RELATION_RULE_NAME),
      definedAssertionPlaceholderRule = ruleFromRuleName(DEFINED_ASSERTION_RULE_NAME),
      termSubstitutionPlaceholderRule = ruleFromRuleName(TERM_SUBSTITUTION_RULE_NAME),
      subproofAssertionlaceholderRule = ruleFromRuleName(SUBPROOF_ASSERTION_RULE_NAME),
      propertyAssertionPlaceholderRule = ruleFromRuleName(PROPERTY_ASSERTION_RULE_NAME),
      frameSubstitutionPlaceholderRule = ruleFromRuleName(FRAME_SUBSTITUTION_RULE_NAME),
      procedureReferencelaceholderRule = ruleFromRuleName(PROCEDURE_REFERENCE_RULE_NAME),
      containedAssertionPlaceholderRule = ruleFromRuleName(CONTAINED_ASSERTION_RULE_NAME),
      signatureAssertionPlaceholderRule = ruleFromRuleName(SIGNATURE_ASSERTION_RULE_NAME),
      metaLevelAssumptionPlaceholderRule = ruleFromRuleName(META_LEVEL_ASSUMPTION_RULE_NAME),
      statementSubstitutionPlaceholderRule = ruleFromRuleName(STATEMENT_SUBSTITUTION_RULE_NAME),
      referenceSubstitutionPlaceholderRule = ruleFromRuleName(REFERENCE_SUBSTITUTION_RULE_NAME);

export function instantiatePremise(string, context) {
  string = `${string}
`;  ///

  return instantiate(premisePlaceholderRule, string, context);
}

export function instantiateDeduction(string, context) {
  string = `${string}
`;  ///

  return instantiate(deductionPlaceholderRule, string, context);
}

export function instantiateConclusion(string, context) {
  string = `${string}
`;  ///

  return instantiate(conclusionPlaceholderRule, string, context);
}

export function instantiateSupposition(string, context) {
  string = `${string}
`;  ///

  return instantiate(suppositionPlaceholderRule, string, context);
}

export function instantiateTerm(string, context) { return instantiate(termPlaceholderRule, string, context); }

export function instantiateType(string, context) { return instantiate(typePlaceholderRule, string, context); }

export function instantiateFrame(string, context) { return instantiate(framePlaceholderRule, string, context); }

export function instantiateLabel(string, context) { return instantiate(labelPlaceholderRule, string, context); }

export function instantiateVariable(string, context) { return instantiate(variablePlaceholderRule, string, context); }

export function instantiateEquality(string, context) { return instantiate(equalityPlaceholderRule, string, context); }

export function instantiateProperty(string, context) { return instantiate(propertyPlaceholderRule, string, context); }

export function instantiateJudgement(string, context) { return instantiate(judgementlaceholderRule, string, context); }

export function instantiateParameter(string, context) { return instantiate(parameterPlaceholderRule, string, context); }

export function instantiateStatement(string, context) { return instantiate(statementPlaceholderRule, string, context); }

export function instantiateReference(string, context) { return instantiate(referencePlaceholderRule, string, context); }

export function instantiateSignature(string, context) { return instantiate(signaturePlaceholderRule, string, context); }

export function instantiateCombinator(string, context) { return instantiate(combinatorPlaceholderRule, string, context); }

export function instantiateHypothesis(string, context) { return instantiate(hypothesisPlaceholderRule, string, context); }

export function instantiateAssumption(string, context) { return instantiate(assumptionPlaceholderRule, string, context); }

export function instantiateTypePrefix(string, context) { return instantiate(typePrefixPlaceholderRule, string, context); }

export function instantiateConstructor(string, context) { return instantiate(constructorPlaceholderRule, string, context); }

export function instantiateEquivalence(string, context) { return instantiate(equivalencePlaceholderRule, string, context); }

export function instantiateMetavariable(string, context) { return instantiate(metavariablePlaceholderRule, string, context); }

export function instantiateTypeAssertion(string, context) { return instantiate(typeAssertionPlaceholderRule, string, context); }

export function instantiateProcedureCall(string, context) { return instantiate(procedureCallPlaceholderRule, string, context); }

export function instantiatePropertyRelation(string, context) { return instantiate(propertyRelationlaceholderRule, string, context); }

export function instantiateDefinedAssertion(string, context) { return instantiate(definedAssertionPlaceholderRule, string, context); }

export function instantiateTermSubstitution(string, context) { return instantiate(termSubstitutionPlaceholderRule, string, context); }

export function instantiateSubproofAssertion(string, context) { return instantiate(subproofAssertionlaceholderRule, string, context); }

export function instantiatePropertyAssertion(string, context) { return instantiate(propertyAssertionPlaceholderRule, string, context); }

export function instantiateFrameSubstitution(string, context) { return instantiate(frameSubstitutionPlaceholderRule, string, context); }

export function instantiateProcedureReference(string, context) { return instantiate(procedureReferencelaceholderRule, string, context); }

export function instantiateContainedAssertion(string, context) { return instantiate(containedAssertionPlaceholderRule, string, context); }

export function instantiateSignatureAssertion(string, context) { return instantiate(signatureAssertionPlaceholderRule, string, context); }

export function instantiateMetaLevelAssumption(string, context) { return instantiate(metaLevelAssumptionPlaceholderRule, string, context); }

export function instantiateStatementSubstitution(string, context) { return instantiate(statementSubstitutionPlaceholderRule, string, context); }

export function instantiateReferenceSubstitution(string, context) { return instantiate(referenceSubstitutionPlaceholderRule, string, context); }

function instantiate(placeholderRule, string, context) {
  let node;

  const lexer = context.getLexer(),
        parser = context.getParser(),
        content = `${string}
`,
        tokens = lexer.tokenise(content);

  context.setTokens(tokens);

  const startRule = placeholderRule;  ///

  node = parser.parse(tokens, startRule);

  const nonTerminalNode = node; ///

  nonTerminalNode.someChildNode((childNode) => {
    node = childNode; ///

    return true;
  });

  return node;
}
