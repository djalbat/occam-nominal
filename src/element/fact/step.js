"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";

import { define } from "../../elements";
import { attempt } from "../../utilities/context";
import { unifySteps } from "../../process/unification";
import { derive, declare } from "../../utilities/state";

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
    const stepString = this.getString(); ///

    context.trace(`Verifying the '${stepString}' step...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.debug(`Unable to verify the '${stepString}' step because it is malformed.`);

      return back();
    }

    const declared = this.idDeclared();

    (declared ? declare : derive)((state) => {
      return this.validate(state, context, cut((premise, _ , back) => {
        return this.unify(( _ , back) => {
          context.debug(`...verified the '${stepString}' step.`);

          return forward(context, back);
        }, back);
      }, back), back);
    });
  });

  validate(state, context, forward, back) {
    const stepString = this.getString(),  ///
          specificContext = context;  ///

    context.trace(`Validating the '${stepString}' step...`);

    return attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateReference = this.validateReference.bind(this),
            validateSchemaAssertion = this.validateSchemaAssertion.bind(this),
            validateSignatureAssertion = this.validateSignatureAssertion.bind(this);

      return all([
        validateStatement,
        validateReference,
        validateSchemaAssertion,
        validateSignatureAssertion
      ], state, context, (state, context, back) => {
        this.commit(context);

        const step = this;  ///

        context = specificContext;  ///

        context.debug(`...validated the '${stepString}' step.`);

        return forward(step, context, back);
      }, back);
    }, context);
  }

  validateSchemaAssertion(state, context, forward, back) {
    if (this.schemaAssertion === null) {
      return forward(state, context, back);
    }

    const stepString = this.getString(),  ///
          schemaAssertionString = this.schemaAssertion.getString();

    context.trace(`Validating the '${stepString}' step's '${schemaAssertionString}' schema assertion...`);

    return derive((state) => {
      return this.schemaAssertion.validate(state, context, (schemaAssertion, context, back) => {
        this.schemaAssertion = schemaAssertion;

        context.debug(`...validated the '${stepString}' step's '${schemaAssertionString}' schema assertion.`);

        return forward(state, context, back);
      }, back);
    }, state);
  }

  validateSignatureAssertion(state, context, forward, back) {
    if (this.signatureAssertion === null) {
      return forward(state, context, back);
    }

    const stepString = this.getString(),  ///
          signatureAssertionString = this.signatureAssertion.getString();

    context.trace(`Validating the '${stepString}' step's '${signatureAssertionString}' signature assertion...`);

    return declare((state) => {
      return this.signatureAssertion.validate(state, context, (signatureAssertion, contwext, back) => {
        context.debug(`...validated the '${stepString}' step's '${signatureAssertionString}' signature assertion.`);

        this.signatureAssertion = signatureAssertion;

        return forward(context, back);
      }, back);
    }, state);
  }

  unify(forward, back) {
    const context = this.getContext(),
          stepString = this.getString(); ///

    context.trace(`Unifying the '${stepString}' step...`);

    const step = this;  ///

    return some(unifySteps, (unifyStep, forward, back) => {
      return unifyStep(step, context, forward, back);
    }, (context, back) => {
      context.debug(`...unified the '${stepString}' step.`);

      return forward(context, back);
    }, back);
  }

  static name = "Step";
});
