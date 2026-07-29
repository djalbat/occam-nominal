"use strict";

import { continuationUtilities } from "occam-languages";

import elements from "../elements";

const { reduce } = continuationUtilities;

function unifyStepWithRule(step, context, continuation) {
  const reference = step.getReference();

  if (reference === null) {
    const stepUnifiesWithRule = false;

    return continuation(stepUnifiesWithRule);
  }

  const rule = context.findRuleByReference(reference);

  if (rule === null) {
    const stepUnifiesWithRule = false;

    return continuation(stepUnifiesWithRule);
  }

  const stepString = step.getString(),
        ruleString = rule.getString();

  context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule...`);

  const factOrSubproofs = context.getFactOrSubproofs();

  return rule.unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, (stepAndFactOrSubproofsUnify) => {
    let stepUnifiesWithRule = false;

    if (stepAndFactOrSubproofsUnify) {
      stepUnifiesWithRule = true;
    }

    if (stepUnifiesWithRule) {
      context.debug(`...unified the '${stepString}' step with the '${ruleString}' rule.`);
    }

    return continuation(stepUnifiesWithRule);
  });
}

function unifyStepWithClaim(step, context, continuation) {
  const reference = step.getReference();

  if (reference === null) {
    const stepUnifiesWithClaim = false;

    return continuation(stepUnifiesWithClaim);
  }

  const claim = context.findClaimByReference(reference);

  if (claim === null) {
    const stepUnifiesWithClaim = false;

    return continuation(stepUnifiesWithClaim);
  }

  const satisfiable = claim.isSatisfiable();

  if (satisfiable) {
    const stepUnifiesWithClaim = false;

    return continuation(stepUnifiesWithClaim);
  }

  const stepString = step.getString(),
        claimString = reference.getString();

  context.trace(`Unifying the '${stepString}' step with the '${claimString}' claim...`);

  const factOrSubproofs = context.getFactOrSubproofs();

  return claim.unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, (stepAndFactOrSubproofsUnify) => {
    let stepUnifiesWithClaim = false;

    if (stepAndFactOrSubproofsUnify) {
      stepUnifiesWithClaim = true;
    }

    if (stepUnifiesWithClaim) {
      context.debug(`...unified the '${stepString}' step with the '${claimString}' claim.`);
    }

    return continuation(stepUnifiesWithClaim);
  });
}

function unifyStepWithSignatureAssertion(step, context, continuation) {
  const signatureAssertion = step.getSignatureAssertion();

  if (signatureAssertion === null) {
    const stepUnifiesWithSignatureAssertion = false;

    return continuation(stepUnifiesWithSignatureAssertion);
  }

  const stepString = step.getString(),
        signatureAssertionString = signatureAssertion.getString();

  context.trace(`Unifying the '${stepString}' step with the '${signatureAssertionString}' signature assertion...`);

  const factOrSubproofs = context.getFactOrSubproofs();

  return signatureAssertion.unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, (stepAndFactOrSubproofsUnify) => {
    let stepUnifiesWithSignatureAssertion = false;

    if (stepAndFactOrSubproofsUnify) {
      stepUnifiesWithSignatureAssertion = true;
    }

    if (stepUnifiesWithSignatureAssertion) {
      context.debug(`...unified the '${stepString}' step with the '${signatureAssertionString}' signature assertion.`);
    }

    return continuation(stepUnifiesWithSignatureAssertion);
  });
}

function unifyStepAsQualifiedConstraint(step, context, continuation) {
  const metaLevel = context.isMetaLevel();

  if (!metaLevel) {
    const stepUnifiesAsQualifiedConstraint = false;

    return continuation(stepUnifiesAsQualifiedConstraint);
  }

  const reference = step.getReference();

  if (reference === null) {
    const stepUnifiesAsQualifiedConstraint = false;

    return continuation(stepUnifiesAsQualifiedConstraint);
  }

  const stepString = step.getString(),
        referenceString = reference.getString();

  context.trace(`Unifying the '${stepString}' step as a constraint with the '${referenceString}' reference...`);

  const { Constraint } = elements,
        constraint = Constraint.fromStep(step, context);

  return constraint.validate(context, (constraint) => {
    let stepUnifiesAsQualifiedConstraint = false;

    if (constraint !== null) {
      stepUnifiesAsQualifiedConstraint = true;
    }

    if (stepUnifiesAsQualifiedConstraint) {
      context.debug(`...unified the '${stepString}' step as a constraint with the '${referenceString}' reference.`);
    }

    return continuation(stepUnifiesAsQualifiedConstraint);
  });
}

function unifyStepAsUnqualifiedEquality(step, context, continuation) {
  const qualified = step.isQualified();

  if (qualified) {
    const stepUnifiesAUnqualifiedEquality = false;

    return continuation(stepUnifiesAUnqualifiedEquality);
  }

  const { Equality } = elements,
        statement = step.getStatement(),
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    const stepUnifiesAUnqualifiedEquality = false;

    return continuation(stepUnifiesAUnqualifiedEquality);
  }

  let stepUnifiesAUnqualifiedEquality;

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as an unqualified equality...`);

  stepUnifiesAUnqualifiedEquality = true;

  if (stepUnifiesAUnqualifiedEquality) {
    context.debug(`...unified the '${stepString}' step as an unqualified equality.`);
  }

  return continuation(stepUnifiesAUnqualifiedEquality);
}

