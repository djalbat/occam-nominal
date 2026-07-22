"use strict";

import { FileContext, nominalUtilities } from "occam-languages";
import { arrayUtilities } from "necessary";

import NominalLexer from "../../nominal/lexer";
import NominalParser from "../../nominal/parser";

import { findType} from "../../utilities/type";
import { verifyFile } from "../../process/verify";
import { findMetaTypeByMetaTypeName } from "../../metaTypes";
import { typesFromJSON,
         rulesFromJSON,
         axiomsFromJSON,
         schemasFromJSON,
         typesToTypesJSON,
         theoremsFromJSON,
         rulesToRulesJSON,
         axiomsToAxiomsJSON,
         generatorsFromJSON,
         conjecturesFromJSON,
         combinatorsFromJSON,
         typePrefixesFromJSON,
         constructorsFromJSON,
         schemasToSchemasJSON,
         theoremsToTheoremsJSON,
         declaredVariablesFromJSON,
         generatorsToGeneratorsJSON,
         conjecturesToConjecturesJSON,
         combinatorsToCombinatorsJSON,
         declaredMetavariablesFromJSON,
         typePrefixesToTypePrefixesJSON,
         constructorsToConstructorsJSON,
         declaredVariablesToDeclaredVariablesJSON,
         declaredMetavariablesToDeclaredMetavariablesJSON } from "../../utilities/json";

const { push } = arrayUtilities,
      { nominalLexerFromCombinedCustomGrammar, nominalParserFromCombinedCustomGrammar } = nominalUtilities;

export default class NominalFileContext extends FileContext {
  constructor(context, fileContent, filePath, tokens, node, json, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, generators, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables) {
    super(context, fileContent, filePath, tokens, node, json);

    this.lexer = lexer;
    this.parser = parser;
    this.context = context;
    this.filePath = filePath;
    this.tokens = tokens;
    this.node = node;
    this.types = types;
    this.rules = rules;
    this.axioms = axioms;
    this.lemmas = lemmas;
    this.schemas = schemas;
    this.theorems = theorems;
    this.generators = generators;
    this.conjectures = conjectures;
    this.combinators = combinators;
    this.typePrefixes = typePrefixes;
    this.constructors = constructors;
    this.declaredVariables = declaredVariables;
    this.declaredMetavariables = declaredMetavariables;
  }

  getLexer() {
    return this.lexer;
  }

  getParser() {
    return this.parser;
  }

  getLabels(includeRelease = true) {
    const labels = [];

    if (includeRelease) {
      const releaseContextLabels = this.context.getLabels();

      push(labels, releaseContextLabels);
    } else {
      this.rules.forEach((rule) => {
        const ruleLabels = rule.getLabels();

        push(labels, ruleLabels);
      });

      this.axioms.forEach((axiom) => {
        const axiomLabels = axiom.getLabels();

        push(labels, axiomLabels);
      });

      this.lemmas.forEach((lemma) => {
        const lemmaLabels = lemma.getLabels();

        push(labels, lemmaLabels);
      });

      this.theorems.forEach((theorem) => {
        const theoremLabels = theorem.getLabels();

        push(labels, theoremLabels);
      });

      this.conjectures.forEach((conjecture) => {
        const conjectureLabels = conjecture.getLabels();

        push(labels, conjectureLabels);
      });

      this.schemas.forEach((schema) => {
        const schemaLabel = schema.getLabel();

        labels.push(schemaLabel);
      });
    }

    return labels;
  }

  getTypes(includeRelease = true) {
    const types = includeRelease ?
                    this.context.getTypes() :
                      this.types;

    return types;
  }

  getRules(includeRelease = true) {
    const rules = includeRelease ?
                    this.context.getRules() :
                      this.rules;

    return rules;
  }

  getAxioms(includeRelease = true) {
    const axioms = includeRelease ?
                     this.context.getAxioms() :
                       this.axioms;

    return axioms;
  }

  getLemmas(includeRelease = true) {
    const lemmas = includeRelease ?
                     this.context.getLemmas() :
                       this.lemmas;

    return lemmas;
  }

  getSchemas(includeRelease = true) {
    const schemas = includeRelease ?
                      this.context.getSchemas() :
                        this.schemas;

    return schemas;
  }

  getTheorems(includeRelease = true) {
    const theorems = includeRelease ?
                       this.context.getTheorems() :
                         this.theorems;

    return theorems;
  }

