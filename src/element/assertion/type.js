"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { instantiateTypeAssertion } from "../../process/instantiate";
import { typeFromJSON, typeToTypeJSON } from "../../utilities/json";
import { termFromTermAndSubstitutions } from "../../utilities/substitutions";
import { typeAssertionFromStatementNode } from "../../utilities/element";
import { variableAssignmentFromTypeAssertion } from "../../process/assign";
import { derive, isDerived, isDeclared, isTransient} from "../../utilities/state";

const { unbreakable } = breakPointUtilities,
      { all, exists } = continuationUtilities;

export default define(class TypeAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, type) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.type = type;
  }

  getTerm() {
    return this.term;
  }

  getType() {
    return this.type;
  }

  getTypeAssertionNBode() {
    const node = this.getNode(),
          typeAssertionNode = node; ///

    return typeAssertionNode;
  }

  discharge(generalContext, specificContext, forward, back) {
    const context = specificContext, ///
          typeAssertionString = this.getString(); ///

    context.trace(`Discharging the '${typeAssertionString}' type assertion...`);

    const term = termFromTermAndSubstitutions(this.term, context);

    return derive((state) => {
      return validateWhenDerived(term, this.type, state, context, (term, context, back) => {
        specificContext = context;  ///

        context.debug(`...discharged the '${typeAssertionString}' type assertion.`);

        return forward(generalContext, specificContext, back);
      }, back);
    });
  }

  validate = unbreakable(function (state, context, forward, back) {
    let assertion;

    const typeAssertionString = this.getString();  ///

    context.trace(`Validating the '${typeAssertionString}' type assertion...`);

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const typeAssertion = assertion; ///

      context.debug(`The '${typeAssertionString}' type assertion is already present.`);

      return forward(typeAssertion, context, back);
    }

    const validateType = this.validateType.bind(this);

    return all([
      validateType
    ], state, context, (state, context, back) => {
      const validateWhenDeclared = this.validateWhenDeclared.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenDeclared,
        validateWhenDerived
      ], state, context, (state, context, back) => {
        assertion = this; ///

        this.assign(state, context);

        context.addAssertion(assertion);

        const typeAssertion = assertion; ///

        context.debug(`...validated the '${typeAssertionString}' type assertion.`);

        return forward(typeAssertion, context, back);
      }, back);
    }, back);
  });

  validateType(state, context, forward, back) {
    const typeAssertionString = this.getString();  ///

    context.trace(`Validating the '${typeAssertionString}' type assertion's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    if (type === null) {
      const typeString = this.type.getString();

      context.debug(`The '${typeString}' type is not present.`);

      return back();
    }

    this.type = type;

    context.debug(`...validated the '${typeAssertionString}' type assertion's type.`);

    return forward(state, context, back)
  }

  validateWhenDeclared(state, context, forward, back) {
    const declared = isDeclared(state);

    if (!declared) {
      return back();
    }

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' declared type assertion...`);

    return this.term.validate(state, context, (term, context, back) => {
      let validatesWhenDeclared = false;

      if (term !== null) {
        const termType = term.getType(),
              termTypeEqualToType = termType.isEqualTo(this.type),
              termTypeSuperTypeOfType = termType.isSuperTypeOf(this.type);

        if (false) {
          ///
        } else if (termTypeEqualToType) {
          validatesWhenDeclared = true;
        } else if (termTypeSuperTypeOfType) {
          const termEstablished = term.isEstablished();

          if (termEstablished) {
            validatesWhenDeclared = true;
          }
        }
      }

      if (!validatesWhenDeclared) {
        return back();
      }

      this.term = term;

      context.debug(`...validated the '${typeAssertionString}' declared type assertion.`);

      return forward(state, context, back);
    }, back);
  }

  validateWhenDerived(state, context, forward, back) {
    const derived = isDerived(state);

    if (!derived) {
      return back();
    }

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' derived type assertion...`);

    return validateWhenDerived(this.term, this.type, state, context, (term, context, back) => {
      this.term = term;

      context.debug(`...validated the '${typeAssertionString}' derived type assertion.`);

      return forward(state, context, back);
    }, back);
  }

  applyIndependently(generalContext, specificContext, forward, back) {
    const context = specificContext, ///
          typeAssertionString = this.getString(); ///

    context.trace(`Applying the '${typeAssertionString}' type assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context);

    return derive((state) => {
      return validateWhenDerived(term, this.type, state, context, (term, context, back) => {
        specificContext = context;  ///

        context.debug(`...applied the '${typeAssertionString}' type assertion independently.`);

        return forward(generalContext, specificContext, back);
      }, back);
    });
  }

  assign(state, context) {
    const derived = isDerived(state),
          transient = isTransient(state);

    if (derived || transient) {
      return;
    }

    const typeAssertion = this, ///
          variableAssigment = variableAssignmentFromTypeAssertion(typeAssertion, context);

    context.addAssignment(variableAssigment);
  }

  toJSON() {
    let json;

    const typeJSON = typeToTypeJSON(this.type),
          name = this.getName(),
          string = this.getString(),
          type = typeJSON;  ///

    json = {
      name,
      string,
      type
    };

    return json;
  }

  static name = "TypeAssertion";

  static fromJSON(json, context) {
    let typeAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              typeAssertionNode = instantiateTypeAssertion(string, context),
              node = typeAssertionNode, ///
              breakPoint = null,
              term = termFromTypeAssertionNode(typeAssertionNode, context),
              type = typeFromJSON(json, context);

        context = null;

        typeAssertion = new TypeAssertion(context, string, node, breakPoint, term, type);
      }, context);
    }

    return typeAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          typeAssertion = typeAssertionFromStatementNode(statementNode, context);

    return typeAssertion;
  }
});

function validateWhenDerived(term, type, state, context, forward, back) {
  return term.validate(state, context, (term, context, back) => {
    const termType = term.getType(),
          termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

    if (!termTypeEqualToOrSubTypeOfType) {
      return back();
    }

    const termEstablished = term.isEstablished();

    if (!termEstablished) {
      return back();
    }

    return forward(term, context, back);
  }, back);
}

function termFromTypeAssertionNode(typeAssertionNode, context) {
  const termNode = typeAssertionNode.getTermNode(),
        term = context.findTermByTermNode(termNode);

  return term;
}