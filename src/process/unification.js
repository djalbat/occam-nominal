"use strict";

import elements from "../elements";

import { declare } from "../utilities/state";

function unifyStepWithRule(step, context, continuation) {
  let stepUnifiesWithRule = false;

  const reference = step.getReference();

  if (reference === null) {
    return continuation(stepUnifiesWithRule);
  }

  const rule = context.findRuleByReference(reference);

  if (rule === null) {
    return continuation(stepUnifiesWithRule);
  }

  const stepString = step.getString(),
        ruleString = rule.getString(),
        factOrSubproofs = context.getFactOrSubproofs();

  context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule...`);

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
  let stepUnifiesWithClaim = false;

  const reference = step.getReference();

  if (reference === null) {
    return continuation(stepUnifiesWithClaim);
  }

  const claim = context.findClaimByReference(reference);

  if (claim === null) {
    return continuation(stepUnifiesWithClaim);
  }

  const satisfiable = claim.isSatisfiable();

  if (satisfiable) {
    return continuation(stepUnifiesWithClaim);
  }

  const stepString = step.getString(),
        claimString = reference.getString(),
        factOrSubproofs = context.getFactOrSubproofs();

  context.trace(`Unifying the '${stepString}' step with the '${claimString}' claim...`);

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

function unifyStepWithSchemaAssertion(step, context, continuation) {
  let stepUnifiesWithSchemaAssertion = false;

  const schemaAssertion = step.getSchemaAssertion();

  if (schemaAssertion === null) {
    return continuation(stepUnifiesWithSchemaAssertion);
  }

  const stepString = step.getString(),
        schemaAssertionString = schemaAssertion.getString();

  context.trace(`Unifying the '${stepString}' step with the '${schemaAssertionString}' schema assertion...`);

  return schemaAssertion.unifyStep(step, context, (stepUnifies) => {
    let stepUnifiesWithSchemaAssertion = false;

    if (stepUnifies) {
      stepUnifiesWithSchemaAssertion = true;
    }

    if (stepUnifiesWithSchemaAssertion) {
      context.debug(`...unified the '${stepString}' step with the '${schemaAssertionString}' schema assertion.`);
    }

    return continuation(stepUnifiesWithSchemaAssertion);
  });
}

function unifyStepWithSignatureAssertion(step, context, continuation) {
  let stepUnifiesWithSignatureAssertion = false;

  const signatureAssertion = step.getSignatureAssertion();

  if (signatureAssertion === null) {
    return continuation(stepUnifiesWithSignatureAssertion);
  }

  const stepString = step.getString(),
        factOrSubproofs = context.getFactOrSubproofs(),
        signatureAssertionString = signatureAssertion.getString();

  context.trace(`Unifying the '${stepString}' step with the '${signatureAssertionString}' signature assertion...`);

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
  let stepUnifiesAsQualifiedConstraint = false;

  const metaLevel = context.isMetaLevel();

  if (!metaLevel) {
    return continuation(stepUnifiesAsQualifiedConstraint);
  }

  const reference = step.getReference();

  if (reference === null) {
    return continuation(stepUnifiesAsQualifiedConstraint);
  }

  const { Constraint } = elements,
        constraint = Constraint.fromStep(step, context),
        stepString = step.getString(),
        referenceString = reference.getString();

  context.trace(`Unifying the '${stepString}' step as a constraint with the '${referenceString}' reference...`);

  declare((state) => {
    constraint.validate(state, context, (constraint, context) => {
      let validates;

      stepUnifiesAsQualifiedConstraint = true;

      validates = true;

      return validates;
    });
  });

  if (stepUnifiesAsQualifiedConstraint) {
    context.debug(`...unified the '${stepString}' step as a constraint with the '${referenceString}' reference.`);
  }

  return continuation(stepUnifiesAsQualifiedConstraint);
}

function unifyStepAsUnqualifiedEquality(step, context, continuation) {
  let stepUnifiesAUnqualifiedEquality = false;

  const qualified = step.isQualified();

  if (qualified) {
    return continuation(stepUnifiesAUnqualifiedEquality);
  }

  const { Equality } = elements,
        statement = step.getStatement(),
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    return continuation(stepUnifiesAUnqualifiedEquality);
  }

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as an unqualified equality...`);

  stepUnifiesAUnqualifiedEquality = true;

  if (stepUnifiesAUnqualifiedEquality) {
    context.debug(`...unified the '${stepString}' step as an unqualified equality.`);
  }

  return continuation(stepUnifiesAUnqualifiedEquality);
}

