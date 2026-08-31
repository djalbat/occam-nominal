"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../../elements";
import Assertion from "../assertion";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { attempt } from "../../utilities/context";

const { unbreakable } = breakPointUtilities,
      { cut, all, some, every, isolate } = continuationUtilities;

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

  getImplicitAssumptions(context, forward, back) {
    const implicitAssumptions = [],
          metavariable = this.getMetavariable();

    if (metavariable === null) {
      return forward(implicitAssumptions, context, back);
    }

    const facts = context.getFacts();

    facts.forEach((fact) => {
      const { ImplicitAssumption } = elements,
            statement = fact.getStatement(),
            implicitAssumption = ImplicitAssumption.fromStatement(statement, context);

      implicitAssumptions.push(implicitAssumption);
    });

    return every(implicitAssumptions, (implicitAssumption, context, forward, back) => {
      return implicitAssumption.verify(context, forward, back);
    }, context, (context, back) => {
      return forward(implicitAssumptions, context, back);
    }, back);
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const schemaAssertionString = this.getString(); ///

    context.trace(`Verifying the '${schemaAssertionString}' schema assertion...`);

    return isolate((context, forward, back) => {
      return declare((state) => {
        return this.validate(state, context, (schemaAssertion, context, back) => {
          return forward(back);
        }, back);
      });
    }, context, (context, back) => {
      context.debug(`...verified the '${schemaAssertionString}' schema assertion.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${schemaAssertionString}' schema assertion.`);

      return back();
    });
  });

  apply = unbreakable(function (step, context, forward, back) {
    forward = cut(forward, back); ///

    const schemas = context.getSchemas(),
          statement = step.getStatement(),
          schemaAssertion = this, ///
          schemaAssertionString = this.getString();

    context.trace(`Applying the '${schemaAssertionString}' schema assertion...`);

    return some(schemas, (schema, forward, back) => {
      return schema.apply(statement, schemaAssertion, context, (context, back) => {
        context.debug(`...applied the '${schemaAssertionString}' schema assertion.`);

        return forward(context, back);
      }, back);
    }, forward, back);
  });

  validate(state, context, forward, back) {
    const schemaAssertionString = this.getString();  ///

    context.trace(`Validating the '${schemaAssertionString}' schema assertion...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateLink = this.validateLink.bind(this),
              validateFrame = this.validateFrame.bind(this);

        return all([
          validateLink,
          validateFrame
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      context.debug(`...validated the '${schemaAssertionString}' schema assertion.`);

      return forward(context, back);
    }, back);
  }

  validateLink(state, context, forward, back) {
    const schemaAssertionString = this.getString();  ///

    context.trace(`Validating the '${schemaAssertionString}' schema assertion's link...`);

    return this.link.validate(state, context, (link, context, back) => {
      this.link = link;

      context.debug(`...validated the '${schemaAssertionString}' schema assertion's link.`);

      return forward(state, context, back);
    }, back);
  }

  validateFrame(state, context, forward, back) {
    const schemaAssertionString = this.getString();  ///

    context.trace(`Validating the '${schemaAssertionString}' schema assertion's frame...`);

    return this.frame.validate(state, context, (frame, context, back) => {
      this.frame = frame;

      context.debug(`...validated the '${schemaAssertionString}' schema assertion's frame.`);

      return forward(state, context, back);
    }, back);
  }

  static name = "SchemaAssertion";
});
