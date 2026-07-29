"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";
import elements from "../../elements";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { unifySteps } from "../../process/unification";
import { derive, declare, attempt, reconcile } from "../../utilities/context";

const { some } = continuationUtilities,
      { breakable } = breakPointUtilities,
      { backwardsSome } = arrayUtilities;

export default define(class Step extends Fact {
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

  compareFactOrSubproofs(factOrSubproof, context) {
    let comparesToFactOrSubproofs;

    const step = this; ///

    comparesToFactOrSubproofs = backwardsSome(factOrSubproof, (factOrSubproof) => {
      const factOrSubproofComparesToStatement = factOrSubproof.compareStep(step, context);

      if (factOrSubproofComparesToStatement) {
        return true;
      }
    });

    return comparesToFactOrSubproofs;
  }

  verify = breakable(function (context, continuation) {
    let verifies = false;

    const stepString = this.getString(); ///

    context.trace(`Verifying the '${stepString}' step...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      context.debug(`Unable to verify the '${stepString}' step because it is nonsense.`);

      return continuation(verifies);
    }

    const qualified = this.isQualified(),
          stated = qualified; ///

    return (stated ? declare : derive)((context) => {
      let validates;

      attempt((context) => {
        validates = this.validate(context, (step, context) => true);

        if (validates) {
          this.commit(context);
        }
      }, context);

      if (!validates) {
        return continuation(verifies);
      }

      return this.unify(context, (unifies) => {
        if (unifies) {
          verifies = true;
        }

        if (verifies) {
          context.debug(`...verified the '${stepString}' step.`);
        }

        return continuation(verifies);
      });
    }, context);
  });

  validate(context, continuation) {
    let validates;

    const stepString = this.getString(); ///

    context.trace(`Validating the '${stepString}' step...`);

    const validateStatement = this.validateStatement.bind(this),
          validateReference = this.validateReference.bind(this),
          validateSignatureAssertion = this.validateSignatureAssertion.bind(this);

    validates = all([
      validateStatement,
      validateReference,
      validateSignatureAssertion
    ], context, (context) => {
      const step = this;  ///

      return continuation(step, context);
    });

    if (validates) {
      context.debug(`...validated the '${stepString}' step.`);
    }

    return validates;
  }

  validateStatement(context, continuation) {
    let statementValidates;

    const stepString = this.getString();  ///

    context.trace(`Validating the '${stepString}' step's statement...`);

    const statement = this.getStatement();

    statementValidates = statement.validate(context, (statement, context) => {
      return continuation(context);
    });

    if (statementValidates) {
      context.trace(`...validated the '${stepString}' step's statement.`);
    }

    return statementValidates;
  }

  validateReference(context, continuation) {
    let referenceValidates;

    if (this.reference !== null) {
      const stepString = this.getString(),  ///
            referenceString = this.reference.getString();

      context.trace(`Validating the '${stepString}' step's '${referenceString}' reference...`);

      referenceValidates = this.reference.validate(context, (reference, context) => {
        this.reference = reference;

        return continuation(context);
      });

      if (referenceValidates) {
        context.debug(`...validated the '${stepString}' step's '${referenceString}' reference.`);
      }
    } else {
      referenceValidates = continuation(context);
    }

    return referenceValidates;
  }

  validateSignatureAssertion(context, continuation) {
    let signatureAssertionValidates;

    if (this.signatureAssertion !== null) {
      const stepString = this.getString(),  ///
            signatureAssertionString = this.signatureAssertion.getString();

      context.trace(`Validating the '${stepString}' step's '${signatureAssertionString}' signature assertion...`);

      signatureAssertionValidates =this.signatureAssertion.validate(context, (signatureAssertion, contwext) => {
        this.signatureAssertion = signatureAssertion;

        return continuation(context);
      });

      if (signatureAssertionValidates) {
        context.debug(`...validated the '${stepString}' step's '${signatureAssertionString}' signature assertion.`);
      }
    } else {
      signatureAssertionValidates = continuation(context);
    }

    return signatureAssertionValidates;
  }

  unify(context, continuation) {
    const stepString = this.getString(); ///

    context.trace(`Unifying the '${stepString}' step...`);

    const step = this;  ///

    return some(unifySteps, (unifyStep, continuation) => {
      return reconcile((context) => {
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
