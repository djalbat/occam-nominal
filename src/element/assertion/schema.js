"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../../elements";
import Assertion from "../assertion";

import { define } from "../../elements";
import { declare } from "../../utilities/state";

const { cut, some } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class SchemaAssertion extends Assertion {
  constructor(context, string, node, breakPoint, link, frame) {
    super(context, string, node, breakPoint);

    this.link = link;
    this.frame = frame;
  }

  getLink() {
    return this.link;
  }

  getFrame() {
    return this.frame;
  }

  getSchemaAssertionNode() {
    const node = this.getNode(),
          schemaAssertionNode = node;  ///

    return schemaAssertionNode;
  }

  getAssumptions() { return this.frame.getAssumptions(); }

  getMetavariable() { return this.frame.getMetavariable(); }

  getImplicitAssumptions(context) {
    const implicitAssumptions = [],
          metavariable = this.getMetavariable();

    if (metavariable !== null) {
      const { ImplicitAssumption } = elements,
            facts = context.getFacts();

      facts.forEach((fact) => {
        const statement = fact.getStatement(),
              implicitAssumption = ImplicitAssumption.fromStatement(statement, context);

        implicitAssumption.verify(context, (implicitAssumption, context) => true)  ///

        implicitAssumptions.push(implicitAssumption);
      });
    }

    return implicitAssumptions;
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const schemaAssertionString = this.getString(); ///

    context.trace(`Verifying the '${schemaAssertionString}' schema assertion...`);

    return declare((state) => {
      return this.validate(state, context, (schemaAssertion, context , back) => {
        context.debug(`...verified the '${schemaAssertionString}' schema assertion.`);

        return forward(context, back);
      }, back);
    });
  });

  validate(state, context, forward, back) {
    let validates;

    const schameAssertionString = this.getString();  ///

    context.trace(`Validating the '${schameAssertionString}' schame assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const schameAssertion = assertion;  ///

      context.debug(`The '${schameAssertionString}' schame assertion is already present.`);

      validates = continuation(schameAssertion, context);
    } else {
      assertion = this;  ///

      const validateFrame = this.validateFrame.bind(this),
            validateLink = this.validateLink.bind(this);

      validates = all([
        validateFrame,
        validateLink
      ], state, context, (state, context) => {
        let validates;

        const schameAssertion = assertion;  ///

        validates = continuation(schameAssertion, context);

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${schameAssertionString}' schame assertion.`);
    }

    return validates;
  }

  validateFrame(state, context, forward, back) {
    let frameValidates;

    const schameAssertionString = this.getString();  ///

    context.trace(`Validating the '${schameAssertionString}' schame assertion's frame...`);

    frameValidates = this.frame.validate(state, context, (frame, context) => {
      let validates;

      this.frame = frame;

      validates = continuation(state, context);

      return validates;
    });

    if (frameValidates) {
      context.debug(`...validated the '${schameAssertionString}' schame assertion's frame.`);
    }

    return frameValidates;
  }

  validateLink(state, context, forward, back) {
    let linkValidates;

    const schameAssertionString = this.getString();  ///

    context.trace(`Validating the '${schameAssertionString}' schame assertion's link...`);

    linkValidates = this.link.validate(state, context, (link, context) => {
      let validates;

      this.link = link;

      validates = continuation(state, context);

      return validates;
    });

    if (linkValidates) {
      context.debug(`...validated the '${schameAssertionString}' schame assertion's link.`);
    }

    return linkValidates;
  }

  unifyStep(step, context, forward, back) {
    const schemas = context.getSchemas(),
          statement = step.getStatement(),
          schemaAssertion = this; ///

    return some(schemas, (schema, forward, back) => {
      return schema.unifyStatementAndSchemaAssertion(statement, schemaAssertion, context, forward, back);
    }, forward, back);
  }

  static name = "SchemaAssertion";
});
