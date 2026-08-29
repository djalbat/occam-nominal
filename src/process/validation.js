"use strict";

import { continuationUtilities } from "occam-languages";

import elements from "../elements";

import { choose } from "../utilities/context";
import { desist, declare } from "../utilities/state";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

const { some } = continuationUtilities;

export function validateTermAsVariable(term, state, context, forward, back) {
  const { Variable } = elements,
        variable = Variable.fromTerm(term, context);

  if (variable === null) {
    return back();
  }

  const variableIdentifier = variable.getIdentifier(),
        declaredVariables = context.findDeclaredVariablesByVariableIdentifier(variableIdentifier),
        declaredVariablesLength = declaredVariables.length;

  if (declaredVariablesLength === 0) {
    return back();
  }

  return some(declaredVariables, (declaredVariable, state, context, forward, back) => {
    const type = declaredVariable.getType(),
          provisional = declaredVariable.isProvisional();

    return choose((context) => {
      return variable.validate(type, provisional, state, context, (variable, context, back) => {
        term.setType(type);

        term.setProvisional(provisional);

        return forward(term, state, context, back);
      }, back);
    }, context);
  }, state, context, forward, back);
}

function unifyTermWithGenerators(term, state, context, forward, back) {
  const generators = context.getGenerators(),
        generatorsLength = generators.length;

  if (generatorsLength === 0) {
    return back();
  }

  const termString = term.getString();

  context.trace(`Unifying the '${termString}' term with generators...`);

  return some(generators, (generator, context, forward, back) => {
    return choose((context) => {
      return generator.unifyTerm(term, context, (term, context, back) => {
        return forward(term, state, context, back);
      }, back);
    }, context);
  }, context, (state, context, back) => {
    context.debug(`...unified the '${termString}' term with generators.`);

    return forward(term, state, context, back);
  }, back);
}

function unifyTermWithConstructors(term, state, context, forward, back) {
  const constructors = context.getConstructors(),
        constructorsLength = constructors.length;

  if (constructorsLength === 0) {
    return back();
  }

  const termString = term.getString();

  context.trace(`Unifying the '${termString}' term with constructors...`);

  return some(constructors, (constructor, context, forward, back) => {
    return choose((context) => {
      return constructor.unifyTerm(term, context, forward, back);
    }, context);
  }, context, (term, context, back) => {
    context.debug(`...unified the '${termString}' term with constructors.`);

    return forward(term, state, context, back);
  }, back);
}

function unifyTermWithBracketedConstructor(term, state, context, forward, back) {
  const bracketedConstructor = bracketedConstructorFromNothing();

  return bracketedConstructor.unifyTerm(term, state, context, (term, context, back) => {
    return forward(term, state, context, back);
  }, back);
}

export function validateStatementAsMetavariable(statement, state, context, forward, back) {
  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a metavariable...`);

  const strict = true;  ///

  return metavariable.validate(strict, state, context, (metavariable, context, back) => {
    return verifySubstitution(statement, context, (context, back) => {
      context.debug(`...validated the '${statementString}' statement as a metavariable.`);

      return forward(statement, state, context, back);
    }, back);
  }, back);
}

function unifyStatementWithCombinators(statement, state, context, forward, back) {
  const combinators = context.getCombinators(),
        combinatorsLength = combinators.length;

  if (combinatorsLength === 0) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Unifying the '${statementString}' statement with combinators...`);

  return some(combinators, (combinator, context, forward, back) => {
    return combinator.unifyStatement(statement, context, forward, back);
  }, context, (statement, context, back) => {
    context.debug(`...unified the '${statementString}' statement with combinators.`);

    return forward(statement, state, context, back);
  }, back);
}

function unifyStatementWithBracketedCombinator(statement, state, context, forward, back) {
  const bracketedCombinator = bracketedCombinatorFromNothing();

  return bracketedCombinator.unifyStatement(statement, state, context, (statement, context, back) => {
    return forward(statement, state, context, back);
  }, back);
}

function validateStatementAsEquality(statement, state, context, forward, back) {
  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as an equality...`);

  return equality.validate(state, context, (equality, context, back) => {
    context.debug(`...validated the '${statementString}' statement as an equality.`);

    return forward(statement, state, context, back);
  }, back);
}

function validateStatementAsTypeAssertion(statement, state, context, forward, back) {
  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a type assertion...`);

  return typeAssertion.validate(state, context, (typeAssertion, context, back) => {
    context.debug(`...validated the '${statementString}' statement as a type assertion.`);

    return forward(statement, state, context, back);
  }, back);
}

function validateStatementAsDefinedAssertion(statement, state, context, forward, back) {
  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

  return definedAssertion.validate(state, context, (definedAssertion, context, back) => {
    context.debug(`...validated the '${statementString}' statement as a defined assertion.`);

    return forward(statement, state, context, back);
  }, back);
}

function validateStatementAsPropertyAssertion(statement, state, context, forward, back) {
  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a property assertion...`);

  return propertyAssertion.validate(state, context, (propertyAssertion, context, back) => {
    context.debug(`...validated the '${statementString}' statement as a property assertion.`);

    return forward(statement, state, context, back);
  }, back);
}

function validateStatementAsSubproofAssertion(statement, state, context, forward, back) {
  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

  return subproofAssertion.validate(state, context, (subproofAssertion, context, back) => {
    context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);

    return forward(statement, state, context, back);
  }, back);
}

function validateStatementAsContainedAssertion(statement, state, context, forward, back) {
  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

  return containedAssertion.validate(state, context, (containedAssertion, context, back) => {
    context.debug(`...validated the '${statementString}' statement as a contained assertion.`);

    return forward(statement, state, context, back);
  }, back);
}

function validateStatementAsSignatureAssertion(statement, state, context, forward, back) {
  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

  return signatureAssertion.validate(state, context, (signatureAssertion, context, back) => {
    context.debug(`...validated the '${statementString}' statement as a signature assertion.`);

    return forward(statement, state, context, back);
  }, back);
}

export const validateTerms = [
  validateTermAsVariable,
  unifyTermWithGenerators,
  unifyTermWithConstructors,
  unifyTermWithBracketedConstructor
];

export const validateStatements = [
  validateStatementAsMetavariable,
  unifyStatementWithCombinators,
  unifyStatementWithBracketedCombinator,
  validateStatementAsEquality,
  validateStatementAsTypeAssertion,
  validateStatementAsDefinedAssertion,
  validateStatementAsPropertyAssertion,
  validateStatementAsSubproofAssertion,
  validateStatementAsContainedAssertion,
  validateStatementAsSignatureAssertion
];

export function unifyTermWithProperties(term, state, context, forward, back) {
  const termString = term.getString(),
        properties = context.getProperties();

  context.trace(`Unifying the '${termString}' term with properties...`);

  return some(properties, (property, context, forward, back) => {
    return choose((context) => {
      return property.unifyTerm(term, state, context, forward, back);
    }, context);
  }, context, (back) => {
    context.debug(`...unified the '${termString}' term with properties.`);

    return forward(term, state, context, back);
  }, back);
}

function verifySubstitution(statement, context, forward, back) {
  const substitution = statement.getSubstitution();

  if (substitution === null) {
    return forward(context, back);
  }

  return substitution.verify(context, (context, back) => {
    statement.setSubstitution(substitution);

    return forward(context, back);
  }, back);
}
