"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { attempt } from "../../utilities/context";
import { unifySteps } from "../../process/unification";
import { derive, declare } from "../../utilities/state";

const { breakable } = breakPointUtilities,
      { backwardsSome } = arrayUtilities,
      { asynchronousSome } = continuationUtilities;

export default define(class Step extends Fact {
  constructor(context, string, node, breakPoint, statement, reference, procedureCall, schemaAssertion, signatureAssertion) {
    super(context, string, node, breakPoint, statement, reference, procedureCall);

    this.schemaAssertion = schemaAssertion;
    this.signatureAssertion = signatureAssertion;
  }

  getSchemaAssertion() {
    return this.schemaAssertion;
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
    const qualified = ((this.reference !== null) || (this.schemaAssertion !== null) || (this.signatureAssertion !== null));

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

    return this.unify((unifies) => {
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
            validateSchemaAssertion = this.validateSchemaAssertion.bind(this),
            validateSignatureAssertion = this.validateSignatureAssertion.bind(this);

      validates = all([
        validateStatement,
        validateReference,
        validateSchemaAssertion,
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

  validateSchemaAssertion(state, context, continuation) {
    let schemaAssertionValidates;

    if (this.schemaAssertion !== null) {
      const stepString = this.getString(),  ///
            schemaAssertionString = this.schemaAssertion.getString();

      context.trace(`Validating the '${stepString}' step's '${schemaAssertionString}' schema assertion...`);

      schemaAssertionValidates = this.schemaAssertion.validate(state, context, (schemaAssertion, contwext) => {
        let validates;

        this.schemaAssertion = schemaAssertion;

        validates = continuation(state, context);

        return validates;
      });

      if (schemaAssertionValidates) {
        context.debug(`...validated the '${stepString}' step's '${schemaAssertionString}' schema assertion.`);
      }
    } else {
      schemaAssertionValidates = continuation(state, context);
    }

    return schemaAssertionValidates;
  }

  validateSignatureAssertion(state, context, continuation) {
    let signatureAssertionValidates;

    if (this.signatureAssertion !== null) {
      const stepString = this.getString(),  ///
            signatureAssertionString = this.signatureAssertion.getString();

      context.trace(`Validating the '${stepString}' step's '${signatureAssertionString}' signature assertion...`);

      signatureAssertionValidates = this.signatureAssertion.validate(state, context, (signatureAssertion, contwext) => {
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

  unify(continuation) {
    const context = this.getContext(),
          stepString = this.getString(); ///

    context.trace(`Unifying the '${stepString}' step...`);

    const step = this;  ///

    return asynchronousSome(unifySteps, (unifyStep, continuation) => {
      return unifyStep(step, context, continuation);
    }, (unifies) => {
      if (unifies) {
        context.debug(`...unified the '${stepString}' step.`);
      }

      return continuation(unifies);
    });
  }

  static name = "Step";
});
