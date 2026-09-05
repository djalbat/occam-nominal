"use strict";

import {Element, continuationUtilities, breakPointUtilities} from "occam-languages";

import Value from "../value";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateProcedureReference } from "../process/instantiate";

const { all, every } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class ProcedureReference extends Element {
  constructor(context, string, node, breakPoint, name, parameters) {
    super(context, string, node, breakPoint);

    this.name = name;
    this.parameters = parameters;
  }

  getName() {
    return this.name;
  }

  getParameters() {
    return this.parameters;
  }

  getProcedureReferenceNode() {
    const node = this.getNode(),
          procedureReferenceNode = node;

    return procedureReferenceNode;
  }

  getProcedureName() {
    const procedureName = this.name;

    return procedureName;
  }

  isUnary() {
    const parametersLength = this.parameters.length,
          unary = (parametersLength === 1);

    return unary;
  }

  isEqualTo(procedureReference) {
    const procedureReferenceNode = procedureReference.getNode(),
          procedureReferenceNodeMatches = this.matchProcedureReferenceNode(procedureReferenceNode),
          equalTo = procedureReferenceNodeMatches;  ///

    return equalTo;
  }

  matchProcedureReferenceNode(procedureReferenceNode) {
    const node = procedureReferenceNode, ///
          nodeMatches = this.matchNode(node),
          procedureReferenceNodeMatches = nodeMatches; ///

    return procedureReferenceNodeMatches;
  }

  findValues(context) {
    const inferredSubstitutions = context.getInferredSubstitutions(),
          substitutions = inferredSubstitutions, ///
          values = this.parameters.map((parameter) => {
            const value = parameter.findValue(substitutions);

            return value;
          });

    return values;
  }

  findProcedureReference(context) {
    const procedureReferenceNode = this.getProcedureReferenceNode(),
          procedureReference = context.findProcedureReferenceByProcedureReferenceNode(procedureReferenceNode);

    return procedureReference;
  }

  validate = unbreakable(function (state, context, forward, back) {
    let procedureReference;

    const procedureReferenceString = this.getString();  ///

    context.trace(`Validating the '${procedureReferenceString}' function reference...`);

    procedureReference = this.findProcedureReference(context);

    if (procedureReference !== null) {
      context.debug(`The '${procedureReferenceString}' function reference is already present.`);

      return forward(procedureReference, context, back);
    }

    procedureReference = this; ///

    const validateParameters = this.validateParameters.bind(this);

    return all([
      validateParameters
    ], state, context, (state, context, back) => {
      context.addProcedureReference(procedureReference);

      context.debug(`...validated the '${procedureReferenceString}' function reference.`);

      return forward(procedureReference, context, back);
    }, back);
  });

  validateParameter(parameter, parameters, state, context, forward, back) {
    const parameterString = parameter.getString(),
          procedureReferenceString = this.getString();  ///

    context.trace(`Validating the '${procedureReferenceString}' function reference's '${parameterString}' parameter...`);

    return parameter.validate(state, context, (parameter, context, back) => {
      parameters.push(parameter);

      context.debug(`...validated the '${procedureReferenceString}' function reference's '${parameterString}' parameter.`);

      return forward(parameters, state, context, back);
    }, back);
  }

  validateParameters(state, context, forward, back) {
    const procedureReferenceString = this.getString();  ///

    context.trace(`Validating the '${procedureReferenceString}' function reference's parameters...`);

    const parameters = [];

    return every(this.parameters, (parameter, parameters, state, context, forward, back) => {
      return this.validateParameter(parameter, parameters, state, context, forward, back);
    }, parameters, state, context, (parameters, state, context, back) => {
      this.parameters = parameters;

      context.debug(`...validated the '${procedureReferenceString}' function reference's parameters.`);

      return forward(state, context, back);
    }, back);
  }

  applyIndependently(generalContext, specificContext, forward, back) {
    const context = specificContext,
          procedureReferenceString = this.getString(); ///

    context.trace(`Applying the '${procedureReferenceString}' function reference independently...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          values = this.findValues(context);

    return procedure.callNominally(values, (value, back) => {
      const boolean = value.isBoolean();

      if (!boolean) {
        context.info(`The '${procedureReferenceString}' function reference did not return a boolean.`);

        return back();
      }

      const primitiveValue = value.getPrimitiveValue();

      if (!primitiveValue) {
        return back();
      }

      context.trace(`...applied the '${procedureReferenceString}' function reference independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  dischargeGivenTerm(term, context, forward, back) {
    const termString = term.getString(),
          procedureReferenceString = this.getString(); ///

    context.trace(`Discharging the '${procedureReferenceString}' function reference given the '${termString}' term...`);

    const unary = this.isUnary();

    if (!unary) {
      context.debug(`The '${procedureReferenceString}' function reference is not unary.`);

      return back();
    }

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          value = Value.fromTerm(term, context),
          values = [
            value
          ];

    return procedure.callNominally(values, (value, back) => {
      const boolean = value.isBoolean();

      if (!boolean) {
        context.info(`The '${procedureReferenceString}' function reference did not return a boolean.`);

        return back();
      }

      const primitiveValue = value.getPrimitiveValue();

      if (!primitiveValue) {
        return back();
      }

      context.debug(`...discharged the '${procedureReferenceString}' function reference given the '${termString}' term.`);

      return forward(back);
    }, back);
  }

  toJSON() {
    let json;

    const string = this.getString();

    json = {
      string
    };

    return json;
  }

  static name = "ProcedureReference";

  static fromJSON(json, context) {
    let procedureReference;

    instantiate((context) => {
      const { string } = json,
            procedureReferenceNode = instantiateProcedureReference(string, context),
            node = procedureReferenceNode,  ///
            breakPoint = null,
            name = nameFromProcedureReferenceNode(procedureReferenceNode, context),
            parameters = parametersFromProcedureReferenceNode(procedureReferenceNode, context);

      context = null;

      procedureReference = new ProcedureReference(context, string, node, breakPoint, name, parameters);
    }, context);

    return procedureReference;
  }
});

function nameFromProcedureReferenceNode(procedureReferenceNode, context) {
  const name = procedureReferenceNode.getName();

  return name;
}

function parametersFromProcedureReferenceNode(procedureReferenceNode, context) {
  const parameterNodes = procedureReferenceNode.getParameterNodes(),
        parameters = parameterNodes.map((parameterNode) => {
          const parameter = context.findParameterByParameterNode(parameterNode);

          return parameter;
        });

  return parameters;
}
