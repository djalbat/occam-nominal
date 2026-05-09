"use strict";

import { arrayUtilities } from "necessary";

const { compress } = arrayUtilities;

export function compressTerms(terms) {
  compress(terms, (termA, termB) => {
    const termAEqualToTermB = termA.isEqualTo(termB);

    if (!termAEqualToTermB) {
      return true;
    }
  });
}

export function compressFrames(frames) {
  compress(frames, (frameA, frameB) => {
    const frameAEqualToFrameB = frameA.isEqualTo(frameB);

    if (!frameAEqualToFrameB) {
      return true;
    }
  });
}

export function compressProperties(properties) {
  compress(properties, (propertyA, propertyB) => {
    const propertyAEqualToPropertyB = propertyA.isEqualTo(propertyB);

    if (!propertyAEqualToPropertyB) {
      return true;
    }
  });
}

export function compressEqualities(equalities) {
  compress(equalities, (equalityA, equalityB) => {
    const equalityAEqualToEqualityB = equalityA.isEqualTo(equalityB);

    if (!equalityAEqualToEqualityB) {
      return true;
    }
  });
}

export function compressJudgements(judgements) {
  compress(judgements, (judgementA, judgementB) => {
    const judgementAEqualToJudgementB = judgementA.isEqualTo(judgementB);

    if (!judgementAEqualToJudgementB) {
      return true;
    }
  });
}

export function compressAssertions(assertions) {
  compress(assertions, (assertionA, assertionB) => {
    const assertionAEqualToAssertionB = assertionA.isEqualTo(assertionB);

    if (!assertionAEqualToAssertionB) {
      return true;
    }
  });
}

export function compressStatements(statements) {
  compress(statements, (statementA, statementB) => {
    const statementAEqualToStatementB = statementA.isEqualTo(statementB);

    if (!statementAEqualToStatementB) {
      return true;
    }
  });
}

export function compressSignatures(signatures) {
  compress(signatures, (signatureA, signatureB) => {
    const signatureAEqualToSignatureB = signatureA.isEqualTo(signatureB);

    if (!signatureAEqualToSignatureB) {
      return true;
    }
  });
}

export function compressReferences(references) {
  compress(references, (referenceA, referenceB) => {
    const referenceAEqualToReferenceB = referenceA.isEqualTo(referenceB);

    if (!referenceAEqualToReferenceB) {
      return true;
    }
  });
}

export function compressAssumptions(assumptions) {
  compress(assumptions, (assumptionA, assumptionB) => {
    const assumptionAEqualToAssumptionB = assumptionA.isEqualTo(assumptionB);

    if (!assumptionAEqualToAssumptionB) {
      return true;
    }
  });
}

export function compressMetavariables(metavariables) {
  compress(metavariables, (metavariableA, metavariableB) => {
    const metavariableAEqualToMetavariableB = metavariableA.isEqualTo(metavariableB);

    if (!metavariableAEqualToMetavariableB) {
      return true;
    }
  });
}

export function compressSubstitutions(substitutions) {
  compress(substitutions, (substitutionA, substitutionB) => {
    const substitutionAEqualToSubstitutionB = substitutionA.isEqualTo(substitutionB);

    if (!substitutionAEqualToSubstitutionB) {
      return true;
    }
  });
}

export function compressPropertyRelations(propertyRelations) {
  compress(propertyRelations, (propertyRelationA, propertyRelationB) => {
    const propertyRelationAEqualToPropertyRelationB = propertyRelationA.isEqualTo(propertyRelationB);

    if (!propertyRelationAEqualToPropertyRelationB) {
      return true;
    }
  });
}
