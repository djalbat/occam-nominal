"use strict";

import elements from "../elements";

async function unifyStepWithRule(step, context) {
  let stepUnifiesWithRule = false;

  const reference = step.getReference();

  if (reference !== null) {
    const rule = context.findRuleByReference(reference);

    if (rule !== null) {
      const stepString = step.getString(),
            ruleString = rule.getString();

      context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule...`);

      const subproofOrProofAssertions = context.getSubproofOrProofAssertions(),
            stepAndSubproofOrProofAssertionsUnify = await rule.unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context);

      if (stepAndSubproofOrProofAssertionsUnify) {
        stepUnifiesWithRule = true;
      }

      if (stepUnifiesWithRule) {
        context.debug(`...unified the '${stepString}' step with the '${ruleString}' rule.`);
      }
    }
  }

  return stepUnifiesWithRule;
}

async function unifyStepWithTopLevelAssertion(step, context) {
  let stepUnifiesWithTopLevelAssertion = false;

  const reference = step.getReference();

  if (reference !== null) {
    const topLevelAssertion = context.findTopLevelAssertionByReference(reference);

    if (topLevelAssertion !== null) {
      const satisfiable = topLevelAssertion.isSatisfiable();

      if (!satisfiable) {
        const stepString = step.getString(),
              topLevelAssertionString = reference.getString();

        context.trace(`Unifying the '${stepString}' step with the '${topLevelAssertionString}' top level assertion...`);

        const subproofOrProofAssertions = context.getSubproofOrProofAssertions(),
              stepAndSubproofOrProofAssertionsUnify = await topLevelAssertion.unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context);

        if (stepAndSubproofOrProofAssertionsUnify) {
          stepUnifiesWithTopLevelAssertion = true;
        }

        if (stepUnifiesWithTopLevelAssertion) {
          context.debug(`...unified the '${stepString}' step with the '${topLevelAssertionString}' top level assertion.`);
        }
      }
    }
  }

  return stepUnifiesWithTopLevelAssertion;
}

async function unifyStepWithSignatureAssertion(step, context) {
  let stepUnifiesWithSignatureAssertion = false;

  const signatureAssertion = step.getSignatureAssertion();

  if (signatureAssertion !== null) {
    const stepString = step.getString(),
          signatureAssertionString = signatureAssertion.getString();

    context.trace(`Unifying the '${stepString}' step with the '${signatureAssertionString}' signature assertion...`);

    const subproofOrProofAssertions = context.getSubproofOrProofAssertions(),
          stepAndSubproofOrProofAssertionsUnify = await signatureAssertion.unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context);

    if (stepAndSubproofOrProofAssertionsUnify) {
      stepUnifiesWithSignatureAssertion = true;
    }

    if (stepUnifiesWithSignatureAssertion) {
      context.debug(`...unified the '${stepString}' step with the '${signatureAssertionString}' signature assertion.`);
    }
  }

  return stepUnifiesWithSignatureAssertion;
}

async function unifyStepAsUnqualifiedEquality(step, context) {
  let stepUnifiesAUnqualifiedEquality = false;

  const unqualified = step.isUnqualified();

  if (unqualified) {
    const { Equality } = elements,
          statement = step.getStatement(),
          equality = Equality.fromStatement(statement, context);

    if (equality !== null) {
      const stepString = step.getString();

      context.trace(`Unifying the '${stepString}' step as an unqualified equality...`);

      stepUnifiesAUnqualifiedEquality = true;

      if (stepUnifiesAUnqualifiedEquality) {
        context.debug(`...unified the '${stepString}' step as an unqualified equality.`);
      }
    }
  }

  return stepUnifiesAUnqualifiedEquality;
}

async function unifyStepAsUNqualifiedJudgement(step, context) {
  let stepUnifiesAsUnqualifiedJudgement = false;

  const unqualified = step.isUnqualified();

  if (unqualified) {
    const { Judgement } = elements,
          statement = step.getStatement(),
          judgement = Judgement.fromStatement(statement, context);

    if (judgement !== null) {
      const stepString = step.getString();

      context.trace(`Unifying the '${stepString}' step as an unqualified judgement...`);

      stepUnifiesAsUnqualifiedJudgement = true;

      if (stepUnifiesAsUnqualifiedJudgement) {
        context.debug(`...unified the '${stepString}' step as an unqualified judgement.`);
      }
    }
  }

  return stepUnifiesAsUnqualifiedJudgement;
}

async function unifyStepAsUnqualifiedTypeAssertion(step, context) {
  let stepUnifiesAsUnqualifiedTypeAssertion = false;

  const unqualified = step.isUnqualified();

  if (unqualified) {
    const { TypeAssertion } = elements,
          statement = step.getStatement(),
          typeAssertion = TypeAssertion.fromStatement(statement, context);

    if (typeAssertion !== null) {
      const stepString = step.getString();

      context.trace(`Unifying the '${stepString}' step as an unqualified type assertion...`);

      stepUnifiesAsUnqualifiedTypeAssertion = true;

      if (stepUnifiesAsUnqualifiedTypeAssertion) {
        context.debug(`...unified the '${stepString}' step as an unqualified type assertion.`);
      }
    }
  }

  return stepUnifiesAsUnqualifiedTypeAssertion;
}

async function unifyStepAsUnqualifiedPropertyAssertion(step, context) {
  let stepUnifiesAsUnqualifiedPropertyAssertion = false;

  const unqualified = step.isUnqualified();

  if (unqualified) {
    const { PropertyAssertion } = elements,
          statement = step.getStatement(),
          propertyAssertion = PropertyAssertion.fromStatement(statement, context);

    if (propertyAssertion !== null) {
      const stepString = step.getString();

      context.trace(`Unifying the '${stepString}' step as an unqualified property assertion...`);

      stepUnifiesAsUnqualifiedPropertyAssertion = true;

      if (stepUnifiesAsUnqualifiedPropertyAssertion) {
        context.debug(`...unified the '${stepString}' step as an unqualified property assertion.`);
      }
    }
  }

  return stepUnifiesAsUnqualifiedPropertyAssertion;
}

async function unifyStepAsUnqualifiedSignatureAssertion(step, context) {
  let stepUnifiesAsUnqualifiedSignatureAssertion = false;

  const unqualified = step.isUnqualified();

  if (unqualified) {
    const { SignatureAssertion } = elements,
          statement = step.getStatement(),
          signatureAssertion = SignatureAssertion.fromStatement(statement, context);

    if (signatureAssertion !== null) {
      const stepString = step.getString();

      context.trace(`Unifying the '${stepString}' step as a signature assertion...`);

      stepUnifiesAsUnqualifiedSignatureAssertion = true;

      if (stepUnifiesAsUnqualifiedSignatureAssertion) {
        context.debug(`...unified the '${stepString}' step as a signature assertion.`);
      }
    }
  }

  return stepUnifiesAsUnqualifiedSignatureAssertion;
}

async function unifyStepAsQualifiedMetaLevelAssumption(step, context) {
  let stepUnifiesAsQualifiedMetaLevelAssumption = false;

  const metaLevel = context.isMetaLevel();

  if (metaLevel) {
    const reference = step.getReference();

    if (reference !== null) {
      const stepString = step.getString(),
            referenceString = reference.getString();

      context.trace(`Unifying the '${stepString}' step as a meta-level assumption with the '${referenceString}' reference...`);

      let metaLevelAssumption;

      const { MetaLevelAssumption } = elements;

      metaLevelAssumption = MetaLevelAssumption.fromStep(step, context);

      metaLevelAssumption = metaLevelAssumption.validate(context);  ///

      if (metaLevelAssumption !== null) {
        stepUnifiesAsQualifiedMetaLevelAssumption = true;
      }

      if (stepUnifiesAsQualifiedMetaLevelAssumption) {
        context.debug(`...unified the '${stepString}' step as a meta-level assumption with the '${referenceString}' reference.`);
      }
    }
  }

  return stepUnifiesAsQualifiedMetaLevelAssumption;
}

async function unifyStepAsQualifiedSignatureAssertion(step, context) {
  let stepUnifiesAsQualifiedSignatureAssertion = false;

  const reference = step.getReference();

  if (reference !== null) {
    const topLevelAssertion = context.findTopLevelAssertionByReference(reference);

    if (topLevelAssertion !== null) {
      const statementNode = step.getStatementNode(),
            signatureAssertionNode = statementNode.getSignatureAssertionNode();

      if (signatureAssertionNode !== null) {
        const stepString = step.getString(),
              referenceString = reference.getString(),
              signatureAssertion = context.findAssertionByAssertionNode(signatureAssertionNode);

        context.trace(`Unifying the '${stepString}' step as a signature assertion with the '${referenceString}' reference...`);

        const unifyTopLevelAssertion = await signatureAssertion.unifyTopLevelAssertion(topLevelAssertion, context);

        if (unifyTopLevelAssertion) {
          stepUnifiesAsQualifiedSignatureAssertion = true;
        }

        if (stepUnifiesAsQualifiedSignatureAssertion) {
          context.debug(`...unified the '${stepString}' step as a signature assertion with the '${referenceString}' reference.`);
        }
      }
    }
  }

  return stepUnifiesAsQualifiedSignatureAssertion;
}

async function compareStepWithSubproofOrProofAssertions(step, context) {
  let stepComparesToSubproofOrProofAssertions = false;

  const unqualified = step.isUnqualified();

  if (unqualified) {
    const stepString = step.getString();

    context.trace(`Comparing the '${stepString}' step with the subproofs or proof asssertions...`);

    const subproofOrProofAssertions = context.getSubproofOrProofAssertions(),
          comparesToSubproofOrProofAssertions = step.compareSubproofOrProofAssertions(subproofOrProofAssertions, context);

    if (comparesToSubproofOrProofAssertions) {
      stepComparesToSubproofOrProofAssertions = true;
    }

    if (stepComparesToSubproofOrProofAssertions) {
      context.debug(`...compared the '${stepString}' step with the subproofs or proof asssertions.`);
    }
  }

  return stepComparesToSubproofOrProofAssertions;
}

export const unifySteps = [
  unifyStepWithRule,
  unifyStepWithTopLevelAssertion,
  unifyStepWithSignatureAssertion,
  unifyStepAsUnqualifiedEquality,
  unifyStepAsUNqualifiedJudgement,
  unifyStepAsUnqualifiedTypeAssertion,
  unifyStepAsUnqualifiedPropertyAssertion,
  unifyStepAsUnqualifiedSignatureAssertion,
  unifyStepAsQualifiedMetaLevelAssumption,
  unifyStepAsQualifiedSignatureAssertion,
  compareStepWithSubproofOrProofAssertions
];
