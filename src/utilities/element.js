"use strict";

import elements from "../elements";

import { baseTypeFromNothing } from "../utilities/type";
import { equivalenceStringFromTerms,
         typeStringFromNominalTypeName,
         rulsStringFromLabelsPremisesAndConclusion,
         subproofStringFromSuppositionsAndSubDerivation,
         sectionStringFromHypothesesAndTopLevelAssertion,
         procedureCallStringFromProcedureReferenceAndParameters,
         topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction,
         complexTypeDeclarationStringFromTypeSuperTypesAndProvisional,
         topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction } from "../utilities/string";

export function typeFromTypeNode(typeNode, context) {
  let type;

  if (typeNode === null) {
    const baseType = baseTypeFromNothing();

    type = baseType;  ///
  } else {
    const { Type } = elements,
          node = typeNode,  ///
          name = nameFromTypeNode(typeNode, context),
          prefixName = prefixNameFromTypeNode(typeNode, context),
          superTypes = superTypesFromTypeNode(typeNode, context),
          properties = propertiesFromTypeNode(typeNode, context),
          provisional = provisionalFromTypeNode(typeNode, context),
          nominalTypeName = nominalTypeNameFromTypeNode(typeNode, context),
          typeString = typeStringFromNominalTypeName(nominalTypeName),
          string = typeString,  ///
          breakPoint = null;

    context = null;

    type = new Type(context, string, node, breakPoint, name, prefixName, superTypes, properties, provisional);
  }

  return type;
}

export function termFromTermNode(termNode, context) {
  const { Term } = elements,
        node = termNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        type = typeFromTermNode(termNode, context),
        provisional = provisionalFromTermNode(termNode, context);

  context = null;

  const term = new Term(context, string, node, breakPoint, type, provisional);

  return term;
}

export function stepFromStepNode(stepNode, context) {
  const { Step } = elements,
        node = stepNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromStepNode(stepNode, context),
        reference = referenceFromStepNode(stepNode, context),
        signatureAssertion = signatureAssertionFromStepNode(stepNode, context);

  context = null;

  const step = new Step(context, string, node, breakPoint, statement, reference, signatureAssertion);

  return step;
}

export function ruleFromRuleNode(ruleNode, context) {
  const { Rule } = elements,
        proof = proofFromRuleNode(ruleNode, context),
        labels = labelsFromRuleNode(ruleNode, context),
        premises = premisesFromRuleNode(ruleNode, context),
        conclusion = conclusionFromRuleNode(ruleNode, context),
        ruleString = rulsStringFromLabelsPremisesAndConclusion(labels, premises, conclusion),
        node = ruleNode,  ///
        string = ruleString,  ///
        breakPoint = null;

  context = null;

  const rule = new Rule(context, string, node, breakPoint, proof, labels, premises, conclusion);

  return rule;
}

export function labelFromLabelNode(labelNode, context) {
  const { Label } = elements,
        node = labelNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        metavariable = metavariableFromLabelNode(labelNode, context),
        label = new Label(context, string, node, breakPoint, metavariable);

  return label;
}

export function errorFromErrorNode(errorNode, context) {
  const { Error } = elements,
        node = errorNode, ///
        string = context.nodeAsString(node),
        breakPoint = null;

  context = null;

  const error = new Error(context, string, node, breakPoint);

  return error;
}

export function lemmaFromLemmaNode(lemmaNode, context) {
  const { Lemma } = elements,
        topLevelAsssertionNode = lemmaNode,  ///
        proof = proofFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        labels = labelsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        deduction = deductionFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        suppositions = suppositionsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        signature = signatureFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        hypotheses = hypothesesFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        topLevelAsssertionString = topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction(labels, signature, suppositions, deduction),
        node = lemmaNode, ///
        string = topLevelAsssertionString, ///
        breakPoint = null;

  context = null;

  const lemma = new Lemma(context, string, node, breakPoint, labels, suppositions, deduction, proof, signature, hypotheses);

  return lemma;
}

export function frameFromFrameNode(frameNode, context) {
  const { Frame } = elements,
        node = frameNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        assumptions = assumptionsFromFrameNode(frameNode, context),
        metavariable = metavariableFromFrameNode(frameNode, context);

  context = null;

  const frame = new Frame(context, string, node, breakPoint, assumptions, metavariable);

  return frame;
}

export function proofFromProofNode(proofNode, context) {
  const { Proof } = elements,
        node = proofNode, ///
        string = null,
        breakPoint = null,
        derivation = derivationFromProofNode(proofNode, context);

  context = null;

  const proof = new Proof(context, string, node, breakPoint, derivation);

  return proof;
}

export function axiomFromAxiomNode(axiomNode, context) {
  const { Axiom } = elements,
        topLevelAsssertionNode = axiomNode,  ///
        proof = proofFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        labels = labelsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        deduction = deductionFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        suppositions = suppositionsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        signature = signatureFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        hypotheses = hypothesesFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        topLevelAsssertionString = topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction(labels, signature, suppositions, deduction),
        node = axiomNode, ///
        string = topLevelAsssertionString, ///
        breakPoint = null;

  context = null;

  const axiom = new Axiom(context, string, node, breakPoint, labels, suppositions, deduction, proof, signature, hypotheses);

  return axiom;
}

export function sectionFromSectionNode(sectionNode, context) {
  const { Section } = elements,
        hypothesisNodes = sectionNode.getHypothesisNodes(),
        hypotheses = hypothesesFromHypothesisNodes(hypothesisNodes, context),
        topLevelAssertion = topLevelAssertionFromSectionNode(sectionNode, context),
        sectionString = sectionStringFromHypothesesAndTopLevelAssertion(hypotheses, topLevelAssertion),
        node = sectionNode, ///
        string = sectionString, ///
        breakPoint = null;

  context = null;

  const section = new Section(context, string, node, breakPoint, hypotheses, topLevelAssertion);

  return section;
}

export function premiseFromPremiseNode(premiseNode, context) {
  const { Premise } = elements,
        node = premiseNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromPremiseNode(premiseNode, context),
        procedureCall = procedureCallFromPremiseNode(premiseNode, context),
        premise = new Premise(context, string, node, breakPoint, statement, procedureCall);

  return premise
}

export function theoremFromTheoremNode(theoremNode, context) {
  const { Theorem } = elements,
        topLevelAsssertionNode = theoremNode,  ///
        proof = proofFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        labels = labelsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        deduction = deductionFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        suppositions = suppositionsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        signature = signatureFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        hypotheses = hypothesesFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        topLevelAsssertionString = topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction(labels, signature, suppositions, deduction),
        node = theoremNode, ///
        string = topLevelAsssertionString, ///
        breakPoint = null;

  context = null;

  const theorem = new Theorem(context, string, node, breakPoint, labels, suppositions, deduction, proof, signature, hypotheses);

  return theorem;
}

export function propertyFromPropertyNode(propertyNode, context) {
  let property = null;

  if (propertyNode != null) {
    const { Property } = elements,
          node = propertyNode, ///
          string = context.nodeAsString(node),
          breakPoint = null,
          name = nameFromPropertyNode(propertyNode, context),
          type = typeFromPropertyNode(propertyNode, context);

    context = null;

    property = new Property(context, string, node, breakPoint, name, type);
  }

  return property;
}

export function variableFromVariableNode(variableNode, context) {
  const { Variable } = elements,
        node = variableNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        type = typeFromVariableNode(variableNode, context),
        identifier = identifierFromVariableNode(variableNode, context),
        provisional = provisionalFromVariableNode(variableNode, context);

  context = null;

  const variable = new Variable(context, string, node, breakPoint, type, identifier, provisional);

  return variable;
}

export function subproofFromSubproofNode(subproofNode, context) {
  const { Subproof } = elements,
        node = subproofNode,  ///
        breakPoint = null,
        suppositions = suppositionsFromSubproofNode(subproofNode, context),
        subDerivation = subDerivationFromSubproofNode(subproofNode, context),
        subproofString = subproofStringFromSuppositionsAndSubDerivation(suppositions, subDerivation, context),
        string = subproofString;  ///

  context = null;

  const subproof = new Subproof(context, string, node, breakPoint, suppositions, subDerivation);

  return subproof;
}

