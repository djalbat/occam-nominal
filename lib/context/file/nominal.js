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
    getProperties(properties = []) {
        return properties;
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
    getPropertyRelations(propertyRelations = []) {
        return propertyRelations;
    }
    getDerivedSubstitutions(derivedSubstitutions = []) {
        return derivedSubstitutions;
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
    findTypeByTypeName(typeName) {
        const types = this.getTypes(), type = (0, _type.findType)(types, (type)=>{
            const typeComparesToTypeName = type.compareTypeName(typeName);
            if (typeComparesToTypeName) {
                return true;
            }
        });
        return type;
    }
    findTypeByNominalTypeName(nominalTypeName) {
        const types = this.getTypes(), type = (0, _type.findType)(types, (type)=>{
            const typeComparesToNominalTypeName = type.compareNominalTypeName(nominalTypeName);
            if (typeComparesToNominalTypeName) {
                return true;
            }
        });
        return type;
    }
    findTypeByPrefixedTypeName(prefixedTypeName) {
        const types = this.getTypes(), type = (0, _type.findType)(types, (type)=>{
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
    isTypePresentByTypeName(typeName) {
        const type = this.findTypeByTypeName(typeName), typePresent = type !== null;
        return typePresent;
    }
    isTypePresentByNominalTypeName(nominalTypeName) {
        const type = this.findTypeByNominalTypeName(nominalTypeName), typePresent = type !== null;
        return typePresent;
    }
    isTypePresentByPrefixedTypeName(prefixedTypeName) {
        const type = this.findTypeByPrefixedTypeName(prefixedTypeName), typePresent = type !== null;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L2ZpbGUvbm9taW5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRmlsZUNvbnRleHQsIG5vbWluYWxVdGlsaXRpZXMgfSBmcm9tIFwib2NjYW0tbGFuZ3VhZ2VzXCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IE5vbWluYWxMZXhlciBmcm9tIFwiLi4vLi4vbm9taW5hbC9sZXhlclwiO1xuaW1wb3J0IE5vbWluYWxQYXJzZXIgZnJvbSBcIi4uLy4uL25vbWluYWwvcGFyc2VyXCI7XG5cbmltcG9ydCB7IHZlcmlmeUZpbGUgfSBmcm9tIFwiLi4vLi4vcHJvY2Vzcy92ZXJpZnlcIjtcbmltcG9ydCB7YmFzZVR5cGVGcm9tTm90aGluZywgZmluZFR5cGV9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdHlwZVwiO1xuaW1wb3J0IHsgZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUgfSBmcm9tIFwiLi4vLi4vbWV0YVR5cGVzXCI7XG5pbXBvcnQgeyB0eXBlc0Zyb21KU09OLFxuICAgICAgICAgcnVsZXNGcm9tSlNPTixcbiAgICAgICAgIGF4aW9tc0Zyb21KU09OLFxuICAgICAgICAgc2NoZW1hc0Zyb21KU09OLFxuICAgICAgICAgdHlwZXNUb1R5cGVzSlNPTixcbiAgICAgICAgIHRoZW9yZW1zRnJvbUpTT04sXG4gICAgICAgICBydWxlc1RvUnVsZXNKU09OLFxuICAgICAgICAgYXhpb21zVG9BeGlvbXNKU09OLFxuICAgICAgICAgZ2VuZXJhdG9yc0Zyb21KU09OLFxuICAgICAgICAgY29uamVjdHVyZXNGcm9tSlNPTixcbiAgICAgICAgIGNvbWJpbmF0b3JzRnJvbUpTT04sXG4gICAgICAgICB0eXBlUHJlZml4ZXNGcm9tSlNPTixcbiAgICAgICAgIGNvbnN0cnVjdG9yc0Zyb21KU09OLFxuICAgICAgICAgc2NoZW1hc1RvU2NoZW1hc0pTT04sXG4gICAgICAgICB0aGVvcmVtc1RvVGhlb3JlbXNKU09OLFxuICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXNGcm9tSlNPTixcbiAgICAgICAgIGdlbmVyYXRvcnNUb0dlbmVyYXRvcnNKU09OLFxuICAgICAgICAgY29uamVjdHVyZXNUb0NvbmplY3R1cmVzSlNPTixcbiAgICAgICAgIGNvbWJpbmF0b3JzVG9Db21iaW5hdG9yc0pTT04sXG4gICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXNGcm9tSlNPTixcbiAgICAgICAgIHR5cGVQcmVmaXhlc1RvVHlwZVByZWZpeGVzSlNPTixcbiAgICAgICAgIGNvbnN0cnVjdG9yc1RvQ29uc3RydWN0b3JzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzVG9EZWNsYXJlZFZhcmlhYmxlc0pTT04sXG4gICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04gfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2pzb25cIjtcblxuY29uc3QgeyBwdXNoIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciwgbm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIgfSA9IG5vbWluYWxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vbWluYWxGaWxlQ29udGV4dCBleHRlbmRzIEZpbGVDb250ZXh0IHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwgZmlsZUNvbnRlbnQsIGZpbGVQYXRoLCB0b2tlbnMsIG5vZGUsIGpzb24sIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHNjaGVtYXMsIHRoZW9yZW1zLCBnZW5lcmF0b3JzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBkZWNsYXJlZFZhcmlhYmxlcywgZGVjbGFyZWRNZXRhdmFyaWFibGVzKSB7XG4gICAgc3VwZXIoY29udGV4dCwgZmlsZUNvbnRlbnQsIGZpbGVQYXRoLCB0b2tlbnMsIG5vZGUsIGpzb24pO1xuXG4gICAgdGhpcy5sZXhlciA9IGxleGVyO1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5maWxlUGF0aCA9IGZpbGVQYXRoO1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zO1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy50eXBlcyA9IHR5cGVzO1xuICAgIHRoaXMucnVsZXMgPSBydWxlcztcbiAgICB0aGlzLmF4aW9tcyA9IGF4aW9tcztcbiAgICB0aGlzLmxlbW1hcyA9IGxlbW1hcztcbiAgICB0aGlzLnNjaGVtYXMgPSBzY2hlbWFzO1xuICAgIHRoaXMudGhlb3JlbXMgPSB0aGVvcmVtcztcbiAgICB0aGlzLmdlbmVyYXRvcnMgPSBnZW5lcmF0b3JzO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlcztcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnM7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnM7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0TGV4ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV4ZXI7XG4gIH1cblxuICBnZXRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VyO1xuICB9XG5cbiAgZ2V0RXF1aXZhbGVuY2VzKCkge1xuICAgIGNvbnN0IGVxdWl2YWxlbmNlcyA9IFtdO1xuXG4gICAgcmV0dXJuIGVxdWl2YWxlbmNlcztcbiAgfVxuXG4gIGdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMoKSB7XG4gICAgY29uc3Qgc3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyA9IFtdO1xuXG4gICAgcmV0dXJuIHN1YnByb29mT3JQcm9vZkFzc2VydGlvbnM7XG4gIH1cblxuICBnZXRMYWJlbHMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gW107XG5cbiAgICBpZiAoaW5jbHVkZVJlbGVhc2UpIHtcbiAgICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0TGFiZWxzID0gdGhpcy5jb250ZXh0LmdldExhYmVscygpO1xuXG4gICAgICBwdXNoKGxhYmVscywgcmVsZWFzZUNvbnRleHRMYWJlbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgY29uc3QgcnVsZUxhYmVscyA9IHJ1bGUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIHJ1bGVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYXhpb21zLmZvckVhY2goKGF4aW9tKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aW9tTGFiZWxzID0gYXhpb20uZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGF4aW9tTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxlbW1hcy5mb3JFYWNoKChsZW1tYSkgPT4ge1xuICAgICAgICBjb25zdCBsZW1tYUxhYmVscyA9IGxlbW1hLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCBsZW1tYUxhYmVscyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50aGVvcmVtcy5mb3JFYWNoKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHRoZW9yZW1MYWJlbHMgPSB0aGVvcmVtLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCB0aGVvcmVtTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbmplY3R1cmVzLmZvckVhY2goKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgY29uc3QgY29uamVjdHVyZUxhYmVscyA9IGNvbmplY3R1cmUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGNvbmplY3R1cmVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2NoZW1hcy5mb3JFYWNoKChzY2hlbWEpID0+IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hTGFiZWwgPSBzY2hlbWEuZ2V0TGFiZWwoKTtcblxuICAgICAgICBsYWJlbHMucHVzaChzY2hlbWFMYWJlbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWxzO1xuICB9XG5cbiAgZ2V0VHlwZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUeXBlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVzO1xuXG4gICAgcmV0dXJuIHR5cGVzO1xuICB9XG5cbiAgZ2V0UnVsZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgcnVsZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRSdWxlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bGVzO1xuXG4gICAgcmV0dXJuIHJ1bGVzO1xuICB9XG5cbiAgZ2V0QXhpb21zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGF4aW9tcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRBeGlvbXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpb21zO1xuXG4gICAgcmV0dXJuIGF4aW9tcztcbiAgfVxuXG4gIGdldExlbW1hcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBsZW1tYXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0TGVtbWFzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxlbW1hcztcblxuICAgIHJldHVybiBsZW1tYXM7XG4gIH1cblxuICBnZXRTY2hlbWFzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNjaGVtYXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldFNjaGVtYXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVtYXM7XG5cbiAgICByZXR1cm4gc2NoZW1hcztcbiAgfVxuXG4gIGdldFRoZW9yZW1zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHRoZW9yZW1zID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0VGhlb3JlbXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVvcmVtcztcblxuICAgIHJldHVybiB0aGVvcmVtcztcbiAgfVxuXG4gIGdldEdlbmVyYXRvcnMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgZ2VuZXJhdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0R2VuZXJhdG9ycygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdG9ycztcblxuICAgIHJldHVybiBnZW5lcmF0b3JzO1xuICB9XG5cbiAgZ2V0Q29uamVjdHVyZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgY29uamVjdHVyZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRDb25qZWN0dXJlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmplY3R1cmVzO1xuXG4gICAgcmV0dXJuIGNvbmplY3R1cmVzO1xuICB9XG5cbiAgZ2V0Q29tYmluYXRvcnMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgY29tYmluYXRvcnMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRDb21iaW5hdG9ycygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmF0b3JzO1xuXG4gICAgcmV0dXJuIGNvbWJpbmF0b3JzO1xuICB9XG5cbiAgZ2V0VHlwZVByZWZpeGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHR5cGVQcmVmaXhlcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUeXBlUHJlZml4ZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZVByZWZpeGVzO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVmaXhlcztcbiAgfVxuXG4gIGdldENvbnN0cnVjdG9ycyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb25zdHJ1Y3RvcnMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0Q29uc3RydWN0b3JzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9ycztcblxuICAgIHJldHVybiBjb25zdHJ1Y3RvcnM7XG4gIH1cblxuICBnZXRQcm9jZWR1cmVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRQcm9jZWR1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwcm9jZWR1cmVzO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxBc3NlcnRpb25zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGxlbW1hcyA9IHRoaXMuZ2V0TGVtbWFzKGluY2x1ZGVSZWxlYXNlKSxcbiAgICAgICAgICBheGlvbXMgPSB0aGlzLmdldEF4aW9tcyhpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgdGhlb3JlbXMgPSB0aGlzLmdldFRoZW9yZW1zKGluY2x1ZGVSZWxlYXNlKSxcbiAgICAgICAgICBjb25qZWN0dXJlcyA9IHRoaXMuZ2V0Q29uamVjdHVyZXMoaW5jbHVkZVJlbGVhc2UpLFxuICAgICAgICAgIHRvcExldmVsQXNzZXJ0aW9ucyA9IFtcbiAgICAgICAgICAgIC4uLmxlbW1hcyxcbiAgICAgICAgICAgIC4uLmF4aW9tcyxcbiAgICAgICAgICAgIC4uLnRoZW9yZW1zLFxuICAgICAgICAgICAgLi4uY29uamVjdHVyZXNcbiAgICAgICAgICBdO1xuXG4gICAgcmV0dXJuIHRvcExldmVsQXNzZXJ0aW9ucztcbiAgfVxuXG4gIGdldERlY2xhcmVkVmFyaWFibGVzKCkge1xuICAgIHJldHVybiB0aGlzLmRlY2xhcmVkVmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzKCkge1xuICAgIHJldHVybiB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcztcbiAgfVxuXG4gIGdldFRlcm1zKHRlcm1zID0gW10pIHtcbiAgICByZXR1cm4gdGVybXM7XG4gIH1cblxuICBnZXRHb2Fscyhnb2FscyA9IFtdKSB7XG4gICAgcmV0dXJuIGdvYWxzO1xuICB9XG5cbiAgZ2V0RnJhbWVzKGZyYW1lcyA9IFtdKSB7XG4gICAgcmV0dXJuIGZyYW1lcztcbiAgfVxuXG4gIGdldFByb3BlcnRpZXMocHJvcGVydGllcyA9IFtdKSB7XG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gIH1cblxuICBnZXRFcXVhbGl0aWVzKGVxdWFsaXRpZXMgPSBbXSkge1xuICAgIHJldHVybiBlcXVhbGl0aWVzO1xuICB9XG5cbiAgZ2V0SnVkZ2VtZW50cyhqdWRnZW1lbnRzID0gW10pIHtcbiAgICByZXR1cm4ganVkZ2VtZW50cztcbiAgfVxuXG4gIGdldEFzc2VydGlvbnMoYXNzZXJ0aW9ucyA9IFtdKSB7XG4gICAgcmV0dXJuIGFzc2VydGlvbnM7XG4gIH1cblxuICBnZXRTdGF0ZW1lbnRzKHN0YXRlbWVudHMgPSBbXSkge1xuICAgIHJldHVybiBzdGF0ZW1lbnRzO1xuICB9XG5cbiAgZ2V0U2lnbmF0dXJlcyhzaWduYXR1cmVzID0gW10pIHtcbiAgICByZXR1cm4gc2lnbmF0dXJlcztcbiAgfVxuXG4gIGdldFJlZmVyZW5jZXMocmVmZXJlbmNlcyA9IFtdKSB7XG4gICAgcmV0dXJuIHJlZmVyZW5jZXM7XG4gIH1cblxuICBnZXRBc3N1bXB0aW9ucyhhc3N1bXB0aW9ucyA9IFtdKSB7XG4gICAgcmV0dXJuIGFzc3VtcHRpb25zO1xuICB9XG5cbiAgZ2V0TWV0YXZhcmlhYmxlcyhtZXRhdmFyaWFibGVzID0gW10pIHtcbiAgICByZXR1cm4gbWV0YXZhcmlhYmxlcztcbiAgfVxuXG4gIGdldFN1YnN0aXR1dGlvbnMoc3Vic3RpdHV0aW9ucyA9IFtdKSB7XG4gICAgcmV0dXJuIHN1YnN0aXR1dGlvbnM7XG4gIH1cblxuICBnZXRQcm9wZXJ0eVJlbGF0aW9ucyhwcm9wZXJ0eVJlbGF0aW9ucyA9IFtdKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5UmVsYXRpb25zO1xuICB9XG5cbiAgZ2V0RGVyaXZlZFN1YnN0aXR1dGlvbnMoZGVyaXZlZFN1YnN0aXR1dGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBkZXJpdmVkU3Vic3RpdHV0aW9ucztcbiAgfVxuXG4gIGFkZFR5cGUodHlwZSkge1xuICAgIHRoaXMudHlwZXMucHVzaCh0eXBlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHR5cGVTdHJpbmcgPSB0eXBlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3R5cGVTdHJpbmd9JyB0eXBlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkUnVsZShydWxlKSB7XG4gICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgcnVsZVN0cmluZyA9IHJ1bGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7cnVsZVN0cmluZ30nIHJ1bGUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRBeGlvbShheGlvbSkge1xuICAgIHRoaXMuYXhpb21zLnB1c2goYXhpb20pO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgYXhpb21TdHJpbmcgPSBheGlvbS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtheGlvbVN0cmluZ30nIGF4aW9tIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkTGVtbWEobGVtbWEpIHtcbiAgICB0aGlzLmxlbW1hcy5wdXNoKGxlbW1hKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGxlbW1hU3RyaW5nID0gbGVtbWEuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7bGVtbWFTdHJpbmd9JyBsZW1tYSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFNjaGVtYShzY2hlbWEpIHtcbiAgICB0aGlzLnNjaGVtYXMucHVzaChzY2hlbWEpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgc2NoZW1hU3RyaW5nID0gc2NoZW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3NjaGVtYVN0cmluZ30nIHNjaGVtYSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFRoZW9yZW0odGhlb3JlbSkge1xuICAgIHRoaXMudGhlb3JlbXMucHVzaCh0aGVvcmVtKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHRoZW9yZW1TdHJpbmcgPSB0aGVvcmVtLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3RoZW9yZW1TdHJpbmd9JyB0aGVvcmVtIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkR2VuZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIHRoaXMuZ2VuZXJhdG9ycy5wdXNoKGdlbmVyYXRvcik7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBnZW5lcmF0b3JTdHJpbmcgPSBnZW5lcmF0b3IuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7Z2VuZXJhdG9yU3RyaW5nfScgZ2VuZXJhdG9yIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkQ29uamVjdHVyZShjb25qZWN0dXJlKSB7XG4gICAgdGhpcy5jb25qZWN0dXJlcy5wdXNoKGNvbmplY3R1cmUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgb2NuamVjdHVyZVN0cmluZyA9IGNvbmplY3R1cmUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7b2NuamVjdHVyZVN0cmluZ30nIG9jbmplY3R1cmUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRDb21iaW5hdG9yKGNvbWJpbmF0b3IpIHtcbiAgICB0aGlzLmNvbWJpbmF0b3JzLnB1c2goY29tYmluYXRvcik7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBjb21iaW5hdG9yU3RyaW5nID0gY29tYmluYXRvci5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtjb21iaW5hdG9yU3RyaW5nfScgY29tYmluYXRvciB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFR5cGVQcmVmaXgodHlwZVByZWZpeCkge1xuICAgIHRoaXMudHlwZVByZWZpeGVzLnB1c2godHlwZVByZWZpeCk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0eXBlUHJlZml4U3RyaW5nID0gdHlwZVByZWZpeC5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0eXBlUHJlZml4U3RyaW5nfScgdHlwZS1wcmVmaXggdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRDb25zdHJ1Y3Rvcihjb25zdHJ1Y3Rvcikge1xuICAgIHRoaXMuY29uc3RydWN0b3JzLnB1c2goY29uc3RydWN0b3IpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgY29uc3RydWN0b3JTdHJpbmcgPSBjb25zdHJ1Y3Rvci5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtjb25zdHJ1Y3RvclN0cmluZ30nIGNvbnN0cnVjdG9yIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkRGVjbGFyZWRWYXJpYWJsZShkZWNsYXJlZFZhcmlhYmxlKSB7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcy5wdXNoKGRlY2xhcmVkVmFyaWFibGUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZVN0cmluZyA9IGRlY2xhcmVkVmFyaWFibGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7ZGVjbGFyZWRWYXJpYWJsZVN0cmluZ30nIGRlY2xhcmVkIHZhcmlhYmxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkRGVjbGFyZWRNZXRhdmFyaWFibGUoZGVjbGFyZWRNZXRhdmFyaWFibGUpIHtcbiAgICB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcy5wdXNoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nID0gZGVjbGFyZWRNZXRhdmFyaWFibGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7ZGVjbGFyZWRNZXRhdmFyaWFibGVTdHJpbmd9JyBkZWNsYXJlZCBtZXRhdmFyaWFibGUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBmaW5kTWV0YXZhcmlhYmxlKG1ldGF2YXJpYWJsZSwgY29udGV4dCkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IHRoaXMuZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzKCk7XG5cbiAgICBtZXRhdmFyaWFibGUgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXMuZmluZCgoZGVjbGFyZWRNZXRhdmFyaWFibGUpID0+IHtcbiAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZVVuaWZpZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZS51bmlmeU1ldGF2YXJpYWJsZShtZXRhdmFyaWFibGUsIGNvbnRleHQpO1xuXG4gICAgICBpZiAobWV0YXZhcmlhYmxlVW5pZmllcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRSdWxlQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgcnVsZXMgPSB0aGlzLmdldFJ1bGVzKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgcnVsZSA9IHJ1bGVzLmZpbmQoKHJ1bGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gcnVsZS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICBmaW5kQXhpb21CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBheGlvbXMgPSB0aGlzLmdldEF4aW9tcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIGF4aW9tID0gYXhpb21zLmZpbmQoKGF4aW9tKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IGF4aW9tLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gYXhpb207XG4gIH1cblxuICBmaW5kTGVtbWFCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBsZW1tYXMgPSB0aGlzLmdldExlbW1hcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIGxlbW1hID0gbGVtbWFzLmZpbmQoKGxlbW1hKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IGxlbW1hLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gbGVtbWE7XG4gIH1cblxuICBmaW5kVGhlb3JlbUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHRoZW9yZW1zID0gdGhpcy5nZXRUaGVvcmVtcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIHRoZW9yZW0gPSB0aGVvcmVtcy5maW5kKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IHRoZW9yZW0ubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0aGVvcmVtO1xuICB9XG5cbiAgZmluZENvbmplY3R1cmVCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBjb25qZWN0dXJlcyA9IHRoaXMuZ2V0Q29uamVjdHVyZXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBjb25qZWN0dXJlID0gY29uamVjdHVyZXMuZmluZCgoY29uamVjdHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBjb25qZWN0dXJlLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gY29uamVjdHVyZTtcbiAgfVxuXG4gIGZpbmRUb3BMZXZlbEFzc2VydGlvbkJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHRvcExFdmVsQXNzZXJ0aW9ucyA9IHRoaXMuZ2V0VG9wTGV2ZWxBc3NlcnRpb25zKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgdG9wTGV2ZWxBc3NlcnRpb24gPSB0b3BMRXZlbEFzc2VydGlvbnMuZmluZCgodG9wTGV2ZWxBc3NlcnRpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gdG9wTGV2ZWxBc3NlcnRpb24ubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0b3BMZXZlbEFzc2VydGlvbjtcbiAgfVxuXG4gIGZpbmRUeXBlQnlUeXBlTmFtZSh0eXBlTmFtZSkge1xuICAgIGNvbnN0IHR5cGVzID0gdGhpcy5nZXRUeXBlcygpLFxuICAgICAgICAgIHR5cGUgPSBmaW5kVHlwZSh0eXBlcywgKHR5cGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvVHlwZU5hbWUgPSB0eXBlLmNvbXBhcmVUeXBlTmFtZSh0eXBlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlQ29tcGFyZXNUb1R5cGVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBmaW5kVHlwZUJ5Tm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSkge1xuICAgIGNvbnN0IHR5cGVzID0gdGhpcy5nZXRUeXBlcygpLFxuICAgICAgICAgIHR5cGUgPSBmaW5kVHlwZSh0eXBlcywgKHR5cGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvTm9taW5hbFR5cGVOYW1lID0gdHlwZS5jb21wYXJlTm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlQ29tcGFyZXNUb05vbWluYWxUeXBlTmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgZmluZFR5cGVCeVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSkge1xuICAgIGNvbnN0IHR5cGVzID0gdGhpcy5nZXRUeXBlcygpLFxuICAgICAgICAgIHR5cGUgPSBmaW5kVHlwZSh0eXBlcywgKHR5cGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSA9IHR5cGUuY29tcGFyZVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlQ29tcGFyZXNUb1ByZWZpeGVkVHlwZU5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGZpbmRUeXBlUHJlZml4QnlUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSkge1xuICAgIGNvbnN0IHR5cGVQcmVmaXhlcyA9IHRoaXMuZ2V0VHlwZVByZWZpeGVzKCksXG4gICAgICAgICAgdHlwZVByZWZpeCA9IHR5cGVQcmVmaXhlcy5maW5kKCh0eXBlUHJlZml4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0eXBlUHJlZml4Q29tcGFyZXNUb1R5cGVQcmVmaXhOYW1lID0gdHlwZVByZWZpeC5jb21wYXJlVHlwZVByZWZpeE5hbWUodHlwZVByZWZpeE5hbWUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZVByZWZpeENvbXBhcmVzVG9UeXBlUHJlZml4TmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVmaXg7XG4gIH1cblxuICBmaW5kRGVjbGFyZWRWYXJpYWJsZUJ5VmFyaWFibGVJZGVudGlmaWVyKFZhcmlhYmxlSWRlbnRpdGlmZXIpIHtcbiAgICBjb25zdCBkZWNsYXJlZFZhcmlhYmxlcyA9IHRoaXMuZ2V0RGVjbGFyZWRWYXJpYWJsZXMoKSxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlID0gZGVjbGFyZWRWYXJpYWJsZXMuZmluZCgoZGVjbGFyZWRWYXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVjbGFyZWRWYXJpYWJsZUNvbXBhcmVzVG9WYXJpYWJsZUlkZW50aXRpZmVyID0gZGVjbGFyZWRWYXJpYWJsZS5jb21wYXJlVmFyaWFibGVJZGVudGlmaWVyKFZhcmlhYmxlSWRlbnRpdGlmZXIpO1xuXG4gICAgICAgICAgICBpZiAoZGVjbGFyZWRWYXJpYWJsZUNvbXBhcmVzVG9WYXJpYWJsZUlkZW50aXRpZmVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gZGVjbGFyZWRWYXJpYWJsZTtcbiAgfVxuXG4gIGZpbmREZWNsYXJlZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTmFtZShtZXRhdmFyaWFibGVOYW1lKSB7XG4gICAgY29uc3QgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gdGhpcy5nZXREZWNsYXJlZE1ldGF2YXJpYWJsZXMoKSxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZSA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlcy5maW5kKChkZWNsYXJlZE1ldGF2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVjbGFyZWRNZXRhdmFyaWFibGVDb21wYXJlc1RvTWV0YXZhcmlhYmxlTmFtZSA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlLmNvbXBhcmVNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoZGVjbGFyZWRNZXRhdmFyaWFibGVDb21wYXJlc1RvTWV0YXZhcmlhYmxlTmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkTWV0YXZhcmlhYmxlO1xuICB9XG5cbiAgZmluZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKSB7XG4gICAgY29uc3QgbWV0YXZhcmlhYmxlID0gbnVsbDtcblxuICAgIHJldHVybiBtZXRhdmFyaWFibGU7XG4gIH1cblxuICBmaW5kU3Vic3RpdHV0aW9uQnlTdWJzdGl0dXRpb25Ob2RlKHN1YnN0aXR1dGlvbk5vZGUpIHtcbiAgICBjb25zdCBzdWJzdGl0dXRpb24gPSBudWxsO1xuXG4gICAgcmV0dXJuIHN1YnN0aXR1dGlvbjtcbiAgfVxuXG4gIGZpbmRDb25zdHJhaW50QnlDb25zdHJhaW50Tm9kZShjb25zdHJhaW50Tm9kZSkge1xuICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBudWxsO1xuXG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gIH1cblxuICBmaW5kUHJvY2VkdXJlQnlQcm9jZWR1cmVOYW1lKHByb2NlZHVyZU5hbWUpIHtcbiAgICBjb25zdCBwcm9jZWR1cmVzID0gdGhpcy5nZXRQcm9jZWR1cmVzKCksXG4gICAgICAgICAgcHJvY2VkdXJlID0gcHJvY2VkdXJlcy5maW5kKChwcm9jZWR1cmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2NlZHVyZUNvbXBhcmVzVG9Qcm9jZWR1cmVOYW1lID0gcHJvY2VkdXJlLmNvbXBhcmVQcm9jZWR1cmVOYW1lKHByb2NlZHVyZU5hbWUpO1xuXG4gICAgICAgICAgICBpZiAocHJvY2VkdXJlQ29tcGFyZXNUb1Byb2NlZHVyZU5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBwcm9jZWR1cmU7XG4gIH1cblxuICBmaW5kTWV0YVR5cGVCeU1ldGFUeXBlTmFtZShtZXRhVHlwZU5hbWUpIHsgcmV0dXJuIGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lKG1ldGFUeXBlTmFtZSk7IH1cblxuICBpc0xhYmVsUHJlc2VudEJ5TGFiZWxOb2RlKGxhYmVsTm9kZSkge1xuICAgIGNvbnN0IGxhYmVscyA9IHRoaXMuZ2V0TGFiZWxzKCksXG4gICAgICAgICAgbGFiZWxQcmVzZW50ID0gbGFiZWxzLnNvbWUoKGxhYmVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbE5vZGVNYXRjaGVzID0gbGFiZWwubWF0Y2hMYWJlbE5vZGUobGFiZWxOb2RlKTtcblxuICAgICAgICAgICAgaWYgKGxhYmVsTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gbGFiZWxQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlc2VudEJ5VHlwZU5hbWUodHlwZU5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5maW5kVHlwZUJ5VHlwZU5hbWUodHlwZU5hbWUpLFxuICAgICAgICAgIHR5cGVQcmVzZW50ID0gKHR5cGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlc2VudEJ5Tm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZpbmRUeXBlQnlOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKSxcbiAgICAgICAgICB0eXBlUHJlc2VudCA9ICh0eXBlICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0eXBlUHJlc2VudDtcbiAgfVxuXG4gIGlzVHlwZVByZXNlbnRCeVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZpbmRUeXBlQnlQcmVmaXhlZFR5cGVOYW1lKHByZWZpeGVkVHlwZU5hbWUpLFxuICAgICAgICAgIHR5cGVQcmVzZW50ID0gKHR5cGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlZml4UHJlc2VudEJ5VHlwZVByZWZpeE5hbWUodHlwZVByZWZpeE5hbWUpIHtcbiAgICBjb25zdCB0eXBlUHJlZml4ID0gdGhpcy5maW5kVHlwZVByZWZpeEJ5VHlwZVByZWZpeE5hbWUodHlwZVByZWZpeE5hbWUpLFxuICAgICAgICAgIHR5cGVQcmVmaXhQcmVzZW50ID0gKHR5cGVQcmVmaXggIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVmaXhQcmVzZW50O1xuICB9XG5cbiAgaXNEZWNsYXJlZFZhcmlhYmxlUHJlc2VudEJ5VmFyaWFibGVJZGVudGlmaWVyKHZhcmlhYmxlSWRlbnRpZmllcikge1xuICAgIGNvbnN0IGRlY2xhcmVkVmFyaWFibGUgPSB0aGlzLmZpbmREZWNsYXJlZFZhcmlhYmxlQnlWYXJpYWJsZUlkZW50aWZpZXIodmFyaWFibGVJZGVudGlmaWVyKSxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlUHJlc2VudCA9IChkZWNsYXJlZFZhcmlhYmxlICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkZWNsYXJlZFZhcmlhYmxlUHJlc2VudDtcbiAgfVxuXG4gIGlzRGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50QnlNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpIHtcbiAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZSA9IHRoaXMuZmluZERlY2xhcmVkTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudCA9IChkZWNsYXJlZE1ldGF2YXJpYWJsZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50O1xuICB9XG5cbiAgaXNQcm9jZWR1cmVQcmVzZW50QnlQcm9jZWR1cmVOYW1lKHByb2NlZHVyZU5hbWUpIHtcbiAgICBjb25zdCBwcm9jZWR1cmUgPSB0aGlzLmZpbmRQcm9jZWR1cmVCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSksXG4gICAgICAgICAgcHJvY2VkdXJlUHJlc2VudCA9IChwcm9jZWR1cmUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHByb2NlZHVyZVByZXNlbnQ7XG4gIH1cblxuICBpc01ldGFMZXZlbCgpIHtcbiAgICBjb25zdCBtZXRhTEV2ZWwgPSBmYWxzZTtcblxuICAgIHJldHVybiBtZXRhTEV2ZWw7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnR5cGVzID0gW107XG4gICAgdGhpcy5ydWxlcyA9IFtdO1xuICAgIHRoaXMuYXhpb21zID0gW107XG4gICAgdGhpcy5sZW1tYXMgPSBbXTtcbiAgICB0aGlzLnNjaGVtYXMgPSBbXTtcbiAgICB0aGlzLnRoZW9yZW1zID0gW107XG4gICAgdGhpcy5nZW5lcmF0b3JzID0gW107XG4gICAgdGhpcy5jb25qZWN0dXJlcyA9IFtdO1xuICAgIHRoaXMuY29tYmluYXRvcnMgPSBbXTtcbiAgICB0aGlzLnR5cGVQcmVmaXhlcyA9IFtdO1xuICAgIHRoaXMuY29uc3RydWN0b3JzID0gW107XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IFtdO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gW107XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICAvLy9cbiAgfVxuXG4gIGFzeW5jIHZlcmlmeUZpbGUoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Tm9kZSgpLFxuICAgICAgICAgIGNvbnRleHQgPSB0aGlzLCAvLy9cbiAgICAgICAgICBmaWxlTm9kZSA9IG5vZGUsICAvLy9cbiAgICAgICAgICBmaWxlVmVyaWZpZXMgPSBhd2FpdCB2ZXJpZnlGaWxlKGZpbGVOb2RlLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBmaWxlVmVyaWZpZXM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLmdldEpTT04oKTtcblxuICAgIGlmIChqc29uID09PSBudWxsKSB7XG4gICAgICBzdXBlci5pbml0aWFsaXNlKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlQ29udGV4dCA9IHRoaXM7IC8vL1xuXG4gICAgdGhpcy50eXBlcyA9IFtdO1xuXG4gICAgdHlwZXNGcm9tSlNPTihqc29uLCB0aGlzLnR5cGVzLCBmaWxlQ29udGV4dCk7XG5cbiAgICB0aGlzLmxlbW1hcyA9IFtdO1xuXG4gICAgdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMudHlwZVByZWZpeGVzID0gdHlwZVByZWZpeGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuZ2VuZXJhdG9ycyA9IGdlbmVyYXRvcnNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5jb21iaW5hdG9ycyA9IGNvbWJpbmF0b3JzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuY29uc3RydWN0b3JzID0gY29uc3RydWN0b3JzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuXG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuYXhpb21zID0gYXhpb21zRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuc2NoZW1hcyA9IHNjaGVtYXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy50aGVvcmVtcyA9IHRoZW9yZW1zRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCB0eXBlc0pTT04gPSB0eXBlc1RvVHlwZXNKU09OKHRoaXMudHlwZXMpLFxuICAgICAgICAgIHJ1bGVzSlNPTiA9IHJ1bGVzVG9SdWxlc0pTT04odGhpcy5ydWxlcyksXG4gICAgICAgICAgYXhpb21zSlNPTiA9IGF4aW9tc1RvQXhpb21zSlNPTih0aGlzLmF4aW9tcyksXG4gICAgICAgICAgc2NoZW1hc0pTT04gPSBzY2hlbWFzVG9TY2hlbWFzSlNPTih0aGlzLnNjaGVtYXMpLFxuICAgICAgICAgIHRoZW9yZW1zSlNPTiA9IHRoZW9yZW1zVG9UaGVvcmVtc0pTT04odGhpcy50aGVvcmVtcyksXG4gICAgICAgICAgZ2VuZXJhdG9yc0pTT04gPSBnZW5lcmF0b3JzVG9HZW5lcmF0b3JzSlNPTih0aGlzLmdlbmVyYXRvcnMpLFxuICAgICAgICAgIGNvbmplY3R1cmVzSlNPTiA9IGNvbmplY3R1cmVzVG9Db25qZWN0dXJlc0pTT04odGhpcy5jb25qZWN0dXJlcyksXG4gICAgICAgICAgY29tYmluYXRvcnNKU09OID0gY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTih0aGlzLmNvbWJpbmF0b3JzKSxcbiAgICAgICAgICB0eXBlUHJlZml4ZXNKU09OID0gdHlwZVByZWZpeGVzVG9UeXBlUHJlZml4ZXNKU09OKHRoaXMudHlwZVByZWZpeGVzKSxcbiAgICAgICAgICBjb25zdHJ1Y3RvcnNKU09OID0gY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OKHRoaXMuY29uc3RydWN0b3JzKSxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlc0pTT04gPSBkZWNsYXJlZFZhcmlhYmxlc1RvRGVjbGFyZWRWYXJpYWJsZXNKU09OKHRoaXMuZGVjbGFyZWRWYXJpYWJsZXMpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04gPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04odGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMpLFxuICAgICAgICAgIGZpbGVDb250ZW50ID0gdGhpcy5maWxlQ29udGVudCxcbiAgICAgICAgICBmaWxlUGF0aCA9IHRoaXMuZmlsZVBhdGgsXG4gICAgICAgICAgdHlwZXMgPSB0eXBlc0pTT04sICAvLy9cbiAgICAgICAgICBydWxlcyA9IHJ1bGVzSlNPTiwgIC8vL1xuICAgICAgICAgIGF4aW9tcyA9IGF4aW9tc0pTT04sICAvLy9cbiAgICAgICAgICBzY2hlbWFzID0gc2NoZW1hc0pTT04sICAvLy9cbiAgICAgICAgICB0aGVvcmVtcyA9IHRoZW9yZW1zSlNPTiwgIC8vL1xuICAgICAgICAgIGdlbmVyYXRvcnMgPSBnZW5lcmF0b3JzSlNPTiwgIC8vL1xuICAgICAgICAgIGNvbmplY3R1cmVzID0gY29uamVjdHVyZXNKU09OLCAgLy8vXG4gICAgICAgICAgY29tYmluYXRvcnMgPSBjb21iaW5hdG9yc0pTT04sICAvLy9cbiAgICAgICAgICB0eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXNKU09OLCAgLy8vXG4gICAgICAgICAgY29uc3RydWN0b3JzID0gY29uc3RydWN0b3JzSlNPTiwgIC8vL1xuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzID0gZGVjbGFyZWRWYXJpYWJsZXNKU09OLCAgLy8vXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBmaWxlQ29udGVudCxcbiAgICAgICAgICAgIGZpbGVQYXRoLFxuICAgICAgICAgICAgdHlwZXMsXG4gICAgICAgICAgICBydWxlcyxcbiAgICAgICAgICAgIGF4aW9tcyxcbiAgICAgICAgICAgIHNjaGVtYXMsXG4gICAgICAgICAgICB0aGVvcmVtcyxcbiAgICAgICAgICAgIGdlbmVyYXRvcnMsXG4gICAgICAgICAgICBjb25qZWN0dXJlcyxcbiAgICAgICAgICAgIGNvbWJpbmF0b3JzLFxuICAgICAgICAgICAgdHlwZVByZWZpeGVzLFxuICAgICAgICAgICAgY29uc3RydWN0b3JzLFxuICAgICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMsXG4gICAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXNcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUZpbGUoZmlsZSwgY29udGV4dCkge1xuICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0ID0gY29udGV4dCwgLy8vXG4gICAgICAgICAgY29tYmluZWRDdXN0b21HcmFtbWFyID0gcmVsZWFzZUNvbnRleHQuZ2V0Q29tYmluZWRDdXN0b21HcmFtbWFyKCksXG4gICAgICAgICAgbm9taW5hbExleGVyID0gbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsTGV4ZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbm9taW5hbFBhcnNlciA9IG5vbWluYWxQYXJzZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKE5vbWluYWxQYXJzZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbGV4ZXIgPSBub21pbmFsTGV4ZXIsIC8vL1xuICAgICAgICAgIHBhcnNlciA9IG5vbWluYWxQYXJzZXIsIC8vL1xuICAgICAgICAgIHR5cGVzID0gW10sXG4gICAgICAgICAgcnVsZXMgPSBbXSxcbiAgICAgICAgICBheGlvbXMgPSBbXSxcbiAgICAgICAgICBsZW1tYXMgPSBbXSxcbiAgICAgICAgICBzY2hlbWFzID0gW10sXG4gICAgICAgICAgdGhlb3JlbXMgPSBbXSxcbiAgICAgICAgICBnZW5lcmF0b3JzID0gW10sXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBbXSxcbiAgICAgICAgICBjb21iaW5hdG9ycyA9IFtdLFxuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IFtdLFxuICAgICAgICAgIGNvbnN0cnVjdG9ycyA9IFtdLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzID0gW10sXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gW10sXG4gICAgICAgICAgbm9taW5hbEZpbGVDb250ZXh0ID0gRmlsZUNvbnRleHQuZnJvbUZpbGUoTm9taW5hbEZpbGVDb250ZXh0LCBmaWxlLCBsZXhlciwgcGFyc2VyLCB0eXBlcywgcnVsZXMsIGF4aW9tcywgbGVtbWFzLCBzY2hlbWFzLCB0aGVvcmVtcywgZ2VuZXJhdG9ycywgY29uamVjdHVyZXMsIGNvbWJpbmF0b3JzLCB0eXBlUHJlZml4ZXMsIGNvbnN0cnVjdG9ycywgZGVjbGFyZWRWYXJpYWJsZXMsIGRlY2xhcmVkTWV0YXZhcmlhYmxlcywgY29udGV4dCk7XG5cbiAgICByZXR1cm4gbm9taW5hbEZpbGVDb250ZXh0O1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCByZWxlYXNlQ29udGV4dCA9IGNvbnRleHQsIC8vL1xuICAgICAgICAgIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciA9IHJlbGVhc2VDb250ZXh0LmdldENvbWJpbmVkQ3VzdG9tR3JhbW1hcigpLFxuICAgICAgICAgIG5vbWluYWxMZXhlciA9IG5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbExleGVyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIG5vbWluYWxQYXJzZXIgPSBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsUGFyc2VyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIGxleGVyID0gbm9taW5hbExleGVyLCAvLy9cbiAgICAgICAgICBwYXJzZXIgPSBub21pbmFsUGFyc2VyLCAvLy9cbiAgICAgICAgICB0eXBlcyA9IG51bGwsXG4gICAgICAgICAgcnVsZXMgPSBudWxsLFxuICAgICAgICAgIGF4aW9tcyA9IG51bGwsXG4gICAgICAgICAgbGVtbWFzID0gbnVsbCxcbiAgICAgICAgICBzY2hlbWFzID0gbnVsbCxcbiAgICAgICAgICB0aGVvcmVtcyA9IG51bGwsXG4gICAgICAgICAgZ2VuZXJhdG9ycyA9IG51bGwsXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBudWxsLFxuICAgICAgICAgIGNvbWJpbmF0b3JzID0gbnVsbCxcbiAgICAgICAgICB0eXBlUHJlZml4ZXMgPSBudWxsLFxuICAgICAgICAgIGNvbnN0cnVjdG9ycyA9IG51bGwsXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBudWxsLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IG51bGwsXG4gICAgICAgICAgbm9taW5hbEZpbGVDb250ZXh0ID0gRmlsZUNvbnRleHQuZnJvbUpTT04oTm9taW5hbEZpbGVDb250ZXh0LCBqc29uLCBsZXhlciwgcGFyc2VyLCB0eXBlcywgcnVsZXMsIGF4aW9tcywgbGVtbWFzLCBzY2hlbWFzLCB0aGVvcmVtcywgZ2VuZXJhdG9ycywgY29uamVjdHVyZXMsIGNvbWJpbmF0b3JzLCB0eXBlUHJlZml4ZXMsIGNvbnN0cnVjdG9ycywgZGVjbGFyZWRWYXJpYWJsZXMsIGRlY2xhcmVkTWV0YXZhcmlhYmxlcywgY29udGV4dCk7XG5cbiAgICByZXR1cm4gbm9taW5hbEZpbGVDb250ZXh0O1xuICB9XG59XG4iXSwibmFtZXMiOlsiTm9taW5hbEZpbGVDb250ZXh0IiwicHVzaCIsImFycmF5VXRpbGl0aWVzIiwibm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxQYXJzZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyIiwibm9taW5hbFV0aWxpdGllcyIsIkZpbGVDb250ZXh0IiwiY29udGV4dCIsImZpbGVDb250ZW50IiwiZmlsZVBhdGgiLCJ0b2tlbnMiLCJub2RlIiwianNvbiIsImxleGVyIiwicGFyc2VyIiwidHlwZXMiLCJydWxlcyIsImF4aW9tcyIsImxlbW1hcyIsInNjaGVtYXMiLCJ0aGVvcmVtcyIsImdlbmVyYXRvcnMiLCJjb25qZWN0dXJlcyIsImNvbWJpbmF0b3JzIiwidHlwZVByZWZpeGVzIiwiY29uc3RydWN0b3JzIiwiZGVjbGFyZWRWYXJpYWJsZXMiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXMiLCJnZXRMZXhlciIsImdldFBhcnNlciIsImdldEVxdWl2YWxlbmNlcyIsImVxdWl2YWxlbmNlcyIsImdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMiLCJzdWJwcm9vZk9yUHJvb2ZBc3NlcnRpb25zIiwiZ2V0TGFiZWxzIiwiaW5jbHVkZVJlbGVhc2UiLCJsYWJlbHMiLCJyZWxlYXNlQ29udGV4dExhYmVscyIsImZvckVhY2giLCJydWxlIiwicnVsZUxhYmVscyIsImF4aW9tIiwiYXhpb21MYWJlbHMiLCJsZW1tYSIsImxlbW1hTGFiZWxzIiwidGhlb3JlbSIsInRoZW9yZW1MYWJlbHMiLCJjb25qZWN0dXJlIiwiY29uamVjdHVyZUxhYmVscyIsInNjaGVtYSIsInNjaGVtYUxhYmVsIiwiZ2V0TGFiZWwiLCJnZXRUeXBlcyIsImdldFJ1bGVzIiwiZ2V0QXhpb21zIiwiZ2V0TGVtbWFzIiwiZ2V0U2NoZW1hcyIsImdldFRoZW9yZW1zIiwiZ2V0R2VuZXJhdG9ycyIsImdldENvbmplY3R1cmVzIiwiZ2V0Q29tYmluYXRvcnMiLCJnZXRUeXBlUHJlZml4ZXMiLCJnZXRDb25zdHJ1Y3RvcnMiLCJnZXRQcm9jZWR1cmVzIiwicHJvY2VkdXJlcyIsImdldFRvcExldmVsQXNzZXJ0aW9ucyIsInRvcExldmVsQXNzZXJ0aW9ucyIsImdldERlY2xhcmVkVmFyaWFibGVzIiwiZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzIiwiZ2V0VGVybXMiLCJ0ZXJtcyIsImdldEdvYWxzIiwiZ29hbHMiLCJnZXRGcmFtZXMiLCJmcmFtZXMiLCJnZXRQcm9wZXJ0aWVzIiwicHJvcGVydGllcyIsImdldEVxdWFsaXRpZXMiLCJlcXVhbGl0aWVzIiwiZ2V0SnVkZ2VtZW50cyIsImp1ZGdlbWVudHMiLCJnZXRBc3NlcnRpb25zIiwiYXNzZXJ0aW9ucyIsImdldFN0YXRlbWVudHMiLCJzdGF0ZW1lbnRzIiwiZ2V0U2lnbmF0dXJlcyIsInNpZ25hdHVyZXMiLCJnZXRSZWZlcmVuY2VzIiwicmVmZXJlbmNlcyIsImdldEFzc3VtcHRpb25zIiwiYXNzdW1wdGlvbnMiLCJnZXRNZXRhdmFyaWFibGVzIiwibWV0YXZhcmlhYmxlcyIsImdldFN1YnN0aXR1dGlvbnMiLCJzdWJzdGl0dXRpb25zIiwiZ2V0UHJvcGVydHlSZWxhdGlvbnMiLCJwcm9wZXJ0eVJlbGF0aW9ucyIsImdldERlcml2ZWRTdWJzdGl0dXRpb25zIiwiZGVyaXZlZFN1YnN0aXR1dGlvbnMiLCJhZGRUeXBlIiwidHlwZSIsImdldEZpbGVQYXRoIiwidHlwZVN0cmluZyIsImdldFN0cmluZyIsInRyYWNlIiwiYWRkUnVsZSIsInJ1bGVTdHJpbmciLCJhZGRBeGlvbSIsImF4aW9tU3RyaW5nIiwiYWRkTGVtbWEiLCJsZW1tYVN0cmluZyIsImFkZFNjaGVtYSIsInNjaGVtYVN0cmluZyIsImFkZFRoZW9yZW0iLCJ0aGVvcmVtU3RyaW5nIiwiYWRkR2VuZXJhdG9yIiwiZ2VuZXJhdG9yIiwiZ2VuZXJhdG9yU3RyaW5nIiwiYWRkQ29uamVjdHVyZSIsIm9jbmplY3R1cmVTdHJpbmciLCJhZGRDb21iaW5hdG9yIiwiY29tYmluYXRvciIsImNvbWJpbmF0b3JTdHJpbmciLCJhZGRUeXBlUHJlZml4IiwidHlwZVByZWZpeCIsInR5cGVQcmVmaXhTdHJpbmciLCJhZGRDb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3JTdHJpbmciLCJhZGREZWNsYXJlZFZhcmlhYmxlIiwiZGVjbGFyZWRWYXJpYWJsZSIsImRlY2xhcmVkVmFyaWFibGVTdHJpbmciLCJhZGREZWNsYXJlZE1ldGF2YXJpYWJsZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVTdHJpbmciLCJmaW5kTWV0YXZhcmlhYmxlIiwibWV0YXZhcmlhYmxlIiwiZmluZCIsIm1ldGF2YXJpYWJsZVVuaWZpZXMiLCJ1bmlmeU1ldGF2YXJpYWJsZSIsImZpbmRSdWxlQnlSZWZlcmVuY2UiLCJyZWZlcmVuY2UiLCJtZXRhdmFyaWFibGVOb2RlIiwiZ2V0TWV0YXZhcmlhYmxlTm9kZSIsIm1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzIiwibWF0Y2hNZXRhdmFyaWFibGVOb2RlIiwiZmluZEF4aW9tQnlSZWZlcmVuY2UiLCJmaW5kTGVtbWFCeVJlZmVyZW5jZSIsImZpbmRUaGVvcmVtQnlSZWZlcmVuY2UiLCJmaW5kQ29uamVjdHVyZUJ5UmVmZXJlbmNlIiwiZmluZFRvcExldmVsQXNzZXJ0aW9uQnlSZWZlcmVuY2UiLCJ0b3BMRXZlbEFzc2VydGlvbnMiLCJ0b3BMZXZlbEFzc2VydGlvbiIsImZpbmRUeXBlQnlUeXBlTmFtZSIsInR5cGVOYW1lIiwiZmluZFR5cGUiLCJ0eXBlQ29tcGFyZXNUb1R5cGVOYW1lIiwiY29tcGFyZVR5cGVOYW1lIiwiZmluZFR5cGVCeU5vbWluYWxUeXBlTmFtZSIsIm5vbWluYWxUeXBlTmFtZSIsInR5cGVDb21wYXJlc1RvTm9taW5hbFR5cGVOYW1lIiwiY29tcGFyZU5vbWluYWxUeXBlTmFtZSIsImZpbmRUeXBlQnlQcmVmaXhlZFR5cGVOYW1lIiwicHJlZml4ZWRUeXBlTmFtZSIsInR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSIsImNvbXBhcmVQcmVmaXhlZFR5cGVOYW1lIiwiZmluZFR5cGVQcmVmaXhCeVR5cGVQcmVmaXhOYW1lIiwidHlwZVByZWZpeE5hbWUiLCJ0eXBlUHJlZml4Q29tcGFyZXNUb1R5cGVQcmVmaXhOYW1lIiwiY29tcGFyZVR5cGVQcmVmaXhOYW1lIiwiZmluZERlY2xhcmVkVmFyaWFibGVCeVZhcmlhYmxlSWRlbnRpZmllciIsIlZhcmlhYmxlSWRlbnRpdGlmZXIiLCJkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIiLCJjb21wYXJlVmFyaWFibGVJZGVudGlmaWVyIiwiZmluZERlY2xhcmVkTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOYW1lIiwibWV0YXZhcmlhYmxlTmFtZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlQ29tcGFyZXNUb01ldGF2YXJpYWJsZU5hbWUiLCJjb21wYXJlTWV0YXZhcmlhYmxlTmFtZSIsImZpbmRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5vZGUiLCJmaW5kU3Vic3RpdHV0aW9uQnlTdWJzdGl0dXRpb25Ob2RlIiwic3Vic3RpdHV0aW9uTm9kZSIsInN1YnN0aXR1dGlvbiIsImZpbmRDb25zdHJhaW50QnlDb25zdHJhaW50Tm9kZSIsImNvbnN0cmFpbnROb2RlIiwiY29uc3RyYWludCIsImZpbmRQcm9jZWR1cmVCeVByb2NlZHVyZU5hbWUiLCJwcm9jZWR1cmVOYW1lIiwicHJvY2VkdXJlIiwicHJvY2VkdXJlQ29tcGFyZXNUb1Byb2NlZHVyZU5hbWUiLCJjb21wYXJlUHJvY2VkdXJlTmFtZSIsImZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lIiwibWV0YVR5cGVOYW1lIiwiaXNMYWJlbFByZXNlbnRCeUxhYmVsTm9kZSIsImxhYmVsTm9kZSIsImxhYmVsUHJlc2VudCIsInNvbWUiLCJsYWJlbCIsImxhYmVsTm9kZU1hdGNoZXMiLCJtYXRjaExhYmVsTm9kZSIsImlzVHlwZVByZXNlbnRCeVR5cGVOYW1lIiwidHlwZVByZXNlbnQiLCJpc1R5cGVQcmVzZW50QnlOb21pbmFsVHlwZU5hbWUiLCJpc1R5cGVQcmVzZW50QnlQcmVmaXhlZFR5cGVOYW1lIiwiaXNUeXBlUHJlZml4UHJlc2VudEJ5VHlwZVByZWZpeE5hbWUiLCJ0eXBlUHJlZml4UHJlc2VudCIsImlzRGVjbGFyZWRWYXJpYWJsZVByZXNlbnRCeVZhcmlhYmxlSWRlbnRpZmllciIsInZhcmlhYmxlSWRlbnRpZmllciIsImRlY2xhcmVkVmFyaWFibGVQcmVzZW50IiwiaXNEZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnRCeU1ldGF2YXJpYWJsZU5hbWUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnQiLCJpc1Byb2NlZHVyZVByZXNlbnRCeVByb2NlZHVyZU5hbWUiLCJwcm9jZWR1cmVQcmVzZW50IiwiaXNNZXRhTGV2ZWwiLCJtZXRhTEV2ZWwiLCJjbGVhciIsImNvbXBsZXRlIiwidmVyaWZ5RmlsZSIsImdldE5vZGUiLCJmaWxlTm9kZSIsImZpbGVWZXJpZmllcyIsImluaXRpYWxpc2UiLCJnZXRKU09OIiwiZmlsZUNvbnRleHQiLCJ0eXBlc0Zyb21KU09OIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVzRnJvbUpTT04iLCJkZWNsYXJlZFZhcmlhYmxlc0Zyb21KU09OIiwidHlwZVByZWZpeGVzRnJvbUpTT04iLCJnZW5lcmF0b3JzRnJvbUpTT04iLCJjb21iaW5hdG9yc0Zyb21KU09OIiwiY29uc3RydWN0b3JzRnJvbUpTT04iLCJydWxlc0Zyb21KU09OIiwiYXhpb21zRnJvbUpTT04iLCJzY2hlbWFzRnJvbUpTT04iLCJ0aGVvcmVtc0Zyb21KU09OIiwiY29uamVjdHVyZXNGcm9tSlNPTiIsInRvSlNPTiIsInR5cGVzSlNPTiIsInR5cGVzVG9UeXBlc0pTT04iLCJydWxlc0pTT04iLCJydWxlc1RvUnVsZXNKU09OIiwiYXhpb21zSlNPTiIsImF4aW9tc1RvQXhpb21zSlNPTiIsInNjaGVtYXNKU09OIiwic2NoZW1hc1RvU2NoZW1hc0pTT04iLCJ0aGVvcmVtc0pTT04iLCJ0aGVvcmVtc1RvVGhlb3JlbXNKU09OIiwiZ2VuZXJhdG9yc0pTT04iLCJnZW5lcmF0b3JzVG9HZW5lcmF0b3JzSlNPTiIsImNvbmplY3R1cmVzSlNPTiIsImNvbmplY3R1cmVzVG9Db25qZWN0dXJlc0pTT04iLCJjb21iaW5hdG9yc0pTT04iLCJjb21iaW5hdG9yc1RvQ29tYmluYXRvcnNKU09OIiwidHlwZVByZWZpeGVzSlNPTiIsInR5cGVQcmVmaXhlc1RvVHlwZVByZWZpeGVzSlNPTiIsImNvbnN0cnVjdG9yc0pTT04iLCJjb25zdHJ1Y3RvcnNUb0NvbnN0cnVjdG9yc0pTT04iLCJkZWNsYXJlZFZhcmlhYmxlc0pTT04iLCJkZWNsYXJlZFZhcmlhYmxlc1RvRGVjbGFyZWRWYXJpYWJsZXNKU09OIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiIsImRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiIsImZyb21GaWxlIiwiZmlsZSIsInJlbGVhc2VDb250ZXh0IiwiY29tYmluZWRDdXN0b21HcmFtbWFyIiwiZ2V0Q29tYmluZWRDdXN0b21HcmFtbWFyIiwibm9taW5hbExleGVyIiwiTm9taW5hbExleGVyIiwibm9taW5hbFBhcnNlciIsIk5vbWluYWxQYXJzZXIiLCJub21pbmFsRmlsZUNvbnRleHQiLCJmcm9tSlNPTiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBdUNBOzs7ZUFBcUJBOzs7Z0NBckN5QjsyQkFDZjs4REFFTjsrREFDQzt3QkFFQztzQkFDaUI7MkJBQ0Q7c0JBd0JzQjs7Ozs7O0FBRWpFLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUdDLHlCQUFjLEVBQ3pCLEVBQUVDLHFDQUFxQyxFQUFFQyxzQ0FBc0MsRUFBRSxHQUFHQyxnQ0FBZ0I7QUFFM0YsTUFBTUwsMkJBQTJCTSwyQkFBVztJQUN6RCxZQUFZQyxPQUFPLEVBQUVDLFdBQVcsRUFBRUMsUUFBUSxFQUFFQyxNQUFNLEVBQUVDLElBQUksRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsRUFBRUMsVUFBVSxFQUFFQyxXQUFXLEVBQUVDLFdBQVcsRUFBRUMsWUFBWSxFQUFFQyxZQUFZLEVBQUVDLGlCQUFpQixFQUFFQyxxQkFBcUIsQ0FBRTtRQUMxTyxLQUFLLENBQUNwQixTQUFTQyxhQUFhQyxVQUFVQyxRQUFRQyxNQUFNQztRQUVwRCxJQUFJLENBQUNDLEtBQUssR0FBR0E7UUFDYixJQUFJLENBQUNDLE1BQU0sR0FBR0E7UUFDZCxJQUFJLENBQUNQLE9BQU8sR0FBR0E7UUFDZixJQUFJLENBQUNFLFFBQVEs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