function unifyStepAsUnqualifiedTypeAssertion(step, context, continuation) {
  let stepUnifiesAsUnqualifiedTypeAssertion = false;

  const qualified = step.isQualified();

  if (qualified) {
    return continuation(stepUnifiesAsUnqualifiedTypeAssertion);
  }

  const { TypeAssertion } = elements,
        statement = step.getStatement(),
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    return continuation(stepUnifiesAsUnqualifiedTypeAssertion);
  }

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as an unqualified type assertion...`);

  stepUnifiesAsUnqualifiedTypeAssertion = true;

  if (stepUnifiesAsUnqualifiedTypeAssertion) {
    context.debug(`...unified the '${stepString}' step as an unqualified type assertion.`);
  }

  return continuation(stepUnifiesAsUnqualifiedTypeAssertion);
}

function unifyStepAsUnqualifiedPropertyAssertion(step, context, continuation) {
  let stepUnifiesAsUnqualifiedPropertyAssertion = false;

  const qualified = step.isQualified();

  if (qualified) {
    return continuation(stepUnifiesAsUnqualifiedPropertyAssertion);
  }

  const { PropertyAssertion } = elements,
        statement = step.getStatement(),
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    return continuation(stepUnifiesAsUnqualifiedPropertyAssertion);
  }

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as an unqualified property assertion...`);

  stepUnifiesAsUnqualifiedPropertyAssertion = true;

  if (stepUnifiesAsUnqualifiedPropertyAssertion) {
    context.debug(`...unified the '${stepString}' step as an unqualified property assertion.`);
  }

  return continuation(stepUnifiesAsUnqualifiedPropertyAssertion);
}

function unifyStepAsUnqualifiedSignatureAssertion(step, context, continuation) {
  let stepUnifiesAsUnqualifiedSignatureAssertion = false;

  const qualified = step.isQualified();

  if (qualified) {
    return continuation(stepUnifiesAsUnqualifiedSignatureAssertion);
  }

  const { SignatureAssertion } = elements,
        statement = step.getStatement(),
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    return continuation(stepUnifiesAsUnqualifiedSignatureAssertion);
  }

  const stepString = step.getString();

  context.trace(`Unifying the '${stepString}' step as a signature assertion...`);

  stepUnifiesAsUnqualifiedSignatureAssertion = true;

  if (stepUnifiesAsUnqualifiedSignatureAssertion) {
    context.debug(`...unified the '${stepString}' step as a signature assertion.`);
  }

  return continuation(stepUnifiesAsUnqualifiedSignatureAssertion);
}

function unifyStepAsQualifiedSignatureAssertion(step, context, continuation) {
  let stepUnifiesAsQualifiedSignatureAssertion = false;

  const reference = step.getReference();

  if (reference === null) {
    return continuation(stepUnifiesAsQualifiedSignatureAssertion);
  }

  const claim = context.findClaimByReference(reference);

  if (claim === null) {
    return continuation(stepUnifiesAsQualifiedSignatureAssertion);
  }

  const statementNode = step.getStatementNode(),
        signatureAssertionNode = statementNode.getSignatureAssertionNode();

  if (signatureAssertionNode === null) {
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
  let stepComparesToFactOrSubproofs = false;

  const qualified = step.isQualified();

  if (qualified) {
    return continuation(stepComparesToFactOrSubproofs);
  }

  const stepString = step.getString(),
        factOrSubproofs = context.getFactOrSubproofs();

  context.trace(`Comparing the '${stepString}' step to facts or subproofs...`);

  stepComparesToFactOrSubproofs = step.compareFactOrSubproofs(factOrSubproofs, context);

  if (stepComparesToFactOrSubproofs) {
    context.debug(`...compared the '${stepString}' step to facts or subproofs.`);
  }

  return continuation(stepComparesToFactOrSubproofs);
}

export const unifySteps = [
  unifyStepWithRule,
  unifyStepWithClaim,
  unifyStepWithSchemaAssertion,
  unifyStepWithSignatureAssertion,
  unifyStepAsQualifiedConstraint,
  unifyStepAsUnqualifiedEquality,
  unifyStepAsUnqualifiedTypeAssertion,
  unifyStepAsUnqualifiedPropertyAssertion,
  unifyStepAsUnqualifiedSignatureAssertion,
  unifyStepAsQualifiedSignatureAssertion,
  compareStepToFactOrSubproofs
];