export function equalityFromEqualityNode(equalityNode, context) {
  const { Equality } = elements,
        node = equalityNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        leftTerm = leftTermFromEqualityNode(equalityNode, context),
        rightTerm = rightTermFromEqualityNode(equalityNode, context);

  context = null;

  const equality = new Equality(context, string, node, breakPoint, leftTerm, rightTerm);

  return equality;
}

export function deductionFromDeductionNode(deductionNode, context) {
  const { Deduction } = elements,
        node = deductionNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromDeductionNode(deductionNode, context),
        deduction = new Deduction(context, string, node, breakPoint, statement);

  return deduction;
}

export function statementFromStatementNode(statementNode, context) {
  const { Statement } = elements,
        node = statementNode, ///
        string = context.nodeAsString(node),
        breakPoint = null;

  context = null;

  const statement = new Statement(context, string, node, breakPoint);

  return statement;
}

export function signatureFromSignatureNode(signatureNode, context) {
  const { Signature } = elements,
        node = signatureNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        terms = termsFromSignatureNode(signatureNode, context),
        signature = new Signature(context, string, node, breakPoint, terms);

  return signature;
}

export function referenceFromReferenceNode(referenceNode, context) {
  const { Reference } = elements,
        node = referenceNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        metavariable = metavariableFromReferenceNode(referenceNode, context),
        topLevelMetaAssertion = topLevelMetaAssertionFromReferenceNode(referenceNode, context),
        reference = new Reference(context, string, node, breakPoint, metavariable, topLevelMetaAssertion);

  return reference;
}

export function judgementFromJudgementNode(judgementNode, context) {
  const { Judgement } = elements,
        node = judgementNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        frame = frameFromJudgementNode(judgementNode, context),
        assumption = assumptionFromJudgementNode(judgementNode, context);

  context = null;

  const judgement = new Judgement(context, string, node, breakPoint, frame, assumption);

  return judgement;
}

export function metaLemmaFromMetaLemmaNode(metaLemmaNode, context) {
  const { MetaLemma } = elements,
        metaLemmaMetathoremNode = metaLemmaNode,  ///
        proof = proofFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        label = labelFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        deduction = deductionFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        suppositions = suppositionsFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        metaLevelAssumptions = metaLevelAssumptionsFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        topLevelMetaAssertionString = topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction(label, suppositions, deduction),
        node = metaLemmaMetathoremNode, ///
        string = topLevelMetaAssertionString, ///
        breakPoint = null;

  context = null;

  const metaLemma = new MetaLemma(context, string, node, breakPoint, label, suppositions, deduction, proof, metaLevelAssumptions);

  return metaLemma;
}

export function parameterFromParameterNode(parameterNode, context) {
  const { Parameter } = elements,
        node = parameterNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        name = nameFromParamterNode(parameterNode, context),
        identifier = identifierFromParamterNode(parameterNode, context);

  context = null;

  const parameter = new Parameter(context, string, node, breakPoint, name, identifier);

  return parameter;
}

export function hypothesisFromHypothesisNode(hypotheseNode, context) {
  const { Hypothesis } = elements,
        node = hypotheseNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromHypothesisNode(hypotheseNode, context);

  context = null;

  const hypohtesis = new Hypothesis(context, string, node, breakPoint, statement);

  return hypohtesis;
}

export function conjectureFromConjectureNode(conjectureNode, context) {
  const { Conjecture } = elements,
        topLevelAsssertionNode = conjectureNode,  ///
        proof = proofFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        labels = labelsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        deduction = deductionFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        suppositions = suppositionsFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        signature = signatureFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        hypotheses = hypothesesFromTopLevelAssertionNode(topLevelAsssertionNode, context),
        topLevelAsssertionString = topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction(labels, signature, suppositions, deduction),
        node = conjectureNode, ///
        string = topLevelAsssertionString, ///
        breakPoint = null;

  context = null;

  const conjecture = new Conjecture(context, string, node, breakPoint, labels, suppositions, deduction, proof, signature, hypotheses);

  return conjecture;
}

export function combinatorFromCombinatorNode(combinatorNode, context) {
  const { Combinator } = elements,
        node = combinatorNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromCombinatorNode(combinatorNode, context);

  context = null;

  const combinator = new Combinator(context, string, node, breakPoint, statement);

  return combinator;
}

export function conclusionFromConclusionNode(conclusionNode, context) {
  const { Conclusion } = elements,
        node = conclusionNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromConclusionNode(conclusionNode, context),
        conclusion = new Conclusion(context, string, node, breakPoint, statement);

  return conclusion;
}

export function derivationFromDerivationNode(derivationNode, context) {
  const { Derivation } = elements,
        node = derivationNode,  ///
        string = null,
        breakPoint = null,
        stepsOrSubproofs = stepsOrSubproofsFromDerivationNode(derivationNode, context);

  context = null;

  const derivation = new Derivation(context, string, node, breakPoint, stepsOrSubproofs);

  return derivation;
}

export function typePrefixFromTypePrefixNode(typePrefixNode, context) {
  const { TypePrefix } = elements,
        node = typePrefixNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        name = nameFromTypePrefixNode(typePrefixNode, context);

  context = null;

  const typePrefix = new TypePrefix(context, string, node, breakPoint, name);

  return typePrefix;
}

export function assumptionFromAssumptionNode(assumptionNode, context) {
  const { Assumption } = elements,
        node = assumptionNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        reference = referenceFromAssumptionNode(assumptionNode, context),
        statement = statementFromAssumptionNode(assumptionNode, context),
        assumption = new Assumption(context, string, node, breakPoint, reference, statement);

  return assumption;
}

export function constructorFromConstructorNode(constructorNode, context) {
  const { Constructor } = elements,
        node = constructorNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        term = termFromConstructorNode(constructorNode, context),
        type = typeFromConstructorNode(constructorNode, context);

  context = null;

  const constructor = new Constructor(context, string, node, breakPoint, term, type);

  return constructor;
}

export function suppositionFromSuppositionNode(suppositionNode, context) {
  const { Supposition } = elements,
        node = suppositionNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromSuppositionNode(suppositionNode, context),
        procedureCall = procedureCallFromSuppositionNode(suppositionNode, context),
        supposition = new Supposition(context, string, node, breakPoint, statement, procedureCall);

  return supposition
}

export function equivalenceFromEquivalenceNode(equivalenceNode, context) {
  const { Equivalence } = elements,
        node = equivalenceNode, ///
        breakPoint = null,
        type = typeFromEquivalenceNode(equivalenceNode, context),
        terms = termsFromEquivalenceNode(equivalenceNode, context),
        equivalenceString = equivalenceStringFromTerms(terms),
        string = equivalenceString; ///

  context = null;

  const equivalence = new Equivalence(context, string, node, breakPoint, type, terms);

  return equivalence;
}

export function metatheoremFromMetatheoremNode(metatheoremNode, context) {
  const { Metatheorem } = elements,
        metaLemmaMetathoremNode = metatheoremNode,  ///
        proof = proofFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        label = labelFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        deduction = deductionFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        suppositions = suppositionsFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        metaLevelAssumptions = metaLevelAssumptionsFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context),
        topLevelMetaAssertionString = topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction(label, suppositions, deduction),
        node = metaLemmaMetathoremNode, ///
        string = topLevelMetaAssertionString, ///
        breakPoint = null;

  context = null;

  const metatheorem = new Metatheorem(context, string, node, breakPoint, label, suppositions, deduction, proof, metaLevelAssumptions);

  return metatheorem;
}

export function metavariableFromMetavariableNode(metavariableNode, context) {
  const { Metavariable } = elements,
        node = metavariableNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        name = nameFromMetavariableNode(metavariableNode, context),
        term = termFromMetavariableNode(metavariableNode, context),
        type = typeFromMetavariableNode(metavariableNode, context),
        metaType = null;

  context = null;

  const metavariable = new Metavariable(context, string, node, breakPoint, name, term, type, metaType);

  return metavariable;
}

