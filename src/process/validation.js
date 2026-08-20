"use strict";

import { continuationUtilities } from "occam-languages";

import elements from "../elements";

import { choose } from "../utilities/context";
import { desist, declare } from "../utilities/state";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

const { some } = continuationUtilities;

export function validateTermAsVariable(term, state, context, continuation) {
  const { Variable } = elements,
        variable = Variable.fromTerm(term, context);

  if (variable === null) {
    const termValidatesAsVariable = false;

    return continuation(termValidatesAsVariable, term, state, context);
  }

  const variableIdentifier = variable.getIdentifier(),
        declaredVariables = context.findDeclaredVariablesByVariableIdentifier(variableIdentifier),
        declaredVariablesLength = declaredVariables.length;

  if (declaredVariablesLength === 0) {
    const termValidatesAsVariable = false;

    return continuation(termValidatesAsVariable, term, state, context);
  }

  declaredVariables.push(null);

  return some(declaredVariables, (declaredVariable, state, context, continuation) => {
    const type = declaredVariable.getType(),
          provisional = declaredVariable.isProvisional();

    return choose((context) => {
      return variable.validate(state, type, provisional, context, (variable, context) => {
        let variableValidates = false;

        if (variable !== null) {
          variableValidates = true;
        }

        if (variableValidates) {
          term.setType(type);

          term.setProvisional(provisional);
        }

        return continuation(variableValidates, term, state, context);
      });
    }, context);
  }, state, context, continuation);
}

function unifyTermWithGenerators(term, state, context, continuation) {
  let termUnifiesWithGenerators = false;

  const generators = context.getGenerators(),
        generatorsLength = generators.length;

  if (generatorsLength > 0) {
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with generators...`);

    termUnifiesWithGenerators = some(generators, (generator, context, continuation) => {
      let termUnifies;

      choose((context) => {
        termUnifies = generator.unifyTerm(term, context, (term, context) => {
          let termUnifies;

          termUnifies = continuation(term, state, context);

          return termUnifies;
        });

        if (termUnifies) {
          context.commit();
        }
      }, context);

      return termUnifies;
    }, context, continuation);

    if (termUnifiesWithGenerators) {
      context.debug(`...unified the '${termString}' term with generators.`);
    }
  }

  return termUnifiesWithGenerators;
}

function unifyTermWithConstructors(term, state, context, continuation) {
  let termUnifiesWithConstructors = false;

  const constructors = context.getConstructors(),
        constructorsLength = constructors.length;

  if (constructorsLength > 0) {
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with constructors...`);

    termUnifiesWithConstructors = some(constructors, (constructor, context, continuation) => {
      let termUnifies;

      choose((context) => {
        termUnifies = constructor.unifyTerm(term, context, (term, context) => {
          let termUnifies;

          termUnifies = continuation(term, state, context);

          return termUnifies;
        });

        if (termUnifies) {
          context.commit();
        }
      }, context);

      return termUnifies;
    }, context, continuation);

    if (termUnifiesWithConstructors) {
      context.debug(`...unified the '${termString}' term with constructors.`);
    }
  }

  return termUnifiesWithConstructors;
}

function unifyTermWithBracketedConstructor(term, state, context, continuation) {
  let termUnifiesWithBracketedConstructor = false;

  const termString = term.getString();

  context.trace(`Unifying the '${termString}' term with the bracketed constructor...`);

  const bracketedConstructor = bracketedConstructorFromNothing(),
        termUnifies = bracketedConstructor.unifyTerm(term, state, context, (term, context) => {
          let termUnifies;

          termUnifies = continuation(term, state, context);

          return termUnifies;
        });

  if (termUnifies) {
    termUnifiesWithBracketedConstructor = true;
  }

  if (termUnifiesWithBracketedConstructor) {
    context.debug(`...unified the '${termString}' term with the bracketed constructor.`);
  }

  return termUnifiesWithBracketedConstructor;
}

export function validateStatementAsMetavariable(statement, state, context, continuation) {
  let statementValidatesAsMetavariable = false;

  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable === null) {
    return continuation(statementValidatesAsMetavariable, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a metavariable...`);

  const strict = true,  ///
        metavaraibleValidates = metavariable.validate(strict, state, context, (metavariable, context) => {
          let validates;

          const substitutionValidates = validateSubstitution(statement, context, (context) => {
            let validates;

            validates = continuation(statement, state, context);

            return validates;
          });

          if (substitutionValidates) {
            validates = true;
          }

          return validates;
        });

  if (metavaraibleValidates) {
    statementValidatesAsMetavariable = true;
  }

  if (statementValidatesAsMetavariable) {
    context.debug(`...validated the '${statementString}' statement as a metavariable.`);
  }
}

function unifyStatementWithCombinators(statement, state, context, continuation) {
  let statementUnifiesWithCombinators;

  const combinators = context.getCombinators(),
        combinatorsLength = combinators.length;

  if (combinatorsLength === 0) {
    return continuation(statementUnifiesWithCombinators, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Unifying the '${statementString}' statement with combinators...`);

  statementUnifiesWithCombinators = some(combinators, (combinator, context, continuation) => {
    let statementUnifies;

    statementUnifies = combinator.unifyStatement(statement, context, (statement, context) => {
      let statementUnifies;

      statementUnifies = continuation(statement, state, context);

      return statementUnifies;
    });

    return statementUnifies;
  }, context, continuation);

  if (statementUnifiesWithCombinators) {
    context.debug(`...unified the '${statementString}' statement with combinators.`);
  }
}

