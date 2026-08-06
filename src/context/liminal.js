"use strict";

import { arrayUtilities } from "necessary";
import { continuationUtilities } from "occam-languages";

import Context from "../context";
import elements from "../elements";

import { metavariableNodesFromInferredSubstitutions } from "../utilities/substitutions";

const { push, find, first } = arrayUtilities,
      { asynchronousForEach } = continuationUtilities;

export default class LiminalContext extends Context {
  constructor(context, inferredSubstitutions) {
    super(context);

    this.inferredSubstitutions = inferredSubstitutions;
  }

  getInferredSubstitutions(inferredSubstitutions = []) {
    const context = this.getContext();

    push(inferredSubstitutions, this.inferredSubstitutions);

    context.getInferredSubstitutions(inferredSubstitutions);

    return inferredSubstitutions;
  }

  getSoleInferredSubstitution() {
    let soleInferredSubstitution = null;

    const inferredSubstitutionsLength = this.inferredSubstitutions.length;

    if (inferredSubstitutionsLength === 1) {
      const firstInferredSubstitution = first(this.inferredSubstitutions);

      soleInferredSubstitution = firstInferredSubstitution; ///
    }

    return soleInferredSubstitution;
  }

  getSoleNonTrivialInferredSubstitution() {
    let soleNonTrivialInferredSubstitution = null;

    const soleInferredSubstitution = this.getSoleInferredSubstitution();

    if (soleInferredSubstitution !== null) {
      const soleInferredSubstitutionNonTrivial = soleInferredSubstitution.isNonTrivial();

      if (soleInferredSubstitutionNonTrivial) {
        soleNonTrivialInferredSubstitution = soleInferredSubstitution;  ///
      }
    }

    return soleNonTrivialInferredSubstitution;
  }

  addInferredSubstitution(inferredSubstitution) {
    const context = this, ///
          inferredSubstitutionA = inferredSubstitution, ///
          inferredSubstitutionString = inferredSubstitution.getString();

    context.trace(`Adding the '${inferredSubstitutionString}' inferred substitution to the liminal context...`);

    const inferredSubstitutionB = this.inferredSubstitutions.find((inferredSubstitution) => {
      const inferredSubstitutionB = inferredSubstitution, ///
            inferredSubstitutionAEqualToInferredSubstitutionB = inferredSubstitutionA.isEqualTo(inferredSubstitutionB);

      if (inferredSubstitutionAEqualToInferredSubstitutionB) {
        return true;
      }
    }) || null;

    if (inferredSubstitutionB !== null) {
      context.debug(`The '${inferredSubstitutionString}' inferred substitution has already been added to the liminal context.`);
    } else {
      this.inferredSubstitutions.push(inferredSubstitution);
    }

    context.debug(`...added the '${inferredSubstitutionString}' inferred substitution to the liminal context.`);
  }

  addInferredSubstitutions(inferredSubstitutions) {
    inferredSubstitutions.forEach((inferredSubstitution) => {
      this.addInferredSubstitution(inferredSubstitution);
    });
  }

  solveInferredSubstitutions(continuation) {
    const context = this, ///
          inferredSubstitutions = this.getInferredSubstitutions(),
          metavariableNodes = metavariableNodesFromInferredSubstitutions(inferredSubstitutions);

    return asynchronousForEach(metavariableNodes, (metavariableNode, continuation) => {
      const complexInferredSubstitutions = this.findComplexInferredSubstitutionsByMetavariableNode(metavariableNode);

      return asynchronousForEach(complexInferredSubstitutions, (complexInferredSubstitution, continuation) => {
        const inferredSubstitution = complexInferredSubstitution, ///
              solved = inferredSubstitution.isSolved();

        if (solved) {
          return continuation();
        }

        return inferredSubstitution.solve(context, continuation);
      }, continuation);
    }, continuation);
  }

  areInferredSubstitutionsSolved() {
    const inferredSubstitutions = this.getInferredSubstitutions(),
          metavariableNodes = metavariableNodesFromInferredSubstitutions(inferredSubstitutions),
          solved = metavariableNodes.every((metavariableNode) => {
            const complexInferredSubstitutions = this.findComplexInferredSubstitutionsByMetavariableNode(metavariableNode),
                  complexInferredSubstitutionsSolved = complexInferredSubstitutions.every((complexInferredSubstitution) => {
                    const complexInferredSubstitutionSolved = complexInferredSubstitution.isSolved();

                    if (complexInferredSubstitutionSolved) {
                      return true;
                    }
                  });

            if (complexInferredSubstitutionsSolved) {
              return true;
            }
          });

    return solved;
  }

  isEmpty() {
    const inferredSubstitutionsLength = this.inferredSubstitutions.length,
          empty = (inferredSubstitutionsLength === 0);

    return empty;
  }