export function subDerivationFromSubDerivationNode(subDerivationNode, context) {
  const { SubDerivation } = elements,
        node = subDerivationNode, ///
        string = null,
        breakPoint = null,
        stepsOrSubproofs = stepsOrSubproofsFromSubDerivationNode(subDerivationNode, context);

  context = null;

  const subDerivation = new SubDerivation(context, string, node, breakPoint, stepsOrSubproofs);

  return subDerivation;
}

export function typeAssertionFromTypeAssertionNode(typeAssertionNode, context) {
  const { TypeAssertion } = elements,
        node = typeAssertionNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        term = termFromTypeAssertionNode(typeAssertionNode, context),
        type = typeFromTypeAssertionNode(typeAssertionNode, context);

  context = null;

  const typeAssertion = new TypeAssertion(context, string, node, breakPoint, term, type);

  return typeAssertion;
}

export function procedureCallFromProcedureCallNode(procedureCallNode, context) {
  const { ProcedureCall } = elements,
        parameters = parametersFromProcedureCallNode(procedureCallNode, context),
        procedureReference = procedureReferenceFromProcedureCallNode(procedureCallNode, context),
        procedureCallString = procedureCallStringFromProcedureReferenceAndParameters(procedureReference, parameters),
        node = procedureCallNode, ///
        string = procedureCallString, ///
        breakPoint = null;

  context = null;

  const procedureCall = new ProcedureCall(context, string, node, breakPoint, parameters, procedureReference);

  return procedureCall;
}

export function stepOrSubproofFromStepOrSubproofNode(stepOrSubproofNode, context) {
  const step = stepFromStepOrSubproofNode(stepOrSubproofNode, context),
        subproof = subproofFromStepOrSubproofNode(stepOrSubproofNode, context),
        stepOrSubproof = (step || subproof);

  return stepOrSubproof;
}

export function definedAssertionFromDefinedAssertionNode(definedAssertionNode, context) {
  const { DefinedAssertion } = elements,
        node = definedAssertionNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        negated = definedAssertionNode.isNegated(),
        term = termFromDefinedAssertionNode(definedAssertionNode, context),
        frame = frameFromDefinedAssertionNode(definedAssertionNode, context);

  context = null;

  const definedAssertion = new DefinedAssertion(context, string, node, breakPoint, term, frame, negated);

  return definedAssertion;
}

export function propertyRelationFromPropertyRelationNode(propertyRelationNode, context) {
  const { PropertyRelation } = elements,
        node = propertyRelationNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        term = termFromPropertyRelationNode(propertyRelationNode, context),
        property = propertyFromPropertyRelationNode(propertyRelationNode, context);

  context = null;

  const propertyRelation = new PropertyRelation(context, string, node, breakPoint, term, property);

  return propertyRelation;
}

export function termSubstitutionFromTermSubstitutionNode(termSubstitutionNode, generalContext, specificContext) {
  const { TermSubstitution } = elements,
        node = termSubstitutionNode,  ///
        context = specificContext,  ///
        contexts = [
          generalContext,
          specificContext
        ],
        string = context.nodeAsString(node),
        breakPoint = null,
        targetTerm = targetTermFromTermSubstitutionNode(termSubstitutionNode, context),
        replacementTerm = replacementTermFromTermSubstitutionNode(termSubstitutionNode, context),
        termSubstitution = new TermSubstitution(contexts, string, node, breakPoint, targetTerm, replacementTerm);

  return termSubstitution;
}

export function frameSubstitutionFromFrameSubstitutionNode(frameSubstitutionNode, generalContext, specificContext) {
  const { FrameSubstitution } = elements,
        node = frameSubstitutionNode,  ///
        context = specificContext,  ///
        contexts = [
          generalContext,
          specificContext
        ],
        string = context.nodeAsString(node),
        breakPoint = null,
        targetFrame = targetFrameFromFrameSubstitutionNode(frameSubstitutionNode, context),
        replacementFrame = replacementFrameFromFrameSubstitutionNode(frameSubstitutionNode, context),
        frameSubstitution = new FrameSubstitution(contexts, string, node, breakPoint, targetFrame, replacementFrame);

  return frameSubstitution;
}

export function propertyAssertionFromPropertyAssertionNode(propertyAssertionNode, context) {
  const { PropertyAssertion } = elements,
        node = propertyAssertionNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        term = termFromPropertyAssertionNode(propertyAssertionNode, context),
        propertyRelation = propertyRelationFromPropertyAssertionNode(propertyAssertionNode, context);

  context = null;

  const propertyAssertion = new PropertyAssertion(context, string, node, breakPoint, term, propertyRelation);

  return propertyAssertion;
}

export function subproofAssertionFromSubproofAssertionNode(subproofAssertionNode, context) {
  const { SubproofAssertion } = elements,
        node = subproofAssertionNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statements = statementsFromSubproofAssertionNode(subproofAssertionNode, context);

  context = null;

  const subproofAssertion = new SubproofAssertion(context, string, node, breakPoint, statements);

  return subproofAssertion;
}

export function containedAssertionFromContainedAssertionNode(containedAssertionNode, context) {
  const { ContainedAssertion } = elements,
        node = containedAssertionNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        term = termFromContainedAssertionNode(containedAssertionNode, context),
        frame = frameFromContainedAssertionNode(containedAssertionNode, context),
        negated = negatedFromContainedAssertionNode(containedAssertionNode, context),
        statement = statementFromContainedAssertionNode(containedAssertionNode, context);

  context = null;

  const containedAssertion = new ContainedAssertion(context, string, node, breakPoint, term, frame, negated, statement);

  return containedAssertion;
}

export function signatureAssertionFromSignatureAssertionNode(signatureAssertionNode, context) {
  const { SignatureAssertion } = elements,
        node = signatureAssertionNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        signature = signatureFromSignatureAssertionNode(signatureAssertionNode, context),
        reference = referenceFromSignatureAssertionNode(signatureAssertionNode, context);

  context = null;

  const signatureAssertion = new SignatureAssertion(context, string, node, breakPoint, signature, reference);

  return signatureAssertion;
}

export function procedureReferenceFromProcedureReferenceNode(procedureReferenceNode, context) {
  const { ProcedureReference } = elements,
        node = procedureReferenceNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        name = nameFromProcedureReferenceNode(procedureReferenceNode, context);

  context = null;

  const procedureRefereence = new ProcedureReference(context, string, node, breakPoint, name);

  return procedureRefereence;
}

export function propertyDeclarationFromPropertyDeclarationNode(propertyDeclarationNode, context) {
  const { PropertyDeclaration } = elements,
        node = propertyDeclarationNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        type = typeFromPropertyDeclarationNode(propertyDeclarationNode, context),
        property = propertyFromPropertyDeclarationNode(propertyDeclarationNode, context);

  context = null;

  const propertyDeclaration = new PropertyDeclaration(context, string, node, breakPoint, property, type);

  return propertyDeclaration;
}

export function variableDeclarationFromVariableDeclarationNode(variableDeclarationNode, context) {
  const { VariableDeclaration } = elements,
        node = variableDeclarationNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        type = typeFromVariableDeclarationNode(variableDeclarationNode, context),
        variable = variableFromVariableDeclarationNode(variableDeclarationNode, context),
        provisional = provisionalFromVariableDeclarationNode(variableDeclarationNode, context);

  context = null;

  const variableDeclaration = new VariableDeclaration(context, string, node, breakPoint, type, variable, provisional);

  return variableDeclaration;
}

export function metaLevelAssumptionFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context) {
  const { MetaLevelAssumption } = elements,
        node = metaLevelAssumptionNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        reference = referenceFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context),
        statement = statementFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context),
        metaLevelAssumption = new MetaLevelAssumption(context, string, node, breakPoint, reference, statement);

  return metaLevelAssumption;
}

export function bracketedCombinatorFromBracketedCombinatorNode(bracketedCombinatorNode, context) {
  const { BracketedCombinator } = elements,
        node = bracketedCombinatorNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        statement = statementFromBracketedCombinatorNode(bracketedCombinatorNode, context),
        bracketedCombinator = new BracketedCombinator(context, string, node, breakPoint, statement);

  return bracketedCombinator;
}

