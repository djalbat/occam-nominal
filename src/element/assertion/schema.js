"use strict";

import { continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import elements from "../../elements";

import { define } from "../../elements";
import { declare } from "../../utilities/state";

const { some } = continuationUtilities;

export default define(class SchemaAssertion extends Assertion {
  constructor(context, string, node, breakPoint, frame, reference) {
    super(context, string, node, breakPoint);

    this.frame = frame;
    this.reference = reference;
  }

  getFrame() {
    return this.frame;
  }

  getReference() {
    return this.reference;
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

        declare((state) => {
          implicitAssumption.validate(state, context, (implicitAssumption, context) => true)  ///
        });

        implicitAssumptions.push(implicitAssumption);
      });
    }

    return implicitAssumptions;
  }

  validate(state, context, continuation) {
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
            validateReference = this.validateReference.bind(this);

      validates = all([
        validateFrame,
        validateReference
      ], state, context, (state, _ ) => {
        let validates;

        const schameAssertion = assertion;  ///

        validates = continuation(schameAssertion, context);

        return validates;
      });

      if (validates) {
        context.addAssertion(assertion);
      }
    }

    if (validates) {
      context.debug(`...validated the '${schameAssertionString}' schame assertion.`);
    }

    return validates;
  }

  validateFrame(state, context, continuation) {
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

  validateReference(state, context, continuation) {
    let referenceValidates;

    const schameAssertionString = this.getString();  ///

    context.trace(`Validating the '${schameAssertionString}' schame assertion's reference...`);

    referenceValidates = this.reference.validate(state, context, (reference, context) => {
      let validates;

      this.reference = reference;

      validates = continuation(state, context);

      return validates;
    });

    if (referenceValidates) {
      context.debug(`...validated the '${schameAssertionString}' schame assertion's reference.`);
    }

    return referenceValidates;
  }

  unifyStep(step, context, continuation) {
    const schemas = context.getSchemas(),
          statement = step.getStatement(),
          schemaAssertion = this; ///

    return some(schemas, (schema, continuation) => {
      return schema.unifyStatementAndSchemaAssertion(statement, schemaAssertion, context, continuation);
    }, continuation);
  }

  static name = "SchemaAssertion";
});