function unifyStepAsUNqualifiedJudgement(step, context, continuation) {
  const qualified = step.isQualified();

  if (qualified) {
    const stepUnifiesAsUnqualifiedJudgement = false;

    return continuation(stepUnifiesAsUnqualifiedJudgement);
  }

  const { Judgement } = elements,
        statement = step.getStatement(),
        judgement = Judgement.fromStatement(statement, context);

  if (judgement === null) {
    const stepUnifiesAsUnqualifiedJudgement = false;

    return continuation(stepUnifiesAsUnqualifiedJudgement);
  }

  let stepUnifiesAsUnqualifiedJudgement;

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as an unqualified judgement...`);

  stepUnifiesAsUnqualifiedJudgement = true;

  if (stepUnifiesAsUnqualifiedJudgement) {
    context.debug(`...unified the '${stepString}' step as an unqualified judgement.`);
  }

  return continuation(stepUnifiesAsUnqualifiedJudgement);
}

function unifyStepAsUnqualifiedTypeAssertion(step, context, continuation) {
  const qualified = step.isQualified();

  if (qualified) {
    const stepUnifiesAsUnqualifiedTypeAssertion = false;

    return continuation(stepUnifiesAsUnqualifiedTypeAssertion);
  }

  const { TypeAssertion } = elements,
        statement = step.getStatement(),
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    const stepUnifiesAsUnqualifiedTypeAssertion = false;

    return continuation(stepUnifiesAsUnqualifiedTypeAssertion);
  }

  let stepUnifiesAsUnqualifiedTypeAssertion;

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as an unqualified type assertion...`);

  stepUnifiesAsUnqualifiedTypeAssertion = true;

  if (stepUnifiesAsUnqualifiedTypeAssertion) {
    context.debug(`...unified the '${stepString}' step as an unqualified type assertion.`);
  }

  return continuation(stepUnifiesAsUnqualifiedTypeAssertion);
}

function unifyStepAsUnqualifiedPropertyAssertion(step, context, continuation) {
  const qualified = step.isQualified();

  if (qualified) {
    const stepUnifiesAsUnqualifiedPropertyAssertion = false;

    return continuation(stepUnifiesAsUnqualifiedPropertyAssertion);
  }

  const { PropertyAssertion } = elements,
        statement = step.getStatement(),
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    const stepUnifiesAsUnqualifiedPropertyAssertion = false;

    return continuation(stepUnifiesAsUnqualifiedPropertyAssertion);
  }

  let stepUnifiesAsUnqualifiedPropertyAssertion;

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as an unqualified property assertion...`);

  stepUnifiesAsUnqualifiedPropertyAssertion = true;

  if (stepUnifiesAsUnqualifiedPropertyAssertion) {
    context.debug(`...unified the '${stepString}' step as an unqualified property assertion.`);
  }

  return continuation(stepUnifiesAsUnqualifiedPropertyAssertion);
}

function unifyStepAsUnqualifiedSignatureAssertion(step, context, continuation) {
  const qualified = step.isQualified();

  if (qualified) {
    const stepUnifiesAsUnqualifiedSignatureAssertion = false;

    return continuation(stepUnifiesAsUnqualifiedSignatureAssertion);
  }

  const { SignatureAssertion } = elements,
        statement = step.getStatement(),
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    const stepUnifiesAsUnqualifiedSignatureAssertion = false;

    return continuation(stepUnifiesAsUnqualifiedSignatureAssertion);
  }

  let stepUnifiesAsUnqualifiedSignatureAssertion;

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as a signature assertion...`);

  stepUnifiesAsUnqualifiedSignatureAssertion = true;

  if (stepUnifiesAsUnqualifiedSignatureAssertion) {
    context.debug(`...unified the '${stepString}' step as a signature assertion.`);
  }

  return continuation(stepUnifiesAsUnqualifiedSignatureAssertion);
}

