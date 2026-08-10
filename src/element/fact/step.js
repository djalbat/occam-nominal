"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";
import elements from "../../elements";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { unifySteps } from "../../process/unification";
import { derive, declare } from "../../utilities/state";
import { attempt, reconcile } from "../../utilities/context";

const { breakable } = breakPointUtilities,
      { backwardsSome } = arrayUtilities,
      { asynchronousSome } = continuationUtilities;

export default define(class Step extends Fact {
  constructor(context, string, node, breakPoint, statement, reference, procedureCall, signatureAssertion) {
    super(context, string, node, breakPoint, statement, reference, procedureCall);

    this.signatureAssertion = signatureAssertion;
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

  idDeclared() {
    const qualified = this.isQualified(),
          declared = qualified; ///

    return declared;
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

      return continuation(verifies, context);
    }

    let validates;

    const declared = this.idDeclared();

    (declared ? declare : derive)((state) => {
      validates = this.validate(state, context, (step, context) => true);
    });

    if (!validates) {
      return continuation(verifies, context);
    }

    return this.unify(context, (unifies) => {
      if (unifies) {
        verifies = true;
      }

      if (verifies) {
        context.debug(`...verified the '${stepString}' step.`);
      }

      return continuation(verifies, context);
    });
  });

  validate(state, context, continuation) {
    let validates;

    const stepString = this.getString(),  ///
          specificContext = context;  ///

    context.trace(`Validating the '${stepString}' step...`);

    const step = this;  ///

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateReference = this.validateReference.bind(this),
            validateSignatureAssertion = this.validateSignatureAssertion.bind(this);

      validates = all([
        validateStatement,
        validateReference,
        validateSignatureAssertion
      ], state, context, (state, context) => {
        let validates;

        this.commit(context);

        context = specificContext;  ///

        validates = continuation(step, context);

        return validates;
      });
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${stepString}' step.`);
    }

    return validates;
  }

  validateSignatureAssertion(state, context, continuation) {
    let signatureAssertionValidates;

    if (this.signatureAssertion !== null) {
      const stepString = this.getString(),  ///
            signatureAssertionString = this.signatureAssertion.getString();

      context.trace(`Validating the '${stepString}' step's '${signatureAssertionString}' signature assertion...`);

      signatureAssertionValidates =this.signatureAssertion.validate(state, context, (signatureAssertion, contwext) => {
        let validates;

        this.signatureAssertion = signatureAssertion;

        validates = continuation(state, context);

        return validates;
      });

      if (signatureAssertionValidates) {
        context.debug(`...validated the '${stepString}' step's '${signatureAssertionString}' signature assertion.`);
      }
    } else {
      signatureAssertionValidates = continuation(state, context);
    }

    return signatureAssertionValidates;
  }

  unify(context, continuation) {
    const stepString = this.getString(); ///

    context.trace(`Unifying the '${stepString}' step...`);

    const step = this;  ///

    return asynchronousSome(unifySteps, (unifyStep, continuation) => {
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
