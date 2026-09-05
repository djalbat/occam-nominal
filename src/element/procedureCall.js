"use strict";

import {Element, continuationUtilities, breakPointUtilities} from "occam-languages";

import Value from "../value";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateProcedureCall } from "../process/instantiate";

const { all, every } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class ProcedureCall extends Element {
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

  getProcedureCallNode() {
    const node = this.getNode(),
          procedureCallNode = node;

    return procedureCallNode;
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

  isEqualTo(procedureCall) {
    const procedureCallNode = procedureCall.getNode(),
          procedureCallNodeMatches = this.matchProcedureCallNode(procedureCallNode),
          equalTo = procedureCallNodeMatches;  ///

    return equalTo;
  }

  matchProcedureCallNode(procedureCallNode) {
    const node = procedureCallNode, ///
          nodeMatches = this.matchNode(node),
          procedureCallNodeMatches = nodeMatches; ///

    return procedureCallNodeMatches;
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

  findProcedureCall(context) {
    const procedureCallNode = this.getProcedureCallNode(),
          procedureCall = context.findProcedureCallByProcedureCallNode(procedureCallNode);

    return procedureCall;
  }

  validate = unbreakable(function (state, context, forward, back) {
    let procedureCall;

    const procedureCallString = this.getString();  ///

    context.trace(`Validating the '${procedureCallString}' procedure call...`);

    procedureCall = this.findProcedureCall(context);

    if (procedureCall !== null) {
      context.debug(`The '${procedureCallString}' procedure call is already present.`);

      return forward(procedureCall, context, back);
    }

    procedureCall = this; ///

    const validateParameters = this.validateParameters.bind(this);

    return all([
      validateParameters
    ], state, context, (state, context, back) => {
      context.addProcedureCall(procedureCall);

      context.debug(`...validated the '${procedureCallString}' procedure call.`);

      return forward(procedureCall, context, back);
    }, back);
  });

  validateParameter(parameter, parameters, state, context, forward, back) {
    const parameterString = parameter.getString(),
          procedureCallString = this.getString();  ///

    context.trace(`Validating the '${procedureCallString}' procedure call's '${parameterString}' parameter...`);

    return parameter.validate(state, context, (parameter, context, back) => {
      parameters.push(parameter);

      context.debug(`...validated the '${procedureCallString}' procedure call's '${parameterString}' parameter.`);

      return forward(parameters, state, context, back);
    }, back);
  }

  validateParameters(state, context, forward, back) {
    const procedureCallString = this.getString();  ///

    context.trace(`Validating the '${procedureCallString}' procedure call's parameters...`);

    const parameters = [];

    return every(this.parameters, (parameter, parameters, state, context, forward, back) => {
      return this.validateParameter(parameter, parameters, state, context, forward, back);
    }, parameters, state, context, (parameters, state, context, back) => {
      this.parameters = parameters;

      context.debug(`...validated the '${procedureCallString}' procedure call's parameters.`);

      return forward(state, context, back);
    }, back);
  }

  applyIndependently(generalContext, specificContext, forward, back) {
    const context = specificContext,
          procedureCallString = this.getString(); ///

    context.trace(`Applying the '${procedureCallString}' procedure call independently...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          values = this.findValues(context);

    return procedure.callNominally(values, (value, back) => {
      const boolean = value.isBoolean();

      if (!boolean) {
        context.info(`The '${procedureCallString}' procedure call did not return a boolean.`);

        return back();
      }

      const primitiveValue = value.getPrimitiveValue();

      if (!primitiveValue) {
        return back();
      }

      context.trace(`...applied the '${procedureCallString}' procedure call independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  dischargeGivenParameter(parameter, context, forward, back) {
    const parameterString = parameter.getString(),
          procedureCallString = this.getString(); ///

    context.trace(`Discharging the '${procedureCallString}' procedure call given the '${parameterString}' parameter...`);

    const unary = this.isUnary();

    if (!unary) {
      context.debug(`The '${procedureCallString}' procedure call is not unary.`);

      return back();
    }

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          value = Value.fromParameter(parameter, context),
          values = [
            value
          ];

    return procedure.callNominally(values, (value, back) => {
      const boolean = value.isBoolean();

      if (!boolean) {
        context.info(`The '${procedureCallString}' procedure call did not return a boolean.`);

        return back();
      }

      const primitiveValue = value.getPrimitiveValue();

      if (!primitiveValue) {
        return back();
      }

      context.debug(`...discharged the '${procedureCallString}' procedure call given the '${parameterString}' parameter.`);

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

  static name = "ProcedureCall";

  static fromJSON(json, context) {
    let procedureCall;

    instantiate((context) => {
      const { string } = json,
            procedureCallNode = instantiateProcedureCall(string, context),
            node = procedureCallNode,  ///
            breakPoint = null,
            name = nameFromProcedureCallNode(procedureCallNode, context),
            parameters = parametersFromProcedureCallNode(procedureCallNode, context);

      context = null;

      procedureCall = new ProcedureCall(context, string, node, breakPoint, name, parameters);
    }, context);

    return procedureCall;
  }
});

function nameFromProcedureCallNode(procedureCallNode, context) {
  const name = procedureCallNode.getName();

  return name;
}

function parametersFromProcedureCallNode(procedureCallNode, context) {
  const parameterNodes = procedureCallNode.getParameterNodes(),
        parameters = parameterNodes.map((parameterNode) => {
          const parameter = context.findParameterByParameterNode(parameterNode);

          return parameter;
        });

  return parameters;
}