export function bracketedConstructorFromBracketedConstructorNode(bracketedConstructorNode, context) {
  const { BracketedConstructor } = elements,
        node = bracketedConstructorNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        term = termFromBracketedConstructorNode(bracketedConstructorNode, context),
        type = typeFromBracketedConstructorNode(bracketedConstructorNode, context),
        bracketedConstructor = new BracketedConstructor(context, string, node, breakPoint, term, type);

  return bracketedConstructor;
}

export function typePrefixDeclarationFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context) {
  const { TypePrefixDeclaration } = elements,
        node = typePrefixDeclarationNode, ///
        string = context.nodeAsString(node),  ///
        breakPoint = null,
        typePrefix = typePrefixFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context);

  context = null;

  const typePrefixDeclaration = new TypePrefixDeclaration(context, string, node, breakPoint, typePrefix);

  return typePrefixDeclaration;
}

export function combinatorDeclarationFromCombinatorDeclarationNode(combinatorDeclarationNode, context) {
  const { CombinatorDeclaration } = elements,
        node = combinatorDeclarationNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        combinator = combinatorFromCombinatorDeclarationNode(combinatorDeclarationNode, context);

  context = null;

  const combinatorDeclaration = new CombinatorDeclaration(context, string, node, breakPoint, combinator);

  return combinatorDeclaration;
}

export function simpleTypeDeclarationFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context) {
  const { SimpleTypeDeclaration } = elements,
        node = simpleTypeDeclarationNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        type = typeFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context),
        superTypes = superTypesFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context),
        provisional = provisionalFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context);

  context = null;

  const simpleTypeDeclaration = new SimpleTypeDeclaration(context, string, node, breakPoint, type, superTypes, provisional);

  return simpleTypeDeclaration;
}

export function referenceSubstitutionFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext, specificContext) {
  const { ReferenceSubstitution } = elements,
        node = referenceSubstitutionNode,  ///
        context = specificContext,  ///
        contexts = [
          generalContext,
          specificContext
        ],
        string = context.nodeAsString(node),
        breakPoint = null,
        targetReference = targetReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, context),
        replacementReference = replacementReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, context),
        referenceSubstitution = new ReferenceSubstitution(contexts, string, node, breakPoint, targetReference, replacementReference);

  return referenceSubstitution;
}

export function statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext) {
  const { StatementSubstitution } = elements,
        node = statementSubstitutionNode,  ///
        context = specificContext,  ///
        contexts = [
          generalContext,
          specificContext
        ],
        string = context.nodeAsString(node),
        breakPoint = null,
        resolved = resolvedFromStatementSubstitutionNode(statementSubstitutionNode, context),
        substitution = substitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext),
        targetStatement = targetStatementFromStatementSubstitutionNode(statementSubstitutionNode, context),
        replacementStatement = replacementStatementFromStatementSubstitutionNode(statementSubstitutionNode, context),
        statementSubstitution = new StatementSubstitution(contexts, string, node, breakPoint, resolved, substitution, targetStatement, replacementStatement);

  return statementSubstitution;
}

export function constructorDeclarationFromConstructorDeclarationNode(constructorDeclarationNode, context) {
  const { ConstructorDeclaration } = elements,
        node = constructorDeclarationNode, ///
        string = context.nodeAsString(node),
        breakPoint = null,
        type = typeFromConstructorDeclarationNode(constructorDeclarationNode, context),
        provisional = provisionalFromConstructorDeclarationNode(constructorDeclarationNode, context),
        constructor = constructorFromConstructorDeclarationNode(constructorDeclarationNode, context);

  context = null;

  const constructorDeclaration = new ConstructorDeclaration(context, string, node, breakPoint, type, provisional, constructor);

  return constructorDeclaration;
}

export function complexTypeDeclarationFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context) {
  const { ComplexTypeDeclaration } = elements,
        node = complexTypeDeclarationNode,  ///
        breakPoint = null,
        type = typeFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context),
        superTypes = superTypesFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context),
        provisional = provisionalFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context),
        propertyDeclarations = propertyDeclarationsFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context),
        complexTypeDeclarationString = complexTypeDeclarationStringFromTypeSuperTypesAndProvisional(type, superTypes, provisional),
        string = complexTypeDeclarationString;  ///

  context = null;

  const complexTypeDeclaration = new ComplexTypeDeclaration(context, string, node, breakPoint, type, superTypes, provisional, propertyDeclarations);

  return complexTypeDeclaration;
}

export function metavariableDeclarationFromMetavariableDeclarationNode(metavariableDeclarationNode, context) {
  const { MetavariableDeclaration } = elements,
        node = metavariableDeclarationNode,  ///
        string = context.nodeAsString(node),
        breakPoint = null,
        metaType = metaTypeFromMetavariableDeclarationNode(metavariableDeclarationNode, context),
        metavariable = metavariableFromMetavariableDeclarationNode(metavariableDeclarationNode, context);

  context = null;

  const metavariableDeclaration = new MetavariableDeclaration(context, string, node, breakPoint, metaType, metavariable);

  return metavariableDeclaration;
}

export function nameFromTypeNode(typeNode, context) {
  const typeName = typeNode.getTypeName(),
        name = typeName;  ///

  return name;
}

export function typeFromTermNode(termNode, context) {
  const type = null;

  return type;
}

export function proofFromRuleNode(ruleNode, context) {
  let proof = null;

  const proofNode = ruleNode.getProofNode();

  if (proofNode !== null) {
    proof = proofFromProofNode(proofNode, context);
  }

  return proof;
}

export function labelsFromRuleNode(ruleNode, context) {
  const labelNodes = ruleNode.getLabelNodes(),
        labels = labelsFromLabelNodes(labelNodes, context);

  return labels;
}

export function variableFromTermNode(termNode, context) {
  let variable = null;

  const variableNode = termNode.getVariableNode();

  if (variableNode !== null) {
    variable = variableFromVariableNode(variableNode, context);
  }

  return variable;
}

export function premisesFromRuleNode(ruleNode, context) {
  const premiseNodes = ruleNode.getPremiseNodes(),
        premises = premisesFromPremiseNodes(premiseNodes, context);

  return premises;
}

export function axiomFromSectionNode(sectionNode, context) {
  let axiom = null;

  const axiomNode = sectionNode.getAxiomNode();

  if (axiomNode !== null) {
    axiom = axiomFromAxiomNode(axiomNode, context);
  }

  return axiom;
}

export function lemmaFromSectionNode(sectionNode, context) {
  let lemma = null;

  const lemmaNode = sectionNode.getLemmaNode();

  if (lemmaNode !== null) {
    lemma = lemmaFromLemmaNode(lemmaNode, context);
  }

  return lemma;
}

export function nameFromPropertyNode(propertyNode, context) {
  const propertyName = propertyNode.getPropertyName(),
        name = propertyName;

  return name;
}

export function typeFromPropertyNode(propertyNode, context) {
  const type = null;  ///

  return type;
}

export function typeFromVariableNode(variableNode, context) {
  const type = null;

  return type;
}

export function nameFromParamterNode(parameterNode, context) {
  const name = parameterNode.getName();

  return name;
}

export function statementFromStepNode(stepNode, context) {
  let statement = null;

  const statementNode = stepNode.getStatementNode();

  if (statementNode !== null) {
    statement = statementFromStatementNode(statementNode, context);
  }

  return statement;
}

export function referenceFromStepNode(stepNode, context) {
  let reference = null;

  const referenceNode = stepNode.getReferenceNode();

  if (referenceNode !== null) {
    const { Reference } = elements,
          referenceString = context.nodeAsString(referenceNode);

    reference = Reference.fromReferenceString(referenceString, context);
  }

  return reference;
}

export function nameFromParaneterNode(parameterNode, context) {
  const name = parameterNode.getName();

  return name;
}

export function superTypesFromTypeNode(typeNode, context) {
  const superTypes = null;

  return superTypes;
}

export function propertiesFromTypeNode(typeNode, context) {
  const properties = null;

  return properties;
}

export function prefixNameFromTypeNode(typeNode, context) {
  const typePrefixName = typeNode.getTypePrefixName(),
        prefixName = typePrefixName;  ///

  return prefixName;
}