  getGenerators(includeRelease = true) {
    const generators = includeRelease ?
                         this.context.getGenerators() :
                           this.generators;

    return generators;
  }

  getConjectures(includeRelease = true) {
    const conjectures = includeRelease ?
                          this.context.getConjectures() :
                            this.conjectures;

    return conjectures;
  }

  getCombinators(includeRelease = true) {
    const combinators = includeRelease ?
                          this.context.getCombinators() :
                            this.combinators;

    return combinators;
  }

  getTypePrefixes(includeRelease = true) {
    const typePrefixes = includeRelease ?
                           this.context.getTypePrefixes() :
                             this.typePrefixes;

    return typePrefixes;
  }

  getConstructors(includeRelease = true) {
    const constructors = includeRelease ?
                           this.context.getConstructors() :
                             this.constructors;

    return constructors;
  }

  getProcedures(includeRelease = true) {
    const procedures = includeRelease ?
                          this.context.getProcedures() :
                            null;  ///

    return procedures;
  }

  getTopLevelAssertions(includeRelease = true) {
    const lemmas = this.getLemmas(includeRelease),
          axioms = this.getAxioms(includeRelease),
          theorems = this.getTheorems(includeRelease),
          conjectures = this.getConjectures(includeRelease),
          topLevelAssertions = [
            ...lemmas,
            ...axioms,
            ...theorems,
            ...conjectures
          ];

    return topLevelAssertions;
  }

  getDeclaredVariables() {
    return this.declaredVariables;
  }

  getDeclaredMetavariables() {
    return this.declaredMetavariables;
  }

  getTerms(terms = []) {
    return terms;
  }

  getGoals(goals = []) {
    return goals;
  }

  getFrames(frames = []) {
    return frames;
  }

  getEqualities(equalities = []) {
    return equalities;
  }

  getJudgements(judgements = []) {
    return judgements;
  }

  getAssertions(assertions = []) {
    return assertions;
  }

  getStatements(statements = []) {
    return statements;
  }

  getSignatures(signatures = []) {
    return signatures;
  }

  getReferences(references = []) {
    return references;
  }

  getAssumptions(assumptions = []) {
    return assumptions;
  }

  getMetavariables(metavariables = []) {
    return metavariables;
  }

  getSubstitutions(substitutions = []) {
    return substitutions;
  }

  getDerivedSubstitutions(derivedSubstitutions = []) {
    return derivedSubstitutions;
  }

  getEquivalences() {
    const equivalences = [];

    return equivalences;
  }

  getSubproofOrProofAssertions() {
    const subproofOrProofAssertions = [];

    return subproofOrProofAssertions;
  }

  addType(type) {
    this.types.push(type);

    const filePath = this.getFilePath(),
          typeString = type.getString();

    this.trace(`Added the '${typeString}' type to the '${filePath}' file context.`)
  }

  addRule(rule) {
    this.rules.push(rule);

    const filePath = this.getFilePath(),
          ruleString = rule.getString();

    this.trace(`Added the '${ruleString}' rule to the '${filePath}' file context.`)
  }

  addAxiom(axiom) {
    this.axioms.push(axiom);

    const filePath = this.getFilePath(),
          axiomString = axiom.getString();

    this.trace(`Added the '${axiomString}' axiom to the '${filePath}' file context.`)
  }

  addLemma(lemma) {
    this.lemmas.push(lemma);

    const filePath = this.getFilePath(),
          lemmaString = lemma.getString();

    this.trace(`Added the '${lemmaString}' lemma to the '${filePath}' file context.`)
  }

  addSchema(schema) {
    this.schemas.push(schema);

    const filePath = this.getFilePath(),
          schemaString = schema.getString();

    this.trace(`Added the '${schemaString}' schema to the '${filePath}' file context.`)
  }

  addTheorem(theorem) {
    this.theorems.push(theorem);

    const filePath = this.getFilePath(),
          theoremString = theorem.getString();

    this.trace(`Added the '${theoremString}' theorem to the '${filePath}' file context.`)
  }

  addGenerator(generator) {
    this.generators.push(generator);

    const filePath = this.getFilePath(),
          generatorString = generator.getString();

    this.trace(`Added the '${generatorString}' generator to the '${filePath}' file context.`)
  }

