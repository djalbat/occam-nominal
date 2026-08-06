"use strict";

import elements from "../elements";

import { some } from "../utilities/continuation";
import { choose } from "../utilities/context";
import { desist, declare } from "../utilities/state";
import { provisionallyStringFromProvisional } from "../utilities/string";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

export function validateTermAsVariable(term, context, continuation) {
  let termValidatesAsVariable = false;

  const { Variable } = elements,
        variable = Variable.fromTerm(term, context);

  if (variable !== null) {
    const termString = term.getString();

    context.trace(`Validating the '${termString}' term as a variable...`);

    const variableValidaets = variable.validate(state, context, (variable, context) => {
      let validates;

      const type = variable.getType(),
            typeString = type.getString(),
            provisional = variable.isProvisional(),
            provisionallyString = provisionallyStringFromProvisional(provisional);

      context.trace(`Setting the '${termString}' term's type to the '${typeString}' type${provisionallyString}.`);

      term.setType(type);

      term.setProvisional(provisional);

      validates = continuation(term, context);

      return validates;
    });

    if (variableValidaets) {
      termValidatesAsVariable = true;
    }

    if (termValidatesAsVariable) {
      context.debug(`...validated the '${termString}' term as a variable.`);
    }
  }

  return termValidatesAsVariable;
}

function unifyTermWithGenerators(term, context, continuation) {
  let termUnifiesWithGenerators;

  const generators = context.getGenerators(),
        generatorsLength = generators.length;

  if (generatorsLength > 0) {
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with generators...`);

    termUnifiesWithGenerators = some(generators, (generator, context, continuation) => {
      let termUnifies;

      choose((context) => {
        termUnifies = generator.unifyTerm(term, context, continuation);
      }, context);

      if (termUnifies) {
        context.commit();
      }

      return termUnifies;
    }, context, continuation);

    if (termUnifiesWithGenerators) {
      context.debug(`...unified the '${termString}' term with generators.`);
    }
  }

  return termUnifiesWithGenerators;
}

function unifyTermWithConstructors(term, context, continuation) {
  let termUnifiesWithConstructors;

  const constructors = context.getConstructors(),
        constructorsLength = constructors.length;

  if (constructorsLength > 0) {
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with constructors...`);

    termUnifiesWithConstructors = some(constructors, (constructor, context, continuation) => {
      let termUnifies;

      choose((context) => {
        termUnifies = constructor.unifyTerm(term, context, continuation);

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

function unifyTermWithBracketedConstructor(term, context, continuation) {
  let termUnifiesWithBracketedConstructor = false;

  const termString = term.getString();

  context.trace(`Unifying the '${termString}' term with the bracketed constructor...`);

  const bracketedConstructor = bracketedConstructorFromNothing(),
        termUnifies = bracketedConstructor.unifyTerm(term, context, () => {
          debugger
        });

  if (termUnifies) {
    termUnifiesWithBracketedConstructor = true;
  }

  if (termUnifiesWithBracketedConstructor) {
    context.debug(`...unified the '${termString}' term with the bracketed constructor.`);
  }

  return termUnifiesWithBracketedConstructor;
}

function validateStatementAsMetavariable(statement, state, context, continuation) {
  let statementValidatesAsMetavariable = false;

  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a metavariable...`);

    const strict = true,  ///
          metavaraibleValidates = metavariable.validate(strict, state, context, (metavariable, context) => {
            let validates;

            const substitutionValidates = validateSubstitution(statement, context, (context) => {
              let validaets;

              validates = continuation(statement, state, context);

              return validaets;
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

  return statementValidatesAsMetavariable;
}

function unifyStatementWithCombinators(statement, state, context, continuation) {
  let statementUnifiesWithCombinators;

  const combinators = context.getCombinators(),
        combinatorsLength = combinators.length;

  if (combinatorsLength > 0) {
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

  return statementUnifiesWithCombinators;
}

function unifyStatementWithBracketedCombinator(statement, state, context, continuation) {
  let statementUnifiesWithBracketedCombinator = false;

  const bracketedCombinator = bracketedCombinatorFromNothing(),
        statementUnifies = bracketedCombinator.unifyStatement(statement, context, (statement, context) => {
          let statementUnifies;

          statementUnifies = continuation(statement, state, context);

          return statementUnifies;
        });

  if (statementUnifies) {
    statementUnifiesWithBracketedCombinator = true;
  }

  return statementUnifiesWithBracketedCombinator;
}

function validateStatementAsEquality(statement, state, context, continuation) {
  let statementValidatesAsEquality = false;

  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality !== null) {
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

  return statementValidatesAsEquality;
}

function validateStatementAsJudgement(statement, state, context, continuation) {
  let statementValidatesAssJudgement = false;

  const { Judgement } = elements,
        judgement = Judgement.fromStatement(statement, context);

  if (judgement !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a judgement...`);

    const judgementValidates = judgement.validate(state, context, (judgement, context) => {
      let validates;

      validates = continuation(statement, state, context);

      return validates;
    });

    if (judgementValidates) {
      statementValidatesAssJudgement = true;
    }

    if (statementValidatesAssJudgement) {
      context.debug(`...validated the '${statementString}' statement as a judgement.`);
    }
  }

  return statementValidatesAssJudgement;
}

function validateStatementAsTypeAssertion(statement, state, context, continuation) {
  let statementValidatesAssTypeAssertion = false;

  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a type assertion...`);

    const typeAssertionValidates = typeAssertion.validate(state, context, (typeAssertion, context) => {
      let validates;

      validates = continuation(statement, state, context);

      return validates;
    });

    if (typeAssertionValidates) {
      statementValidatesAssTypeAssertion = true;
    }

    if (statementValidatesAssTypeAssertion) {
      context.debug(`...validated the '${statementString}' statement as a type assertion.`);
    }
  }

  return statementValidatesAssTypeAssertion;
}

function validateStatementAsDefinedAssertion(statement, state, context, continuation) {
  let statementValidatesAssDefinedAssertion = false;

  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

    const definedAssertionValidates = definedAssertion.validate(state, context, (definedAssertion, context) => {
      let validates;

      validates = continuation(statement, state, context);

      return validates;
    });

    if (definedAssertionValidates) {
      statementValidatesAssDefinedAssertion = true;
    }

    if (statementValidatesAssDefinedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a defined assertion.`);
    }
  }

  return statementValidatesAssDefinedAssertion;
}

