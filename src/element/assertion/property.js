"use strict";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { instantiatePropertyAssertion } from "../../process/instantiate";
import { variableAssignmentFromPrepertyAssertion } from "../../process/assign";
import { termFromPropertyAssertionNode, propertyFromPropertyAssertionNode, propertyAssertionFromStatementNode } from "../../utilities/element";

export default define(class PropertyAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, property) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.property = property;
  }

  getTerm() {
    return this.term;
  }

  getProperty() {
    return this.property;
  }

  getPropertyAssertionNode() {
    const node = this.getNode(),
          propertyAssertionNode = node; ///

    return propertyAssertionNode;
  }

  getType() { return this.property.getType(); }

  compareTermAndProperty(term, property, context) {
    let comparesToTermAndProperty = false;

    const termString = term.getString(),
          propertyString = property.getString(),
          propertyAssertionString = this.getString(); ///

    context.trace(`Comparing the '${propertyAssertionString}' property assertion to the '${termString}' term and '${propertyString}' property...`);

    const termA = term,
          termB = this.term, ///
          termAEqualToTermB = termA.isEqualTo(termB);

    if (termAEqualToTermB) {
      const propertyEqualToProperty = this.property.isEqualTo(property);

      comparesToTermAndProperty = propertyEqualToProperty;  ///
    }

    if (comparesToTermAndProperty) {
      context.debug(`...compared the '${propertyAssertionString}' property assertion to the '${termString}' term and '${propertyString}' property.`);
    }

    return comparesToTermAndProperty;
  }

  validate(context) {
    let propertyAssertion = null;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion...`);

    let validates = false;

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion !== null) {
      validates = true;

      propertyAssertion = validAssertion; ///

      context.debug(`...the '${propertyAssertionString}' property assertion is already valid.`);
    } else {
      const propertyVerifies = this.validateProperty(context);

      if (propertyVerifies) {
        const termValidates = this.validateTerm(context);

        if (termValidates) {
          const stated = context.isStated();

          let validatesWhenStated = false,
              validatesWhenDerived = false;

          if (stated) {
            validatesWhenStated = this.validateWhenStated(context);
          } else {
            validatesWhenDerived = this.validateWhenDerived(context);
          }

          if (validatesWhenStated || validatesWhenDerived) {
            validates = true;
          }
        }
      }

      if (validates) {
        const assertion = this; ///

        propertyAssertion = assertion;  ///

        this.assign(context);

        context.addAssertion(assertion);
      }
    }

    if (validates) {
      context.debug(`...validated the '${propertyAssertionString}' property assertion.`);
    }

    return propertyAssertion;
  }

  validateTerm(context) {
    let termValidates = false;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion's term...`);

    const type = this.getType(),
          term = this.term.validate(context, (term, context) => {
            let validatesForwards = false;

            const termType = term.getType(),
                  termTypeEqualToSubTypeOrSuperTypeOfType = termType.isEqualToSubTypeOrSuperTypeOf(type);

            if (termTypeEqualToSubTypeOrSuperTypeOfType) {
              validatesForwards = true;
            }

            return validatesForwards;
          });

    if (term !== null) {
      this.term = term;

      termValidates = true;
    }

    if (termValidates) {
      context.debug(`...validated the '${propertyAssertionString}' property assertion's term...`);
    }

    return termValidates;
  }

  validateProperty(context) {
    let propertyValidates = false;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion's property...`);

    const property = this.property.validate(context);

    if (property !== null) {
      this.property = property;

      propertyValidates = true;
    }

    if (propertyValidates) {
      context.trace(`...validated the '${propertyAssertionString}' property assertion's property.`);
    }

    return propertyValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' stated property assertion...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...verified the '${propertyAssertionString}' stated property assertion.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' derived property assertion...`);

    validatesWhenDerived = true;

    if (validatesWhenDerived) {
      context.debug(`...validated the '${propertyAssertionString}' derived property assertion.`);
    }

    return validatesWhenDerived;
  }

  assign(context) {
    const stated = context.isStated();

    if (!stated) {
      return;
    }

    const propertyAssertion = this, ///
          variableAssigment = variableAssignmentFromPrepertyAssertion(propertyAssertion, context);

    context.addAssignment(variableAssigment);
  }

  static name = "PropertyAssertion";

  static fromJSON(json, context) {
    let propertyAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              propertyAssertionNode = instantiatePropertyAssertion(string, context),
              node = propertyAssertionNode,  ///
              breakPoint = breakPointFromJSON(json),
              term = termFromPropertyAssertionNode(propertyAssertionNode, context),
              property = propertyFromPropertyAssertionNode(propertyAssertionNode, context);

        context = null;

        propertyAssertion = new PropertyAssertion(context, string, node, breakPoint, term, property);
      }, context);
    }

    return propertyAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          propertyAssertion = propertyAssertionFromStatementNode(statementNode, context);

    return propertyAssertion;
  }
});
