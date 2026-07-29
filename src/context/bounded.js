"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import { mergeEquivalences, equivalencesFromEquality, separateGroundedTermsAndDefinedVariables } from "../utilities/equivalences";

const { last, clear } = arrayUtilities;

class BoundedContext extends Context {
  constructor(context, constraints, assignments, equivalences, declaredVariables, factOrSubproofs) {
    super(context);

    this.constraints = constraints;
    this.assignments = assignments;
    this.equivalences = equivalences;
    this.declaredVariables = declaredVariables;
    this.factOrSubproofs = factOrSubproofs;
  }

  getConstraints() {
    return this.constraints;
  }

  getAssignments() {
    return this.assignments;
  }

  getEquivalences() {
    let equivalences;

    let context;

    context = this.getContext();

    equivalences = context.getEquivalences();

    context = this; ///

    equivalences = mergeEquivalences(this.equivalences, equivalences, context);  ///

    return equivalences;
  }

  getDeclaredVariables() {
    let declaredVariables;

    const context = this.getContext();

    declaredVariables = context.getDeclaredVariables();

    declaredVariables = [
      ...this.declaredVariables,
      ...declaredVariables
    ];

    return declaredVariables;
  }

  getFactOrSubproofs() {
    let factOrSubproofs;

    const context = this.getContext();

    factOrSubproofs = context.getFactOrSubproofs();

    factOrSubproofs = [  ///
      ...factOrSubproofs,
      ...this.factOrSubproofs
    ];

    return factOrSubproofs;
  }

  getProofAssertions() {
    const factOrSubproofs = this.getFactOrSubproofs(),
          proofAssertions = factOrSubproofs.filter((factOrSubproof) => {
            const factOrSubproofproofAssertion = factOrSubproof.isProofAssertion();

            if (factOrSubproofproofAssertion) {
              return true;
            }
          });

    return proofAssertions;
  }

  getSteps() {
    const proofAssertions = this.getProofAssertions(),
          steps = proofAssertions.filter((proofAssertion) => {
            const proofAssertionStep = proofAssertion.isStep();

            if (proofAssertionStep) {
              return true;
            }
          });

    return steps;
  }

  getLastStep() {
    let lastStep = null;

    const steps = this.getSteps(),
          stepsLength = steps.length;

    if (stepsLength > 0) {
      lastStep = last(steps);
    }

    return lastStep;
  }

  isMetaLevel() {
    let metaLevel;

    if (this.constraints !== null) {
      metaLevel = true;
    } else {
      const context = this.getContext();

      metaLevel = context.isMetaLevel();
    }

    return metaLevel;
  }

  addEquality(equality) {
    const context = this, ///
          equalityString = equality.getString();

    context.trace(`Adding the '${equalityString}' equality to the bounded context...`);

    const equalityRelfexive = equality.isReflexive();

    if (!equalityRelfexive) {
      const equivalences = equivalencesFromEquality(equality, context);

      this.equivalences = mergeEquivalences(this.equivalences, equivalences, context);

      context.debug(`...added the '${equalityString}' equality to the bounded context.`);
    } else {
      context.debug(`The reflexive '${equalityString}' equality has not been added to the bounded context.`);
    }
  }

  addAssignment(assignment) {
    this.assignments.push(assignment);
  }

  assignAssignments() {
    const context = this; ///

    this.assignments.forEach((assignment) => {
      assignment(context);
    });

    clear(this.assignments);
  }

  addDeclaredVariable(declaredVariable) {
    const context = this, ///
          declaredVariableString = declaredVariable.getString();

    context.trace(`Adding the '${declaredVariableString}' declared variable to the bounded context...`);

    this.declaredVariables.push(declaredVariable);

    context.debug(`...added the '${declaredVariableString}' declared variable to the bounded context.`);
  }

  addConstraint(constraint) {
    if (this.constraints === null) {
      super.addConstraint(constraint);

      return;
    }

    const context = this, ///
          constraintA = constraint, ///
          constraintString = constraint.getString();

    context.trace(`Adding the '${constraintString}' constraint to the bounded context...`);

    const constraintB = this.constraints.find((constraint) => {
      const constraintB = constraint, ///
            constraintAEqualToAssumptionB = constraintA.isEqualTo(constraintB);

      if (constraintAEqualToAssumptionB) {
        return true;
      }
    }) || null;

    if (constraintB !== null) {
      context.debug(`The '${constraintString}' constraint has already been added to the bounded context.`);
    } else {
      this.constraints.push(constraint);
    }

    context.debug(`...added the '${constraintString}' constraint to the bounded context.`);
  }

  addGenerator(generator) {
    const context = this.getContext();

    context.addGenerator(generator);
  }

  addConstructor(constructor) {
    const context = this.getContext();

    context.addConstructor(constructor);
  }

  addFactOrSubproof(factOrSubproof) {
    const context = this, ///
          factOrSubproofString = factOrSubproof.getString();

    context.trace(`Adding the '${factOrSubproofString}' subproof or fact to the bounded context...`);

    this.factOrSubproofs.push(factOrSubproof);

    context.debug(`...added the '${factOrSubproofString}' subproof or fact to the bounded context.`);
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

  findConstraintByConstraintNode(constraintNode) {
    let constraint;

    if (this.constraints === null) {
      constraint = super.findConstraintByConstraintNode(constraintNode);
    } else {
      constraint = this.constraints.find((constraint) => {
        const constraintNodeMatches = constraint.matchConstraintNode(constraintNode);

        if (constraintNodeMatches) {
          return true;
        }
      }) || null;
    }

    return constraint;
  }

  isDeclaredVariablePresentByVariableIdentifier(variableIdentifier) {
    const declaredVariable = this.findDeclaredVariableByVariableIdentifier(variableIdentifier),
          declaredVariablePresent = (declaredVariable !== null);

    return declaredVariablePresent;
  }

  isTermGrounded(term) {
    const context = this, ///
          equivalences = this.getEquivalences(),
          groundedTerms = [],
          definedVariables = [];

    separateGroundedTermsAndDefinedVariables(equivalences, groundedTerms, definedVariables, context);

    const termMatchesGroundedTerm = groundedTerms.some((groundedTerm) => {
            const groundedTermNode = groundedTerm.getNode(),
                  groundedTermNodeMatches = term.matchTermNode(groundedTermNode);

            if (groundedTermNodeMatches) {
              return true;
            }
          }),
          termGrounded = termMatchesGroundedTerm; ///

    return termGrounded;
  }

  static fromNothing(context) {
    const assignments = [],
          equivalences = [],
          declaredVariables = [],
          constraints = null,
          factOrSubproofs = [],
          boundedContext = new BoundedContext(context, constraints, assignments, equivalences, declaredVariables, factOrSubproofs);

    return boundedContext;
  }

  static fromConstraints(constraints, context) {
    const assignments = [],
          equivalences = [],
          declaredVariables = [],
          factOrSubproofs = [],
          boundedContext = new BoundedContext(context, constraints, assignments, equivalences, declaredVariables, factOrSubproofs);

    return boundedContext;
  }
}

export default BoundedContext;