export function conclusionFromRuleNode(ruleNode, context) {
  const conclusionNode = ruleNode.getConclusionNode(),
        conclusion = conclusionFromConclusionNode(conclusionNode, context);

  return conclusion;
}

export function theoremFromSectionNode(sectionNode, context) {
  let theorem = null;

  const theoremNode = sectionNode.getTheoremNode();

  if (theoremNode !== null) {
    theorem = theoremFromTheoremNode(theoremNode, context);
  }

  return theorem;
}

export function frameFromJudgementNode(judgementNode, context) {
  const frameNode = judgementNode.getFrameNode(),
        frame = frameFromFrameNode(frameNode, context);

  return frame;
}

export function termsFromSignatureNode(signatureNode, context) {
  const termNodes = signatureNode.getTermNodes(),
        terms = termsFromTermNodes(termNodes, context);

  return terms;
}

export function nameFromTypePrefixNode(typePrefixNode, context) {
  const typePrefixName = typePrefixNode.getTypePrefixName(),
        name = typePrefixName;  ///

  return name;
}

export function provisionalFromTypeNode(typeNode, context) {
  const provisional = null;

  return provisional;
}

export function provisionalFromTermNode(termNode, context) {
  const provisional = null;

  return provisional;
}

export function derivationFromProofNode(proofNode, context) {
  const derivationNode = proofNode.getDerivationNode(),
        derivation = derivationFromDerivationNode(derivationNode, context);

  return derivation;
}

export function termFromConstructorNode(ocnstructorNode, context) {
  const termNode = ocnstructorNode.getTermNode(),
        term = termFromTermNode(termNode, context);

  return term;
}

export function typeFromConstructorNode(ocnstructorNode, context) {
  const type = null;

  return type;
}

export function typeFromEquivalenceNode(equivalenceNode, context) {
  const type = null;

  return type;
}

export function assumptionsFromFrameNode(frameNode, context) {
  const assumptionNodes = frameNode.getAssumptionNodes(),
        assumptions = assumptionsFromAssumptionNodes(assumptionNodes, context);

  return assumptions;
}

export function statementFromPremiseNode(premiseNode, context) {
  let statement = null;

  const statementNode = premiseNode.getStatementNode();

  if (statementNode !== null) {
    statement = statementFromStatementNode(statementNode, context);
  }

  return statement;
}

export function leftTermFromEqualityNode(equalityNode, context) {
  const leftTermNode = equalityNode.getLeftTermNode(),
        leftTerm = termFromTermNode(leftTermNode, context);

  return leftTerm;
}

export function termsFromEquivalenceNode(equivalenceNode, context) {
  const termNodes = equivalenceNode.getTermNodes(),
        terms = termsFromTermNodes(termNodes, context);

  return terms;
}

export function nameFromMetavariableNode(metavariableNode, context) {
  const metavaraibleName = metavariableNode.getMetavariableName(),
        name = metavaraibleName;  ///

  return name;
}

export function termFromMetavariableNode(metavariableNode, context) {
  let term = null;

  const termNode = metavariableNode.getTermNode();

  if (termNode !== null) {
    term = termFromTermNode(termNode, context);
  }

  return term;
}

export function typeFromMetavariableNode(metavariableNode, context) {
  let type = null;

  const typemNode = metavariableNode.getTypeNode();

  if (typemNode !== null) {
    type = typeFromTypeNode(typemNode, context);
  }

  return type;
}

export function metavariableFromFrameNode(frameNode, context) {
  let metavariable = null;

  const metavariableNode = frameNode.getMetavariableNode();

  if (metavariableNode !== null) {
    metavariable = metavariableFromMetavariableNode(metavariableNode, context);
  }

  return metavariable;
}

export function metavariableFromLabelNode(labelNode, context) {
  const metavariableNode = labelNode.getMetavariableNode(),
        metavariable = metavariableFromMetavariableNode(metavariableNode, context);

  return metavariable;
}

export function conjectureFromSectionNode(sectionNode, context) {
  let conjecture = null;

  const conjectureNode = sectionNode.getConjectureNode();

  if (conjectureNode !== null) {
    conjecture = conjectureFromConjectureNode(conjectureNode, context);
  }

  return conjecture;
}

export function rightTermFromEqualityNode(equalityNode, context) {
  const rightTermNode = equalityNode.getRightTermNode(),
        rightTerm = termFromTermNode(rightTermNode, context);

  return rightTerm;
}

export function equalityFromStatementNode(statementNode, context) {
  let equality = null;

  const equalityNode = statementNode.getEqualityNode();

  if (equalityNode !== null) {
    equality = equalityFromEqualityNode(equalityNode, context);
  }

  return equality;
}

export function termFromTypeAssertionNode(typeAssertionNode, context) {
  const termNode = typeAssertionNode.getTermNode(),
        term = termFromTermNode(termNode, context);

  return term;
}

export function typeFromTypeAssertionNode(typeAssertionNode, context) {
  const typeNode = typeAssertionNode.getTypeNode(),
        type = typeFromTypeNode(typeNode, context);

  return type;
}

export function identifierFromVariableNode(variableNode, context) {
  const variableIdentifier = variableNode.getVariableIdentifier(),
    identifier = variableIdentifier;  ///

  return identifier;
}

export function identifierFromParamterNode(parameterNode, context) {
  const identifier = parameterNode.getIdentifier();

  return identifier;
}

export function statementFromDeductionNode(deductionNode, context) {
  let statement = null;

  const statementNode = deductionNode.getStatementNode();

  if (statementNode !== null) {
    statement = statementFromStatementNode(statementNode, context);
  }

  return statement;
}

export function judgementFromStatementNode(statementNode, context) {
  let judgement = null;

  const judgementNode = statementNode.getJudgementNode();

  if (judgementNode !== null) {
    judgement = judgementFromJudgementNode(judgementNode, context);
  }

  return judgement;
}

export function stepFromStepOrSubproofNode(stepOrSubproofNode, context) {
  let step = null;

  const stepOrSubproofNodeStepNode = stepOrSubproofNode.isStepNode();

  if (stepOrSubproofNodeStepNode) {
    const stepNode = stepOrSubproofNode;  ///

    step = stepFromStepNode(stepNode, context);
  }

  return step;
}

export function nominalTypeNameFromTypeNode(typeNode, context) {
  const nominalTypeName = typeNode.getNominalTypeName();

  return nominalTypeName;
}

export function provisionalFromVariableNode(variableNode, context) {
  const provisional = null;

  return provisional;
}

export function assumptionFromJudgementNode(judgementNode, context) {
  const assumptionNode = judgementNode.getAssumptionNode(),
        assumption = assumptionFromAssumptionNode(assumptionNode, context);

  return assumption;
}

export function identifierFromParameterNode(parameterNode, context) {
  const identifier = parameterNode.getIdentifier();

  return identifier;
}

export function referenceFromAssumptionNode(assumptionNode, context) {
  const metavariableNode = assumptionNode.getMetavariableNode(),
    reference = referenceFromMetavariableNode(metavariableNode, context);

  return reference;
}

export function statementFromAssumptionNode(assumptionNode, context) {
  const statesmentNode = assumptionNode.getStatementNode(),
        statement = statementFromStatementNode(statesmentNode, context);

  return statement;
}

export function statementFromCombinatorNode(combinatorNode, context) {
  const statementNode = combinatorNode.getStatementNode(),
        statement = statementFromStatementNode(statementNode, context);

  return statement;
}

export function statementFromConclusionNode(conclusinoNode, context) {
  let statement = null;

  const statementNode = conclusinoNode.getStatementNode();

  if (statementNode !== null) {
    statement = statementFromStatementNode(statementNode, context);
  }

  return statement;
}

export function statementFromHypothesisNode(hypothesisNode, context) {
  let statement = null;

  const statementNode = hypothesisNode.getStatementNode();

  if (statementNode !== null) {
    statement = statementFromStatementNode(statementNode, context);
  }

  return statement;
}

export function procedureCallFromPremiseNode(premiseNode, context) {
  let procedureCall = null;

  const procedureCallNode = premiseNode.getProcedureCallNode();

  if (procedureCallNode !== null) {
    procedureCall = procedureCallFromProcedureCallNode(procedureCallNode, context);
  }

  return procedureCall;
}

