"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../../elements";
import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { instantiateSchemaAssertion } from "../../process/instantiate";

const { unbreakable } = breakPointUtilities,
      { cut, all, some, every } = continuationUtilities;

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

  isSingular() { return this.frame.isSingular(); }

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

  apply = unbreakable(function (step, context, forward, back) {
    forward = cut(forward, back); ///

    const schemas = context.getSchemas(),
          statement = step.getStatement(),
          schemaAssertion = this, ///
          schemaAssertionString = this.getString(); ///

    context.trace(`Applying the '${schemaAssertionString}' schema assertion...`);

    return some(schemas, (schema, forward, back) => {
      return schema.apply(statement, schemaAssertion, context, (context, back) => {
        context.debug(`...applied the '${schemaAssertionString}' schema assertion.`);

        return forward(context, back);
      }, back);
    }, forward, back);
  });

  validate = unbreakable(function (state, context, forward, back) {
    let assertion;

    const schemaAssertionString = this.getString();  ///

    context.trace(`Validating the '${schemaAssertionString}' schema assertion...`);

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const schemaAssertion = assertion; ///

      context.debug(`The '${schemaAssertionString}' schema assertion is already present.`);

      return forward(schemaAssertion, context, back);
    }

    assertion = this; ///

    const validateLink = this.validateLink.bind(this),
          validateFrame = this.validateFrame.bind(this);

    return all([
      validateLink,
      validateFrame
    ], state, context, (state, context, back) => {
      context.addAssertion(assertion);

      const schemaAssertion = assertion; ///

      context.debug(`...validated the '${schemaAssertionString}' schema assertion.`);

      return forward(schemaAssertion, context, back);
    }, back);
  });

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

  toJSON() {
    let json;

    const name = this.getName(),
          string = this.getString();

    json = {
      name,
      string
    };

    return json;
  }

  static name = "SchemaAssertion";

  static fromJSON(json, context) {
    let schemaAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              schemaAssertionNode = instantiateSchemaAssertion(string, context),
              node = schemaAssertionNode,  ///
              breakPoint = null,
              link = linkFromSchemaAssertionNode(schemaAssertionNode, context),
              frame = frameFromSchemaAssertionNode(schemaAssertionNode, context);

        context = null;

        schemaAssertion = new SchemaAssertion(context, string, node, breakPoint, link, frame);
      }, context);
    }

    return schemaAssertion;
  }
});

function linkFromSchemaAssertionNode(schemaAssertionNode, context) {
  const linkNode = schemaAssertionNode.getLinkNode(),
        link = context.findLinkByLinkNode(linkNode);

  return link;
}

function frameFromSchemaAssertionNode(schemaAssertionNode, context) {
  const frameNode = schemaAssertionNode.getFrameNode(),
        frame = context.findFrameByFrameNode(frameNode);

  return frame;
}
