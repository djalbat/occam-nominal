"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../../elements";
import ProofAssertion from "../proofAssertion";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { unifySteps } from "../../process/unification";
import { derive, declare, attempt, reconcile } from "../../utilities/context";

const { some } = continuationUtilities,
      { breakable } = breakPointUtilities,
      { backwardsSome } = arrayUtilities;

export default define(class Step extends ProofAssertion {
  constructor(context, string, node, breakPoint, statement, reference, signatureAssertion) {
    super(context, string, node, breakPoint, statement);

    this.reference = reference;
    this.signatureAssertion = signatureAssertion;
  }

  getReference() {
    return this.reference;
  }

  getSignatureAssertion() {
    return this.signatureAssertion;
  }

  getStepNode() {
    const node = this.getNode(),
          stepNode = node;  ///

    return stepNode;
  }

  getStatementNode() {
    const statement = this.getStatement(),
          statementNode = statement.getNode();

    return statementNode;
  }

  isStep() {
    const step = true;

    return step;
  }

  isQualified() {
    const qualified = ((this.reference !== null) || (this.signatureAssertion !== null));

    return qualified;
  }

  isUnqualified() {
    const qualified = this.isQualified(),
          unqualified = !qualified;

    return unqualified;
  }

  isNonsensical() {
    const nonsensical = (this.statement === null);

    return nonsensical;
  }

  isMetavariableDefined(metavariable, context) {
    let metavariableDefined = false;

    const unqualified = this.isUnqualified();

    if (unqualified) {
      const { Judgement } = elements,
            judgement = Judgement.fromStatement(this.statement, context);

      if (judgement !== null) {
        metavariableDefined = judgement.isMetavariableDefined(metavariable);
      }
    }

    return metavariableDefined;
  }

  compareJudgements(judgements, context) {
    let comparesToJudgements;

    const step = this; ///

    comparesToJudgements = backwardsSome(judgements, (judgement) => {
      const judgementComparesToStatement = judgement.compareStep(step, context);

      if (judgementComparesToStatement) {
        return true;
      }
    });

    return comparesToJudgements;
  }

  compareSubproofOrProofAssertions(subproofOrProofAssertions, context) {
    let comparesToSubproofOrProofAssertions;

    const step = this; ///

    comparesToSubproofOrProofAssertions = backwardsSome(subproofOrProofAssertions, (subproofOrProofAssertion) => {
      const subproofOrProofAssertionComparesToStatement = subproofOrProofAssertion.compareStep(step, context);

      if (subproofOrProofAssertionComparesToStatement) {
        return true;
      }
    });

    return comparesToSubproofOrProofAssertions;
  }

  verify = breakable(function (context, continuation) {
    const stepString = this.getString(); ///

    context.trace(`Verifying the '${stepString}' step...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${stepString}' step because it is nonsense.`);

      continuation(verifies);

      return;
    }

    const qualified = this.isQualified(),
          stated = qualified; ///

    (stated ? declare : derive)((context) => {
      const unify = this.unify.bind(this),
            validate = this.validate.bind(this);

      return all([
        validate,
        unify
      ], context, (verifies) => {
        if (verifies) {
          context.debug(`...verified the '${stepString}' step.`);
        }

        return continuation(verifies);
      });
    }, context);
  });

  validate(context, continuation) {
    const stepString = this.getString(); ///

    context.trace(`Validating the '${stepString}' step...`);

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateReference = this.validateReference.bind(this),
            validateSignatureAssertion = this.validateSignatureAssertion.bind(this);

      return all([
        validateStatement,
        validateReference,
        validateSignatureAssertion
      ], context, (validates) => {
        if (validates) {
          this.commit(context);
        }

        if (validates) {
          context.debug(`...validated the '${stepString}' step.`);
        }

        return continuation(validates);
      });
    }, context);
  }

  validateStatement(context, continuation) {
    const stepString = this.getString();

    context.trace(`Validating the '${stepString}' step's statement...`);

    const statement = this.getStatement();

    statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${stepString}' step's statement.`);
      }

      continuation(statementValidates);
    });
  }

  validateReference(context, continuation) {
    if (this.reference === null) {
      const referenceValidates = true;  ///

      continuation(referenceValidates);

      return;
    }

    const stepString = this.getString(),  ///
          referenceString = this.reference.getString();

    context.trace(`Validating the '${stepString}' step's '${referenceString}' reference...`);

    this.reference.validate(context, (reference) => {
      let referenceValidates = false;

      if (reference !== null) {
        this.reference = reference;

        referenceValidates = true;
      }

      if (referenceValidates) {
        context.debug(`...validated the '${stepString}' step's '${referenceString}' reference.`);
      }

      continuation(referenceValidates);
    });
  }

  validateSignatureAssertion(context, continuation) {
    if (this.signatureAssertion === null) {
      const signatureAssertionValidates = true; ///

      continuation(signatureAssertionValidates);

      return;
    }

    const stepString = this.getString(),  ///
          signatureAssertionString = this.signatureAssertion.getString();

    context.trace(`Validating the '${stepString}' step's '${signatureAssertionString}' signature assertion...`);

    this.signatureAssertion.validate(context, (signatureAssertion) => {
      let signatureAssertionValidates = false;

      if (signatureAssertion !== null) {
        this.signatureAssertion = signatureAssertion;

        signatureAssertionValidates = true;
      }

      if (signatureAssertionValidates) {
        context.debug(`...validated the '${stepString}' step's '${signatureAssertionString}' signature assertion.`);
      }

      continuation(signatureAssertionValidates);
    });
  }

  unify(context, continuation) {
    const stepString = this.getString(); ///

    context.trace(`Unifying the '${stepString}' step...`);

    const step = this;  ///

    return some(unifySteps, (unifyStep, continuation) => {
      reconcile((context) => {
        return unifyStep(step, context, continuation);
      }, context);
    }, (unifies) => {
      if (unifies) {
        context.debug(`...unified the '${stepString}' step.`);
      }

      return continuation(unifies);
    });
  }

  static name = "Step";
});
