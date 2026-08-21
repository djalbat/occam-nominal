"use strict";

import { continuationUtilities } from "occam-languages";

import elements from "../elements";

import { choose } from "../utilities/context";
import { desist, declare } from "../utilities/state";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

const { some } = continuationUtilities;

export function validateTermAsVariable(term, state, context, back, forward) {
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

  return some(declaredVariables, (declaredVariable, state, context, back, forward) => {
    const type = declaredVariable.getType(),
          provisional = declaredVariable.isProvisional();

    return choose((context) => {
      return variable.validate(state, type, provisional, context, back, (variable, context, back) => {
        term.setType(type);

        term.setProvisional(provisional);

        return forward(term, state, context, back);
      });
    }, context);
  }, state, context, back, forward);
}

function unifyTermWithGenerators(term, state, context, back, forward) {
  const generators = context.getGenerators(),
        generatorsLength = generators.length;

  if (generatorsLength === 0) {
    return back();
  }

  const termString = term.getString();

  context.trace(`Unifying the '${termString}' term with generators...`);

  return some(generators, back, (generator, context, back, forward) => {
    return choose((context) => {
      return generator.unifyTerm(term, context, back, forward);
    }, context);
  }, context, (state, context) => {
    context.debug(`...unified the '${termString}' term with generators.`);

    return forward(term, state, context);
  });
}

function unifyTermWithConstructors(term, state, context, back, forward) {
  const constructors = context.getConstructors(),
        constructorsLength = constructors.length;

  if (constructorsLength === 0) {
    return back();
  }

  const termString = term.getString();

  context.trace(`Unifying the '${termString}' term with constructors...`);

  return some(constructors, back, (constructor, context, back, forward) => {
    return choose((context) => {
      return constructor.unifyTerm(term, context, back, forward);
    }, context);
  }, context, (state, context) => {
    context.debug(`...unified the '${termString}' term with generators.`);

    return forward(term, state, context);
  });
}

function unifyTermWithBracketedConstructor(term, state, context, back, forward) {
  const bracketedConstructor = bracketedConstructorFromNothing();

  return bracketedConstructor.unifyTerm(term, state, context, back, forward);
}

export function validateStatementAsMetavariable(statement, state, context, back, forward) {
  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a metavariable...`);

  const strict = true;  ///

  return metavariable.validate(strict, state, context, back, (metavariable, context) => {
    return validateSubstitution(statement, context, back, (context) => {
      context.debug(`...validated the '${statementString}' statement as a metavariable.`);

      return forward(statement, state, context);
    });
  });
}

function unifyStatementWithCombinators(statement, state, context, back, forward) {
  const combinators = context.getCombinators(),
        combinatorsLength = combinators.length;

  if (combinatorsLength === 0) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Unifying the '${statementString}' statement with combinators...`);

  return some(combinators, (combinator, context, back, forward) => {
    return combinator.unifyStatement(statement, context, back, forward);
  }, back, () => {
    context.debug(`...unified the '${statementString}' statement with combinators.`);

    return forward(statement, state, context);
  });
}

function unifyStatementWithBracketedCombinator(statement, state, context, back, forward) {
  const bracketedCombinator = bracketedCombinatorFromNothing();

  return bracketedCombinator.unifyStatement(statement, context, back, (context) => {
    return forward(statement, state, context);
  });
}

function validateStatementAsEquality(statement, state, context, back, forward) {
  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as an equality...`);

  return equality.validate(state, context, back, (equality, context) => {
    context.debug(`...validated the '${statementString}' statement as an equality.`);

    return forward(statement, state, context);
  });
}

function validateStatementAsTypeAssertion(statement, state, context, back, forward) {
  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a type assertion...`);

  return typeAssertion.validate(state, context, back, (typeAssertion, context) => {
    context.debug(`...validated the '${statementString}' statement as a type assertion.`);

    return forward(statement, state, context);
  });
}

function validateStatementAsDefinedAssertion(statement, state, context, back, forward) {
  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

  return definedAssertion.validate(state, context, back, (definedAssertion, context) => {
    context.debug(`...validated the '${statementString}' statement as a defined assertion.`);

    return forward(statement, state, context);
  });
}

function validateStatementAsPropertyAssertion(statement, state, context, back, forward) {
  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a property assertion...`);

  return propertyAssertion.validate(state, context, back, (propertyAssertion, context) => {
    context.debug(`...validated the '${statementString}' statement as a property assertion.`);

    return forward(statement, state, context);
  });
}

function validateStatementAsSubproofAssertion(statement, state, context, back, forward) {
  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

  return subproofAssertion.validate(state, context, back, (subproofAssertion, context) => {
    context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);

    return forward(statement, state, context);
  });
}

function validateStatementAsContainedAssertion(statement, state, context, back, forward) {
  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

  return containedAssertion.validate(state, context, back, (containedAssertion, context) => {
    context.debug(`...validated the '${statementString}' statement as a contained assertion.`);

    return forward(statement, state, context);
  });
}

function validateStatementAsSignatureAssertion(statement, state, context, back, forward) {
  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    return back();
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

  return signatureAssertion.validate(state, context, back, (signatureAssertion, context) => {
    context.debug(`...validated the '${statementString}' statement as a signature assertion.`);

    return forward(statement, state, context);
  });
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

export function unifyTermWithProperties(term, state, context, back, forward) {
  const termString = term.getString(),
        properties = context.getProperties();

  context.trace(`Unifying the '${termString}' term with properties...`);

  return some(properties, back, (property, context, back, forward) => {
    return choose((context) => {
      return property.unifyTerm(term, state, context, back, forward);
    }, context);
  }, context, () => {
    context.debug(`...unified the '${termString}' term with properties.`);

    return forward(term, state, context);
  });
}

function validateSubstitution(statement, context, back, forward) {
  const substitution = statement.getSubstitution();

  if (substitution === null) {
    return forward()
  }

  return declare((state) => {
    return desist((state) => {
      return substitution.validate(state, context, back, (substitution, context) => {
        return forward(context);
      });
    }, state);
  });
}
