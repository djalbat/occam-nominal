"use strict";

import { arrayUtilities } from "necessary";
import { metavariableNodesFromDerivedSubstitutions } from "../utilities/substitutions";

import Context from "../context";
import elements from "../elements";

const { push, find, first } = arrayUtilities;

export default class LiminalContext extends Context {
  constructor(context, derivedSubstitutions) {
    super(context);

    this.derivedSubstitutions = derivedSubstitutions;
  }

  getDerivedSubstitutions(derivedSubstitutions = []) {
    const context = this.getContext();

    push(derivedSubstitutions, this.derivedSubstitutions);

    context.getDerivedSubstitutions(derivedSubstitutions);

    return derivedSubstitutions;
  }

  getSoleDerivedSubstitution() {
    let soleDerivedSubstitution = null;

    const derivedSubstitutionsLength = this.derivedSubstitutions.length;

    if (derivedSubstitutionsLength === 1) {
      const firstDerivedSubstitution = first(this.derivedSubstitutions);

      soleDerivedSubstitution = firstDerivedSubstitution; ///
    }

    return soleDerivedSubstitution;
  }

  getSoleNonTrivialDerivedSubstitution() {
    let soleNonTrivialDerivedSubstitution = null;

    const soleDerivedSubstitution = this.getSoleDerivedSubstitution();

    if (soleDerivedSubstitution !== null) {
      const soleDerivedSubstitutionNonTrivial = soleDerivedSubstitution.isNonTrivial();

      if (soleDerivedSubstitutionNonTrivial) {
        soleNonTrivialDerivedSubstitution = soleDerivedSubstitution;  ///
      }
    }

    return soleNonTrivialDerivedSubstitution;
  }

  addDerivedSubstitution(derivedSubstitution) {
    const context = this, ///
          derivedSubstitutionA = derivedSubstitution, ///
          derivedSubstitutionString = derivedSubstitution.getString();

    context.trace(`Adding the '${derivedSubstitutionString}' derived substitution to the liminal context...`);

    const derivedSubstitutionB = this.derivedSubstitutions.find((derivedSubstitution) => {
      const derivedSubstitutionB = derivedSubstitution, ///
            derivedSubstitutionAEqualToDerivedSubstitutionB = derivedSubstitutionA.isEqualTo(derivedSubstitutionB);

      if (derivedSubstitutionAEqualToDerivedSubstitutionB) {
        return true;
      }
    }) || null;

    if (derivedSubstitutionB !== null) {
      context.debug(`The '${derivedSubstitutionString}' derived substitution has already been added to the liminal context.`);
    } else {
      this.derivedSubstitutions.push(derivedSubstitution);
    }

    context.debug(`...added the '${derivedSubstitutionString}' derived substitution to the liminal context.`);
  }

  addDerivedSubstitutions(derivedSubstitutions) {
    derivedSubstitutions.forEach((derivedSubstitution) => {
      this.addDerivedSubstitution(derivedSubstitution);
    });
  }

  resolveDerivedSubstitutions() {
    const context = this, ///
          derivedSubstitutions = this.getDerivedSubstitutions(),
          metavariableNodes = metavariableNodesFromDerivedSubstitutions(derivedSubstitutions);

    metavariableNodes.forEach((metavariableNode) => {
      const complexDerivedSubstitutions = this.findComplexDerivedSubstitutionsByMetavariableNode(metavariableNode);

      complexDerivedSubstitutions.forEach((complexDerivedSubstitution) => {
        const derivedSubstitution = complexDerivedSubstitution, ///
              resolved = derivedSubstitution.isResolved();

        if (!resolved) {
          derivedSubstitution.resolve(context);
        }
      });
    });
  }

  areDerivedSubstitutionsResolved() {
    const derivedSubstitutions = this.getDerivedSubstitutions(),
          metavariableNodes = metavariableNodesFromDerivedSubstitutions(derivedSubstitutions),
          resolved = metavariableNodes.every((metavariableNode) => {
            const complexDerivedSubstitutions = this.findComplexDerivedSubstitutionsByMetavariableNode(metavariableNode),
                  complexDerivedSubstitutionsResolved = complexDerivedSubstitutions.every((complexDerivedSubstitution) => {
                    const complexDerivedSubstitutionResolved = complexDerivedSubstitution.isResolved();

                    if (complexDerivedSubstitutionResolved) {
                      return true;
                    }
                  });

            if (complexDerivedSubstitutionsResolved) {
              return true;
            }
          });

    return resolved;
  }

  isEmpty() {
    const derivedSubstitutionsLength = this.derivedSubstitutions.length,
          empty = (derivedSubstitutionsLength === 0);

    return empty;
  }