export function suppositionsFromSubproofNode(subproofNode, context) {
  const suppositionNodes = subproofNode.getSuppositionNodes(),
        suppositions = suppositionsFromSuppositionNodes(suppositionNodes, context);

  return suppositions;
}

export function statementFromSuppositionNode(suppositionNode, context) {
  let statement = null;

  const statementNode = suppositionNode.getStatementNode();

  if (statementNode !== null) {
    statement = statementFromStatementNode(statementNode, context);
  }

  return statement; ///
}

export function termFromDefinedAssertionNode(definedAssertionNode, context) {
  let term = null;

  const termNode = definedAssertionNode.getTermNode();

  if (termNode !== null) {
    term = termFromTermNode(termNode, context);
  }

  return term;
}

export function termFromPropertyRelationNode(propertyRelationNode, context) {
  const termNode = propertyRelationNode.getTermNode(),
        term = termFromTermNode(termNode, context);

  return term;
}

export function subDerivationFromSubproofNode(subproofNode, context) {
  const subDerivationNode = subproofNode.getSubDerivationNode(),
        subDerviation = subDerivationFromSubDerivationNode(subDerivationNode, context);

  return subDerviation;
}

export function metavariableFromStatementNode(statementNode, context) {
  let metavariable = null;

  const metavariableNode = statementNode.getMetavariableNode();

  if (metavariableNode !== null) {
    metavariable = metavariableFromMetavariableNode(metavariableNode, context);
  }

  return metavariable;
}

export function metavariableFromReferenceNode(referenceNode, context) {
  const metavariableNode = referenceNode.getMetavariableNode(),
        metavariable = metavariableFromMetavariableNode(metavariableNode, context);

  return metavariable;
}

export function referenceFromMetavariableNode(metavariableNode, context) {
  const { Reference } = elements,
        metavariableString = context.nodeAsString(metavariableNode),
        referenceString = metavariableString, ///
        reference = Reference.fromReferenceString(referenceString, context);

  return reference;
}

export function termFromJDefinedAssertionNode(definedAssertionNode, context) {
  let term = null;

  const termNode = definedAssertionNode.getTermNode();

  if (termNode !== null) {
    term = termFromTermNode(termNode, context);
  }

  return term
}

export function frameFromDefinedAssertionNode(definedAssertionNode, context) {
  let frame = null;

  const frameNode = definedAssertionNode.getFrameNode();

  if (frameNode !== null) {
    frame = frameFromFrameNode(frameNode, context);
  }

  return frame;
}

export function termFromPropertyAssertionNode(propertyAssertionNode, context) {
  const termNode = propertyAssertionNode.getTermNode(),
        term = termFromTermNode(termNode, context);

  return term;
}

export function signatureAssertionFromStepNode(stepNode, context) {
  let signatureAssertion = null;

  const signatureAssertionNode = stepNode.getSignatureAssertionNode();

  if (signatureAssertionNode !== null) {
    signatureAssertion = signatureAssertionFromSignatureAssertionNode(signatureAssertionNode, context);
  }

  return signatureAssertion;
}

export function typeAssertionFromStatementNode(statementNode, context) {
  let typeAssertion = null;

  const typeAssertionNode = statementNode.getTypeAssertionNode();

  if (typeAssertionNode !== null) {
    typeAssertion = typeAssertionFromTypeAssertionNode(typeAssertionNode, context);
  }

  return typeAssertion;
}

export function frameFromJDefinedAssertionNode(definedAssertionNode, context) {
  let frame = null;

  const frameNode = definedAssertionNode.getFrameNode();

  if (frameNode !== null) {
    frame = frameFromFrameNode(frameNode, context);
  }

  return frame
}

export function proofFromTopLevelAssertionNode(topLevelAsssertionNode, context) {
  let proof = null;

  const proofNode = topLevelAsssertionNode.getProofNode();

  if (proofNode !== null) {
    proof = proofFromProofNode(proofNode, context);
  }

  return proof;
}

export function subproofFromStepOrSubproofNode(subproofOrSubproofNode, context) {
  let subproof = null;

  const subproofOrSubproofNodeSubproofNode = subproofOrSubproofNode.isSubproofNode();

  if (subproofOrSubproofNodeSubproofNode) {
    const subproofNode = subproofOrSubproofNode;  ///

    subproof = subproofFromSubproofNode(subproofNode, context);
  }

  return subproof;
}

export function termFromContainedAssertionNode(containedAssertionNode, context) {
  let term = null;

  const termNode = containedAssertionNode.getTermNode();

  if (termNode !== null) {
    term = termFromTermNode(termNode, context);
  }

  return term;
}

export function nameFromProcedureReferenceNode(procedureReferenceNode, context) {
  const name = procedureReferenceNode.getName();

  return name;
}

export function parametersFromProcedureCallNode(procedureCallNode, context) {
  const parameterNodes = procedureCallNode.getParameterNodes(),
        parameters = parametersFromParameterNodes(parameterNodes, context);

  return parameters;
}

export function frameFromContainedAssertionNode(containedAssertionNode, context) {
  let frame = null;

  const frameNode = containedAssertionNode.getFrameNode();

  if (frameNode !== null) {
    frame = frameFromFrameNode(frameNode, context)
  }

  return frame;
}

export function labelsFromTopLevelAssertionNode(topLevelAsssertionNode, context) {
  const labelNodes = topLevelAsssertionNode.getLabelNodes(),
        labels = labelsFromLabelNodes(labelNodes, context);

  return labels;
}

export function typeFromPropertyDeclarationNode(propertyDeclarationNode, context) {
  const typeNode = propertyDeclarationNode.getTypeNode(),
        type = typeFromTypeNode(typeNode, context);

  return type;
}

export function typeFromVariableDeclarationNode(variableDeclarationNode, context) {
  const typeNode = variableDeclarationNode.getTypeNode(),
        type = typeFromTypeNode(typeNode, context);

  return type;
}

export function topLevelAssertionFromSectionNode(sectionNode, context) {
  const axiom = axiomFromSectionNode(sectionNode, context),
        lemma = lemmaFromSectionNode(sectionNode, context),
        theorem = theoremFromSectionNode(sectionNode, context),
        conjecture = conjectureFromSectionNode(sectionNode, context),
        topLevelAssertion = (axiom || lemma || theorem || conjecture);

  return topLevelAssertion;
}

export function procedureCallFromSuppositionNode(suppositionNode, context) {
  let procedureCall = null;

  const procedureCallNode = suppositionNode.getProcedureCallNode();

  if (procedureCallNode !== null) {
    procedureCall = procedureCallFromProcedureCallNode(procedureCallNode, context);
  }

  return procedureCall;
}

export function negatedFromJDefinedAssertionNode(definedAssertionNode, context) {
  const negated = definedAssertionNode.isNegated();

  return negated
}

export function propertyFromPropertyRelationNode(propertyRelationNode, context) {
  const propertyNode = propertyRelationNode.getPropertyNode(),
        property = propertyFromPropertyNode(propertyNode, context);

  return property;
}

export function termFromBracketedConstructorNode(bracketedCcnstructorNode, context) {
  const termNode = bracketedCcnstructorNode.getTermNode(),
        term = termFromTermNode(termNode, context);

  return term;
}

export function typeFromBracketedConstructorNode(bracketedCcnstructorNode, context) {
  const baseType = baseTypeFromNothing(),
        type = baseType;  ///

  return type;
}

export function definedAssertionFromStatementNode(statementNode, context) {
  let definedAssertion = null;

  const definedAssertionNode = statementNode.getDefinedAssertionNode();

  if (definedAssertionNode !== null) {
    definedAssertion = definedAssertionFromDefinedAssertionNode(definedAssertionNode, context);
  }

  return definedAssertion;
}

export function negatedFromContainedAssertionNode(containedAssertionNode, context) {
  const negated = containedAssertionNode.isNegated();

  return negated;
}

export function typeFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context) {
  const typeNode = simpleTypeDeclarationNode.getTypeNode(),
        type = typeFromTypeNode(typeNode, context);

  return type;
}