  addConjecture(conjecture) {
    this.conjectures.push(conjecture);

    const filePath = this.getFilePath(),
          ocnjectureString = conjecture.getString();

    this.trace(`Added the '${ocnjectureString}' ocnjecture to the '${filePath}' file context.`)
  }

  addCombinator(combinator) {
    this.combinators.push(combinator);

    const filePath = this.getFilePath(),
          combinatorString = combinator.getString();

    this.trace(`Added the '${combinatorString}' combinator to the '${filePath}' file context.`)
  }

  addTypePrefix(typePrefix) {
    this.typePrefixes.push(typePrefix);

    const filePath = this.getFilePath(),
          typePrefixString = typePrefix.getString();

    this.trace(`Added the '${typePrefixString}' type-prefix to the '${filePath}' file context.`)
  }

  addConstructor(constructor) {
    this.constructors.push(constructor);

    const filePath = this.getFilePath(),
          constructorString = constructor.getString();

    this.trace(`Added the '${constructorString}' constructor to the '${filePath}' file context.`)
  }

  addDeclaredVariable(declaredVariable) {
    this.declaredVariables.push(declaredVariable);

    const filePath = this.getFilePath(),
          declaredVariableString = declaredVariable.getString();

    this.trace(`Added the '${declaredVariableString}' declared variable to the '${filePath}' file context.`)
  }

  addDeclaredMetavariable(declaredMetavariable) {
    this.declaredMetavariables.push(declaredMetavariable);

    const filePath = this.getFilePath(),
          declaredMetavariableString = declaredMetavariable.getString();

    this.trace(`Added the '${declaredMetavariableString}' declared metavariable to the '${filePath}' file context.`)
  }

  findMetavariable(metavariable, context) {
    const declaredMetavariables = this.getDeclaredMetavariables();

    metavariable = declaredMetavariables.find((declaredMetavariable) => {
      const metavariableUnifies = declaredMetavariable.unifyMetavariable(metavariable, context);

      if (metavariableUnifies) {
        return true;
      }
    }) || null;

    return metavariable;
  }

