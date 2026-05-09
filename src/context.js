"use strict";

import { Context as ContextBase } from "occam-languages";

export default class Context extends ContextBase {
  getLexer() {
    const context = this.getContext(),
          lexer = context.getLexer();

    return lexer;
  }

  getParser() {
    const context = this.getContext(),
          parser = context.getParser();

    return parser;
  }

  getFilePath() {
    const context = this.getContext(),
          filePath = context.getFilePath();

    return filePath;
  }

  getTokens() {
    const context = this.getContext(),
          tokens = context.getTokens();

    return tokens;
  }

  setTokens(tokens) {
    const context = this.getContext();

    context.setTokens(tokens);
  }

  getTerms(terms = []) {
    const context = this.getContext();

    context.getTerms(terms);

    return terms;
  }

  getFrames(frames = []) {
    const context = this.getContext();

    context.getFrames(frames);

    return frames;
  }

  getProperties(properties = []) {
    const context = this.getContext();

    context.getProperties(properties);

    return properties;
  }

  getEqualities(equalities = []) {
    const context = this.getContext();

    context.getEqualities(equalities);

    return equalities;
  }

  getJudgements(judgements = []) {
    const context = this.getContext();

    context.getJudgements(judgements);

    return judgements;
  }

  getAssertions(assertions = []) {
    const context = this.getContext();

    context.getAssertions(assertions);

    return assertions;
  }

  getStatements(statements = []) {
    const context = this.getContext();

    context.getStatements(statements);

    return statements;
  }

  getSignatures(signatures = []) {
    const context = this.getContext();

    context.getSignatures(signatures);

    return signatures;
  }

  getReferences(references = []) {
    const context = this.getContext();

    context.getReferences(references);

    return references;
  }

  getAssumptions(assumptions = []) {
    const context = this.getContext();

    context.getAssumptions(assumptions);

    return assumptions;
  }

  getMetavariables(metavariables = []) {
    const context = this.getContext();

    context.getMetavariables(metavariables);

    return metavariables;
  }

  getSubstitutions(substitutions = []) {
    const context = this.getContext();

    context.getSubstitutions(substitutions);

    return substitutions;
  }

  getPropertyRelations(propertyRelations = []) {
    const context = this.getContext();

    context.getPropertyRelations(propertyRelations);

    return propertyRelations;
  }

  getDerivedSubstitutions(derivedSubstitutions = []) {
    const context = this.getContext();

    context.getDerivedSubstitutions(derivedSubstitutions);

    return derivedSubstitutions;
  }

  getEquivalences() {
    const context = this.getContext(),
          equivalences = context.getEquivalences();

    return equivalences;
  }

  getCombinators(includeRelease) {
    const context = this.getContext(),
          combinators = context.getCombinators(includeRelease);

    return combinators;
  }

  getConstructors(includeRelease) {
    const context = this.getContext(),
          constructors = context.getConstructors(includeRelease);

    return constructors;
  }

  getDeclaredVariables() {
    const context = this.getContext(),
          declaredVariables = context.getDeclaredVariables();

    return declaredVariables;
  }

  getDeclaredMetavariables() {
    const context = this.getContext(),
          declaredMetavariables = context.getDeclaredMetavariables();

    return declaredMetavariables;
  }

  getDeclaredJudgements() {
    const context = this.getContext(),
          declaredJudgements = context.getDeclaredJudgements();

    return declaredJudgements;
  }

  getSubproofOrProofAssertions() {
    const context = this.getContext(),
          subproofOrProofAssertions = context.getSubproofOrProofAssertions();

    return subproofOrProofAssertions;
  }

  findMetavariable(metavariable, context) {
    const childContext = context; ///

    context = this.getContext();

    const parentContext = context; ///

    context = childContext; ///

    metavariable = parentContext.findMetavariable(metavariable, context);

    return metavariable;
  }

  findRuleByReference(reference) {
    const context = this.getContext(),
          rule = context.findRuleByReference(reference);

    return rule;
  }

