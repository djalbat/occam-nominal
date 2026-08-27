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

  getEqualities(equalities = []) {
    const context = this.getContext();

    context.getEqualities(equalities);

    return equalities;
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

  getInferredSubstitutions(inferredSubstitutions = []) {
    const context = this.getContext();

    context.getInferredSubstitutions(inferredSubstitutions);

    return inferredSubstitutions;
  }

  getGenerators(includeRelease = true) {
    const context = this.getContext(),
          generators = context.getGenerators(includeRelease);

    return generators;
  }

  getProcedures(includeRelease = true) {
    const context = this.getContext(),
          procedures = context.getProcedures(includeRelease);

    return procedures;
  }

  getCombinators(includeRelease = true) {
    const context = this.getContext(),
          combinators = context.getCombinators(includeRelease);

    return combinators;
  }

  getConstructors(includeRelease = true) {
    const context = this.getContext(),
          constructors = context.getConstructors(includeRelease);

    return constructors;
  }

  getClaim(includeRelease = true) {
    const context = this.getContext(),
          claim = context.getClaim(includeRelease);

    return claim;
  }

  getSchemas(includeRelease = true) {
    const context = this.getContext(),
          schemas = context.getSchemas(includeRelease);

    return schemas;
  }

  getVariables(nested) {
    const context = this.getContext(),
          variables = context.getVariables(nested);

    return variables;
  }

  getSteps() {
    const context = this.getContext(),
          steps = context.getSteps();

    return steps;
  }

  getFacts() {
    const context = this.getContext(),
          facts = context.getFacts();

    return facts;
  }

  getEquivalences() {
    const context = this.getContext(),
          equivalences = context.getEquivalences();

    return equivalences;
  }

  getDeclaredVariables(declaredVariables = []) {
    const context = this.getContext();

    context.getDeclaredVariables(declaredVariables);

    return declaredVariables;
  }

  getDeclaredMetavariables() {
    const context = this.getContext(),
          declaredMetavariables = context.getDeclaredMetavariables();

    return declaredMetavariables;
  }

  getFactOrSubproofs() {
    const context = this.getContext(),
          factOrSubproofs = context.getFactOrSubproofs();

    return factOrSubproofs;
  }

  getProperties() {
    const properties = [],
          types = this.getTypes();

    types.forEach((type) => {
      type.getProperties(properties);
    });

    return properties;
  }

  getTypes() {
    const context = this.getContext(),
          types = context.getTypes();

    return types;
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

  findClaimByReference(reference) {
    const context = this.getContext(),
          claim = context.findClaimByReference(reference);

    return claim;
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

  findEqualityByEqualityNode(equalityNode) {
    const context = this.getContext(),
          equality = context.findEqualityByEqualityNode(equalityNode);

    return equality;
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

  findInferredSubstitutionByVariableNode(variableNode) {
    const context = this.getContext(),
          inferredSubstitution = context.findInferredSubstitutionByVariableNode(variableNode);

    return inferredSubstitution;
  }

  findInferredSubstitutionByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    return inferredSubstitution;
  }

  findConstraintByConstraintNode(constraintNode) {
    const context = this.getContext(),
          constraint = context.findConstraintByConstraintNode(constraintNode);

    return constraint;
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

  findDeclaredVariablesByVariableIdentifier(variableIdentifier) {
    const context = this.getContext(),
          declaredVariables = context.findDeclaredVariablesByVariableIdentifier(variableIdentifier);

    return declaredVariables;
  }

  findDeclaredMetavariableByMetavariableName(metavariableName) {
    const context = this.getContext(),
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    return declaredMetavariable;
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

  isInferredSubstitutionPresentByMetavariableNode(metavariableNode) {
    const context = this.getContext(),
          inferredSubstitutionPresent = context.isInferredSubstitutionPresentByMetavariableNode(metavariableNode);

    return inferredSubstitutionPresent;
  }

  isInferredSubstitutionPresentByMetavariableNodeAndSubstitutionNode(metavariableNode, substitutionNode) {
    const context = this.getContext(),
          inferredSubstitutionPresent = context.isInferredSubstitutionPresentByMetavariableNodeAndSubstitutionNode(metavariableNode, substitutionNode);

    return inferredSubstitutionPresent;
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

  addAssertions(assertions) {
    const context = this.getContext();

    context.addAssertions(assertions);
  }

  addMetavariables(metavariables) {
    const context = this.getContext();

    context.addMetavariables(metavariables);
  }

  addInferredSubstitutions(inferredSubstitutions) {
    const context = this.getContext();

    context.addInferredSubstitutions(inferredSubstitutions);
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

  addDeclaredVariable(declaredVariable) {
    const context = this.getContext();

    context.addDeclaredVariable(declaredVariable);
  }

  addDeclaredMetavariable(declaredMetavariable) {
    const context = this.getContext();

    context.addDeclaredMetavariable(declaredMetavariable);
  }

  addConstraint(constraint) {
    const context = this.getContext();

    context.addConstraint(constraint);
  }
}
