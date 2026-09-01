"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";

import { define } from "../../elements";
import { unifySteps } from "../../process/unification";
import { derive, declare } from "../../utilities/state";
import { isolate, attempt } from "../../utilities/context";

const { breakable } = breakPointUtilities,
      { backwardsSome } = arrayUtilities,
      { cut, all, some } = continuationUtilities;

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

  isDeclared() {
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

  isMalformed() {
    const stepNode = this.getStepNode(),
          malformed = stepNode.isMalformed();

    return malformed;
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

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const stepString = this.getString();  ///

    context.trace(`Verifying the '${stepString}' step...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${stepString}' step because it is malformed.`);

      return back();
    }

    const verifyReference = this.verifyReference.bind(this);

    return all([
      verifyReference
    ], context, (context, back) => {
      const declared = this.isDeclared();

      (declared ? declare : derive)((state) => {
        const unify = this.unify.bind(this),
              validate = this.validate.bind(this);

        return all([
          validate,
          unify
        ], state, context, (state, context, back) => {
          context.debug(`...verified the '${stepString}' step.`);

          return forward(context, back);
        }, back);
      });
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${stepString}' step.`);

      return back();
    });
  });

  verifyReference(context, forward, back) {
    if (this.reference === null) {
      return forward(context, back);
    }

    const stepString = this.getString();  ///

    context.trace(`Verifying the '${stepString}' step's reference...`);

    return this.reference.verify(context, (context, back) => {
      context.trace(`...verified the '${stepString}' step's reference.`);

      return forward(context, back);
    }, back);
  }

  validate(state, context, forward, back) {
    const stepString = this.getString(); ///

    context.trace(`Validating the '${stepString}' step...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateStatement = this.validateStatement.bind(this),
              validateSchemaAssertion = this.validateSchemaAssertion.bind(this),
              validateSignatureAssertion = this.validateSignatureAssertion.bind(this);

        return all([
          validateStatement,
          validateSchemaAssertion,
          validateSignatureAssertion
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      context.debug(`...validated the '${stepString}' step.`);

      return forward(state, context, back);
    }, back);
  }

  validateSchemaAssertion(state, context, forward, back) {
    if (this.schemaAssertion === null) {
      return forward(state, context, back);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's schema assertion...`);

    return this.schemaAssertion.validate(state, context, (schemaAssertion, context, back) => {
      this.schemaAssertion = schemaAssertion;

      context.trace(`...validated the '${factString}' fact's schema assertion.`);

      return forward(state, context, back);
    }, back);
  }

  validateSignatureAssertion(state, context, forward, back) {
    if (this.signatureAssertion === null) {
      return forward(state, context, back);
    }

    const factString = this.getString();  ///

    context.trace(`Validating the '${factString}' fact's signature assertion...`);

    return this.signatureAssertion.validate(state, context, (signatureAssertion, context, back) => {
      this.signatureAssertion = signatureAssertion;

      context.trace(`...validated the '${factString}' fact's signature assertion.`);

      return forward(state, context, back);
    }, back);
  }

  unify(state, context, forward, back) {
    const stepString = this.getString();  ///

    context.trace(`Unifying the '${stepString}' step...`);

    return isolate((state, context, forward, back) => {
      const step = this;  ///

      context = this.getContext();  ///

      return some(unifySteps, (unifyStep, forward, back) => {
        return unifyStep(step, context, forward, back);
      }, forward, back);
    }, state, context, (state, context, back) => {
      context.debug(`...unified the '${stepString}' step.`);

      return forward(state, context, back);
    }, back);
  }

  static name = "Step";
});