export function targetTermFromTermSubstitutionNode(termSubstitutionNode, context) {
  const targetTermNode = termSubstitutionNode.getTargetTermNode(),
        targetTerm = termFromTermNode(targetTermNode, context);

  return targetTerm;
}

export function deductionFromTopLevelAssertionNode(topLevelAsssertionNode, context) {
  const deductionNode = topLevelAsssertionNode.getDeductionNode(),
        deduction = deductionFromDeductionNode(deductionNode, context);

  return deduction;
}

export function signatureFromTopLevelAssertionNode(topLevelAsssertionNode, context) {
  let signature = null;

  const signatureNode = topLevelAsssertionNode.getSignatureNode();

  if (signatureNode !== null) {
    const { Signature } = elements,
          signatureString = context.nodeAsString(signatureNode);

    signature = Signature.fromSignatureString(signatureString, context);
  }

  return signature;
}

export function proofFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context) {
  const proofNode = metaLemmaMetathoremNode.getProofNode(),
        proof = proofFromProofNode(proofNode, context);

  return proof;
}

export function labelFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context) {
  const { Label } = elements,
        labelNode = metaLemmaMetathoremNode.getLabelNode(),
        labelString = context.nodeAsString(labelNode),
        label = Label.fromLabelString(labelString, context);

  return label;
}

export function propertyAssertionFromStatementNode(statementNode, context) {
  let propertyAssertion = null;

  const propertyAssertionNode = statementNode.getPropertyAssertionNode();

  if (propertyAssertionNode !== null) {
    propertyAssertion = propertyAssertionFromPropertyAssertionNode(propertyAssertionNode, context);
  }

  return propertyAssertion;
}

export function subproofAssertionFromStatementNode(statementNode, context) {
  let subproofAssertion = null;

  const subproofAssertionNode = statementNode.getSubproofAssertionNode();

  if (subproofAssertionNode !== null) {
    subproofAssertion = subproofAssertionFromSubproofAssertionNode(subproofAssertionNode, context);
  }

  return subproofAssertion;
}

export function typeFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context) {
  const typeNode = complexTypeDeclarationNode.getTypeNode(),
        type = typeFromTypeNode(typeNode, context);

  return type;
}

export function typeFromConstructorDeclarationNode(constructorDeclarationNode, context) {
  const typeNode = constructorDeclarationNode.getTypeNode(),
        type = typeFromTypeNode(typeNode, context);

  return type;
}

export function containedAssertionFromStatementNode(statementNode, context) {0
  let containedAssertion = null;

  const containedAssertionNode = statementNode.getContainedAssertionNode();

  if (containedAssertionNode !== null) {
    containedAssertion = containedAssertionFromContainedAssertionNode(containedAssertionNode, context);
  }

  return containedAssertion;
}

export function signatureAssertionFromStatementNode(statementNode, context) {
  let signatureAssertion = null;

  const signatureAssertionNode = statementNode.getSignatureAssertionNode();

  if (signatureAssertionNode !== null) {
    signatureAssertion = signatureAssertionFromSignatureAssertionNode(signatureAssertionNode, context);
  }

  return signatureAssertion;
}

export function statementsFromSubproofAssertionNode(subproofAssertionNode, context) {
  const statementNodes = subproofAssertionNode.getStatementNodes(),
        statements = statementsFromStatementNodes(statementNodes, context);

  return statements;
}

export function statementFromContainedAssertionNode(containedAssertionNode, context) {
  const statementNode = containedAssertionNode.getStatementNode(),
        statement = statementFromStatementNode(statementNode, context);

  return statement;
}

export function signatureFromSignatureAssertionNode(signatureAssertionNode, context) {
  const { Signature } = elements,
        signatureNode = signatureAssertionNode.getSignatureNode(),
        signatureString = context.nodeAsString(signatureNode),
        signature = Signature.fromSignatureString(signatureString, context);

  return signature;
}

export function referenceFromSignatureAssertionNode(signatureAssertionNode, context) {
  const metavariableNode = signatureAssertionNode.getMetavariableNode(),
        reference = referenceFromMetavariableNode(metavariableNode, context);

  return reference;
}

export function hypothesesFromTopLevelAssertionNode(topLevelAsssertionNode, context) {
  const ypotheses = [];

  return ypotheses;
}

export function propertyFromPropertyDeclarationNode(propertyDeclarationNode, context) {
  const propertyNode = propertyDeclarationNode.getPropertyNode(),
        property = propertyFromPropertyNode(propertyNode, context);

  return property;
}

export function variableFromVariableDeclarationNode(variableDeclarationNode, context) {
  const variableNode = variableDeclarationNode.getVariableNode(),
        variable = variableFromVariableNode(variableNode, context);

  return variable;
}

export function statementFromBracketedCombinatorNode(bracketedCombinatorNode, context) {
  const statementNode = bracketedCombinatorNode.getStatementNode(),
        statement = statementFromStatementNode(statementNode, context);

  return statement;
}

export function targetFrameFromFrameSubstitutionNode(frameSubstitutionNode, context) {
  const targetFrameNode = frameSubstitutionNode.getTargetFrameNode(),
        targetFrame = frameFromFrameNode(targetFrameNode, context);

  return targetFrame;
}

export function referenceFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context) {
  const { Reference } = elements,
        referenceNode = metaLevelAssumptionNode.getReferenceNode(),
        referenceString = context.nodeAsString(referenceNode),
        reference = Reference.fromReferenceString(referenceString, context);

  return reference;
}

export function statementFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context) {
  const statementNode = metaLevelAssumptionNode.getStatementNode(),
        statement = statementFromStatementNode(statementNode, context);

  return statement;
}

export function suppositionsFromTopLevelAssertionNode(topLevelAsssertionNode, context) {
  const suppositionNodes = topLevelAsssertionNode.getSuppositionNodes(),
        suppositions = suppositionsFromSuppositionNodes(suppositionNodes, context);

  return suppositions;
}

export function resolvedFromStatementSubstitutionNode(statementSubstitutionNode, context) {
  const resolved = statementSubstitutionNode.isResolved();

  return resolved;
}

export function topLevelMetaAssertionFromReferenceNode(referenceNode, context) {
  const topLevelMetaAssertion = null;

  return topLevelMetaAssertion;
}

export function deductionFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context) {
  const deductionNode = metaLemmaMetathoremNode.getDeductionNode(),
        deduction = deductionFromDeductionNode(deductionNode, context);

  return deduction;
}

export function provisionalFromVariableDeclarationNode(variableDeclarationNode, context) {
  const provisional = variableDeclarationNode.isProvisional();

  return provisional;
}

export function procedureReferenceFromProcedureCallNode(procedureCallNode, context) {
  const procedureReferenceNode = procedureCallNode.getProcedureReferenceNode(),
        procedureReference = procedureReferenceFromProcedureReferenceNode(procedureReferenceNode, context);

  return procedureReference;
}

export function replacementTermFromTermSubstitutionNode(termSubstitutionNode, context) {
  const replacementTermNode = termSubstitutionNode.getReplacementTermNode(),
        replacementTerm = termFromTermNode(replacementTermNode, context);

  return replacementTerm;
}

export function superTypesFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context) {
  let superTypes = [];

  const typesNode = simpleTypeDeclarationNode.getTypesNode();

  if (typesNode !== null) {
    const types = typesFromTypesNode(typesNode, context);

    superTypes = types; ///
  }

  return superTypes;
}

export function typePrefixFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context) {
  const typePrefixNode = typePrefixDeclarationNode.getTypePrefixNode(),
        typePrefix = typePrefixFromTypePrefixNode(typePrefixNode, context);

  return typePrefix;
}

export function combinatorFromCombinatorDeclarationNode(combinatorDeclarationNode, context) {
  const combinatorNode = combinatorDeclarationNode.getCombinatorNode(),
        combinator = combinatorFromCombinatorNode(combinatorNode, context);

  return combinator;
}

export function metaTypeFromMetavariableDeclarationNode(metavariableDeclarationNode, context) {
  const metaTypeName = metavariableDeclarationNode.getMetaTypeName(),
        metaType = context.findMetaTypeByMetaTypeName(metaTypeName);

  return metaType;
}

export function provisionalFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context) {
  const provisional = simpleTypeDeclarationNode.isProvisional();

  return provisional;
}

