"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return NominalFileContext;
    }
});
const _occamlanguages = require("occam-languages");
const _necessary = require("necessary");
const _lexer = /*#__PURE__*/ _interop_require_default(require("../../nominal/lexer"));
const _parser = /*#__PURE__*/ _interop_require_default(require("../../nominal/parser"));
const _verify = require("../../process/verify");
const _type = require("../../utilities/type");
const _metaTypes = require("../../metaTypes");
const _json = require("../../utilities/json");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { push } = _necessary.arrayUtilities, { nominalLexerFromCombinedCustomGrammar, nominalParserFromCombinedCustomGrammar } = _occamlanguages.nominalUtilities;
class NominalFileContext extends _occamlanguages.FileContext {
    constructor(context, fileContent, filePath, tokens, node, json, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, generators, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables){
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
    getEquivalences() {
        const equivalences = [];
        return equivalences;
    }
    getSubproofOrProofAssertions() {
        const subproofOrProofAssertions = [];
        return subproofOrProofAssertions;
    }
    getLabels(includeRelease = true) {
        const labels = [];
        if (includeRelease) {
            const releaseContextLabels = this.context.getLabels();
            push(labels, releaseContextLabels);
        } else {
            this.rules.forEach((rule)=>{
                const ruleLabels = rule.getLabels();
                push(labels, ruleLabels);
            });
            this.axioms.forEach((axiom)=>{
                const axiomLabels = axiom.getLabels();
                push(labels, axiomLabels);
            });
            this.lemmas.forEach((lemma)=>{
                const lemmaLabels = lemma.getLabels();
                push(labels, lemmaLabels);
            });
            this.theorems.forEach((theorem)=>{
                const theoremLabels = theorem.getLabels();
                push(labels, theoremLabels);
            });
            this.conjectures.forEach((conjecture)=>{
                const conjectureLabels = conjecture.getLabels();
                push(labels, conjectureLabels);
            });
            this.schemas.forEach((schema)=>{
                const schemaLabel = schema.getLabel();
                labels.push(schemaLabel);
            });
        }
        return labels;
    }
    getTypes(includeRelease = true) {
        const types = includeRelease ? this.context.getTypes() : this.types;
        return types;
    }
    getRules(includeRelease = true) {
        const rules = includeRelease ? this.context.getRules() : this.rules;
        return rules;
    }
    getAxioms(includeRelease = true) {
        const axioms = includeRelease ? this.context.getAxioms() : this.axioms;
        return axioms;
    }
    getLemmas(includeRelease = true) {
        const lemmas = includeRelease ? this.context.getLemmas() : this.lemmas;
        return lemmas;
    }
    getSchemas(includeRelease = true) {
        const schemas = includeRelease ? this.context.getSchemas() : this.schemas;
        return schemas;
    }
    getTheorems(includeRelease = true) {
        const theorems = includeRelease ? this.context.getTheorems() : this.theorems;
        return theorems;
    }
    getGenerators(includeRelease = true) {
        const generators = includeRelease ? this.context.getGenerators() : this.generators;
        return generators;
    }
    getConjectures(includeRelease = true) {
        const conjectures = includeRelease ? this.context.getConjectures() : this.conjectures;
        return conjectures;
    }
    getCombinators(includeRelease = true) {
        const combinators = includeRelease ? this.context.getCombinators() : this.combinators;
        return combinators;
    }
    getTypePrefixes(includeRelease = true) {
        const typePrefixes = includeRelease ? this.context.getTypePrefixes() : this.typePrefixes;
        return typePrefixes;
    }
    getConstructors(includeRelease = true) {
        const constructors = includeRelease ? this.context.getConstructors() : this.constructors;
        return constructors;
    }
    getProcedures(includeRelease = true) {
        const procedures = includeRelease ? this.context.getProcedures() : null; ///
        return procedures;
    }
    getTopLevelAssertions(includeRelease = true) {
        const lemmas = this.getLemmas(includeRelease), axioms = this.getAxioms(includeRelease), theorems = this.getTheorems(includeRelease), conjectures = this.getConjectures(includeRelease), topLevelAssertions = [
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
    getProperties() {
        const properties = [], types = this.getTypes();
        types.forEach((type)=>{
            type.getProperties(properties);
        });
        return properties;
    }
    addType(type) {
        this.types.push(type);
        const filePath = this.getFilePath(), typeString = type.getString();
        this.trace(`Added the '${typeString}' type to the '${filePath}' file context.`);
    }
    addRule(rule) {
        this.rules.push(rule);
        const filePath = this.getFilePath(), ruleString = rule.getString();
        this.trace(`Added the '${ruleString}' rule to the '${filePath}' file context.`);
    }
    addAxiom(axiom) {
        this.axioms.push(axiom);
        const filePath = this.getFilePath(), axiomString = axiom.getString();
        this.trace(`Added the '${axiomString}' axiom to the '${filePath}' file context.`);
    }
    addLemma(lemma) {
        this.lemmas.push(lemma);
        const filePath = this.getFilePath(), lemmaString = lemma.getString();
        this.trace(`Added the '${lemmaString}' lemma to the '${filePath}' file context.`);
    }
    addSchema(schema) {
        this.schemas.push(schema);
        const filePath = this.getFilePath(), schemaString = schema.getString();
        this.trace(`Added the '${schemaString}' schema to the '${filePath}' file context.`);
    }
    addTheorem(theorem) {
        this.theorems.push(theorem);
        const filePath = this.getFilePath(), theoremString = theorem.getString();
        this.trace(`Added the '${theoremString}' theorem to the '${filePath}' file context.`);
    }
    addGenerator(generator) {
        this.generators.push(generator);
        const filePath = this.getFilePath(), generatorString = generator.getString();
        this.trace(`Added the '${generatorString}' generator to the '${filePath}' file context.`);
    }
    addConjecture(conjecture) {
        this.conjectures.push(conjecture);
        const filePath = this.getFilePath(), ocnjectureString = conjecture.getString();
        this.trace(`Added the '${ocnjectureString}' ocnjecture to the '${filePath}' file context.`);
    }
    addCombinator(combinator) {
        this.combinators.push(combinator);
        const filePath = this.getFilePath(), combinatorString = combinator.getString();
        this.trace(`Added the '${combinatorString}' combinator to the '${filePath}' file context.`);
    }
    addTypePrefix(typePrefix) {
        this.typePrefixes.push(typePrefix);
        const filePath = this.getFilePath(), typePrefixString = typePrefix.getString();
        this.trace(`Added the '${typePrefixString}' type-prefix to the '${filePath}' file context.`);
    }
    addConstructor(constructor) {
        this.constructors.push(constructor);
        const filePath = this.getFilePath(), constructorString = constructor.getString();
        this.trace(`Added the '${constructorString}' constructor to the '${filePath}' file context.`);
    }
    addDeclaredVariable(declaredVariable) {
        this.declaredVariables.push(declaredVariable);
        const filePath = this.getFilePath(), declaredVariableString = declaredVariable.getString();
        this.trace(`Added the '${declaredVariableString}' declared variable to the '${filePath}' file context.`);
    }
    addDeclaredMetavariable(declaredMetavariable) {
        this.declaredMetavariables.push(declaredMetavariable);
        const filePath = this.getFilePath(), declaredMetavariableString = declaredMetavariable.getString();
        this.trace(`Added the '${declaredMetavariableString}' declared metavariable to the '${filePath}' file context.`);
    }
    findMetavariable(metavariable, context) {
        const declaredMetavariables = this.getDeclaredMetavariables();
        metavariable = declaredMetavariables.find((declaredMetavariable)=>{
            const metavariableUnifies = declaredMetavariable.unifyMetavariable(metavariable, context);
            if (metavariableUnifies) {
                return true;
            }
        }) || null;
        return metavariable;
    }
    findRuleByReference(reference) {
        const rules = this.getRules(), metavariableNode = reference.getMetavariableNode(), rule = rules.find((rule)=>{
            const metavariableNodeMatches = rule.matchMetavariableNode(metavariableNode);
            if (metavariableNodeMatches) {
                return true;
            }
        }) || null;
        return rule;
    }
    findAxiomByReference(reference) {
        const axioms = this.getAxioms(), metavariableNode = reference.getMetavariableNode(), axiom = axioms.find((axiom)=>{
            const metavariableNodeMatches = axiom.matchMetavariableNode(metavariableNode);
            if (metavariableNodeMatches) {
                return true;
            }
        }) || null;
        return axiom;
    }
    findLemmaByReference(reference) {
        const lemmas = this.getLemmas(), metavariableNode = reference.getMetavariableNode(), lemma = lemmas.find((lemma)=>{
            const metavariableNodeMatches = lemma.matchMetavariableNode(metavariableNode);
            if (metavariableNodeMatches) {
                return true;
            }
        }) || null;
        return lemma;
    }
    findTheoremByReference(reference) {
        const theorems = this.getTheorems(), metavariableNode = reference.getMetavariableNode(), theorem = theorems.find((theorem)=>{
            const metavariableNodeMatches = theorem.matchMetavariableNode(metavariableNode);
            if (metavariableNodeMatches) {
                return true;
            }
        }) || null;
        return theorem;
    }
    findConjectureByReference(reference) {
        const conjectures = this.getConjectures(), metavariableNode = reference.getMetavariableNode(), conjecture = conjectures.find((conjecture)=>{
            const metavariableNodeMatches = conjecture.matchMetavariableNode(metavariableNode);
            if (metavariableNodeMatches) {
                return true;
            }
        }) || null;
        return conjecture;
    }
    findTopLevelAssertionByReference(reference) {
        const topLEvelAssertions = this.getTopLevelAssertions(), metavariableNode = reference.getMetavariableNode(), topLevelAssertion = topLEvelAssertions.find((topLevelAssertion)=>{
            const metavariableNodeMatches = topLevelAssertion.matchMetavariableNode(metavariableNode);
            if (metavariableNodeMatches) {
                return true;
            }
        }) || null;
        return topLevelAssertion;
    }
    findTypeByTypeName(typeName, includeRelease = true) {
        const types = this.getTypes(includeRelease), type = (0, _type.findType)(types, (type)=>{
            const typeComparesToTypeName = type.compareTypeName(typeName);
            if (typeComparesToTypeName) {
                return true;
            }
        });
        return type;
    }
    findTypeByNominalTypeName(nominalTypeName, includeRelease = true) {
        const types = this.getTypes(includeRelease), type = (0, _type.findType)(types, (type)=>{
            const typeComparesToNominalTypeName = type.compareNominalTypeName(nominalTypeName);
            if (typeComparesToNominalTypeName) {
                return true;
            }
        });
        return type;
    }
    findTypeByPrefixedTypeName(prefixedTypeName, includeRelease = true) {
        const types = this.getTypes(includeRelease), type = (0, _type.findType)(types, (type)=>{
            const typeComparesToPrefixedTypeName = type.comparePrefixedTypeName(prefixedTypeName);
            if (typeComparesToPrefixedTypeName) {
                return true;
            }
        });
        return type;
    }
    findTypePrefixByTypePrefixName(typePrefixName) {
        const typePrefixes = this.getTypePrefixes(), typePrefix = typePrefixes.find((typePrefix)=>{
            const typePrefixComparesToTypePrefixName = typePrefix.compareTypePrefixName(typePrefixName);
            if (typePrefixComparesToTypePrefixName) {
                return true;
            }
        }) || null;
        return typePrefix;
    }
    findDeclaredVariableByVariableIdentifier(VariableIdentitifer) {
        const declaredVariables = this.getDeclaredVariables(), declaredVariable = declaredVariables.find((declaredVariable)=>{
            const declaredVariableComparesToVariableIdentitifer = declaredVariable.compareVariableIdentifier(VariableIdentitifer);
            if (declaredVariableComparesToVariableIdentitifer) {
                return true;
            }
        }) || null;
        return declaredVariable;
    }
    findDeclaredMetavariableByMetavariableName(metavariableName) {
        const declaredMetavariables = this.getDeclaredMetavariables(), declaredMetavariable = declaredMetavariables.find((declaredMetavariable)=>{
            const declaredMetavariableComparesToMetavariableName = declaredMetavariable.compareMetavariableName(metavariableName);
            if (declaredMetavariableComparesToMetavariableName) {
                return true;
            }
        }) || null;
        return declaredMetavariable;
    }
    findMetavariableByMetavariableNode(metavariableNode) {
        const metavariable = null;
        return metavariable;
    }
    findSubstitutionBySubstitutionNode(substitutionNode) {
        const substitution = null;
        return substitution;
    }
    findConstraintByConstraintNode(constraintNode) {
        const constraint = null;
        return constraint;
    }
    findProcedureByProcedureName(procedureName) {
        const procedures = this.getProcedures(), procedure = procedures.find((procedure)=>{
            const procedureComparesToProcedureName = procedure.compareProcedureName(procedureName);
            if (procedureComparesToProcedureName) {
                return true;
            }
        }) || null;
        return procedure;
    }
    findMetaTypeByMetaTypeName(metaTypeName) {
        return (0, _metaTypes.findMetaTypeByMetaTypeName)(metaTypeName);
    }
    isLabelPresentByLabelNode(labelNode) {
        const labels = this.getLabels(), labelPresent = labels.some((label)=>{
            const labelNodeMatches = label.matchLabelNode(labelNode);
            if (labelNodeMatches) {
                return true;
            }
        });
        return labelPresent;
    }
    isTypePresentByTypeName(typeName, includeRelease = true) {
        const type = this.findTypeByTypeName(typeName, includeRelease), typePresent = type !== null;
        return typePresent;
    }
    isTypePresentByNominalTypeName(nominalTypeName, includeRelease = true) {
        const type = this.findTypeByNominalTypeName(nominalTypeName, includeRelease), typePresent = type !== null;
        return typePresent;
    }
    isTypePresentByPrefixedTypeName(prefixedTypeName, includeRelease = true) {
        const type = this.findTypeByPrefixedTypeName(prefixedTypeName, includeRelease), typePresent = type !== null;
        return typePresent;
    }
    isTypePrefixPresentByTypePrefixName(typePrefixName) {
        const typePrefix = this.findTypePrefixByTypePrefixName(typePrefixName), typePrefixPresent = typePrefix !== null;
        return typePrefixPresent;
    }
    isDeclaredVariablePresentByVariableIdentifier(variableIdentifier) {
        const declaredVariable = this.findDeclaredVariableByVariableIdentifier(variableIdentifier), declaredVariablePresent = declaredVariable !== null;
        return declaredVariablePresent;
    }
    isDeclaredMetavariablePresentByMetavariableName(metavariableName) {
        const declaredMetavariable = this.findDeclaredMetavariableByMetavariableName(metavariableName), declaredMetavariablePresent = declaredMetavariable !== null;
        return declaredMetavariablePresent;
    }
    isProcedurePresentByProcedureName(procedureName) {
        const procedure = this.findProcedureByProcedureName(procedureName), procedurePresent = procedure !== null;
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
    async verifyFile() {
        const node = this.getNode(), context = this, fileNode = node, fileVerifies = await (0, _verify.verifyFile)(fileNode, context);
        return fileVerifies;
    }
    initialise() {
        const json = this.getJSON();
        if (json === null) {
            super.initialise();
            return;
        }
        const fileContext = this; ///
        this.types = [];
        (0, _json.typesFromJSON)(json, this.types, fileContext);
        this.lemmas = [];
        this.declaredMetavariables = (0, _json.declaredMetavariablesFromJSON)(json, fileContext);
        this.declaredVariables = (0, _json.declaredVariablesFromJSON)(json, fileContext);
        this.typePrefixes = (0, _json.typePrefixesFromJSON)(json, fileContext);
        this.generators = (0, _json.generatorsFromJSON)(json, fileContext);
        this.combinators = (0, _json.combinatorsFromJSON)(json, fileContext);
        this.constructors = (0, _json.constructorsFromJSON)(json, fileContext);
        this.rules = (0, _json.rulesFromJSON)(json, fileContext);
        this.axioms = (0, _json.axiomsFromJSON)(json, fileContext);
        this.schemas = (0, _json.schemasFromJSON)(json, fileContext);
        this.theorems = (0, _json.theoremsFromJSON)(json, fileContext);
        this.conjectures = (0, _json.conjecturesFromJSON)(json, fileContext);
    }
    toJSON() {
        const typesJSON = (0, _json.typesToTypesJSON)(this.types), rulesJSON = (0, _json.rulesToRulesJSON)(this.rules), axiomsJSON = (0, _json.axiomsToAxiomsJSON)(this.axioms), schemasJSON = (0, _json.schemasToSchemasJSON)(this.schemas), theoremsJSON = (0, _json.theoremsToTheoremsJSON)(this.theorems), generatorsJSON = (0, _json.generatorsToGeneratorsJSON)(this.generators), conjecturesJSON = (0, _json.conjecturesToConjecturesJSON)(this.conjectures), combinatorsJSON = (0, _json.combinatorsToCombinatorsJSON)(this.combinators), typePrefixesJSON = (0, _json.typePrefixesToTypePrefixesJSON)(this.typePrefixes), constructorsJSON = (0, _json.constructorsToConstructorsJSON)(this.constructors), declaredVariablesJSON = (0, _json.declaredVariablesToDeclaredVariablesJSON)(this.declaredVariables), declaredMetavariablesJSON = (0, _json.declaredMetavariablesToDeclaredMetavariablesJSON)(this.declaredMetavariables), fileContent = this.fileContent, filePath = this.filePath, types = typesJSON, rules = rulesJSON, axioms = axiomsJSON, schemas = schemasJSON, theorems = theoremsJSON, generators = generatorsJSON, conjectures = conjecturesJSON, combinators = combinatorsJSON, typePrefixes = typePrefixesJSON, constructors = constructorsJSON, declaredVariables = declaredVariablesJSON, declaredMetavariables = declaredMetavariablesJSON, json = {
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
        const releaseContext = context, combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(), nominalLexer = nominalLexerFromCombinedCustomGrammar(_lexer.default, combinedCustomGrammar), nominalParser = nominalParserFromCombinedCustomGrammar(_parser.default, combinedCustomGrammar), lexer = nominalLexer, parser = nominalParser, types = [], rules = [], axioms = [], lemmas = [], schemas = [], theorems = [], generators = [], conjectures = [], combinators = [], typePrefixes = [], constructors = [], declaredVariables = [], declaredMetavariables = [], nominalFileContext = _occamlanguages.FileContext.fromFile(NominalFileContext, file, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, generators, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables, context);
        return nominalFileContext;
    }
    static fromJSON(json, context) {
        const releaseContext = context, combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(), nominalLexer = nominalLexerFromCombinedCustomGrammar(_lexer.default, combinedCustomGrammar), nominalParser = nominalParserFromCombinedCustomGrammar(_parser.default, combinedCustomGrammar), lexer = nominalLexer, parser = nominalParser, types = null, rules = null, axioms = null, lemmas = null, schemas = null, theorems = null, generators = null, conjectures = null, combinators = null, typePrefixes = null, constructors = null, declaredVariables = null, declaredMetavariables = null, nominalFileContext = _occamlanguages.FileContext.fromJSON(NominalFileContext, json, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, generators, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables, context);
        return nominalFileContext;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L2ZpbGUvbm9taW5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRmlsZUNvbnRleHQsIG5vbWluYWxVdGlsaXRpZXMgfSBmcm9tIFwib2NjYW0tbGFuZ3VhZ2VzXCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IE5vbWluYWxMZXhlciBmcm9tIFwiLi4vLi4vbm9taW5hbC9sZXhlclwiO1xuaW1wb3J0IE5vbWluYWxQYXJzZXIgZnJvbSBcIi4uLy4uL25vbWluYWwvcGFyc2VyXCI7XG5cbmltcG9ydCB7IHZlcmlmeUZpbGUgfSBmcm9tIFwiLi4vLi4vcHJvY2Vzcy92ZXJpZnlcIjtcbmltcG9ydCB7YmFzZVR5cGVGcm9tTm90aGluZywgZmluZFR5cGV9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdHlwZVwiO1xuaW1wb3J0IHsgZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUgfSBmcm9tIFwiLi4vLi4vbWV0YVR5cGVzXCI7XG5pbXBvcnQgeyB0eXBlc0Zyb21KU09OLFxuICAgICAgICAgcnVsZXNGcm9tSlNPTixcbiAgICAgICAgIGF4aW9tc0Zyb21KU09OLFxuICAgICAgICAgc2NoZW1hc0Zyb21KU09OLFxuICAgICAgICAgdHlwZXNUb1R5cGVzSlNPTixcbiAgICAgICAgIHRoZW9yZW1zRnJvbUpTT04sXG4gICAgICAgICBydWxlc1RvUnVsZXNKU09OLFxuICAgICAgICAgYXhpb21zVG9BeGlvbXNKU09OLFxuICAgICAgICAgZ2VuZXJhdG9yc0Zyb21KU09OLFxuICAgICAgICAgY29uamVjdHVyZXNGcm9tSlNPTixcbiAgICAgICAgIGNvbWJpbmF0b3JzRnJvbUpTT04sXG4gICAgICAgICB0eXBlUHJlZml4ZXNGcm9tSlNPTixcbiAgICAgICAgIGNvbnN0cnVjdG9yc0Zyb21KU09OLFxuICAgICAgICAgc2NoZW1hc1RvU2NoZW1hc0pTT04sXG4gICAgICAgICB0aGVvcmVtc1RvVGhlb3JlbXNKU09OLFxuICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXNGcm9tSlNPTixcbiAgICAgICAgIGdlbmVyYXRvcnNUb0dlbmVyYXRvcnNKU09OLFxuICAgICAgICAgY29uamVjdHVyZXNUb0NvbmplY3R1cmVzSlNPTixcbiAgICAgICAgIGNvbWJpbmF0b3JzVG9Db21iaW5hdG9yc0pTT04sXG4gICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXNGcm9tSlNPTixcbiAgICAgICAgIHR5cGVQcmVmaXhlc1RvVHlwZVByZWZpeGVzSlNPTixcbiAgICAgICAgIGNvbnN0cnVjdG9yc1RvQ29uc3RydWN0b3JzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzVG9EZWNsYXJlZFZhcmlhYmxlc0pTT04sXG4gICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04gfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2pzb25cIjtcblxuY29uc3QgeyBwdXNoIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciwgbm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIgfSA9IG5vbWluYWxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vbWluYWxGaWxlQ29udGV4dCBleHRlbmRzIEZpbGVDb250ZXh0IHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwgZmlsZUNvbnRlbnQsIGZpbGVQYXRoLCB0b2tlbnMsIG5vZGUsIGpzb24sIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHNjaGVtYXMsIHRoZW9yZW1zLCBnZW5lcmF0b3JzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBkZWNsYXJlZFZhcmlhYmxlcywgZGVjbGFyZWRNZXRhdmFyaWFibGVzKSB7XG4gICAgc3VwZXIoY29udGV4dCwgZmlsZUNvbnRlbnQsIGZpbGVQYXRoLCB0b2tlbnMsIG5vZGUsIGpzb24pO1xuXG4gICAgdGhpcy5sZXhlciA9IGxleGVyO1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5maWxlUGF0aCA9IGZpbGVQYXRoO1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zO1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy50eXBlcyA9IHR5cGVzO1xuICAgIHRoaXMucnVsZXMgPSBydWxlcztcbiAgICB0aGlzLmF4aW9tcyA9IGF4aW9tcztcbiAgICB0aGlzLmxlbW1hcyA9IGxlbW1hcztcbiAgICB0aGlzLnNjaGVtYXMgPSBzY2hlbWFzO1xuICAgIHRoaXMudGhlb3JlbXMgPSB0aGVvcmVtcztcbiAgICB0aGlzLmdlbmVyYXRvcnMgPSBnZW5lcmF0b3JzO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlcztcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnM7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnM7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0TGV4ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV4ZXI7XG4gIH1cblxuICBnZXRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VyO1xuICB9XG5cbiAgZ2V0RXF1aXZhbGVuY2VzKCkge1xuICAgIGNvbnN0IGVxdWl2YWxlbmNlcyA9IFtdO1xuXG4gICAgcmV0dXJuIGVxdWl2YWxlbmNlcztcbiAgfVxuXG4gIGdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMoKSB7XG4gICAgY29uc3Qgc3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyA9IFtdO1xuXG4gICAgcmV0dXJuIHN1YnByb29mT3JQcm9vZkFzc2VydGlvbnM7XG4gIH1cblxuICBnZXRMYWJlbHMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gW107XG5cbiAgICBpZiAoaW5jbHVkZVJlbGVhc2UpIHtcbiAgICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0TGFiZWxzID0gdGhpcy5jb250ZXh0LmdldExhYmVscygpO1xuXG4gICAgICBwdXNoKGxhYmVscywgcmVsZWFzZUNvbnRleHRMYWJlbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgY29uc3QgcnVsZUxhYmVscyA9IHJ1bGUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIHJ1bGVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYXhpb21zLmZvckVhY2goKGF4aW9tKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aW9tTGFiZWxzID0gYXhpb20uZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGF4aW9tTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxlbW1hcy5mb3JFYWNoKChsZW1tYSkgPT4ge1xuICAgICAgICBjb25zdCBsZW1tYUxhYmVscyA9IGxlbW1hLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCBsZW1tYUxhYmVscyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50aGVvcmVtcy5mb3JFYWNoKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHRoZW9yZW1MYWJlbHMgPSB0aGVvcmVtLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCB0aGVvcmVtTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbmplY3R1cmVzLmZvckVhY2goKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgY29uc3QgY29uamVjdHVyZUxhYmVscyA9IGNvbmplY3R1cmUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGNvbmplY3R1cmVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2NoZW1hcy5mb3JFYWNoKChzY2hlbWEpID0+IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hTGFiZWwgPSBzY2hlbWEuZ2V0TGFiZWwoKTtcblxuICAgICAgICBsYWJlbHMucHVzaChzY2hlbWFMYWJlbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWxzO1xuICB9XG5cbiAgZ2V0VHlwZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUeXBlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVzO1xuXG4gICAgcmV0dXJuIHR5cGVzO1xuICB9XG5cbiAgZ2V0UnVsZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgcnVsZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRSdWxlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bGVzO1xuXG4gICAgcmV0dXJuIHJ1bGVzO1xuICB9XG5cbiAgZ2V0QXhpb21zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGF4aW9tcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRBeGlvbXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpb21zO1xuXG4gICAgcmV0dXJuIGF4aW9tcztcbiAgfVxuXG4gIGdldExlbW1hcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBsZW1tYXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0TGVtbWFzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxlbW1hcztcblxuICAgIHJldHVybiBsZW1tYXM7XG4gIH1cblxuICBnZXRTY2hlbWFzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNjaGVtYXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldFNjaGVtYXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVtYXM7XG5cbiAgICByZXR1cm4gc2NoZW1hcztcbiAgfVxuXG4gIGdldFRoZW9yZW1zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHRoZW9yZW1zID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0VGhlb3JlbXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVvcmVtcztcblxuICAgIHJldHVybiB0aGVvcmVtcztcbiAgfVxuXG4gIGdldEdlbmVyYXRvcnMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgZ2VuZXJhdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0R2VuZXJhdG9ycygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdG9ycztcblxuICAgIHJldHVybiBnZW5lcmF0b3JzO1xuICB9XG5cbiAgZ2V0Q29uamVjdHVyZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgY29uamVjdHVyZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRDb25qZWN0dXJlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmplY3R1cmVzO1xuXG4gICAgcmV0dXJuIGNvbmplY3R1cmVzO1xuICB9XG5cbiAgZ2V0Q29tYmluYXRvcnMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgY29tYmluYXRvcnMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRDb21iaW5hdG9ycygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmF0b3JzO1xuXG4gICAgcmV0dXJuIGNvbWJpbmF0b3JzO1xuICB9XG5cbiAgZ2V0VHlwZVByZWZpeGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHR5cGVQcmVmaXhlcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUeXBlUHJlZml4ZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZVByZWZpeGVzO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVmaXhlcztcbiAgfVxuXG4gIGdldENvbnN0cnVjdG9ycyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb25zdHJ1Y3RvcnMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0Q29uc3RydWN0b3JzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9ycztcblxuICAgIHJldHVybiBjb25zdHJ1Y3RvcnM7XG4gIH1cblxuICBnZXRQcm9jZWR1cmVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRQcm9jZWR1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwcm9jZWR1cmVzO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxBc3NlcnRpb25zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGxlbW1hcyA9IHRoaXMuZ2V0TGVtbWFzKGluY2x1ZGVSZWxlYXNlKSxcbiAgICAgICAgICBheGlvbXMgPSB0aGlzLmdldEF4aW9tcyhpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgdGhlb3JlbXMgPSB0aGlzLmdldFRoZW9yZW1zKGluY2x1ZGVSZWxlYXNlKSxcbiAgICAgICAgICBjb25qZWN0dXJlcyA9IHRoaXMuZ2V0Q29uamVjdHVyZXMoaW5jbHVkZVJlbGVhc2UpLFxuICAgICAgICAgIHRvcExldmVsQXNzZXJ0aW9ucyA9IFtcbiAgICAgICAgICAgIC4uLmxlbW1hcyxcbiAgICAgICAgICAgIC4uLmF4aW9tcyxcbiAgICAgICAgICAgIC4uLnRoZW9yZW1zLFxuICAgICAgICAgICAgLi4uY29uamVjdHVyZXNcbiAgICAgICAgICBdO1xuXG4gICAgcmV0dXJuIHRvcExldmVsQXNzZXJ0aW9ucztcbiAgfVxuXG4gIGdldERlY2xhcmVkVmFyaWFibGVzKCkge1xuICAgIHJldHVybiB0aGlzLmRlY2xhcmVkVmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzKCkge1xuICAgIHJldHVybiB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcztcbiAgfVxuXG4gIGdldFRlcm1zKHRlcm1zID0gW10pIHtcbiAgICByZXR1cm4gdGVybXM7XG4gIH1cblxuICBnZXRHb2Fscyhnb2FscyA9IFtdKSB7XG4gICAgcmV0dXJuIGdvYWxzO1xuICB9XG5cbiAgZ2V0RnJhbWVzKGZyYW1lcyA9IFtdKSB7XG4gICAgcmV0dXJuIGZyYW1lcztcbiAgfVxuXG4gIGdldEVxdWFsaXRpZXMoZXF1YWxpdGllcyA9IFtdKSB7XG4gICAgcmV0dXJuIGVxdWFsaXRpZXM7XG4gIH1cblxuICBnZXRKdWRnZW1lbnRzKGp1ZGdlbWVudHMgPSBbXSkge1xuICAgIHJldHVybiBqdWRnZW1lbnRzO1xuICB9XG5cbiAgZ2V0QXNzZXJ0aW9ucyhhc3NlcnRpb25zID0gW10pIHtcbiAgICByZXR1cm4gYXNzZXJ0aW9ucztcbiAgfVxuXG4gIGdldFN0YXRlbWVudHMoc3RhdGVtZW50cyA9IFtdKSB7XG4gICAgcmV0dXJuIHN0YXRlbWVudHM7XG4gIH1cblxuICBnZXRTaWduYXR1cmVzKHNpZ25hdHVyZXMgPSBbXSkge1xuICAgIHJldHVybiBzaWduYXR1cmVzO1xuICB9XG5cbiAgZ2V0UmVmZXJlbmNlcyhyZWZlcmVuY2VzID0gW10pIHtcbiAgICByZXR1cm4gcmVmZXJlbmNlcztcbiAgfVxuXG4gIGdldEFzc3VtcHRpb25zKGFzc3VtcHRpb25zID0gW10pIHtcbiAgICByZXR1cm4gYXNzdW1wdGlvbnM7XG4gIH1cblxuICBnZXRNZXRhdmFyaWFibGVzKG1ldGF2YXJpYWJsZXMgPSBbXSkge1xuICAgIHJldHVybiBtZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0U3Vic3RpdHV0aW9ucyhzdWJzdGl0dXRpb25zID0gW10pIHtcbiAgICByZXR1cm4gc3Vic3RpdHV0aW9ucztcbiAgfVxuXG4gIGdldERlcml2ZWRTdWJzdGl0dXRpb25zKGRlcml2ZWRTdWJzdGl0dXRpb25zID0gW10pIHtcbiAgICByZXR1cm4gZGVyaXZlZFN1YnN0aXR1dGlvbnM7XG4gIH1cblxuICBnZXRQcm9wZXJ0aWVzKCkge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBbXSxcbiAgICAgICAgICB0eXBlcyA9IHRoaXMuZ2V0VHlwZXMoKTtcblxuICAgIHR5cGVzLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHR5cGUuZ2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9XG5cbiAgYWRkVHlwZSh0eXBlKSB7XG4gICAgdGhpcy50eXBlcy5wdXNoKHR5cGUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgdHlwZVN0cmluZyA9IHR5cGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7dHlwZVN0cmluZ30nIHR5cGUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRSdWxlKHJ1bGUpIHtcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBydWxlU3RyaW5nID0gcnVsZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtydWxlU3RyaW5nfScgcnVsZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZEF4aW9tKGF4aW9tKSB7XG4gICAgdGhpcy5heGlvbXMucHVzaChheGlvbSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBheGlvbVN0cmluZyA9IGF4aW9tLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2F4aW9tU3RyaW5nfScgYXhpb20gdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRMZW1tYShsZW1tYSkge1xuICAgIHRoaXMubGVtbWFzLnB1c2gobGVtbWEpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgbGVtbWFTdHJpbmcgPSBsZW1tYS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtsZW1tYVN0cmluZ30nIGxlbW1hIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkU2NoZW1hKHNjaGVtYSkge1xuICAgIHRoaXMuc2NoZW1hcy5wdXNoKHNjaGVtYSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBzY2hlbWFTdHJpbmcgPSBzY2hlbWEuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7c2NoZW1hU3RyaW5nfScgc2NoZW1hIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkVGhlb3JlbSh0aGVvcmVtKSB7XG4gICAgdGhpcy50aGVvcmVtcy5wdXNoKHRoZW9yZW0pO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgdGhlb3JlbVN0cmluZyA9IHRoZW9yZW0uZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7dGhlb3JlbVN0cmluZ30nIHRoZW9yZW0gdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRHZW5lcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgdGhpcy5nZW5lcmF0b3JzLnB1c2goZ2VuZXJhdG9yKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGdlbmVyYXRvclN0cmluZyA9IGdlbmVyYXRvci5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtnZW5lcmF0b3JTdHJpbmd9JyBnZW5lcmF0b3IgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRDb25qZWN0dXJlKGNvbmplY3R1cmUpIHtcbiAgICB0aGlzLmNvbmplY3R1cmVzLnB1c2goY29uamVjdHVyZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBvY25qZWN0dXJlU3RyaW5nID0gY29uamVjdHVyZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtvY25qZWN0dXJlU3RyaW5nfScgb2NuamVjdHVyZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZENvbWJpbmF0b3IoY29tYmluYXRvcikge1xuICAgIHRoaXMuY29tYmluYXRvcnMucHVzaChjb21iaW5hdG9yKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGNvbWJpbmF0b3JTdHJpbmcgPSBjb21iaW5hdG9yLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2NvbWJpbmF0b3JTdHJpbmd9JyBjb21iaW5hdG9yIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkVHlwZVByZWZpeCh0eXBlUHJlZml4KSB7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMucHVzaCh0eXBlUHJlZml4KTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHR5cGVQcmVmaXhTdHJpbmcgPSB0eXBlUHJlZml4LmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3R5cGVQcmVmaXhTdHJpbmd9JyB0eXBlLXByZWZpeCB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZENvbnN0cnVjdG9yKGNvbnN0cnVjdG9yKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMucHVzaChjb25zdHJ1Y3Rvcik7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBjb25zdHJ1Y3RvclN0cmluZyA9IGNvbnN0cnVjdG9yLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2NvbnN0cnVjdG9yU3RyaW5nfScgY29uc3RydWN0b3IgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGREZWNsYXJlZFZhcmlhYmxlKGRlY2xhcmVkVmFyaWFibGUpIHtcbiAgICB0aGlzLmRlY2xhcmVkVmFyaWFibGVzLnB1c2goZGVjbGFyZWRWYXJpYWJsZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlU3RyaW5nID0gZGVjbGFyZWRWYXJpYWJsZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtkZWNsYXJlZFZhcmlhYmxlU3RyaW5nfScgZGVjbGFyZWQgdmFyaWFibGUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGREZWNsYXJlZE1ldGF2YXJpYWJsZShkZWNsYXJlZE1ldGF2YXJpYWJsZSkge1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzLnB1c2goZGVjbGFyZWRNZXRhdmFyaWFibGUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVTdHJpbmcgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtkZWNsYXJlZE1ldGF2YXJpYWJsZVN0cmluZ30nIGRlY2xhcmVkIG1ldGF2YXJpYWJsZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGZpbmRNZXRhdmFyaWFibGUobWV0YXZhcmlhYmxlLCBjb250ZXh0KSB7XG4gICAgY29uc3QgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gdGhpcy5nZXREZWNsYXJlZE1ldGF2YXJpYWJsZXMoKTtcblxuICAgIG1ldGF2YXJpYWJsZSA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlcy5maW5kKChkZWNsYXJlZE1ldGF2YXJpYWJsZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YXZhcmlhYmxlVW5pZmllcyA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlLnVuaWZ5TWV0YXZhcmlhYmxlKG1ldGF2YXJpYWJsZSwgY29udGV4dCk7XG5cbiAgICAgIGlmIChtZXRhdmFyaWFibGVVbmlmaWVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gbWV0YXZhcmlhYmxlO1xuICB9XG5cbiAgZmluZFJ1bGVCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBydWxlcyA9IHRoaXMuZ2V0UnVsZXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBydWxlID0gcnVsZXMuZmluZCgocnVsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBydWxlLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gcnVsZTtcbiAgfVxuXG4gIGZpbmRBeGlvbUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGF4aW9tcyA9IHRoaXMuZ2V0QXhpb21zKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgYXhpb20gPSBheGlvbXMuZmluZCgoYXhpb20pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gYXhpb20ubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBheGlvbTtcbiAgfVxuXG4gIGZpbmRMZW1tYUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGxlbW1hcyA9IHRoaXMuZ2V0TGVtbWFzKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgbGVtbWEgPSBsZW1tYXMuZmluZCgobGVtbWEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gbGVtbWEubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBsZW1tYTtcbiAgfVxuXG4gIGZpbmRUaGVvcmVtQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgdGhlb3JlbXMgPSB0aGlzLmdldFRoZW9yZW1zKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgdGhlb3JlbSA9IHRoZW9yZW1zLmZpbmQoKHRoZW9yZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gdGhlb3JlbS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHRoZW9yZW07XG4gIH1cblxuICBmaW5kQ29uamVjdHVyZUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGNvbmplY3R1cmVzID0gdGhpcy5nZXRDb25qZWN0dXJlcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIGNvbmplY3R1cmUgPSBjb25qZWN0dXJlcy5maW5kKChjb25qZWN0dXJlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IGNvbmplY3R1cmUubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBjb25qZWN0dXJlO1xuICB9XG5cbiAgZmluZFRvcExldmVsQXNzZXJ0aW9uQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgdG9wTEV2ZWxBc3NlcnRpb25zID0gdGhpcy5nZXRUb3BMZXZlbEFzc2VydGlvbnMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICB0b3BMZXZlbEFzc2VydGlvbiA9IHRvcExFdmVsQXNzZXJ0aW9ucy5maW5kKCh0b3BMZXZlbEFzc2VydGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSB0b3BMZXZlbEFzc2VydGlvbi5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHRvcExldmVsQXNzZXJ0aW9uO1xuICB9XG5cbiAgZmluZFR5cGVCeVR5cGVOYW1lKHR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCB0eXBlcyA9IHRoaXMuZ2V0VHlwZXMoaW5jbHVkZVJlbGVhc2UpLFxuICAgICAgICAgIHR5cGUgPSBmaW5kVHlwZSh0eXBlcywgKHR5cGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvVHlwZU5hbWUgPSB0eXBlLmNvbXBhcmVUeXBlTmFtZSh0eXBlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlQ29tcGFyZXNUb1R5cGVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBmaW5kVHlwZUJ5Tm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZXMgPSB0aGlzLmdldFR5cGVzKGluY2x1ZGVSZWxlYXNlKSxcbiAgICAgICAgICB0eXBlID0gZmluZFR5cGUodHlwZXMsICh0eXBlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0eXBlQ29tcGFyZXNUb05vbWluYWxUeXBlTmFtZSA9IHR5cGUuY29tcGFyZU5vbWluYWxUeXBlTmFtZShub21pbmFsVHlwZU5hbWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZUNvbXBhcmVzVG9Ob21pbmFsVHlwZU5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGZpbmRUeXBlQnlQcmVmaXhlZFR5cGVOYW1lKHByZWZpeGVkVHlwZU5hbWUsIGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHR5cGVzID0gdGhpcy5nZXRUeXBlcyhpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgdHlwZSA9IGZpbmRUeXBlKHR5cGVzLCAodHlwZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHlwZUNvbXBhcmVzVG9QcmVmaXhlZFR5cGVOYW1lID0gdHlwZS5jb21wYXJlUHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgZmluZFR5cGVQcmVmaXhCeVR5cGVQcmVmaXhOYW1lKHR5cGVQcmVmaXhOYW1lKSB7XG4gICAgY29uc3QgdHlwZVByZWZpeGVzID0gdGhpcy5nZXRUeXBlUHJlZml4ZXMoKSxcbiAgICAgICAgICB0eXBlUHJlZml4ID0gdHlwZVByZWZpeGVzLmZpbmQoKHR5cGVQcmVmaXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVQcmVmaXhDb21wYXJlc1RvVHlwZVByZWZpeE5hbWUgPSB0eXBlUHJlZml4LmNvbXBhcmVUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlUHJlZml4Q29tcGFyZXNUb1R5cGVQcmVmaXhOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeDtcbiAgfVxuXG4gIGZpbmREZWNsYXJlZFZhcmlhYmxlQnlWYXJpYWJsZUlkZW50aWZpZXIoVmFyaWFibGVJZGVudGl0aWZlcikge1xuICAgIGNvbnN0IGRlY2xhcmVkVmFyaWFibGVzID0gdGhpcy5nZXREZWNsYXJlZFZhcmlhYmxlcygpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGUgPSBkZWNsYXJlZFZhcmlhYmxlcy5maW5kKChkZWNsYXJlZFZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIgPSBkZWNsYXJlZFZhcmlhYmxlLmNvbXBhcmVWYXJpYWJsZUlkZW50aWZpZXIoVmFyaWFibGVJZGVudGl0aWZlcik7XG5cbiAgICAgICAgICAgIGlmIChkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBkZWNsYXJlZFZhcmlhYmxlO1xuICB9XG5cbiAgZmluZERlY2xhcmVkTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpIHtcbiAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSB0aGlzLmdldERlY2xhcmVkTWV0YXZhcmlhYmxlcygpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzLmZpbmQoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lID0gZGVjbGFyZWRNZXRhdmFyaWFibGUuY29tcGFyZU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gZGVjbGFyZWRNZXRhdmFyaWFibGU7XG4gIH1cblxuICBmaW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpIHtcbiAgICBjb25zdCBtZXRhdmFyaWFibGUgPSBudWxsO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRTdWJzdGl0dXRpb25CeVN1YnN0aXR1dGlvbk5vZGUoc3Vic3RpdHV0aW9uTm9kZSkge1xuICAgIGNvbnN0IHN1YnN0aXR1dGlvbiA9IG51bGw7XG5cbiAgICByZXR1cm4gc3Vic3RpdHV0aW9uO1xuICB9XG5cbiAgZmluZENvbnN0cmFpbnRCeUNvbnN0cmFpbnROb2RlKGNvbnN0cmFpbnROb2RlKSB7XG4gICAgY29uc3QgY29uc3RyYWludCA9IG51bGw7XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIGZpbmRQcm9jZWR1cmVCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSB0aGlzLmdldFByb2NlZHVyZXMoKSxcbiAgICAgICAgICBwcm9jZWR1cmUgPSBwcm9jZWR1cmVzLmZpbmQoKHByb2NlZHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvY2VkdXJlQ29tcGFyZXNUb1Byb2NlZHVyZU5hbWUgPSBwcm9jZWR1cmUuY29tcGFyZVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZWR1cmVDb21wYXJlc1RvUHJvY2VkdXJlTmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHByb2NlZHVyZTtcbiAgfVxuXG4gIGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lKG1ldGFUeXBlTmFtZSkgeyByZXR1cm4gZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUobWV0YVR5cGVOYW1lKTsgfVxuXG4gIGlzTGFiZWxQcmVzZW50QnlMYWJlbE5vZGUobGFiZWxOb2RlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gdGhpcy5nZXRMYWJlbHMoKSxcbiAgICAgICAgICBsYWJlbFByZXNlbnQgPSBsYWJlbHMuc29tZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsTm9kZU1hdGNoZXMgPSBsYWJlbC5tYXRjaExhYmVsTm9kZShsYWJlbE5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobGFiZWxOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBsYWJlbFByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVzZW50QnlUeXBlTmFtZSh0eXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZmluZFR5cGVCeVR5cGVOYW1lKHR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgdHlwZVByZXNlbnQgPSAodHlwZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVzZW50QnlOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5maW5kVHlwZUJ5Tm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UpLFxuICAgICAgICAgIHR5cGVQcmVzZW50ID0gKHR5cGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlc2VudEJ5UHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5maW5kVHlwZUJ5UHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgdHlwZVByZXNlbnQgPSAodHlwZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVmaXhQcmVzZW50QnlUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSkge1xuICAgIGNvbnN0IHR5cGVQcmVmaXggPSB0aGlzLmZpbmRUeXBlUHJlZml4QnlUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSksXG4gICAgICAgICAgdHlwZVByZWZpeFByZXNlbnQgPSAodHlwZVByZWZpeCAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeFByZXNlbnQ7XG4gIH1cblxuICBpc0RlY2xhcmVkVmFyaWFibGVQcmVzZW50QnlWYXJpYWJsZUlkZW50aWZpZXIodmFyaWFibGVJZGVudGlmaWVyKSB7XG4gICAgY29uc3QgZGVjbGFyZWRWYXJpYWJsZSA9IHRoaXMuZmluZERlY2xhcmVkVmFyaWFibGVCeVZhcmlhYmxlSWRlbnRpZmllcih2YXJpYWJsZUlkZW50aWZpZXIpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVQcmVzZW50ID0gKGRlY2xhcmVkVmFyaWFibGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkVmFyaWFibGVQcmVzZW50O1xuICB9XG5cbiAgaXNEZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnRCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlID0gdGhpcy5maW5kRGVjbGFyZWRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50ID0gKGRlY2xhcmVkTWV0YXZhcmlhYmxlICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnQ7XG4gIH1cblxuICBpc1Byb2NlZHVyZVByZXNlbnRCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZSA9IHRoaXMuZmluZFByb2NlZHVyZUJ5UHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKSxcbiAgICAgICAgICBwcm9jZWR1cmVQcmVzZW50ID0gKHByb2NlZHVyZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gcHJvY2VkdXJlUHJlc2VudDtcbiAgfVxuXG4gIGlzTWV0YUxldmVsKCkge1xuICAgIGNvbnN0IG1ldGFMRXZlbCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIG1ldGFMRXZlbDtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMudHlwZXMgPSBbXTtcbiAgICB0aGlzLnJ1bGVzID0gW107XG4gICAgdGhpcy5heGlvbXMgPSBbXTtcbiAgICB0aGlzLmxlbW1hcyA9IFtdO1xuICAgIHRoaXMuc2NoZW1hcyA9IFtdO1xuICAgIHRoaXMudGhlb3JlbXMgPSBbXTtcbiAgICB0aGlzLmdlbmVyYXRvcnMgPSBbXTtcbiAgICB0aGlzLmNvbmplY3R1cmVzID0gW107XG4gICAgdGhpcy5jb21iaW5hdG9ycyA9IFtdO1xuICAgIHRoaXMudHlwZVByZWZpeGVzID0gW107XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBbXTtcbiAgICB0aGlzLmRlY2xhcmVkVmFyaWFibGVzID0gW107XG4gICAgdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBbXTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIC8vL1xuICB9XG5cbiAgYXN5bmMgdmVyaWZ5RmlsZSgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5nZXROb2RlKCksXG4gICAgICAgICAgY29udGV4dCA9IHRoaXMsIC8vL1xuICAgICAgICAgIGZpbGVOb2RlID0gbm9kZSwgIC8vL1xuICAgICAgICAgIGZpbGVWZXJpZmllcyA9IGF3YWl0IHZlcmlmeUZpbGUoZmlsZU5vZGUsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGZpbGVWZXJpZmllcztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgY29uc3QganNvbiA9IHRoaXMuZ2V0SlNPTigpO1xuXG4gICAgaWYgKGpzb24gPT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGVDb250ZXh0ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLnR5cGVzID0gW107XG5cbiAgICB0eXBlc0Zyb21KU09OKGpzb24sIHRoaXMudHlwZXMsIGZpbGVDb250ZXh0KTtcblxuICAgIHRoaXMubGVtbWFzID0gW107XG5cbiAgICB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmRlY2xhcmVkVmFyaWFibGVzID0gZGVjbGFyZWRWYXJpYWJsZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5nZW5lcmF0b3JzID0gZ2VuZXJhdG9yc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG5cbiAgICB0aGlzLnJ1bGVzID0gcnVsZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5heGlvbXMgPSBheGlvbXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5zY2hlbWFzID0gc2NoZW1hc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLnRoZW9yZW1zID0gdGhlb3JlbXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5jb25qZWN0dXJlcyA9IGNvbmplY3R1cmVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IHR5cGVzSlNPTiA9IHR5cGVzVG9UeXBlc0pTT04odGhpcy50eXBlcyksXG4gICAgICAgICAgcnVsZXNKU09OID0gcnVsZXNUb1J1bGVzSlNPTih0aGlzLnJ1bGVzKSxcbiAgICAgICAgICBheGlvbXNKU09OID0gYXhpb21zVG9BeGlvbXNKU09OKHRoaXMuYXhpb21zKSxcbiAgICAgICAgICBzY2hlbWFzSlNPTiA9IHNjaGVtYXNUb1NjaGVtYXNKU09OKHRoaXMuc2NoZW1hcyksXG4gICAgICAgICAgdGhlb3JlbXNKU09OID0gdGhlb3JlbXNUb1RoZW9yZW1zSlNPTih0aGlzLnRoZW9yZW1zKSxcbiAgICAgICAgICBnZW5lcmF0b3JzSlNPTiA9IGdlbmVyYXRvcnNUb0dlbmVyYXRvcnNKU09OKHRoaXMuZ2VuZXJhdG9ycyksXG4gICAgICAgICAgY29uamVjdHVyZXNKU09OID0gY29uamVjdHVyZXNUb0NvbmplY3R1cmVzSlNPTih0aGlzLmNvbmplY3R1cmVzKSxcbiAgICAgICAgICBjb21iaW5hdG9yc0pTT04gPSBjb21iaW5hdG9yc1RvQ29tYmluYXRvcnNKU09OKHRoaXMuY29tYmluYXRvcnMpLFxuICAgICAgICAgIHR5cGVQcmVmaXhlc0pTT04gPSB0eXBlUHJlZml4ZXNUb1R5cGVQcmVmaXhlc0pTT04odGhpcy50eXBlUHJlZml4ZXMpLFxuICAgICAgICAgIGNvbnN0cnVjdG9yc0pTT04gPSBjb25zdHJ1Y3RvcnNUb0NvbnN0cnVjdG9yc0pTT04odGhpcy5jb25zdHJ1Y3RvcnMpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzSlNPTiA9IGRlY2xhcmVkVmFyaWFibGVzVG9EZWNsYXJlZFZhcmlhYmxlc0pTT04odGhpcy5kZWNsYXJlZFZhcmlhYmxlcyksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTih0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcyksXG4gICAgICAgICAgZmlsZUNvbnRlbnQgPSB0aGlzLmZpbGVDb250ZW50LFxuICAgICAgICAgIGZpbGVQYXRoID0gdGhpcy5maWxlUGF0aCxcbiAgICAgICAgICB0eXBlcyA9IHR5cGVzSlNPTiwgIC8vL1xuICAgICAgICAgIHJ1bGVzID0gcnVsZXNKU09OLCAgLy8vXG4gICAgICAgICAgYXhpb21zID0gYXhpb21zSlNPTiwgIC8vL1xuICAgICAgICAgIHNjaGVtYXMgPSBzY2hlbWFzSlNPTiwgIC8vL1xuICAgICAgICAgIHRoZW9yZW1zID0gdGhlb3JlbXNKU09OLCAgLy8vXG4gICAgICAgICAgZ2VuZXJhdG9ycyA9IGdlbmVyYXRvcnNKU09OLCAgLy8vXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBjb25qZWN0dXJlc0pTT04sICAvLy9cbiAgICAgICAgICBjb21iaW5hdG9ycyA9IGNvbWJpbmF0b3JzSlNPTiwgIC8vL1xuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IHR5cGVQcmVmaXhlc0pTT04sICAvLy9cbiAgICAgICAgICBjb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnNKU09OLCAgLy8vXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBkZWNsYXJlZFZhcmlhYmxlc0pTT04sICAvLy9cbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIGZpbGVDb250ZW50LFxuICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICB0eXBlcyxcbiAgICAgICAgICAgIHJ1bGVzLFxuICAgICAgICAgICAgYXhpb21zLFxuICAgICAgICAgICAgc2NoZW1hcyxcbiAgICAgICAgICAgIHRoZW9yZW1zLFxuICAgICAgICAgICAgZ2VuZXJhdG9ycyxcbiAgICAgICAgICAgIGNvbmplY3R1cmVzLFxuICAgICAgICAgICAgY29tYmluYXRvcnMsXG4gICAgICAgICAgICB0eXBlUHJlZml4ZXMsXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcnMsXG4gICAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlcyxcbiAgICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc1xuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRmlsZShmaWxlLCBjb250ZXh0KSB7XG4gICAgY29uc3QgcmVsZWFzZUNvbnRleHQgPSBjb250ZXh0LCAvLy9cbiAgICAgICAgICBjb21iaW5lZEN1c3RvbUdyYW1tYXIgPSByZWxlYXNlQ29udGV4dC5nZXRDb21iaW5lZEN1c3RvbUdyYW1tYXIoKSxcbiAgICAgICAgICBub21pbmFsTGV4ZXIgPSBub21pbmFsTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKE5vbWluYWxMZXhlciwgY29tYmluZWRDdXN0b21HcmFtbWFyKSxcbiAgICAgICAgICBub21pbmFsUGFyc2VyID0gbm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbFBhcnNlciwgY29tYmluZWRDdXN0b21HcmFtbWFyKSxcbiAgICAgICAgICBsZXhlciA9IG5vbWluYWxMZXhlciwgLy8vXG4gICAgICAgICAgcGFyc2VyID0gbm9taW5hbFBhcnNlciwgLy8vXG4gICAgICAgICAgdHlwZXMgPSBbXSxcbiAgICAgICAgICBydWxlcyA9IFtdLFxuICAgICAgICAgIGF4aW9tcyA9IFtdLFxuICAgICAgICAgIGxlbW1hcyA9IFtdLFxuICAgICAgICAgIHNjaGVtYXMgPSBbXSxcbiAgICAgICAgICB0aGVvcmVtcyA9IFtdLFxuICAgICAgICAgIGdlbmVyYXRvcnMgPSBbXSxcbiAgICAgICAgICBjb25qZWN0dXJlcyA9IFtdLFxuICAgICAgICAgIGNvbWJpbmF0b3JzID0gW10sXG4gICAgICAgICAgdHlwZVByZWZpeGVzID0gW10sXG4gICAgICAgICAgY29uc3RydWN0b3JzID0gW10sXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBbXSxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBbXSxcbiAgICAgICAgICBub21pbmFsRmlsZUNvbnRleHQgPSBGaWxlQ29udGV4dC5mcm9tRmlsZShOb21pbmFsRmlsZUNvbnRleHQsIGZpbGUsIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHNjaGVtYXMsIHRoZW9yZW1zLCBnZW5lcmF0b3JzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBkZWNsYXJlZFZhcmlhYmxlcywgZGVjbGFyZWRNZXRhdmFyaWFibGVzLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBub21pbmFsRmlsZUNvbnRleHQ7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0ID0gY29udGV4dCwgLy8vXG4gICAgICAgICAgY29tYmluZWRDdXN0b21HcmFtbWFyID0gcmVsZWFzZUNvbnRleHQuZ2V0Q29tYmluZWRDdXN0b21HcmFtbWFyKCksXG4gICAgICAgICAgbm9taW5hbExleGVyID0gbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsTGV4ZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbm9taW5hbFBhcnNlciA9IG5vbWluYWxQYXJzZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKE5vbWluYWxQYXJzZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbGV4ZXIgPSBub21pbmFsTGV4ZXIsIC8vL1xuICAgICAgICAgIHBhcnNlciA9IG5vbWluYWxQYXJzZXIsIC8vL1xuICAgICAgICAgIHR5cGVzID0gbnVsbCxcbiAgICAgICAgICBydWxlcyA9IG51bGwsXG4gICAgICAgICAgYXhpb21zID0gbnVsbCxcbiAgICAgICAgICBsZW1tYXMgPSBudWxsLFxuICAgICAgICAgIHNjaGVtYXMgPSBudWxsLFxuICAgICAgICAgIHRoZW9yZW1zID0gbnVsbCxcbiAgICAgICAgICBnZW5lcmF0b3JzID0gbnVsbCxcbiAgICAgICAgICBjb25qZWN0dXJlcyA9IG51bGwsXG4gICAgICAgICAgY29tYmluYXRvcnMgPSBudWxsLFxuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IG51bGwsXG4gICAgICAgICAgY29uc3RydWN0b3JzID0gbnVsbCxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlcyA9IG51bGwsXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gbnVsbCxcbiAgICAgICAgICBub21pbmFsRmlsZUNvbnRleHQgPSBGaWxlQ29udGV4dC5mcm9tSlNPTihOb21pbmFsRmlsZUNvbnRleHQsIGpzb24sIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHNjaGVtYXMsIHRoZW9yZW1zLCBnZW5lcmF0b3JzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBkZWNsYXJlZFZhcmlhYmxlcywgZGVjbGFyZWRNZXRhdmFyaWFibGVzLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBub21pbmFsRmlsZUNvbnRleHQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOb21pbmFsRmlsZUNvbnRleHQiLCJwdXNoIiwiYXJyYXlVdGlsaXRpZXMiLCJub21pbmFsTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyIiwibm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIiLCJub21pbmFsVXRpbGl0aWVzIiwiRmlsZUNvbnRleHQiLCJjb250ZXh0IiwiZmlsZUNvbnRlbnQiLCJmaWxlUGF0aCIsInRva2VucyIsIm5vZGUiLCJqc29uIiwibGV4ZXIiLCJwYXJzZXIiLCJ0eXBlcyIsInJ1bGVzIiwiYXhpb21zIiwibGVtbWFzIiwic2NoZW1hcyIsInRoZW9yZW1zIiwiZ2VuZXJhdG9ycyIsImNvbmplY3R1cmVzIiwiY29tYmluYXRvcnMiLCJ0eXBlUHJlZml4ZXMiLCJjb25zdHJ1Y3RvcnMiLCJkZWNsYXJlZFZhcmlhYmxlcyIsImRlY2xhcmVkTWV0YXZhcmlhYmxlcyIsImdldExleGVyIiwiZ2V0UGFyc2VyIiwiZ2V0RXF1aXZhbGVuY2VzIiwiZXF1aXZhbGVuY2VzIiwiZ2V0U3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyIsInN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMiLCJnZXRMYWJlbHMiLCJpbmNsdWRlUmVsZWFzZSIsImxhYmVscyIsInJlbGVhc2VDb250ZXh0TGFiZWxzIiwiZm9yRWFjaCIsInJ1bGUiLCJydWxlTGFiZWxzIiwiYXhpb20iLCJheGlvbUxhYmVscyIsImxlbW1hIiwibGVtbWFMYWJlbHMiLCJ0aGVvcmVtIiwidGhlb3JlbUxhYmVscyIsImNvbmplY3R1cmUiLCJjb25qZWN0dXJlTGFiZWxzIiwic2NoZW1hIiwic2NoZW1hTGFiZWwiLCJnZXRMYWJlbCIsImdldFR5cGVzIiwiZ2V0UnVsZXMiLCJnZXRBeGlvbXMiLCJnZXRMZW1tYXMiLCJnZXRTY2hlbWFzIiwiZ2V0VGhlb3JlbXMiLCJnZXRHZW5lcmF0b3JzIiwiZ2V0Q29uamVjdHVyZXMiLCJnZXRDb21iaW5hdG9ycyIsImdldFR5cGVQcmVmaXhlcyIsImdldENvbnN0cnVjdG9ycyIsImdldFByb2NlZHVyZXMiLCJwcm9jZWR1cmVzIiwiZ2V0VG9wTGV2ZWxBc3NlcnRpb25zIiwidG9wTGV2ZWxBc3NlcnRpb25zIiwiZ2V0RGVjbGFyZWRWYXJpYWJsZXMiLCJnZXREZWNsYXJlZE1ldGF2YXJpYWJsZXMiLCJnZXRUZXJtcyIsInRlcm1zIiwiZ2V0R29hbHMiLCJnb2FscyIsImdldEZyYW1lcyIsImZyYW1lcyIsImdldEVxdWFsaXRpZXMiLCJlcXVhbGl0aWVzIiwiZ2V0SnVkZ2VtZW50cyIsImp1ZGdlbWVudHMiLCJnZXRBc3NlcnRpb25zIiwiYXNzZXJ0aW9ucyIsImdldFN0YXRlbWVudHMiLCJzdGF0ZW1lbnRzIiwiZ2V0U2lnbmF0dXJlcyIsInNpZ25hdHVyZXMiLCJnZXRSZWZlcmVuY2VzIiwicmVmZXJlbmNlcyIsImdldEFzc3VtcHRpb25zIiwiYXNzdW1wdGlvbnMiLCJnZXRNZXRhdmFyaWFibGVzIiwibWV0YXZhcmlhYmxlcyIsImdldFN1YnN0aXR1dGlvbnMiLCJzdWJzdGl0dXRpb25zIiwiZ2V0RGVyaXZlZFN1YnN0aXR1dGlvbnMiLCJkZXJpdmVkU3Vic3RpdHV0aW9ucyIsImdldFByb3BlcnRpZXMiLCJwcm9wZXJ0aWVzIiwidHlwZSIsImFkZFR5cGUiLCJnZXRGaWxlUGF0aCIsInR5cGVTdHJpbmciLCJnZXRTdHJpbmciLCJ0cmFjZSIsImFkZFJ1bGUiLCJydWxlU3RyaW5nIiwiYWRkQXhpb20iLCJheGlvbVN0cmluZyIsImFkZExlbW1hIiwibGVtbWFTdHJpbmciLCJhZGRTY2hlbWEiLCJzY2hlbWFTdHJpbmciLCJhZGRUaGVvcmVtIiwidGhlb3JlbVN0cmluZyIsImFkZEdlbmVyYXRvciIsImdlbmVyYXRvciIsImdlbmVyYXRvclN0cmluZyIsImFkZENvbmplY3R1cmUiLCJvY25qZWN0dXJlU3RyaW5nIiwiYWRkQ29tYmluYXRvciIsImNvbWJpbmF0b3IiLCJjb21iaW5hdG9yU3RyaW5nIiwiYWRkVHlwZVByZWZpeCIsInR5cGVQcmVmaXgiLCJ0eXBlUHJlZml4U3RyaW5nIiwiYWRkQ29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yU3RyaW5nIiwiYWRkRGVjbGFyZWRWYXJpYWJsZSIsImRlY2xhcmVkVmFyaWFibGUiLCJkZWNsYXJlZFZhcmlhYmxlU3RyaW5nIiwiYWRkRGVjbGFyZWRNZXRhdmFyaWFibGUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nIiwiZmluZE1ldGF2YXJpYWJsZSIsIm1ldGF2YXJpYWJsZSIsImZpbmQiLCJtZXRhdmFyaWFibGVVbmlmaWVzIiwidW5pZnlNZXRhdmFyaWFibGUiLCJmaW5kUnVsZUJ5UmVmZXJlbmNlIiwicmVmZXJlbmNlIiwibWV0YXZhcmlhYmxlTm9kZSIsImdldE1ldGF2YXJpYWJsZU5vZGUiLCJtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyIsIm1hdGNoTWV0YXZhcmlhYmxlTm9kZSIsImZpbmRBeGlvbUJ5UmVmZXJlbmNlIiwiZmluZExlbW1hQnlSZWZlcmVuY2UiLCJmaW5kVGhlb3JlbUJ5UmVmZXJlbmNlIiwiZmluZENvbmplY3R1cmVCeVJlZmVyZW5jZSIsImZpbmRUb3BMZXZlbEFzc2VydGlvbkJ5UmVmZXJlbmNlIiwidG9wTEV2ZWxBc3NlcnRpb25zIiwidG9wTGV2ZWxBc3NlcnRpb24iLCJmaW5kVHlwZUJ5VHlwZU5hbWUiLCJ0eXBlTmFtZSIsImZpbmRUeXBlIiwidHlwZUNvbXBhcmVzVG9UeXBlTmFtZSIsImNvbXBhcmVUeXBlTmFtZSIsImZpbmRUeXBlQnlOb21pbmFsVHlwZU5hbWUiLCJub21pbmFsVHlwZU5hbWUiLCJ0eXBlQ29tcGFyZXNUb05vbWluYWxUeXBlTmFtZSIsImNvbXBhcmVOb21pbmFsVHlwZU5hbWUiLCJmaW5kVHlwZUJ5UHJlZml4ZWRUeXBlTmFtZSIsInByZWZpeGVkVHlwZU5hbWUiLCJ0eXBlQ29tcGFyZXNUb1ByZWZpeGVkVHlwZU5hbWUiLCJjb21wYXJlUHJlZml4ZWRUeXBlTmFtZSIsImZpbmRUeXBlUHJlZml4QnlUeXBlUHJlZml4TmFtZSIsInR5cGVQcmVmaXhOYW1lIiwidHlwZVByZWZpeENvbXBhcmVzVG9UeXBlUHJlZml4TmFtZSIsImNvbXBhcmVUeXBlUHJlZml4TmFtZSIsImZpbmREZWNsYXJlZFZhcmlhYmxlQnlWYXJpYWJsZUlkZW50aWZpZXIiLCJWYXJpYWJsZUlkZW50aXRpZmVyIiwiZGVjbGFyZWRWYXJpYWJsZUNvbXBhcmVzVG9WYXJpYWJsZUlkZW50aXRpZmVyIiwiY29tcGFyZVZhcmlhYmxlSWRlbnRpZmllciIsImZpbmREZWNsYXJlZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTmFtZSIsIm1ldGF2YXJpYWJsZU5hbWUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lIiwiY29tcGFyZU1ldGF2YXJpYWJsZU5hbWUiLCJmaW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlIiwiZmluZFN1YnN0aXR1dGlvbkJ5U3Vic3RpdHV0aW9uTm9kZSIsInN1YnN0aXR1dGlvbk5vZGUiLCJzdWJzdGl0dXRpb24iLCJmaW5kQ29uc3RyYWludEJ5Q29uc3RyYWludE5vZGUiLCJjb25zdHJhaW50Tm9kZSIsImNvbnN0cmFpbnQiLCJmaW5kUHJvY2VkdXJlQnlQcm9jZWR1cmVOYW1lIiwicHJvY2VkdXJlTmFtZSIsInByb2NlZHVyZSIsInByb2NlZHVyZUNvbXBhcmVzVG9Qcm9jZWR1cmVOYW1lIiwiY29tcGFyZVByb2NlZHVyZU5hbWUiLCJmaW5kTWV0YVR5cGVCeU1ldGFUeXBlTmFtZSIsIm1ldGFUeXBlTmFtZSIsImlzTGFiZWxQcmVzZW50QnlMYWJlbE5vZGUiLCJsYWJlbE5vZGUiLCJsYWJlbFByZXNlbnQiLCJzb21lIiwibGFiZWwiLCJsYWJlbE5vZGVNYXRjaGVzIiwibWF0Y2hMYWJlbE5vZGUiLCJpc1R5cGVQcmVzZW50QnlUeXBlTmFtZSIsInR5cGVQcmVzZW50IiwiaXNUeXBlUHJlc2VudEJ5Tm9taW5hbFR5cGVOYW1lIiwiaXNUeXBlUHJlc2VudEJ5UHJlZml4ZWRUeXBlTmFtZSIsImlzVHlwZVByZWZpeFByZXNlbnRCeVR5cGVQcmVmaXhOYW1lIiwidHlwZVByZWZpeFByZXNlbnQiLCJpc0RlY2xhcmVkVmFyaWFibGVQcmVzZW50QnlWYXJpYWJsZUlkZW50aWZpZXIiLCJ2YXJpYWJsZUlkZW50aWZpZXIiLCJkZWNsYXJlZFZhcmlhYmxlUHJlc2VudCIsImlzRGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50QnlNZXRhdmFyaWFibGVOYW1lIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50IiwiaXNQcm9jZWR1cmVQcmVzZW50QnlQcm9jZWR1cmVOYW1lIiwicHJvY2VkdXJlUHJlc2VudCIsImlzTWV0YUxldmVsIiwibWV0YUxFdmVsIiwiY2xlYXIiLCJjb21wbGV0ZSIsInZlcmlmeUZpbGUiLCJnZXROb2RlIiwiZmlsZU5vZGUiLCJmaWxlVmVyaWZpZXMiLCJpbml0aWFsaXNlIiwiZ2V0SlNPTiIsImZpbGVDb250ZXh0IiwidHlwZXNGcm9tSlNPTiIsImRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNGcm9tSlNPTiIsInR5cGVQcmVmaXhlc0Zyb21KU09OIiwiZ2VuZXJhdG9yc0Zyb21KU09OIiwiY29tYmluYXRvcnNGcm9tSlNPTiIsImNvbnN0cnVjdG9yc0Zyb21KU09OIiwicnVsZXNGcm9tSlNPTiIsImF4aW9tc0Zyb21KU09OIiwic2NoZW1hc0Zyb21KU09OIiwidGhlb3JlbXNGcm9tSlNPTiIsImNvbmplY3R1cmVzRnJvbUpTT04iLCJ0b0pTT04iLCJ0eXBlc0pTT04iLCJ0eXBlc1RvVHlwZXNKU09OIiwicnVsZXNKU09OIiwicnVsZXNUb1J1bGVzSlNPTiIsImF4aW9tc0pTT04iLCJheGlvbXNUb0F4aW9tc0pTT04iLCJzY2hlbWFzSlNPTiIsInNjaGVtYXNUb1NjaGVtYXNKU09OIiwidGhlb3JlbXNKU09OIiwidGhlb3JlbXNUb1RoZW9yZW1zSlNPTiIsImdlbmVyYXRvcnNKU09OIiwiZ2VuZXJhdG9yc1RvR2VuZXJhdG9yc0pTT04iLCJjb25qZWN0dXJlc0pTT04iLCJjb25qZWN0dXJlc1RvQ29uamVjdHVyZXNKU09OIiwiY29tYmluYXRvcnNKU09OIiwiY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTiIsInR5cGVQcmVmaXhlc0pTT04iLCJ0eXBlUHJlZml4ZXNUb1R5cGVQcmVmaXhlc0pTT04iLCJjb25zdHJ1Y3RvcnNKU09OIiwiY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTiIsImRlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJmcm9tRmlsZSIsImZpbGUiLCJyZWxlYXNlQ29udGV4dCIsImNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsImdldENvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxMZXhlciIsIk5vbWluYWxMZXhlciIsIm5vbWluYWxQYXJzZXIiLCJOb21pbmFsUGFyc2VyIiwibm9taW5hbEZpbGVDb250ZXh0IiwiZnJvbUpTT04iXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQXVDQTs7O2VBQXFCQTs7O2dDQXJDeUI7MkJBQ2Y7OERBRU47K0RBQ0M7d0JBRUM7c0JBQ2lCOzJCQUNEO3NCQXdCc0I7Ozs7OztBQUVqRSxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHQyx5QkFBYyxFQUN6QixFQUFFQyxxQ0FBcUMsRUFBRUMsc0NBQXNDLEVBQUUsR0FBR0MsZ0NBQWdCO0FBRTNGLE1BQU1MLDJCQUEyQk0sMkJBQVc7SUFDekQsWUFBWUMsT0FBTyxFQUFFQyxXQUFXLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLE1BQU0sRUFBRUMsT0FBTyxFQUFFQyxRQUFRLEVBQUVDLFVB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