function unifyStepAsQualifiedSignatureAssertion(step, context, continuation) {
  const reference = step.getReference();

  if (reference === null) {
    const stepUnifiesAsQualifiedSignatureAssertion = false;

    return continuation(stepUnifiesAsQualifiedSignatureAssertion);
  }

  const claim = context.findClaimByReference(reference);

  if (claim === null) {
    const stepUnifiesAsQualifiedSignatureAssertion = false;

    return continuation(stepUnifiesAsQualifiedSignatureAssertion);
  }

  const statementNode = step.getStatementNode(),
        signatureAssertionNode = statementNode.getSignatureAssertionNode();

  if (signatureAssertionNode === null) {
    const stepUnifiesAsQualifiedSignatureAssertion = false;

    return continuation(stepUnifiesAsQualifiedSignatureAssertion);
  }

  const stepString = step.getString(),
        referenceString = reference.getString(),
        signatureAssertion = context.findAssertionByAssertionNode(signatureAssertionNode);

  context.trace(`Unifying the '${stepString}' step as a signature assertion with the '${referenceString}' reference...`);

  return signatureAssertion.unifyClaim(claim, context, (claimUnifies) => {
    let stepUnifiesAsQualifiedSignatureAssertion = false;

    if (claimUnifies) {
      stepUnifiesAsQualifiedSignatureAssertion = true;
    }

    if (stepUnifiesAsQualifiedSignatureAssertion) {
      context.debug(`...unified the '${stepString}' step as a signature assertion with the '${referenceString}' reference.`);
    }

    return continuation(stepUnifiesAsQualifiedSignatureAssertion);
  });
}

function compareStepToFactOrSubproofs(step, context, continuation) {
  const qualified = step.isQualified();

  if (qualified) {
    const stepComparesToFactOrSubproofs = false;

    return continuation(stepComparesToFactOrSubproofs);
  }

  const stepString = step.getString();

  context.trace(`Comparing the '${stepString}' step to subproofs or proof asssertions...`);

  let stepComparesToFactOrSubproofs;

  const factOrSubproofs = context.getFactOrSubproofs();

  stepComparesToFactOrSubproofs = step.compareFactOrSubproofs(factOrSubproofs, context);

  if (stepComparesToFactOrSubproofs) {
    context.debug(`...compared the '${stepString}' step to subproofs or proof asssertions.`);
  }

  return continuation(stepComparesToFactOrSubproofs);
}

function compareStepToJudgements(step, context, continuation) {
  const qualified = step.isQualified();

  if (qualified) {
    const stepComparesToJudgements = false;

    return continuation(stepComparesToJudgements);
  }

  const stepString = step.getString();

  context.trace(`Comparing the '${stepString}' step to judgements...`);

  let stepComparesToJudgements;

  const facts = context.getFacts();

  return judgementsFromFacts(facts, context, (judgements) => {
    stepComparesToJudgements = step.compareJudgements(judgements, context);

    if (stepComparesToJudgements) {
      context.debug(`...compared the '${stepString}' step to judgements.`);
    }

    return continuation(stepComparesToJudgements);
  });
}

export const unifySteps = [
  unifyStepWithRule,
  unifyStepWithClaim,
  unifyStepWithSignatureAssertion,
  unifyStepAsQualifiedConstraint,
  unifyStepAsUnqualifiedEquality,
  unifyStepAsUNqualifiedJudgement,
  unifyStepAsUnqualifiedTypeAssertion,
  unifyStepAsUnqualifiedPropertyAssertion,
  unifyStepAsUnqualifiedSignatureAssertion,
  unifyStepAsQualifiedSignatureAssertion,
  compareStepToFactOrSubproofs,
  compareStepToJudgements
];

function judgementsFromFacts(facts, context, continuation) {
  const judgements = [];

  return reduce(facts, judgements, (judgements, fact, continuation) => {
    const { Judgement } = elements,
          context = fact.getContext(),
          judgement = Judgement.fromFact(fact, context);

    if (judgement === null) {
      return continuation(judgements);
    }

    return judgement.validate(context, (judgement) => {
      judgements.push(judgement);

      return continuation(judgements);
    });
  }, continuation);
}