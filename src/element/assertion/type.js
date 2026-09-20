"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { typeToTypeJSON } from "../../utilities/json";
import { instantiateTypeAssertion } from "../../process/instantiate";
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

    return this.type.validate(context, (type, context, back) => {
      this.type = type;

      context.debug(`...validated the '${typeAssertionString}' type assertion's type.`);

      return forward(state, context, back)
    }, back);
  }

  validateWhenDeclared(state, context, forward, back) {
    const declared = isDeclared(state);

    if (!declared) {
      return back();
    }

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' declared type assertion...`);

    return this.term.validate(state, context, (term, context, back) => {
      const termType = term.getType(),
            termTypeEqualToType = termType.isEqualTo(this.type),
            termTypeSuperTypeOfType = termType.isSuperTypeOf(this.type);

      if (!termTypeSuperTypeOfType && !termTypeEqualToType) {
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

    const name = this.getName(),
          string = this.getString(),
          typeJSON = typeToTypeJSON(this.type),
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
              type = typeFromTypeAssertionNode(typeAssertionNode, context);

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
    const equivalenceTypes = findEquivalenceTypes(term, context),
          termType = term.getType(),
          termTypes = [ ///
            ...equivalenceTypes,
            termType
          ],
          termTypeEqualToOrSubTypeOfType = termTypes.some((termType) => {
            const termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

            if (termTypeEqualToOrSubTypeOfType) {
              return true;
            }
          });

    if (!termTypeEqualToOrSubTypeOfType) {
      return back();
    }

    const termPProvisional = term.isProvisional();

    if (termPProvisional) {
      return back();
    }

    return forward(term, context, back);
  }, back);
}

function findEquivalenceTypes(term, context) {
  let equivalenceTypes = [];

  const equivalences = context.getEquivalences(),
        equivalence = equivalences.find((equivalence) => {
          const termEquates = equivalence.equateTerm(term);

          if (termEquates) {
            return true;
          }
        }) || null;

  if (equivalence !== null) {
    equivalenceTypes = equivalence.getTypes();
  }

  return equivalenceTypes;
}

function termFromTypeAssertionNode(typeAssertionNode, context) {
  const termNode = typeAssertionNode.getTermNode(),
        term = context.findTermByTermNode(termNode);

  return term;
}

function typeFromTypeAssertionNode(typeAssertionNode, context) {
  const typeName = typeAssertionNode.getTypeName(),
        type = context.findTypeByTypeName(typeName);

  return type;
}