function validateStatementAsPropertyAssertion(statement, state, context, continuation) {
  let statementValidatesAsPropertyAssertion = false;

  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a property assertion...`);

    const propertyAssertionValidates = propertyAssertion.validate(state, context, (propertyAssertion, context) => {
      let validates;

      validates = continuation(statement, state, context);

      return validates;
    });

    if (propertyAssertionValidates) {
      statementValidatesAsPropertyAssertion = true;
    }

    if (statementValidatesAsPropertyAssertion) {
      context.debug(`...validated the '${statementString}' statement as a property assertion.`);
    }
  }

  return statementValidatesAsPropertyAssertion;
}

function validateStatementAsSubproofAssertion(statement, state, context, continuation) {
  let statementValidatesAsSubproofAssertion = false;

  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

    const subproofAssertionValidates = subproofAssertion.validate(state, context, (subproofAssertion, context) => {
      let validates;

      validates = continuation(statement, state, context);

      return validates;
    });

    if (subproofAssertionValidates) {
      statementValidatesAsSubproofAssertion = true;
    }

    if (statementValidatesAsSubproofAssertion) {
      context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);
    }
  }

  return statementValidatesAsSubproofAssertion;
}

function validateStatementAsContainedAssertion(statement, state, context, continuation) {
  let statementValidatesAssContainedAssertion = false;

  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

    const containedAssertionValidates = containedAssertion.validate(state, context, (containedAssertion, context) => {
      let validates;

      validates = continuation(statement, state, context);

      return validates;
    });

    if (containedAssertionValidates) {
      statementValidatesAssContainedAssertion = true;
    }

    if (statementValidatesAssContainedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a contained assertion.`);
    }
  }

  return statementValidatesAssContainedAssertion;
}

function validateStatementAsSignatureAssertion(statement, state, context, continuation) {
  let statementValidatesAsSignatureAssertion = false;

  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

    const signatureAssertionValidates = signatureAssertion.validate(state, context, (signatureAssertion, context) => {
      let validates;

      validates = continuation(statement, state, context);

      return validates;
    });

    if (signatureAssertionValidates) {
      statementValidatesAsSignatureAssertion = true;
    }

    if (statementValidatesAsSignatureAssertion) {
      context.debug(`...validated the '${statementString}' statement as a signature assertion.`);
    }
  }

  return statementValidatesAsSignatureAssertion;
}

export function unifyTermWithProperties(term, context, continuation) {
  let termUnifiesWithProperties;

  const properties = context.getProperties();

  return some(properties, (property) => {
    let termUnifiesWithProperty = false;

    return choose((context) => {
      const termUnifies = property.unifyTerm(term, context, continuation);

      if (termUnifies) {
        termUnifiesWithProperty = true;

        context.commit();
      }
    }, context);

    if (termUnifiesWithProperty) {
      return true;
    }
  }, context);

  return termUnifiesWithProperties;
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
  validateStatementAsJudgement,
  validateStatementAsTypeAssertion,
  validateStatementAsDefinedAssertion,
  validateStatementAsPropertyAssertion,
  validateStatementAsSubproofAssertion,
  validateStatementAsContainedAssertion,
  validateStatementAsSignatureAssertion
];

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
