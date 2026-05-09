"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import { mergeEquivalences, equivalencesFromEquality, separateGroundedTermsAndDefinedVariables } from "../utilities/equivalences";

const { last, clear, filter } = arrayUtilities;

class BoundedContext extends Context {
  constructor(context, assignments, equivalences, declaredVariables, declaredJudgements, subproofOrProofAssertions, metaLevelAssumptions) {
    super(context);

    this.assignments = assignments;
    this.equivalences = equivalences;
    this.declaredVariables = declaredVariables;
    this.declaredJudgements = declaredJudgements;
    this.subproofOrProofAssertions = subproofOrProofAssertions;
    this.metaLevelAssumptions = metaLevelAssumptions;
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

  getDeclaredJudgements() {
    let declaredJudgements;

    const context = this.getContext();

    declaredJudgements = context.getDeclaredJudgements();

    declaredJudgements = [ ///
      ...this.declaredJudgements,
      ...declaredJudgements
    ]

    return declaredJudgements;
  }

  getSubproofOrProofAssertions() {
    let subproofOrProofAssertions;

    const context = this.getContext();

    subproofOrProofAssertions = context.getSubproofOrProofAssertions();

    subproofOrProofAssertions = [  ///
      ...subproofOrProofAssertions,
      ...this.subproofOrProofAssertions
    ];

    return subproofOrProofAssertions;
  }

  getMetaLevelAssumptions() {
    return this.metaLevelAssumptions;
  }

  getProofAssertions() {
    const subproofOrProofAssertions = this.getSubproofOrProofAssertions(),
          proofAssertions = subproofOrProofAssertions.filter((subproofOrProofAssertion) => {
            const subproofOrProofAssertionproofAssertion = subproofOrProofAssertion.isProofAssertion();

            if (subproofOrProofAssertionproofAssertion) {
              return true;
            }
          });

    return proofAssertions;
  }

  getLastStep() {
    let lastStep = null;

    const proofAssertions = this.getProofAssertions(),
          proofAssertionsLength = proofAssertions.length;

    if (proofAssertionsLength > 0) {
      const lastProofAssertion = last(proofAssertions);

      lastStep = lastProofAssertion;  ///
    }

    return lastStep;
  }

  isMetaLevel() {
    let metaLevel;

    if (this.metaLevelAssumptions !== null) {
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

  addDeclaredJudgement(declaredJudgement) {
    const context = this, ///
          declaredJudgementString = declaredJudgement.getString();

    context.trace(`Adding the '${declaredJudgementString}' declared judgement to the bounded context...`);

    this.declaredJudgements.push(declaredJudgement);

    context.debug(`...added the '${declaredJudgementString}' declared judgement to the bounded context.`);
  }

  addMetaLevelAssumption(metaLevelAssumption) {
    if (this.metaLevelAssumptions === null) {
      super.addMetaLevelAssumption(metaLevelAssumption);

      return;
    }

    const context = this, ///
          metaLevelAssumptionA = metaLevelAssumption, ///
          metaLevelAssumptionString = metaLevelAssumption.getString();

    context.trace(`Adding the '${metaLevelAssumptionString}' meta-level assumption to the bounded context...`);

    const metaLevelAssumptionB = this.metaLevelAssumptions.find((metaLevelAssumption) => {
      const metaLevelAssumptionB = metaLevelAssumption, ///
            metaLevelAssumptionAEqualToAssumptionB = metaLevelAssumptionA.isEqualTo(metaLevelAssumptionB);

      if (metaLevelAssumptionAEqualToAssumptionB) {
        return true;
      }
    }) || null;

    if (metaLevelAssumptionB !== null) {
      context.debug(`The '${metaLevelAssumptionString}' metaLevelAssumption has already been added to the bounded context.`);
    } else {
      this.metaLevelAssumptions.push(metaLevelAssumption);
    }

    context.debug(`...added the '${metaLevelAssumptionString}' meta-level assumption to the bounded context.`);
  }

  addSubproofOrProofAssertion(subproofOrProofAssertion) {
    const context = this, ///
          subproofOrProofAssertionString = subproofOrProofAssertion.getString();

    context.trace(`Adding the '${subproofOrProofAssertionString}' subproof or proof assertion to the bounded context...`);

    this.subproofOrProofAssertions.push(subproofOrProofAssertion);

    context.debug(`...added the '${subproofOrProofAssertionString}' subproof or proof assertion to the bounded context.`);
  }

  compareTermAndPropertyRelation(term, propertyRelation) {
    const context = this, ///
          proofAssertions = this.getProofAssertions(),
          comparesToTermAndPropertyRelation = proofAssertions.some((proofAssertion) => {
            const comparesToTermAndPropertyRelation = proofAssertion.compareTermAndPropertyRelation(term, propertyRelation, context);

            if (comparesToTermAndPropertyRelation) {
              return true;
            }
          });

    return comparesToTermAndPropertyRelation;
  }

  findDeclaredJudgementByMetavariableNode(metavariableNode) {
    const declaredJudgements = this.getDeclaredJudgements(),
          declaredJudgement = declaredJudgements.find((declaredJudgement) => {
            const metavariableNodeMatches = declaredJudgement.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return declaredJudgement;
  }

  findDeclaredJudgementsByMetavariableNode(metavariableNode) {
    const declaredJudgements = this.getDeclaredJudgements();

    filter(declaredJudgements, (declaredJudgement) => {
      const metavariableNodeMatches = declaredJudgement.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        return true;
      }
    });

    return declaredJudgements;
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

  findMetaLevelAssumptionByMetaLevelAssumptionNode(metaLevelAssumptionNode) {
    let metaLevelAssumption;

    if (this.metaLevelAssumptions === null) {
      metaLevelAssumption = super.findMetaLevelAssumptionByMetaLevelAssumptionNode(metaLevelAssumptionNode);
    } else {
      metaLevelAssumption = this.metaLevelAssumptions.find((metaLevelAssumption) => {
        const metaLevelAssumptionNodeMatches = metaLevelAssumption.matchMetaLevelAssumptionNode(metaLevelAssumptionNode);

        if (metaLevelAssumptionNodeMatches) {
          return true;
        }
      }) || null;
    }

    return metaLevelAssumption;
  }

  isDeclaredJudgementPresentByMetavariableNode(metavariableNode) {
    const declaredJudgement = this.findDeclaredJudgementByMetavariableNode(metavariableNode),
          declaredJudgementPresent = (declaredJudgement !== null);

    return declaredJudgementPresent;
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
          declaredJudgements = [],
          metaLevelAssumptions = null,
          subproofOrProofAssertions = [],
          boundedContext = new BoundedContext(context, assignments, equivalences, declaredVariables, declaredJudgements, subproofOrProofAssertions, metaLevelAssumptions);

    return boundedContext;
  }

  static fromMetaLevelAssumptions(metaLevelAssumptions, context) {
    const assignments = [],
          equivalences = [],
          declaredVariables = [],
          declaredJudgements = [],
          subproofOrProofAssertions = [],
          boundedContext = new BoundedContext(context, assignments, equivalences, declaredVariables, declaredJudgements, subproofOrProofAssertions, metaLevelAssumptions);

    return boundedContext;
  }
}

export default BoundedContext;