  qualify(assumption, constraint) {
    let qualifies = false;

    const empty = this.isEmpty();

    if (empty) {
      qualifies = true;
    } else {
      const soleInferredSubstitution = this.getSoleInferredSubstitution();

      if (soleInferredSubstitution !== null) {
        const { ReferenceInferredSubstitution } = elements,
              context = this, ///
              referenceInferredSubstitution = ReferenceInferredSubstitution.fromAssumptionAndConstraint(assumption, constraint, context),
              referenceInferredSubstitutionComparesToSsoleInferredSubstitution = referenceInferredSubstitution.compareSubstitution(soleInferredSubstitution);

        if (referenceInferredSubstitutionComparesToSsoleInferredSubstitution) {
          qualifies = true;
        }
      }
    }

    return qualifies;
  }

  commit(context) {
    if (context === undefined) {
      context = this.getContext();
    }

    context.debug(`Committing the liminal context`);

    context.addInferredSubstitutions(this.inferredSubstitutions);
  }

  findInferredSubstitution(callback) {
    const inferredSubstitutions = this.getInferredSubstitutions(),
          inferredSubstitution = inferredSubstitutions.find(callback);

    return inferredSubstitution;
  }

  findInferredSubstitutions(callback) {
    let inferredSubstitutions;

    inferredSubstitutions = this.getInferredSubstitutions();

    inferredSubstitutions = find(inferredSubstitutions, callback);  ///

    return inferredSubstitutions;
  }

  findInferredSubstitutionByVariableNode(variableNode) {
    const inferredSubstitution = this.findInferredSubstitution((inferredSubstitution) => {
      const variableNodeMatches = inferredSubstitution.matchVariableNode(variableNode);

      if (variableNodeMatches) {
        return true;
      }
    }) || null;

    return inferredSubstitution;
  }

  findInferredSubstitutionByMetavariableNode(metavariableNode) {
    const simpleInferredSubstitution = this.findSimpleInferredSubstitutionByMetavariableNode(metavariableNode),
          inferredSubstitution = simpleInferredSubstitution;  ///

    return inferredSubstitution;
  }

  findSimpleInferredSubstitutionByMetavariableNode(metavariableNode) {
    const simpleInferredSubstitution = this.findInferredSubstitution((inferredSubstitution) => {
      const inferredSubstitutionSimple = inferredSubstitution.isSimple();

      if (inferredSubstitutionSimple) {
        const simpleInferredSubstitution = inferredSubstitution,  ///
              metavariableNodeMatches = simpleInferredSubstitution.matchMetavariableNode(metavariableNode);

        if (metavariableNodeMatches) {
          return true;
        }
      }
    }) || null;

    return simpleInferredSubstitution;
  }

  findComplexInferredSubstitutionsByMetavariableNode(metavariableNode) {
    const complexInferredSubstitution = this.findInferredSubstitutions((inferredSubstitution) => {
      const inferredSubstitutionComplex = inferredSubstitution.isComplex();

      if (inferredSubstitutionComplex) {
        const complexInferredSubstitution = inferredSubstitution,  ///
              metavariableNodeMatches = complexInferredSubstitution.matchMetavariableNode(metavariableNode);

        if (metavariableNodeMatches) {
          return true;
        }
      }
    }) || null;

    return complexInferredSubstitution;
  }

  findInferredSubstitutionByMetavariableNodeAndSubstitutionNode(metavariableNode, substitutionNode) {
    const inferredSubstitution = this.findInferredSubstitution((inferredSubstitution) => {  ///
            const metavariableNodeMatches = inferredSubstitution.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              const substitutionNodeMatches = inferredSubstitution.matchSubstitutionNode(substitutionNode);

              if (substitutionNodeMatches) {
                return true;
              }
            }
          }) || null;

    return inferredSubstitution;
  }

  isInferredSubstitutionPresentByMetavariableNode(metavariableNode) {
    const inferredSubstitution = this.findInferredSubstitutionByMetavariableNode(metavariableNode),
          inferredSubstitutionPresent = (inferredSubstitution !== null);

    return inferredSubstitutionPresent;
  }

  isInferredSubstitutionPresentByMetavariableNodeAndSubstitutionNode(metavariableNode, substitutionNode) {
    const inferredSubstitution = this.findInferredSubstitutionByMetavariableNodeAndSubstitutionNode(metavariableNode, substitutionNode),
          inferredSubstitutionPresent = (inferredSubstitution !== null);

    return inferredSubstitutionPresent;
  }

  static fromNothing(context) {
    const inferredSubstitutions = [],
          liminalContext = new LiminalContext(context, inferredSubstitutions);

    return liminalContext;
  }
}
