"use strict";

import Context from "../context";

export default class MetexicContext extends Context {
  constructor(context, contexts) {
    super(context);

    this.contexts = contexts;
  }

  getContexts() {
    return this.contexts;
  }

  getDeclaredVariables(declaredVariables = []) {
    const context = this.getContext(),
          contexts = [
            context,
            ...this.contexts
          ];

    contexts.forEach((context) => {
      context.getDeclaredVariables(declaredVariables);
    })

    return declaredVariables;
  }

  findDeclaredVariableByVariableIdentifier(variableIdentifier) {
    const declaredVariables = this.getDeclaredVariables(),
          declaredVariable = declaredVariables.find((declaredVariable) => {
            const variableComparesToVariableIdentifier = declaredVariable.compareVariableIdentifier(variableIdentifier);

            if (variableComparesToVariableIdentifier) {
              return true;
            }
          }) || null;

    return declaredVariable;
  }

  findDeclaredVariablesByVariableIdentifier(variableIdentifier) {
    let declaredVariables;

    declaredVariables = this.getDeclaredVariables();

    declaredVariables = declaredVariables.filter((declaredVariable) => {
      const variableComparesToVariableIdentifier = declaredVariable.compareVariableIdentifier(variableIdentifier);

      if (variableComparesToVariableIdentifier) {
        return true;
      }
    });

    return declaredVariables;
  }

  addTerm(term) {
    const context = this.getContext();

    context.addTerm(term);
  }

  addLink(link) {
    const context = this.getContext();

    context.addLink(link);
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

  addAssumption(assumption) {
    const context = this.getContext();

    context.addAssumption(assumption);
  }

  addMetavariable(metavariable) {
    const context = this.getContext();

    context.addMetavariable(metavariable);
  }

  addSubstitution(substitution) {
    const context = this.getContext();

    context.addSubstitution(substitution);
  }

  addTerms(terms) {
    const context = this.getContext();

    context.addTerms(terms);
  }

  addLinks(links) {
    const context = this.getContext();

    context.addLinks(links);
  }

  addFrames(frames) {
    const context = this.getContext();

    context.addFrames(frames);
  }

  addEqualities(equalities) {
    const context = this.getContext();

    context.addEqualities(equalities);
  }

  addAssertions(assertions) {
    const context = this.getContext();

    context.addAssertions(assertions);
  }

  addStatements(statements) {
    const context = this.getContext();

    context.addStatements(statements);
  }

  addParameters(parameters) {
    const context = this.getContext();

    context.addParameters(parameters);
  }

  addAssumptions(assumptions) {
    const context = this.getContext();

    context.addAssumptions(assumptions);
  }

  addMetavariables(metavariables) {
    const context = this.getContext();

    context.addMetavariables(metavariables);
  }

  addProcedureReferences(procedureReferences) {
    const context = this.getContext();

    context.addProcedureReferences(procedureReferences);
  }

  addAssignment(assignment) {
    const context = this.getContext();

    context.addAssignment(assignment);
  }

  static fromContexts(contexts) {
    contexts = [  ///
      ...contexts
    ];

    const context = contexts.shift(),
          metexicContext = new MetexicContext(context, contexts);

    return metexicContext;
  }
}