  findAxiomByReference(reference) {
    const context = this.getContext(),
          axiom = context.findAxiomByReference(reference);

    return axiom;
  }

  findTopLevelAssertionByReference(reference) {
    const context = this.getContext(),
          topLevelAssertion = context.findTopLevelAssertionByReference(reference);

    return topLevelAssertion;
  }

  findTopLevelMetaAssertionsByReference(reference) {
    const context = this.getContext(),
          topLevelMetaAssertion = context.findTopLevelMetaAssertionsByReference(reference);

    return topLevelMetaAssertion;
  }

  findTermByTermNode(termNode) {
    const context = this.getContext(),
          term = context.findTermByTermNode(termNode);

    return term;
  }

  findFrameByFrameNode(frameNode) {
    const context = this.getContext(),
          frame = context.findFrameByFrameNode(frameNode);

    return frame;
  }

  findVariableByVariableNode(variableNode) {
    const context = this.getContext(),
          variable = context.findVariableByVariableNode(variableNode);

    return variable;
  }

  findEqualityByEqualityNode(equalityNode) {
    const context = this.getContext(),
          equality = context.findEqualityByEqualityNode(equalityNode);

    return equality;
  }

  findPropertyByPropertyNode(propertyNode) {
    const context = this.getContext(),
          property = context.findPropertyByPropertyNode(propertyNode);

    return property;
  }

  findJudgementByJudgementNode(judgementNode) {
    const context = this.getContext(),
          judgement = context.findJudgementByJudgementNode(judgementNode);

    return judgement;
  }

  findAssertionByAssertionNode(assertionNode) {
    const context = this.getContext(),
          assertion = context.findAssertionByAssertionNode(assertionNode);

    return assertion;
  }

  findStatementByStatementNode(statementNode) {
    const context = this.getContext(),
          statement = context.findStatementByStatementNode(statementNode);

    return statement;
  }

  findSignatureBySignatureNode(signatureNode) {
    const context = this.getContext(),
          signature = context.findSignatureBySignatureNode(signatureNode);

    return signature;
  }

  findReferenceByReferenceNode(referenceNode) {
    const context = this.getContext(),
          reference = context.findReferenceByReferenceNode(referenceNode);

    return reference;
  }

  findAssumptionByAssumptionNode(assumptionNode) {
    const context = this.getContext(),
          assumption = context.findAssumptionByAssumptionNode(assumptionNode);

    return assumption;
  }

  findReferenceByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          reference = context.findReferenceByMetavariableNode(metavariableNode);

