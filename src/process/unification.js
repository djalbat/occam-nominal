"use strict";

import elements from "../elements";

function applyRule(step, context, forward, back) {
  const reference = step.getReference();

  if (reference === null) {
    return back();
  }

  const rule = context.findRuleByReference(reference);

  if (rule === null) {
    return back();
  }

  const factOrSubproofs = context.getFactOrSubproofs();

  return rule.apply(step, factOrSubproofs, context, forward, back);
}

function applyClaim(step, context, forward, back) {
  const reference = step.getReference();

  if (reference === null) {
    return back();
  }

  const claim = context.findClaimByReference(reference);

  if (claim === null) {
    return back();
  }

  const satisfiable = claim.isSatisfiable();

  if (satisfiable) {
    return back();
  }

  const factOrSubproofs = context.getFactOrSubproofs();

  return claim.apply(step, factOrSubproofs, context, forward, back);
}

function applySchemaAssertion(step, context, forward, back) {
  const schemaAssertion = step.getSchemaAssertion();

  if (schemaAssertion === null) {
    return back();
  }

  return schemaAssertion.apply(step, context, forward, back);
}

function applySignatureAssertion(step, context, forward, back) {
  const signatureAssertion = step.getSignatureAssertion();

  if (signatureAssertion === null) {
    return back();
  }

  const factOrSubproofs = context.getFactOrSubproofs();

  return signatureAssertion.apply(step, factOrSubproofs, context, forward, back);
}

function unifyStepAsQualifiedConstraint(step, context, forward, back) {
  const metaLevel = context.isMetaLevel();

  if (!metaLevel) {
    return back();
  }

  const reference = step.getReference();

  if (reference === null) {
    return back();
  }

  const { Constraint } = elements,
        constraint = Constraint.fromStep(step, context),
        stepString = step.getString(),
        referenceString = reference.getString();

  context.trace(`Unifying the '${stepString}' step as a constraint with the '${referenceString}' reference...`);

  return constraint.verify(context, (context, back) => {
    context.debug(`...unified the '${stepString}' step as a constraint with the '${referenceString}' reference.`);

    return forward(context, back);
  }, back);
}

function unifyStepAsUnqualifiedEquality(step, context, forward, back) {
  const qualified = step.isQualified();

  if (qualified) {
    return back();
  }

  const { Equality } = elements,
        statement = step.getStatement(),
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    return back();
  }

  return forward(context, back);
}

function unifyStepAsUnqualifiedTypeAssertion(step, context, forward, back) {
  const qualified = step.isQualified();

  if (qualified) {
    return back();
  }

  const { TypeAssertion } = elements,
        statement = step.getStatement(),
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    return back();
  }

  return forward(context, back);
}

function unifyStepAsUnqualifiedPropertyAssertion(step, context, forward, back) {
  const qualified = step.isQualified();

  if (qualified) {
    return back();
  }

  const { PropertyAssertion } = elements,
        statement = step.getStatement(),
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    return back();
  }

  return forward(context, back);
}

function unifyStepAsUnqualifiedSignatureAssertion(step, context, forward, back) {
  const qualified = step.isQualified();

  if (qualified) {
    return back();
  }

  const { SignatureAssertion } = elements,
        statement = step.getStatement(),
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    return back();
  }

  return forward(context, back);
}

function unifyStepAsQualifiedSignatureAssertion(step, context, forward, back) {
  const reference = step.getReference();

  if (reference === null) {
    return back();
  }

  const claim = context.findClaimByReference(reference);

  if (claim === null) {
    return back();
  }

  const statementNode = step.getStatementNode(),
        signatureAssertionNode = statementNode.getSignatureAssertionNode();

  if (signatureAssertionNode === null) {
    return back();
  }

  const stepString = step.getString(),
        referenceString = reference.getString(),
        signatureAssertion = context.findAssertionByAssertionNode(signatureAssertionNode);

  context.trace(`Unifying the '${stepString}' step as a signature assertion with the '${referenceString}' reference...`);

  return signatureAssertion.unifyClaim(claim, context, (contezt, back) => {
    context.debug(`...unified the '${stepString}' step as a signature assertion with the '${referenceString}' reference.`);

    return forward(context, back);
  }, back);
}

function compareStepToFactOrSubproofs(step, context, forward, back) {
  const qualified = step.isQualified();

  if (qualified) {
    return back();
  }

  const stepString = step.getString(),
        factOrSubproofs = context.getFactOrSubproofs();

  context.trace(`Comparing the '${stepString}' step to facts or subproofs...`);

  const stepComparesToFactOrSubproofs = step.compareFactOrSubproofs(factOrSubproofs, context);

  if (!stepComparesToFactOrSubproofs) {
    return back();
  }

  context.debug(`...compared the '${stepString}' step to facts or subproofs.`);

  return forward(context, back);
}

export const unifySteps = [
  applyRule,
  applyClaim,
  applySchemaAssertion,
  applySignatureAssertion,
  unifyStepAsQualifiedConstraint,
  unifyStepAsUnqualifiedEquality,
  unifyStepAsUnqualifiedTypeAssertion,
  unifyStepAsUnqualifiedPropertyAssertion,
  unifyStepAsUnqualifiedSignatureAssertion,
  unifyStepAsQualifiedSignatureAssertion,
  compareStepToFactOrSubproofs
];