  findRuleByReference(reference) {
    const rules = this.getRules(),
          metavariableNode = reference.getMetavariableNode(),
          rule = rules.find((rule) => {
            const metavariableNodeMatches = rule.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return rule;
  }

  findAxiomByReference(reference) {
    const axioms = this.getAxioms(),
          metavariableNode = reference.getMetavariableNode(),
          axiom = axioms.find((axiom) => {
            const metavariableNodeMatches = axiom.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return axiom;
  }

  findLemmaByReference(reference) {
    const lemmas = this.getLemmas(),
          metavariableNode = reference.getMetavariableNode(),
          lemma = lemmas.find((lemma) => {
            const metavariableNodeMatches = lemma.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return lemma;
  }

  findTheoremByReference(reference) {
    const theorems = this.getTheorems(),
          metavariableNode = reference.getMetavariableNode(),
          theorem = theorems.find((theorem) => {
            const metavariableNodeMatches = theorem.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return theorem;
  }

  findConjectureByReference(reference) {
    const conjectures = this.getConjectures(),
          metavariableNode = reference.getMetavariableNode(),
          conjecture = conjectures.find((conjecture) => {
            const metavariableNodeMatches = conjecture.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return conjecture;
  }

  findTopLevelAssertionByReference(reference) {
    const topLEvelAssertions = this.getTopLevelAssertions(),
          metavariableNode = reference.getMetavariableNode(),
          topLevelAssertion = topLEvelAssertions.find((topLevelAssertion) => {
            const metavariableNodeMatches = topLevelAssertion.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return topLevelAssertion;
  }

  findTypeByTypeName(typeName, includeRelease = true) {
    const types = this.getTypes(includeRelease),
          type = findType(types, (type) => {
            const typeComparesToTypeName = type.compareTypeName(typeName);

            if (typeComparesToTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypeByNominalTypeName(nominalTypeName, includeRelease = true) {
    const types = this.getTypes(includeRelease),
          type = findType(types, (type) => {
            const typeComparesToNominalTypeName = type.compareNominalTypeName(nominalTypeName);

            if (typeComparesToNominalTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypeByPrefixedTypeName(prefixedTypeName, includeRelease = true) {
    const types = this.getTypes(includeRelease),
          type = findType(types, (type) => {
            const typeComparesToPrefixedTypeName = type.comparePrefixedTypeName(prefixedTypeName);

            if (typeComparesToPrefixedTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypePrefixByTypePrefixName(typePrefixName) {
    const typePrefixes = this.getTypePrefixes(),
          typePrefix = typePrefixes.find((typePrefix) => {
            const typePrefixComparesToTypePrefixName = typePrefix.compareTypePrefixName(typePrefixName);

            if (typePrefixComparesToTypePrefixName) {
              return true;
            }
          }) || null;

    return typePrefix;
  }

  findDeclaredVariableByVariableIdentifier(VariableIdentitifer) {
    const declaredVariables = this.getDeclaredVariables(),
          declaredVariable = declaredVariables.find((declaredVariable) => {
            const declaredVariableComparesToVariableIdentitifer = declaredVariable.compareVariableIdentifier(VariableIdentitifer);

            if (declaredVariableComparesToVariableIdentitifer) {
              return true;
            }
          }) || null;

    return declaredVariable;
  }

  findDeclaredMetavariableByMetavariableName(metavariableName) {
    const declaredMetavariables = this.getDeclaredMetavariables(),
          declaredMetavariable = declaredMetavariables.find((declaredMetavariable) => {
            const declaredMetavariableComparesToMetavariableName = declaredMetavariable.compareMetavariableName(metavariableName);

            if (declaredMetavariableComparesToMetavariableName) {
              return true;
            }
          }) || null;

    return declaredMetavariable;
  }

  findProcedureByProcedureName(procedureName) {
    const procedures = this.getProcedures(),
          procedure = procedures.find((procedure) => {
            const procedureComparesToProcedureName = procedure.compareProcedureName(procedureName);

            if (procedureComparesToProcedureName) {
              return true;
            }
          }) || null;

    return procedure;
  }

  findMetaTypeByMetaTypeName(metaTypeName) { return findMetaTypeByMetaTypeName(metaTypeName); }

  isLabelPresentByLabelNode(labelNode) {
    const labels = this.getLabels(),
          labelPresent = labels.some((label) => {
            const labelNodeMatches = label.matchLabelNode(labelNode);

            if (labelNodeMatches) {
              return true;
            }
          });

    return labelPresent;
  }

  isTypePresentByTypeName(typeName, includeRelease = true) {
    const type = this.findTypeByTypeName(typeName, includeRelease),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePresentByNominalTypeName(nominalTypeName, includeRelease = true) {
    const type = this.findTypeByNominalTypeName(nominalTypeName, includeRelease),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePresentByPrefixedTypeName(prefixedTypeName, includeRelease = true) {
    const type = this.findTypeByPrefixedTypeName(prefixedTypeName, includeRelease),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePrefixPresentByTypePrefixName(typePrefixName) {
    const typePrefix = this.findTypePrefixByTypePrefixName(typePrefixName),
          typePrefixPresent = (typePrefix !== null);

    return typePrefixPresent;
  }

  isDeclaredVariablePresentByVariableIdentifier(variableIdentifier) {
    const declaredVariable = this.findDeclaredVariableByVariableIdentifier(variableIdentifier),
          declaredVariablePresent = (declaredVariable !== null);

    return declaredVariablePresent;
  }

  isDeclaredMetavariablePresentByMetavariableName(metavariableName) {
    const declaredMetavariable = this.findDeclaredMetavariableByMetavariableName(metavariableName),
          declaredMetavariablePresent = (declaredMetavariable !== null);

    return declaredMetavariablePresent;
  }

  isProcedurePresentByProcedureName(procedureName) {
    const procedure = this.findProcedureByProcedureName(procedureName),
          procedurePresent = (procedure !== null);

    return procedurePresent;
  }

  isMetaLevel() {
    const metaLEvel = false;

    return metaLEvel;
  }

  clear() {
    this.types = [];
    this.rules = [];
    this.axioms = [];
    this.lemmas = [];
    this.schemas = [];
    this.theorems = [];
    this.generators = [];
    this.conjectures = [];
    this.combinators = [];
    this.typePrefixes = [];
    this.constructors = [];
    this.declaredVariables = [];
    this.declaredMetavariables = [];
  }

  complete() {
    ///
  }

  verifyFile(continuation) {
    const node = this.getNode(),
          context = this, ///
          fileNode = node;  ///

    return verifyFile(fileNode, context, continuation);
  }

  initialise() {
    const json = this.getJSON();

    if (json === null) {
      super.initialise();

      return;
    }

    const fileContext = this; ///

    this.types = [];

    typesFromJSON(json, this.types, fileContext);

    this.lemmas = [];

    this.declaredMetavariables = declaredMetavariablesFromJSON(json, fileContext);
    this.declaredVariables = declaredVariablesFromJSON(json, fileContext);
    this.typePrefixes = typePrefixesFromJSON(json, fileContext);
    this.generators = generatorsFromJSON(json, fileContext);
    this.combinators = combinatorsFromJSON(json, fileContext);
    this.constructors = constructorsFromJSON(json, fileContext);

    this.rules = rulesFromJSON(json, fileContext);
    this.axioms = axiomsFromJSON(json, fileContext);
    this.schemas = schemasFromJSON(json, fileContext);
    this.theorems = theoremsFromJSON(json, fileContext);
    this.conjectures = conjecturesFromJSON(json, fileContext);
  }

  toJSON() {
    const typesJSON = typesToTypesJSON(this.types),
          rulesJSON = rulesToRulesJSON(this.rules),
          axiomsJSON = axiomsToAxiomsJSON(this.axioms),
          schemasJSON = schemasToSchemasJSON(this.schemas),
          theoremsJSON = theoremsToTheoremsJSON(this.theorems),
          generatorsJSON = generatorsToGeneratorsJSON(this.generators),
          conjecturesJSON = conjecturesToConjecturesJSON(this.conjectures),
          combinatorsJSON = combinatorsToCombinatorsJSON(this.combinators),
          typePrefixesJSON = typePrefixesToTypePrefixesJSON(this.typePrefixes),
          constructorsJSON = constructorsToConstructorsJSON(this.constructors),
          declaredVariablesJSON = declaredVariablesToDeclaredVariablesJSON(this.declaredVariables),
          declaredMetavariablesJSON = declaredMetavariablesToDeclaredMetavariablesJSON(this.declaredMetavariables),
          fileContent = this.getFileContent(),
          filePath = this.getFilePath(),
          types = typesJSON,  ///
          rules = rulesJSON,  ///
          axioms = axiomsJSON,  ///
          schemas = schemasJSON,  ///
          theorems = theoremsJSON,  ///
          generators = generatorsJSON,  ///
          conjectures = conjecturesJSON,  ///
          combinators = combinatorsJSON,  ///
          typePrefixes = typePrefixesJSON,  ///
          constructors = constructorsJSON,  ///
          declaredVariables = declaredVariablesJSON,  ///
          declaredMetavariables = declaredMetavariablesJSON,  ///
          json = {
            fileContent,
            filePath,
            types,
            rules,
            axioms,
            schemas,
            theorems,
            generators,
            conjectures,
            combinators,
            typePrefixes,
            constructors,
            declaredVariables,
            declaredMetavariables
          };

    return json;
  }

  static fromFile(file, context) {
    const releaseContext = context, ///
          combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(),
          nominalLexer = nominalLexerFromCombinedCustomGrammar(NominalLexer, combinedCustomGrammar),
          nominalParser = nominalParserFromCombinedCustomGrammar(NominalParser, combinedCustomGrammar),
          lexer = nominalLexer, ///
          parser = nominalParser, ///
          types = [],
          rules = [],
          axioms = [],
          lemmas = [],
          schemas = [],
          theorems = [],
          generators = [],
          conjectures = [],
          combinators = [],
          typePrefixes = [],
          constructors = [],
          declaredVariables = [],
          declaredMetavariables = [],
          nominalFileContext = FileContext.fromFile(NominalFileContext, file, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, generators, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables, context);

    return nominalFileContext;
  }

  static fromJSON(json, context) {
    const releaseContext = context, ///
          combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(),
          nominalLexer = nominalLexerFromCombinedCustomGrammar(NominalLexer, combinedCustomGrammar),
          nominalParser = nominalParserFromCombinedCustomGrammar(NominalParser, combinedCustomGrammar),
          lexer = nominalLexer, ///
          parser = nominalParser, ///
          types = null,
          rules = null,
          axioms = null,
          lemmas = null,
          schemas = null,
          theorems = null,
          generators = null,
          conjectures = null,
          combinators = null,
          typePrefixes = null,
          constructors = null,
          declaredVariables = null,
          declaredMetavariables = null,
          nominalFileContext = FileContext.fromJSON(NominalFileContext, json, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, generators, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables, context);

    return nominalFileContext;
  }
}