  qualify(assumption, metaLevelAssumption) {
    let qualifies = false;

    const empty = this.isEmpty();

    if (empty) {
      qualifies = true;
    } else {
      const soleDerivedSubstitution = this.getSoleDerivedSubstitution();

      if (soleDerivedSubstitution !== null) {
        const { ReferenceDerivedSubstitution } = elements,
              context = this,
              referenceDerivedSubstitution = ReferenceDerivedSubstitution.fromAssumptionAndMetaLevelAssumption(assumption, metaLevelAssumption, context),
              referenceDerivedSubstitutionComparesToSsoleDerivedSubstitution = referenceDerivedSubstitution.compareSubstitution(soleDerivedSubstitution);

        if (referenceDerivedSubstitutionComparesToSsoleDerivedSubstitution) {
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

    context.addDerivedSubstitutions(this.derivedSubstitutions);
  }

  findDerivedSubstitution(callback) {
    const derivedSubstitutions = this.getDerivedSubstitutions(),
          derivedSubstitution = derivedSubstitutions.find(callback);

    return derivedSubstitution;
  }

  findDerivedSubstitutions(callback) {
    let derivedSubstitutions;

    derivedSubstitutions = this.getDerivedSubstitutions();

    derivedSubstitutions = find(derivedSubstitutions, callback);  ///

    return derivedSubstitutions;
  }

  findDerivedSubstitutionByVariableNode(variableNode) {
    const derivedSubstitution = this.findDerivedSubstitution((derivedSubstitution) => {
      const variableNodeMatches = derivedSubstitution.matchVariableNode(variableNode);

      if (variableNodeMatches) {
        return true;
      }
    }) || null;

    return derivedSubstitution;
  }

  findDerivedSubstitutionByMetavariableNode(metavariableNode) {
    const simpleDerivedSubstitution = this.findSimpleDerivedSubstitutionByMetavariableNode(metavariableNode),
          derivedSubstitution = simpleDerivedSubstitution;  ///

    return derivedSubstitution;
  }

  findSimpleDerivedSubstitutionByMetavariableNode(metavariableNode) {
    const simpleDerivedSubstitution = this.findDerivedSubstitution((derivedSubstitution) => {
      const derivedSubstitutionSimple = derivedSubstitution.isSimple();

      if (derivedSubstitutionSimple) {
        const simpleDerivedSubstitution = derivedSubstitution,  ///
              metavariableNodeMatches = simpleDerivedSubstitution.matchMetavariableNode(metavariableNode);

        if (metavariableNodeMatches) {
          return true;
        }
      }
    }) || null;

    return simpleDerivedSubstitution;
  }

  findComplexDerivedSubstitutionsByMetavariableNode(metavariableNode) {
    const complexDerivedSubstitution = this.findDerivedSubstitutions((derivedSubstitution) => {
      const derivedSubstitutionComplex = derivedSubstitution.isComplex();

      if (derivedSubstitutionComplex) {
        const complexDerivedSubstitution = derivedSubstitution,  ///
              metavariableNodeMatches = complexDerivedSubstitution.matchMetavariableNode(metavariableNode);

        if (metavariableNodeMatches) {
          return true;
        }
      }
    }) || null;

    return complexDerivedSubstitution;
  }

  findDerivedSubstitutionByMetavariableNodeAndSubstitution(metavariableNode, derivedSubstitution) {
    const derivedSubstitutionA = derivedSubstitution; ///

    derivedSubstitution = this.findDerivedSubstitution((derivedSubstitution) => {  ///
      const metavariableNodeMatches = derivedSubstitution.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        const derivedSubstitutionB = derivedSubstitution, ///
              derivedSubstitutionBEqualToDerivedSubstitutionA = derivedSubstitutionB.isEqualTo(derivedSubstitutionA);

        if (derivedSubstitutionBEqualToDerivedSubstitutionA) {
          return true;
        }
      }
    }) || null;

    return derivedSubstitution;
  }

  isDerivedSubstitutionPresentByMetavariableNode(metavariableNode) {
    const derivedSubstitution = this.findDerivedSubstitutionByMetavariableNode(metavariableNode),
          derivedSubstitutionPresent = (derivedSubstitution !== null);

    return derivedSubstitutionPresent;
  }

  isDerivedSubstitutionPresentByMetavariableNodeAndSubstitution(metavariableNode, substitution) {
    const derivedSubstitution = this.findDerivedSubstitutionByMetavariableNodeAndSubstitution(metavariableNode, substitution),
          derivedSubstitutionPresent = (derivedSubstitution !== null);

    return derivedSubstitutionPresent;
  }

  static fromNothing(context) {
    const derivedSubstitutions = [],
          liminalContext = new LiminalContext(context, derivedSubstitutions);

    return liminalContext;
  }
}