export function superTypesFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context) {
  let superTypes = [];

  const typesNode = complexTypeDeclarationNode.getTypesNode();

  if (typesNode !== null) {
    const types = typesFromTypesNode(typesNode, context);

    superTypes = types; ///
  }

  return superTypes;
}

export function replacementFrameFromFrameSubstitutionNode(frameSubstitutionNode, context) {
  const replacementFrameNode = frameSubstitutionNode.getReplacementFrameNode(),
        replacementFrame = frameFromFrameNode(replacementFrameNode, context);

  return replacementFrame;
}

export function propertyRelationFromPropertyAssertionNode(propertyAssertionNode, context) {
  const propertyRelationNode = propertyAssertionNode.getPropertyRelationNode(),
        propertyRelation = propertyRelationFromPropertyRelationNode(propertyRelationNode, context);

  return propertyRelation;
}

export function suppositionsFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context) {
  const suppositionNodes = metaLemmaMetathoremNode.getSuppositionNodes(),
        suppositions = suppositionsFromSuppositionNodes(suppositionNodes, context);

  return suppositions;
}

export function substitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContxt, specificContext) {
  const frameSubstitution = frameSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContxt, specificContext),
        termSubstitution = termSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContxt, specificContext),
        substitution = (frameSubstitution || termSubstitution);

  return substitution;
}

export function constructorFromConstructorDeclarationNode(constructorDeclarationNode, context) {
  const constructorNode = constructorDeclarationNode.getConstructorNode(),
        constructor = constructorFromConstructorNode(constructorNode, context);

  return constructor;
}

export function provisionalFromConstructorDeclarationNode(constructorDeclarationNode, context) {
  const provisional = constructorDeclarationNode.isProvisional();

  return provisional;
}

export function provisionalFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context) {
  const provisional = complexTypeDeclarationNode.isProvisional();

  return provisional;
}

export function metavariableFromMetavariableDeclarationNode(metavariableDeclarationNode, context) {
  const metavariableNode = metavariableDeclarationNode.getMetavariableNode(),
        metavariable = metavariableFromMetavariableNode(metavariableNode, context);

  return metavariable;
}

export function targetReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, context) {
  const { Reference } = elements,
        targetReferenceNode = referenceSubstitutionNode.getTargetReferenceNode(),
        targetReferenceString = context.nodeAsString(targetReferenceNode),
        targetReference = Reference.fromReferenceString(targetReferenceString, context);

  return targetReference;
}

export function targetStatementFromStatementSubstitutionNode(statementSubstitutionNode, context) {
  const targetStatementNode = statementSubstitutionNode.getTargetStatementNode(),
        targetStatement = statementFromStatementNode(targetStatementNode, context);

  return targetStatement;
}

export function termSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext) {
  let termSubstitution = null;

  const termSubstitutionNode = statementSubstitutionNode.getTermSubstitutionNode();

  if (termSubstitutionNode !== null) {
    termSubstitution = termSubstitutionFromTermSubstitutionNode(termSubstitutionNode, generalContext, specificContext);
  }

  return termSubstitution;
}

export function frameSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext) {
  let frameSubstitution = null;

  const frameSubstitutionNode = statementSubstitutionNode.getFrameSubstitutionNode();

  if (frameSubstitutionNode !== null) {
    frameSubstitution = frameSubstitutionFromFrameSubstitutionNode(frameSubstitutionNode, generalContext, specificContext);
  }

  return frameSubstitution;
}

export function metaLevelAssumptionsFromTopLevelMetaAssertionNode(metaLemmaMetathoremNode, context) {
  const metaLevelAssumptions = [];

  return metaLevelAssumptions;
}

export function replacementReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, context) {
  const { Reference } = elements,
        replacementReferenceNode = referenceSubstitutionNode.getReplacementReferenceNode(),
        replacementReferenceString = context.nodeAsString(replacementReferenceNode),
        replacementReference = Reference.fromReferenceString(replacementReferenceString, context);

  return replacementReference;
}

export function replacementStatementFromStatementSubstitutionNode(statementSubstitutionNode, context) {
  const replacementStatementNode = statementSubstitutionNode.getReplacementStatementNode(),
        replacementStatement = statementFromStatementNode(replacementStatementNode, context);

  return replacementStatement;
}

export function propertyDeclarationsFromComplexTypeDeclarationNode(complexTypeDeclarationNode, context) {
  const propertyDeclarationnNodes = complexTypeDeclarationNode.getPropertyDeclarationNodes(),
        propertyDeclarations = propertyDeclarationsFromPropertyDeclarationNodes(propertyDeclarationnNodes, context);

  return propertyDeclarations;
}

export function termsFromTermNodes(termNodes, context) {
  const terms = termNodes.map((termNode) => {
    const term = termFromTermNode(termNode, context);

    return term;
  });

  return terms;
}

export function typesFromTypesNode(typesNode, context) {
  const typeNodes = typesNode.getTypeNodes(),
        types = typeNodes.map((typeNode) => {
          const type = typeFromTypeNode(typeNode, context);

          return type;
        });

  return types;
}

export function labelsFromLabelNodes(labelNodes, context) {
  const labels = labelNodes.map((labelNode) => {
    const { Label } = elements,
          labelString = context.nodeAsString(labelNode),
          label = Label.fromLabelString(labelString, context);

    return label;
  });

  return labels;
}

export function premisesFromPremiseNodes(premiseNodes, context) {
  const premises = premiseNodes.map((premiseNode) => {
    const premise = premiseFromPremiseNode(premiseNode, context);

    return premise;
  });

  return premises;
}

export function statementsFromStatementNodes(statementNodes, context) {
  const statements = statementNodes.map((statementNode) => {
    const statement = statementFromStatementNode(statementNode, context);

    return statement;
  });

  return statements;
}

export function parametersFromParameterNodes(parameterNodes, context) {
  const parameters = parameterNodes.map((parameterNode) => {
    const parameter = parameterFromParameterNode(parameterNode, context);

    return parameter;
  });

  return parameters;
}

export function hypothesesFromHypothesisNodes(hypothesisNodes, context) {
  const hypotheses = hypothesisNodes.map((hypotheseNode) => {
    const hypothesis = hypothesisFromHypothesisNode(hypotheseNode, context);

    return hypothesis;
  });

  return hypotheses;
}

export function assumptionsFromAssumptionNodes(assumptionNodes, context) {
  const assumptions = assumptionNodes.map((assumptionNode) => {
    const assumption = assumptionFromAssumptionNode(assumptionNode, context);

    return assumption;
  });

  return assumptions;
}

export function suppositionsFromSuppositionNodes(suppositionNodes, context) {
  const suppositions = suppositionNodes.map((suppositionNode) => {
    const supposition = suppositionFromSuppositionNode(suppositionNode, context);

    return supposition;
  });

  return suppositions;
}

export function stepsOrSubproofsFromDerivationNode(derivationNode, context) {
  const stepOrSubproofNodes = derivationNode.getStepOrSubproofNodes(),
        stepsOrSubproofs = stepOrSubproofNodes.map((stepOrSubproofNode) => {
          const stepOrSubproof = stepOrSubproofFromStepOrSubproofNode(stepOrSubproofNode, context);

          return stepOrSubproof;
        });

  return stepsOrSubproofs;
}

export function stepsOrSubproofsFromSubDerivationNode(subDerivationNode, context) {
  const stepOrSubproofNodes = subDerivationNode.getStepOrSubproofNodes(),
        stepsOrSubproofs = stepOrSubproofNodes.map((stepOrSubproofNode) => {
          const stepOrSubproof = stepOrSubproofFromStepOrSubproofNode(stepOrSubproofNode, context);

          return stepOrSubproof;
        });

  return stepsOrSubproofs;
}

export function propertyDeclarationsFromPropertyDeclarationNodes(propertyDeclarationnNodes, context) {
  const propertyDeclrations = propertyDeclarationnNodes.map((propertyDeclarationNode) => {
    const propertyDeclcaration = propertyDeclarationFromPropertyDeclarationNode(propertyDeclarationNode, context);

    return propertyDeclcaration;
  });

  return propertyDeclrations;
}