function unifyStatementWithBracketedCombinator(statement, state, context, continuation) {
  const bracketedCombinator = bracketedCombinatorFromNothing();

  return bracketedCombinator.unifyStatement(statement, context, (statementUnifiesWithBracketedCombinator, context) => {
    return continuation(statementUnifiesWithBracketedCombinator, statement, state, context);
  });
}

function validateStatementAsEquality(statement, state, context, continuation) {
  let statementValidatesAsEquality = false;

  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    return continuation(statementValidatesAsEquality, statement, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as an equality...`);

  const equalityValidates = equality.validate(state, context, (equality, context) => {
    let validates;

    validates = continuation(statement, state, context);

    return validates;
  });

  if (equalityValidates) {
    statementValidatesAsEquality = true;
  }

  if (statementValidatesAsEquality) {
    context.debug(`...validated the '${statementString}' statement as an equality.`);
  }
}

function validateStatementAsTypeAssertion(statement, state, context, continuation) {
  let statementValidatesAssTypeAssertion = false;

  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    return continuation(statementValidatesAssTypeAssertion, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a type assertion...`);

  return typeAssertion.validate(state, context, (typeAssertion, context) => {
    if (typeAssertion !== null) {
      statementValidatesAssTypeAssertion = true;
    }

    if (statementValidatesAssTypeAssertion) {
      context.debug(`...validated the '${statementString}' statement as a type assertion.`);
    }

    return continuation(statementValidatesAssTypeAssertion, statement, state, context);
  });
}

function validateStatementAsDefinedAssertion(statement, state, context, continuation) {
  let statementValidatesAssDefinedAssertion = false;

  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion === null) {
    return continuation(statementValidatesAssDefinedAssertion, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

  return definedAssertion.validate(state, context, (definedAssertion, context) => {
    if (definedAssertion !== null) {
      statementValidatesAssDefinedAssertion = true;
    }

    if (statementValidatesAssDefinedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a defined assertion.`);
    }

    return continuation(statementValidatesAssDefinedAssertion, statement, state, context);
  });
}

function validateStatementAsPropertyAssertion(statement, state, context, continuation) {
  let statementValidatesAsPropertyAssertion = false;

  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    return continuation(statementValidatesAsPropertyAssertion, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a property assertion...`);

  return propertyAssertion.validate(state, context, (propertyAssertion, context) => {
    if (propertyAssertion !== null) {
      statementValidatesAsPropertyAssertion = true;
    }

    if (statementValidatesAsPropertyAssertion) {
      context.debug(`...validated the '${statementString}' statement as a property assertion.`);
    }

    return continuation(statementValidatesAsPropertyAssertion, state, context);
  });
}

function validateStatementAsSubproofAssertion(statement, state, context, continuation) {
  let statementValidatesAsSubproofAssertion = false;

  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion === null) {
    return continuation(statementValidatesAsSubproofAssertion, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

  return subproofAssertion.validate(state, context, (subproofAssertion, context) => {
    if (subproofAssertion !== null) {
      statementValidatesAsSubproofAssertion = true;
    }

    if (statementValidatesAsSubproofAssertion) {
      context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);
    }

    return continuation(statementValidatesAsSubproofAssertion, state, context);
  });
}

function validateStatementAsContainedAssertion(statement, state, context, continuation) {
  let statementValidatesAssContainedAssertion = false;

  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion === null) {
    return continuation(statementValidatesAssContainedAssertion, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

  return containedAssertion.validate(state, context, (containedAssertion, context) => {
    if (containedAssertion !== null) {
      statementValidatesAssContainedAssertion = true;
    }

    if (statementValidatesAssContainedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a contained assertion.`);
    }

    return continuation(statementValidatesAssContainedAssertion, state, context);
  });
}

function validateStatementAsSignatureAssertion(statement, state, context, continuation) {
  let statementValidatesAsSignatureAssertion = false;

  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    return continuation(statementValidatesAsSignatureAssertion, state, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

  return signatureAssertion.validate(state, context, (signatureAssertion, context) => {
    if (signatureAssertion !== null) {
      statementValidatesAsSignatureAssertion = true;
    }

    if (statementValidatesAsSignatureAssertion) {
      context.debug(`...validated the '${statementString}' statement as a signature assertion.`);
    }
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

export function unifyTermWithProperties(term, state, context, continuation) {
  let termUnifiesWithProperties;

  const termString = term.getString(),
        properties = context.getProperties();

  context.trace(`Unifying the '${termString}' term with properties...`);

  termUnifiesWithProperties = some(properties, (property, context, continuation) => {
    let termUnifies;

    choose((context) => {
      termUnifies = property.unifyTerm(term, context, (term, context) => {
        let termUnifies;

        termUnifies = continuation(term, context);

        return termUnifies;
      });

      if (termUnifies) {
        context.commit();
      }
    }, context);

    return termUnifies;
  }, context, continuation);

  if (termUnifiesWithProperties) {
    context.debug(`...unified the '${termString}' term with properties.`);
  }

  return termUnifiesWithProperties;
}

function validateSubstitution(statement, context, continuation) {
  let substitutionValidates;

  const substitution = statement.getSubstitution();

  if (substitution !== null) {
    declare((state) => {
      desist((state) => {
        substitutionValidates = substitution.validate(state, context, (substitution, context) => {
          let validates;

          validates = continuation(context);

          return validates;
        });

      }, state);
    });
  } else {
    substitutionValidates = continuation(context);
  }

  return substitutionValidates;
}
