"use strict";

import { arrayUtilities } from "necessary";

import elements from "../elements";

import { variablesFromTerm } from "../utilities/equivalence";

const { push, separate } = arrayUtilities;

export function mergeEquivalences(equivalencesA, equivalencesB, context) {
  equivalencesA = [  ///
    ...equivalencesA
  ];

  equivalencesB.forEach((equivalenceB) => {
    equivalencesA = mergeEquivalence(equivalencesA, equivalenceB, context);
  });

  return equivalencesA;
}

export function equivalencesFromEquality(equality, context) {
  const { Equivalence } = elements,
        eaulivalence = Equivalence.fromEquality(equality, context),
        equivalences = [
          eaulivalence
        ];

  return equivalences;
}

export function findEquivalenceByTermNodes(equivalences, termNodes) {
  const equivalence = equivalences.find((equivalence) => {
    const termNodeMatches = equivalence.matchTermNodes(termNodes);

    if (termNodeMatches) {
      return true;
    }
  }) || null;

  return equivalence;
}

export function separateGroundedTermsAndDefinedVariables(equivalences, groundedTerms, definedVariables, context) {
  let groundedEquivalences,
      remainingEquivalences,
      initiallyGroundedEquivalences,
      implicitlyGroundedEquivalences;

  remainingEquivalences = [];

  initiallyGroundedEquivalences = [];

  separateInitiallyGroundedEquivalences(equivalences, remainingEquivalences, initiallyGroundedEquivalences, context);

  const initiallyGroundedEquivalencesLength = initiallyGroundedEquivalences.length;

  if (initiallyGroundedEquivalencesLength > 0) {
    groundedEquivalences = initiallyGroundedEquivalences; ///

    let implicitlyGroundedEquivalencesLength = 1;

    while (implicitlyGroundedEquivalencesLength > 0) {
      let definedVariablesLength = 0,
            previousDefinedVariablesLength = -1;

      while (definedVariablesLength > previousDefinedVariablesLength) {
        previousDefinedVariablesLength = definedVariablesLength;  ///

        groundedTermsFromGroundedEquivalencesAndDefinedVariables(groundedEquivalences, definedVariables, groundedTerms, context);

        definedVariablesFromGroundedTerms(groundedTerms, definedVariables, context);

        definedVariablesLength = definedVariables.length;
      }

      equivalences = remainingEquivalences; ///

      remainingEquivalences = [];

      implicitlyGroundedEquivalences = [];

      separateImplicitlyGroundedEquivalences(equivalences, remainingEquivalences, implicitlyGroundedEquivalences, definedVariables, context);

      push(groundedEquivalences, implicitlyGroundedEquivalences);

      implicitlyGroundedEquivalencesLength = implicitlyGroundedEquivalences.length;  ///
    }
  }
}

function mergeEquivalence(equivalencesA, equivalenceB, context) {
  const mergedEquivalences = [];

  equivalencesA.forEach((equivalenceA) => {
    const equivalenceBDisjointFromEquivalenceA = equivalenceB.isDisjointFrom(equivalenceA);

    if (equivalenceBDisjointFromEquivalenceA) {
      const mergedEquivalence = equivalenceA;  ///

      mergedEquivalences.push(mergedEquivalence);
    } else {
      equivalenceB = equivalenceB.mergedWith(equivalenceA, context);
    }
  });

  const mergedEquivalence = equivalenceB;  ///

  mergedEquivalences.push(mergedEquivalence);

  equivalencesA = mergedEquivalences;  ///

  return equivalencesA;
}

function definedVariablesFromGroundedTerms(groundedTerms, definedVariables, context) {
  groundedTerms.forEach((groundedTerm) => {
    const term = groundedTerm,  ///
          variables = variablesFromTerm(term, context);

    variables.forEach((variable) => {
      const definedVariablesIncludesTermVariable = definedVariables.includes(variable);

      if (!definedVariablesIncludesTermVariable) {
        const definedVariable = variable;  ///

        definedVariables.push(definedVariable);
      }
    });
  });
}

function separateInitiallyGroundedEquivalences(equivalences, remainingEquivalences, initiallyGroundedEquivalences, context) {
  separate(equivalences, remainingEquivalences, initiallyGroundedEquivalences, (equivalence) => {
    const equivalenceInitiallyGrounded = equivalence.isInitiallyGrounded(context);

    if (!equivalenceInitiallyGrounded) {
      return true;
    }
  });
}

function separateImplicitlyGroundedEquivalences(equivalences, remainingEquivalences, implicitlyGroundedEquivalences, definedVariables, context) {
  separate(equivalences, remainingEquivalences, implicitlyGroundedEquivalences, (equivalence) => {
    const equivalenceImplicitlyGrounded = equivalence.isImplicitlyGrounded(definedVariables, context);

    if (!equivalenceImplicitlyGrounded) {
      return true;
    }
  });
}

function groundedTermsFromGroundedEquivalencesAndDefinedVariables(groundedEquivalences, definedVariables, groundedTerms, context) {
  groundedEquivalences.forEach((groundedEquivalence) => {
    groundedEquivalence.getGroundedTerms(definedVariables, groundedTerms, context);
  });
}