    return reference;
  }

  findJudgementsByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          judgement = context.findJudgementsByMetavariableNode(metavariableNode);

    return judgement;
  }

  findMetavariableByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

    return metavariable;
  }

  findSubstitutionBySubstitutionNode(substitutionNode) {
    const context = this.getContext(),
          substitution = context.findSubstitutionBySubstitutionNode(substitutionNode);

    return substitution;
  }

  findPropertyRelationByPropertyRelationNode(propertyRelationNode) {
    const context = this.getContext(),
          propertyRelation = context.findPropertyRelationByPropertyRelationNode(propertyRelationNode);

    return propertyRelation;
  }

  findDerivedSubstitutionByVariableNode(variableNode) {
    const context = this.getContext(),
          derivedSubstitution = context.findDerivedSubstitutionByVariableNode(variableNode);

    return derivedSubstitution;
  }

  findDeclaredJudgementsByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          declaredJudgements = context.findDeclaredJudgementsByMetavariableNode(metavariableNode);

    return declaredJudgements;
  }

  findMetaLevelAssumptionByMetaLevelAssumptionNode(metaLevelAssumptionNode) {
    const context = this.getContext(),
          metaLevelAssumption = context.findMetaLevelAssumptionByMetaLevelAssumptionNode(metaLevelAssumptionNode);

    return metaLevelAssumption;
  }

  findTypeByTypeName(typeName) {
    const context = this.getContext(),
          type = context.findTypeByTypeName(typeName);

    return type;
  }

  findTypeByNominalTypeName(nominalTypeName) {
    const context = this.getContext(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    return type;
  }

  findMetaTypeByMetaTypeName(metaTypeName) {
    const context = this.getContext(),
          metaType = context.findMetaTypeByMetaTypeName(metaTypeName);

    return metaType;
  }

  findProcedureByProcedureName(procedureName) {
    const context = this.getContext(),
          procedure = context.findProcedureByProcedureName(procedureName);

    return procedure;
  }

  findDeclaredVariableByVariableIdentifier(variableIdentifier) {
    const context = this.getContext(),
          declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier);

    return declaredVariable;
  }

  findDeclaredMetavariableByMetavariableName(metavariableName) {
    const context = this.getContext(),
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    return declaredMetavariable;
  }

  isMetavariablePresent(metavariable, context) {
    const childContext = context; ///

    context = this.getContext();

    const parentContext = context;  ///

    context = childContext; ///

    const metavariablePresent = parentContext.isMetavariablePresent(metavariable, context);

    return metavariablePresent;
  }

  isLabelPresentByReference(reference, context = null) {
    const childContext = context; ///

    context = this.getContext();

    const parentContext = context;  ///

    context = childContext; ///

    const labelPresent = parentContext.isLabelPresentByReference(reference, context);

    return labelPresent;
  }

  isTopLevelMetaAssertionPresentByReference(reference) {
    const context = this.getContext(),
          topLevelMetaAssertionPresent = context.isTopLevelMetaAssertionPresentByReference(reference);

    return topLevelMetaAssertionPresent;
  }

  isTermPresentByTermNode(termNode) {
    const context = this.getContext(),
          termPresent = context.isTermPresentByTermNode(termNode);

    return termPresent;
  }

  isLabelPresentByLabelNode(labelNode) {
    const context = this.getContext(),
          labelPresent = context.isLabelPresentByLabelNode(labelNode);

    return labelPresent;
  }

  isFramePresentByFrameNode(frameNode) {
    const context = this.getContext(),
          framePresent = context.isFramePresentByFrameNode(frameNode);

    return framePresent;
  }

  isEqualityPresentByEqualityNode(equalityNode) {
    const context = this.getContext(),
          equalityPresent = context.isEqualityPresentByEqualityNode(equalityNode);

    return equalityPresent;
  }

  isJudgementPresentByJudgementNode(judgementNode) {
    const context = this.getContext(),
          judgementPresent = context.isJudgementPresentByJudgementNode(judgementNode);

    return judgementPresent;
  }

  isAssertionPresentByAssertionNode(assertionNode) {
    const context = this.getContext(),
          assertionPresent = context.isAssertionPresentByAssertionNode(assertionNode);

    return assertionPresent;
  }

  isStatementPresentByStatementNode(statementNode) {
    const context = this.getContext(),
      statementPresent = context.isStatementPresentByStatementNode(statementNode);

    return statementPresent;
  }

  isSignaturePresentBySignatureNode(signatureNode) {
    const context = this.getContext(),
          signaturePresent = context.isSignaturePresentBySignatureNode(signatureNode);

    return signaturePresent;
  }

  isMetavariablePresentByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          metavariablePresent = context.isMetavariablePresentByMetavariableNode(metavariableNode);

    return metavariablePresent;
  }

  isTypePresentByNominalTypeName(nominalTypeName) {
    const context = this.getContext(),
          typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

    return typePresent;
  }

  isProcedurePresentByProcedureName(procedureName) {
    const context = this.getContext(),
          procedurePresent = context.isProcedurePresentByProcedureName(procedureName);

    return procedurePresent;
  }

  isDeclaredMetavariablePresentByMetavariableName(metavariableName) {
    const context = this.getContext(),
          metavariablePresent = context.isDeclaredMetavariablePresentByMetavariableName(metavariableName);

    return metavariablePresent;
  }

  isReferencePresentByMetavariableNode(metvvariableNode) {
    const context = this.getContext(),
      referencePresent = context.isReferencePresentByMetavariableNode(metvvariableNode);

    return referencePresent;
  }

  isDerivedSubstitutionPresentByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          derivedSubstitutionPresent = context.isDerivedSubstitutionPresentByMetavariableNode(metavariableNode);

    return derivedSubstitutionPresent;
  }

  isDeclaredJudgementPresentByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          declaredJudgementPresent = context.isDeclaredJudgementPresentByMetavariableNode(metavariableNode);

    return declaredJudgementPresent;
  }

  isDerivedSubstitutionPresentByMetavariableNodeAndSubstitution(metavariableNode, substitution) {
    const context = this.getContext(),
          derivedSubstitutionPresent = context.isDerivedSubstitutionPresentByMetavariableNodeAndSubstitution(metavariableNode, substitution);

    return derivedSubstitutionPresent;
  }

  isStated() {
    const context = this.getContext(),
          stated = context.isStated();

    return stated;
  }

  isMetaLevel() {
    const context = this.getContext(),
          metaLevel = context.isMetaLevel();

    return metaLevel;
  }

  addTerms(terms) {
    const context = this.getContext();

    context.addTerms(terms);
  }

  addDerivedSubstitutions(derivedSubstitutions) {
    const context = this.getContext();

    context.addDerivedSubstitutions(derivedSubstitutions);
  }

  addAxiom(axiom) {
    const context = this.getContext();

    context.addAxiom(axiom);
  }

  addLemma(lemma) {
    const context = this.getContext();

    context.addLemma(lemma);
  }

  addTheorem(theorem) {
    const context = this.getContext();

    context.addTheorem(theorem);
  }

  addConjecture(conjecture) {
    const context = this.getContext();

    context.addConjecture(conjecture);
  }

  addTerm(term) {
    const context = this.getContext();

    context.addTerm(term);
  }

  addFrame(frame) {
    const context = this.getContext();

    context.addFrame(frame);
  }

  addEquality(equality) {
    const context = this.getContext();

    context.addEquality(equality);
  }

  addProperty(property) {
    const context = this.getContext();

    context.addProperty(property);
  }

  addJudgement(judgement) {
    const context = this.getContext();

    context.addJudgement(judgement);
  }

  addAssertion(assertion) {
    const context = this.getContext();

    context.addAssertion(assertion);
  }

  addStatement(statement) {
    const context = this.getContext();

    context.addStatement(statement);
  }

  addSignature(signature) {
    const context = this.getContext();

    context.addSignature(signature);
  }

  addReference(reference) {
    const context = this.getContext();

    context.addReference(reference);
  }

  addAssumption(assumption) {
    const context = this.getContext();

    context.addAssumption(assumption);
  }

  addAssignment(assignment) {
    const context = this.getContext();

    context.addAssignment(assignment);
  }

  addMetavariable(metavariable) {
    const context = this.getContext();

    context.addMetavariable(metavariable);
  }

  addSubstitution(substitution) {
    const context = this.getContext();

    context.addSubstitution(substitution);
  }

  addPropertyRelation(propertyRelation) {
    const context = this.getContext();

    context.addPropertyRelation(propertyRelation);
  }

  addDeclaredVariable(declaredVariable) {
    const context = this.getContext();

    context.addDeclaredVariable(declaredVariable);
  }

  addMetaLevelAssumption(metaLevelAssumption) {
    const context = this.getContext();

    context.addMetaLevelAssumption(metaLevelAssumption);
  }

  addDeclaredMetavariable(declaredMetavariable) {
    const context = this.getContext();

    context.addDeclaredMetavariable(declaredMetavariable);
  }

  addSubproofOrProofAssertion(subproofOrProofAssertion) {
    const context = this.getContext();

    context.addSubproofOrProofAssertion(subproofOrProofAssertion);
  }
}
