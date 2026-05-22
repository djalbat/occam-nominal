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
    constructor(context, fileContent, filePath, tokens, node, json, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables){
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
    addTheorem(theorem) {
        this.theorems.push(theorem);
        const filePath = this.getFilePath(), theoremString = theorem.getString();
        this.trace(`Added the '${theoremString}' theorem to the '${filePath}' file context.`);
    }
    addSchema(schema) {
        this.schemas.push(schema);
        const filePath = this.getFilePath(), schemaString = schema.getString();
        this.trace(`Added the '${schemaString}' schema to the '${filePath}' file context.`);
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
    addSchema(schema) {
        this.schemas.push(schema);
        const filePath = this.getFilePath(), schemaString = schema.getString();
        this.trace(`Added the '${schemaString}' schema to the '${filePath}' file context.`);
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
        let types = this.getTypes(includeRelease);
        const baseType = (0, _type.baseTypeFromNothing)();
        types = [
            ...types,
            baseType
        ];
        const type = types.find((type)=>{
            const typeComparesToTypeName = type.compareTypeName(typeName);
            if (typeComparesToTypeName) {
                return true;
            }
        }) || null;
        return type;
    }
    findTypeByNominalTypeName(nominalTypeName) {
        let types = this.getTypes();
        const baseType = (0, _type.baseTypeFromNothing)();
        types = [
            ...types,
            baseType
        ];
        const type = types.find((type)=>{
            const typeComparesToNominalTypeName = type.compareNominalTypeName(nominalTypeName);
            if (typeComparesToNominalTypeName) {
                return true;
            }
        }) || null;
        return type;
    }
    findTypeByPrefixedTypeName(prefixedTypeName) {
        let types = this.getTypes();
        const baseType = (0, _type.baseTypeFromNothing)();
        types = [
            ...types,
            baseType
        ];
        const type = types.find((type)=>{
            const typeComparesToPrefixedTypeName = type.comparePrefixedTypeName(prefixedTypeName);
            if (typeComparesToPrefixedTypeName) {
                return true;
            }
        }) || null;
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
        this.combinators = (0, _json.combinatorsFromJSON)(json, fileContext);
        this.constructors = (0, _json.constructorsFromJSON)(json, fileContext);
        this.rules = (0, _json.rulesFromJSON)(json, fileContext);
        this.axioms = (0, _json.axiomsFromJSON)(json, fileContext);
        this.schemas = (0, _json.schemasFromJSON)(json, fileContext);
        this.theorems = (0, _json.theoremsFromJSON)(json, fileContext);
        this.conjectures = (0, _json.conjecturesFromJSON)(json, fileContext);
    }
    toJSON() {
        const typesJSON = (0, _json.typesToTypesJSON)(this.types), rulesJSON = (0, _json.rulesToRulesJSON)(this.rules), axiomsJSON = (0, _json.axiomsToAxiomsJSON)(this.axioms), schemasJSON = (0, _json.schemasToSchemasJSON)(this.schemas), theoremsJSON = (0, _json.theoremsToTheoremsJSON)(this.theorems), conjecturesJSON = (0, _json.conjecturesToConjecturesJSON)(this.conjectures), combinatorsJSON = (0, _json.combinatorsToCombinatorsJSON)(this.combinators), typePrefixesJSON = (0, _json.typePrefixesToTypePrefixesJSON)(this.typePrefixes), constructorsJSON = (0, _json.constructorsToConstructorsJSON)(this.constructors), declaredVariablesJSON = (0, _json.declaredVariablesToDeclaredVariablesJSON)(this.declaredVariables), declaredMetavariablesJSON = (0, _json.declaredMetavariablesToDeclaredMetavariablesJSON)(this.declaredMetavariables), fileContent = this.fileContent, filePath = this.filePath, types = typesJSON, rules = rulesJSON, axioms = axiomsJSON, schemas = schemasJSON, theorems = theoremsJSON, conjectures = conjecturesJSON, combinators = combinatorsJSON, typePrefixes = typePrefixesJSON, constructors = constructorsJSON, declaredVariables = declaredVariablesJSON, declaredMetavariables = declaredMetavariablesJSON, json = {
            fileContent,
            filePath,
            types,
            rules,
            axioms,
            schemas,
            theorems,
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
        const releaseContext = context, combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(), nominalLexer = nominalLexerFromCombinedCustomGrammar(_lexer.default, combinedCustomGrammar), nominalParser = nominalParserFromCombinedCustomGrammar(_parser.default, combinedCustomGrammar), lexer = nominalLexer, parser = nominalParser, types = [], rules = [], axioms = [], lemmas = [], schemas = [], theorems = [], conjectures = [], combinators = [], typePrefixes = [], constructors = [], declaredVariables = [], declaredMetavariables = [], nominalFileContext = _occamlanguages.FileContext.fromFile(NominalFileContext, file, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables, context);
        return nominalFileContext;
    }
    static fromJSON(json, context) {
        const releaseContext = context, combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(), nominalLexer = nominalLexerFromCombinedCustomGrammar(_lexer.default, combinedCustomGrammar), nominalParser = nominalParserFromCombinedCustomGrammar(_parser.default, combinedCustomGrammar), lexer = nominalLexer, parser = nominalParser, types = null, rules = null, axioms = null, lemmas = null, schemas = null, theorems = null, conjectures = null, combinators = null, typePrefixes = null, constructors = null, declaredVariables = null, declaredMetavariables = null, nominalFileContext = _occamlanguages.FileContext.fromJSON(NominalFileContext, json, lexer, parser, types, rules, axioms, lemmas, schemas, theorems, conjectures, combinators, typePrefixes, constructors, declaredVariables, declaredMetavariables, context);
        return nominalFileContext;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L2ZpbGUvbm9taW5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRmlsZUNvbnRleHQsIG5vbWluYWxVdGlsaXRpZXMgfSBmcm9tIFwib2NjYW0tbGFuZ3VhZ2VzXCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IE5vbWluYWxMZXhlciBmcm9tIFwiLi4vLi4vbm9taW5hbC9sZXhlclwiO1xuaW1wb3J0IE5vbWluYWxQYXJzZXIgZnJvbSBcIi4uLy4uL25vbWluYWwvcGFyc2VyXCI7XG5cbmltcG9ydCB7IHZlcmlmeUZpbGUgfSBmcm9tIFwiLi4vLi4vcHJvY2Vzcy92ZXJpZnlcIjtcbmltcG9ydCB7IGJhc2VUeXBlRnJvbU5vdGhpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3R5cGVcIjtcbmltcG9ydCB7IGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lIH0gZnJvbSBcIi4uLy4uL21ldGFUeXBlc1wiO1xuaW1wb3J0IHsgdHlwZXNGcm9tSlNPTixcbiAgICAgICAgIHJ1bGVzRnJvbUpTT04sXG4gICAgICAgICBheGlvbXNGcm9tSlNPTixcbiAgICAgICAgIHNjaGVtYXNGcm9tSlNPTixcbiAgICAgICAgIHR5cGVzVG9UeXBlc0pTT04sXG4gICAgICAgICB0aGVvcmVtc0Zyb21KU09OLFxuICAgICAgICAgcnVsZXNUb1J1bGVzSlNPTixcbiAgICAgICAgIGF4aW9tc1RvQXhpb21zSlNPTixcbiAgICAgICAgIGNvbmplY3R1cmVzRnJvbUpTT04sXG4gICAgICAgICBjb21iaW5hdG9yc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzRnJvbUpTT04sXG4gICAgICAgICBjb25zdHJ1Y3RvcnNGcm9tSlNPTixcbiAgICAgICAgIHNjaGVtYXNUb1NjaGVtYXNKU09OLFxuICAgICAgICAgdGhlb3JlbXNUb1RoZW9yZW1zSlNPTixcbiAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04sXG4gICAgICAgICBjb25qZWN0dXJlc1RvQ29uamVjdHVyZXNKU09OLFxuICAgICAgICAgY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzVG9UeXBlUHJlZml4ZXNKU09OLFxuICAgICAgICAgY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OLFxuICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvanNvblwiO1xuXG5jb25zdCB7IHB1c2ggfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBub21pbmFsTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyLCBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9ID0gbm9taW5hbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9taW5hbEZpbGVDb250ZXh0IGV4dGVuZHMgRmlsZUNvbnRleHQge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0LCBmaWxlQ29udGVudCwgZmlsZVBhdGgsIHRva2Vucywgbm9kZSwganNvbiwgbGV4ZXIsIHBhcnNlciwgdHlwZXMsIHJ1bGVzLCBheGlvbXMsIGxlbW1hcywgc2NoZW1hcywgdGhlb3JlbXMsIGNvbmplY3R1cmVzLCBjb21iaW5hdG9ycywgdHlwZVByZWZpeGVzLCBjb25zdHJ1Y3RvcnMsIGRlY2xhcmVkVmFyaWFibGVzLCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMpIHtcbiAgICBzdXBlcihjb250ZXh0LCBmaWxlQ29udGVudCwgZmlsZVBhdGgsIHRva2Vucywgbm9kZSwganNvbik7XG5cbiAgICB0aGlzLmxleGVyID0gbGV4ZXI7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG4gICAgdGhpcy50b2tlbnMgPSB0b2tlbnM7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICB0aGlzLnR5cGVzID0gdHlwZXM7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuYXhpb21zID0gYXhpb21zO1xuICAgIHRoaXMubGVtbWFzID0gbGVtbWFzO1xuICAgIHRoaXMuc2NoZW1hcyA9IHNjaGVtYXM7XG4gICAgdGhpcy50aGVvcmVtcyA9IHRoZW9yZW1zO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlcztcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnM7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnM7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0TGV4ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV4ZXI7XG4gIH1cblxuICBnZXRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VyO1xuICB9XG5cbiAgZ2V0RXF1aXZhbGVuY2VzKCkge1xuICAgIGNvbnN0IGVxdWl2YWxlbmNlcyA9IFtdO1xuXG4gICAgcmV0dXJuIGVxdWl2YWxlbmNlcztcbiAgfVxuXG4gIGdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMoKSB7XG4gICAgY29uc3Qgc3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyA9IFtdO1xuXG4gICAgcmV0dXJuIHN1YnByb29mT3JQcm9vZkFzc2VydGlvbnM7XG4gIH1cblxuICBnZXRMYWJlbHMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gW107XG5cbiAgICBpZiAoaW5jbHVkZVJlbGVhc2UpIHtcbiAgICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0TGFiZWxzID0gdGhpcy5jb250ZXh0LmdldExhYmVscygpO1xuXG4gICAgICBwdXNoKGxhYmVscywgcmVsZWFzZUNvbnRleHRMYWJlbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgY29uc3QgcnVsZUxhYmVscyA9IHJ1bGUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIHJ1bGVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYXhpb21zLmZvckVhY2goKGF4aW9tKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aW9tTGFiZWxzID0gYXhpb20uZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGF4aW9tTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxlbW1hcy5mb3JFYWNoKChsZW1tYSkgPT4ge1xuICAgICAgICBjb25zdCBsZW1tYUxhYmVscyA9IGxlbW1hLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCBsZW1tYUxhYmVscyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50aGVvcmVtcy5mb3JFYWNoKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHRoZW9yZW1MYWJlbHMgPSB0aGVvcmVtLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCB0aGVvcmVtTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbmplY3R1cmVzLmZvckVhY2goKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgY29uc3QgY29uamVjdHVyZUxhYmVscyA9IGNvbmplY3R1cmUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGNvbmplY3R1cmVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2NoZW1hcy5mb3JFYWNoKChzY2hlbWEpID0+IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hTGFiZWwgPSBzY2hlbWEuZ2V0TGFiZWwoKTtcblxuICAgICAgICBsYWJlbHMucHVzaChzY2hlbWFMYWJlbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWxzO1xuICB9XG5cbiAgZ2V0VHlwZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUeXBlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVzO1xuXG4gICAgcmV0dXJuIHR5cGVzO1xuICB9XG5cbiAgZ2V0UnVsZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgcnVsZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRSdWxlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bGVzO1xuXG4gICAgcmV0dXJuIHJ1bGVzO1xuICB9XG5cbiAgZ2V0QXhpb21zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGF4aW9tcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRBeGlvbXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpb21zO1xuXG4gICAgcmV0dXJuIGF4aW9tcztcbiAgfVxuXG4gIGdldExlbW1hcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBsZW1tYXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0TGVtbWFzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxlbW1hcztcblxuICAgIHJldHVybiBsZW1tYXM7XG4gIH1cblxuICBnZXRTY2hlbWFzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNjaGVtYXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldFNjaGVtYXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVtYXM7XG5cbiAgICByZXR1cm4gc2NoZW1hcztcbiAgfVxuXG4gIGdldFRoZW9yZW1zKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHRoZW9yZW1zID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0VGhlb3JlbXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVvcmVtcztcblxuICAgIHJldHVybiB0aGVvcmVtcztcbiAgfVxuXG4gIGdldENvbmplY3R1cmVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGNvbmplY3R1cmVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0Q29uamVjdHVyZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25qZWN0dXJlcztcblxuICAgIHJldHVybiBjb25qZWN0dXJlcztcbiAgfVxuXG4gIGdldENvbWJpbmF0b3JzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGNvbWJpbmF0b3JzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0Q29tYmluYXRvcnMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21iaW5hdG9ycztcblxuICAgIHJldHVybiBjb21iaW5hdG9ycztcbiAgfVxuXG4gIGdldFR5cGVQcmVmaXhlcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCB0eXBlUHJlZml4ZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0VHlwZVByZWZpeGVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVQcmVmaXhlcztcblxuICAgIHJldHVybiB0eXBlUHJlZml4ZXM7XG4gIH1cblxuICBnZXRDb25zdHJ1Y3RvcnMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgY29uc3RydWN0b3JzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldENvbnN0cnVjdG9ycygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvcnM7XG5cbiAgICByZXR1cm4gY29uc3RydWN0b3JzO1xuICB9XG5cbiAgZ2V0UHJvY2VkdXJlcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBwcm9jZWR1cmVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0UHJvY2VkdXJlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsOyAgLy8vXG5cbiAgICByZXR1cm4gcHJvY2VkdXJlcztcbiAgfVxuXG4gIGdldFRvcExldmVsQXNzZXJ0aW9ucyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBsZW1tYXMgPSB0aGlzLmdldExlbW1hcyhpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgYXhpb21zID0gdGhpcy5nZXRBeGlvbXMoaW5jbHVkZVJlbGVhc2UpLFxuICAgICAgICAgIHRoZW9yZW1zID0gdGhpcy5nZXRUaGVvcmVtcyhpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgY29uamVjdHVyZXMgPSB0aGlzLmdldENvbmplY3R1cmVzKGluY2x1ZGVSZWxlYXNlKSxcbiAgICAgICAgICB0b3BMZXZlbEFzc2VydGlvbnMgPSBbXG4gICAgICAgICAgICAuLi5sZW1tYXMsXG4gICAgICAgICAgICAuLi5heGlvbXMsXG4gICAgICAgICAgICAuLi50aGVvcmVtcyxcbiAgICAgICAgICAgIC4uLmNvbmplY3R1cmVzXG4gICAgICAgICAgXTtcblxuICAgIHJldHVybiB0b3BMZXZlbEFzc2VydGlvbnM7XG4gIH1cblxuICBnZXREZWNsYXJlZFZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNsYXJlZFZhcmlhYmxlcztcbiAgfVxuXG4gIGdldERlY2xhcmVkTWV0YXZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXM7XG4gIH1cblxuICBnZXRUZXJtcyh0ZXJtcyA9IFtdKSB7XG4gICAgcmV0dXJuIHRlcm1zO1xuICB9XG5cbiAgZ2V0R29hbHMoZ29hbHMgPSBbXSkge1xuICAgIHJldHVybiBnb2FscztcbiAgfVxuXG4gIGdldEZyYW1lcyhmcmFtZXMgPSBbXSkge1xuICAgIHJldHVybiBmcmFtZXM7XG4gIH1cblxuICBnZXRQcm9wZXJ0aWVzKHByb3BlcnRpZXMgPSBbXSkge1xuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9XG5cbiAgZ2V0RXF1YWxpdGllcyhlcXVhbGl0aWVzID0gW10pIHtcbiAgICByZXR1cm4gZXF1YWxpdGllcztcbiAgfVxuXG4gIGdldEp1ZGdlbWVudHMoanVkZ2VtZW50cyA9IFtdKSB7XG4gICAgcmV0dXJuIGp1ZGdlbWVudHM7XG4gIH1cblxuICBnZXRBc3NlcnRpb25zKGFzc2VydGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBhc3NlcnRpb25zO1xuICB9XG5cbiAgZ2V0U3RhdGVtZW50cyhzdGF0ZW1lbnRzID0gW10pIHtcbiAgICByZXR1cm4gc3RhdGVtZW50cztcbiAgfVxuXG4gIGdldFNpZ25hdHVyZXMoc2lnbmF0dXJlcyA9IFtdKSB7XG4gICAgcmV0dXJuIHNpZ25hdHVyZXM7XG4gIH1cblxuICBnZXRSZWZlcmVuY2VzKHJlZmVyZW5jZXMgPSBbXSkge1xuICAgIHJldHVybiByZWZlcmVuY2VzO1xuICB9XG5cbiAgZ2V0QXNzdW1wdGlvbnMoYXNzdW1wdGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBhc3N1bXB0aW9ucztcbiAgfVxuXG4gIGdldE1ldGF2YXJpYWJsZXMobWV0YXZhcmlhYmxlcyA9IFtdKSB7XG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZXM7XG4gIH1cblxuICBnZXRTdWJzdGl0dXRpb25zKHN1YnN0aXR1dGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBzdWJzdGl0dXRpb25zO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlSZWxhdGlvbnMocHJvcGVydHlSZWxhdGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBwcm9wZXJ0eVJlbGF0aW9ucztcbiAgfVxuXG4gIGdldERlcml2ZWRTdWJzdGl0dXRpb25zKGRlcml2ZWRTdWJzdGl0dXRpb25zID0gW10pIHtcbiAgICByZXR1cm4gZGVyaXZlZFN1YnN0aXR1dGlvbnM7XG4gIH1cblxuICBhZGRUeXBlKHR5cGUpIHtcbiAgICB0aGlzLnR5cGVzLnB1c2godHlwZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0eXBlU3RyaW5nID0gdHlwZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0eXBlU3RyaW5nfScgdHlwZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFJ1bGUocnVsZSkge1xuICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHJ1bGVTdHJpbmcgPSBydWxlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3J1bGVTdHJpbmd9JyBydWxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkQXhpb20oYXhpb20pIHtcbiAgICB0aGlzLmF4aW9tcy5wdXNoKGF4aW9tKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGF4aW9tU3RyaW5nID0gYXhpb20uZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7YXhpb21TdHJpbmd9JyBheGlvbSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZExlbW1hKGxlbW1hKSB7XG4gICAgdGhpcy5sZW1tYXMucHVzaChsZW1tYSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBsZW1tYVN0cmluZyA9IGxlbW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2xlbW1hU3RyaW5nfScgbGVtbWEgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRUaGVvcmVtKHRoZW9yZW0pIHtcbiAgICB0aGlzLnRoZW9yZW1zLnB1c2godGhlb3JlbSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0aGVvcmVtU3RyaW5nID0gdGhlb3JlbS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0aGVvcmVtU3RyaW5nfScgdGhlb3JlbSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFNjaGVtYShzY2hlbWEpIHtcbiAgICB0aGlzLnNjaGVtYXMucHVzaChzY2hlbWEpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgc2NoZW1hU3RyaW5nID0gc2NoZW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3NjaGVtYVN0cmluZ30nIHNjaGVtYSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZENvbmplY3R1cmUoY29uamVjdHVyZSkge1xuICAgIHRoaXMuY29uamVjdHVyZXMucHVzaChjb25qZWN0dXJlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIG9jbmplY3R1cmVTdHJpbmcgPSBjb25qZWN0dXJlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke29jbmplY3R1cmVTdHJpbmd9JyBvY25qZWN0dXJlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkQ29tYmluYXRvcihjb21iaW5hdG9yKSB7XG4gICAgdGhpcy5jb21iaW5hdG9ycy5wdXNoKGNvbWJpbmF0b3IpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgY29tYmluYXRvclN0cmluZyA9IGNvbWJpbmF0b3IuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7Y29tYmluYXRvclN0cmluZ30nIGNvbWJpbmF0b3IgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRUeXBlUHJlZml4KHR5cGVQcmVmaXgpIHtcbiAgICB0aGlzLnR5cGVQcmVmaXhlcy5wdXNoKHR5cGVQcmVmaXgpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgdHlwZVByZWZpeFN0cmluZyA9IHR5cGVQcmVmaXguZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7dHlwZVByZWZpeFN0cmluZ30nIHR5cGUtcHJlZml4IHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkQ29uc3RydWN0b3IoY29uc3RydWN0b3IpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9ycy5wdXNoKGNvbnN0cnVjdG9yKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGNvbnN0cnVjdG9yU3RyaW5nID0gY29uc3RydWN0b3IuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7Y29uc3RydWN0b3JTdHJpbmd9JyBjb25zdHJ1Y3RvciB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFNjaGVtYShzY2hlbWEpIHtcbiAgICB0aGlzLnNjaGVtYXMucHVzaChzY2hlbWEpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgc2NoZW1hU3RyaW5nID0gc2NoZW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3NjaGVtYVN0cmluZ30nIHNjaGVtYSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZERlY2xhcmVkVmFyaWFibGUoZGVjbGFyZWRWYXJpYWJsZSkge1xuICAgIHRoaXMuZGVjbGFyZWRWYXJpYWJsZXMucHVzaChkZWNsYXJlZFZhcmlhYmxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVTdHJpbmcgPSBkZWNsYXJlZFZhcmlhYmxlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2RlY2xhcmVkVmFyaWFibGVTdHJpbmd9JyBkZWNsYXJlZCB2YXJpYWJsZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZERlY2xhcmVkTWV0YXZhcmlhYmxlKGRlY2xhcmVkTWV0YXZhcmlhYmxlKSB7XG4gICAgdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMucHVzaChkZWNsYXJlZE1ldGF2YXJpYWJsZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZVN0cmluZyA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2RlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nfScgZGVjbGFyZWQgbWV0YXZhcmlhYmxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgZmluZE1ldGF2YXJpYWJsZShtZXRhdmFyaWFibGUsIGNvbnRleHQpIHtcbiAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSB0aGlzLmdldERlY2xhcmVkTWV0YXZhcmlhYmxlcygpO1xuXG4gICAgbWV0YXZhcmlhYmxlID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzLmZpbmQoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhdmFyaWFibGVVbmlmaWVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGUudW5pZnlNZXRhdmFyaWFibGUobWV0YXZhcmlhYmxlLCBjb250ZXh0KTtcblxuICAgICAgaWYgKG1ldGF2YXJpYWJsZVVuaWZpZXMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBtZXRhdmFyaWFibGU7XG4gIH1cblxuICBmaW5kUnVsZUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5nZXRSdWxlcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIHJ1bGUgPSBydWxlcy5maW5kKChydWxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IHJ1bGUubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBydWxlO1xuICB9XG5cbiAgZmluZEF4aW9tQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgYXhpb21zID0gdGhpcy5nZXRBeGlvbXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBheGlvbSA9IGF4aW9tcy5maW5kKChheGlvbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBheGlvbS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGF4aW9tO1xuICB9XG5cbiAgZmluZExlbW1hQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgbGVtbWFzID0gdGhpcy5nZXRMZW1tYXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBsZW1tYSA9IGxlbW1hcy5maW5kKChsZW1tYSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBsZW1tYS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGxlbW1hO1xuICB9XG5cbiAgZmluZFRoZW9yZW1CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCB0aGVvcmVtcyA9IHRoaXMuZ2V0VGhlb3JlbXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICB0aGVvcmVtID0gdGhlb3JlbXMuZmluZCgodGhlb3JlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSB0aGVvcmVtLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdGhlb3JlbTtcbiAgfVxuXG4gIGZpbmRDb25qZWN0dXJlQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgY29uamVjdHVyZXMgPSB0aGlzLmdldENvbmplY3R1cmVzKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgY29uamVjdHVyZSA9IGNvbmplY3R1cmVzLmZpbmQoKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gY29uamVjdHVyZS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGNvbmplY3R1cmU7XG4gIH1cblxuICBmaW5kVG9wTGV2ZWxBc3NlcnRpb25CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCB0b3BMRXZlbEFzc2VydGlvbnMgPSB0aGlzLmdldFRvcExldmVsQXNzZXJ0aW9ucygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIHRvcExldmVsQXNzZXJ0aW9uID0gdG9wTEV2ZWxBc3NlcnRpb25zLmZpbmQoKHRvcExldmVsQXNzZXJ0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IHRvcExldmVsQXNzZXJ0aW9uLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdG9wTGV2ZWxBc3NlcnRpb247XG4gIH1cblxuICBmaW5kVHlwZUJ5VHlwZU5hbWUodHlwZU5hbWUsIGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGxldCB0eXBlcyA9IHRoaXMuZ2V0VHlwZXMoaW5jbHVkZVJlbGVhc2UpO1xuXG4gICAgY29uc3QgYmFzZVR5cGUgPSBiYXNlVHlwZUZyb21Ob3RoaW5nKCk7XG5cbiAgICB0eXBlcyA9IFtcbiAgICAgIC4uLnR5cGVzLFxuICAgICAgYmFzZVR5cGVcbiAgICBdO1xuXG4gICAgY29uc3QgdHlwZSA9IHR5cGVzLmZpbmQoKHR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvVHlwZU5hbWUgPSB0eXBlLmNvbXBhcmVUeXBlTmFtZSh0eXBlTmFtZSk7XG5cbiAgICAgIGlmICh0eXBlQ29tcGFyZXNUb1R5cGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGZpbmRUeXBlQnlOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKSB7XG4gICAgbGV0IHR5cGVzID0gdGhpcy5nZXRUeXBlcygpO1xuXG4gICAgY29uc3QgYmFzZVR5cGUgPSBiYXNlVHlwZUZyb21Ob3RoaW5nKCk7XG5cbiAgICB0eXBlcyA9IFtcbiAgICAgIC4uLnR5cGVzLFxuICAgICAgYmFzZVR5cGVcbiAgICBdO1xuXG4gICAgY29uc3QgdHlwZSA9IHR5cGVzLmZpbmQoKHR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvTm9taW5hbFR5cGVOYW1lID0gdHlwZS5jb21wYXJlTm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSk7XG5cbiAgICAgIGlmICh0eXBlQ29tcGFyZXNUb05vbWluYWxUeXBlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBmaW5kVHlwZUJ5UHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKSB7XG4gICAgbGV0IHR5cGVzID0gdGhpcy5nZXRUeXBlcygpO1xuXG4gICAgY29uc3QgYmFzZVR5cGUgPSBiYXNlVHlwZUZyb21Ob3RoaW5nKCk7XG5cbiAgICB0eXBlcyA9IFtcbiAgICAgIC4uLnR5cGVzLFxuICAgICAgYmFzZVR5cGVcbiAgICBdO1xuXG4gICAgY29uc3QgdHlwZSA9IHR5cGVzLmZpbmQoKHR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSA9IHR5cGUuY29tcGFyZVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSk7XG5cbiAgICAgIGlmICh0eXBlQ29tcGFyZXNUb1ByZWZpeGVkVHlwZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgZmluZFR5cGVQcmVmaXhCeVR5cGVQcmVmaXhOYW1lKHR5cGVQcmVmaXhOYW1lKSB7XG4gICAgY29uc3QgdHlwZVByZWZpeGVzID0gdGhpcy5nZXRUeXBlUHJlZml4ZXMoKSxcbiAgICAgICAgICB0eXBlUHJlZml4ID0gdHlwZVByZWZpeGVzLmZpbmQoKHR5cGVQcmVmaXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVQcmVmaXhDb21wYXJlc1RvVHlwZVByZWZpeE5hbWUgPSB0eXBlUHJlZml4LmNvbXBhcmVUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlUHJlZml4Q29tcGFyZXNUb1R5cGVQcmVmaXhOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeDtcbiAgfVxuXG4gIGZpbmREZWNsYXJlZFZhcmlhYmxlQnlWYXJpYWJsZUlkZW50aWZpZXIoVmFyaWFibGVJZGVudGl0aWZlcikge1xuICAgIGNvbnN0IGRlY2xhcmVkVmFyaWFibGVzID0gdGhpcy5nZXREZWNsYXJlZFZhcmlhYmxlcygpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGUgPSBkZWNsYXJlZFZhcmlhYmxlcy5maW5kKChkZWNsYXJlZFZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIgPSBkZWNsYXJlZFZhcmlhYmxlLmNvbXBhcmVWYXJpYWJsZUlkZW50aWZpZXIoVmFyaWFibGVJZGVudGl0aWZlcik7XG5cbiAgICAgICAgICAgIGlmIChkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBkZWNsYXJlZFZhcmlhYmxlO1xuICB9XG5cbiAgZmluZERlY2xhcmVkTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpIHtcbiAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSB0aGlzLmdldERlY2xhcmVkTWV0YXZhcmlhYmxlcygpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzLmZpbmQoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lID0gZGVjbGFyZWRNZXRhdmFyaWFibGUuY29tcGFyZU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gZGVjbGFyZWRNZXRhdmFyaWFibGU7XG4gIH1cblxuICBmaW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpIHtcbiAgICBjb25zdCBtZXRhdmFyaWFibGUgPSBudWxsO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRTdWJzdGl0dXRpb25CeVN1YnN0aXR1dGlvbk5vZGUoc3Vic3RpdHV0aW9uTm9kZSkge1xuICAgIGNvbnN0IHN1YnN0aXR1dGlvbiA9IG51bGw7XG5cbiAgICByZXR1cm4gc3Vic3RpdHV0aW9uO1xuICB9XG5cbiAgZmluZENvbnN0cmFpbnRCeUNvbnN0cmFpbnROb2RlKGNvbnN0cmFpbnROb2RlKSB7XG4gICAgY29uc3QgY29uc3RyYWludCA9IG51bGw7XG5cbiAgICByZXR1cm4gY29uc3RyYWludDtcbiAgfVxuXG4gIGZpbmRQcm9jZWR1cmVCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSB0aGlzLmdldFByb2NlZHVyZXMoKSxcbiAgICAgICAgICBwcm9jZWR1cmUgPSBwcm9jZWR1cmVzLmZpbmQoKHByb2NlZHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvY2VkdXJlQ29tcGFyZXNUb1Byb2NlZHVyZU5hbWUgPSBwcm9jZWR1cmUuY29tcGFyZVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZWR1cmVDb21wYXJlc1RvUHJvY2VkdXJlTmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHByb2NlZHVyZTtcbiAgfVxuXG4gIGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lKG1ldGFUeXBlTmFtZSkgeyByZXR1cm4gZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUobWV0YVR5cGVOYW1lKTsgfVxuXG4gIGlzTGFiZWxQcmVzZW50QnlMYWJlbE5vZGUobGFiZWxOb2RlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gdGhpcy5nZXRMYWJlbHMoKSxcbiAgICAgICAgICBsYWJlbFByZXNlbnQgPSBsYWJlbHMuc29tZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsTm9kZU1hdGNoZXMgPSBsYWJlbC5tYXRjaExhYmVsTm9kZShsYWJlbE5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobGFiZWxOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBsYWJlbFByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVzZW50QnlUeXBlTmFtZSh0eXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZmluZFR5cGVCeVR5cGVOYW1lKHR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgdHlwZVByZXNlbnQgPSAodHlwZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVzZW50QnlOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZmluZFR5cGVCeU5vbWluYWxUeXBlTmFtZShub21pbmFsVHlwZU5hbWUpLFxuICAgICAgICAgIHR5cGVQcmVzZW50ID0gKHR5cGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlc2VudEJ5UHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZmluZFR5cGVCeVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSksXG4gICAgICAgICAgdHlwZVByZXNlbnQgPSAodHlwZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVmaXhQcmVzZW50QnlUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSkge1xuICAgIGNvbnN0IHR5cGVQcmVmaXggPSB0aGlzLmZpbmRUeXBlUHJlZml4QnlUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSksXG4gICAgICAgICAgdHlwZVByZWZpeFByZXNlbnQgPSAodHlwZVByZWZpeCAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeFByZXNlbnQ7XG4gIH1cblxuICBpc0RlY2xhcmVkVmFyaWFibGVQcmVzZW50QnlWYXJpYWJsZUlkZW50aWZpZXIodmFyaWFibGVJZGVudGlmaWVyKSB7XG4gICAgY29uc3QgZGVjbGFyZWRWYXJpYWJsZSA9IHRoaXMuZmluZERlY2xhcmVkVmFyaWFibGVCeVZhcmlhYmxlSWRlbnRpZmllcih2YXJpYWJsZUlkZW50aWZpZXIpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVQcmVzZW50ID0gKGRlY2xhcmVkVmFyaWFibGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkVmFyaWFibGVQcmVzZW50O1xuICB9XG5cbiAgaXNEZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnRCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlID0gdGhpcy5maW5kRGVjbGFyZWRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50ID0gKGRlY2xhcmVkTWV0YXZhcmlhYmxlICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnQ7XG4gIH1cblxuICBpc1Byb2NlZHVyZVByZXNlbnRCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZSA9IHRoaXMuZmluZFByb2NlZHVyZUJ5UHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKSxcbiAgICAgICAgICBwcm9jZWR1cmVQcmVzZW50ID0gKHByb2NlZHVyZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gcHJvY2VkdXJlUHJlc2VudDtcbiAgfVxuXG4gIGlzTWV0YUxldmVsKCkge1xuICAgIGNvbnN0IG1ldGFMRXZlbCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIG1ldGFMRXZlbDtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMudHlwZXMgPSBbXTtcbiAgICB0aGlzLnJ1bGVzID0gW107XG4gICAgdGhpcy5heGlvbXMgPSBbXTtcbiAgICB0aGlzLmxlbW1hcyA9IFtdO1xuICAgIHRoaXMuc2NoZW1hcyA9IFtdO1xuICAgIHRoaXMudGhlb3JlbXMgPSBbXTtcbiAgICB0aGlzLmNvbmplY3R1cmVzID0gW107XG4gICAgdGhpcy5jb21iaW5hdG9ycyA9IFtdO1xuICAgIHRoaXMudHlwZVByZWZpeGVzID0gW107XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBbXTtcbiAgICB0aGlzLmRlY2xhcmVkVmFyaWFibGVzID0gW107XG4gICAgdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBbXTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIC8vL1xuICB9XG5cbiAgYXN5bmMgdmVyaWZ5RmlsZSgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5nZXROb2RlKCksXG4gICAgICAgICAgY29udGV4dCA9IHRoaXMsIC8vL1xuICAgICAgICAgIGZpbGVOb2RlID0gbm9kZSwgIC8vL1xuICAgICAgICAgIGZpbGVWZXJpZmllcyA9IGF3YWl0IHZlcmlmeUZpbGUoZmlsZU5vZGUsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGZpbGVWZXJpZmllcztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgY29uc3QganNvbiA9IHRoaXMuZ2V0SlNPTigpO1xuXG4gICAgaWYgKGpzb24gPT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGVDb250ZXh0ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLnR5cGVzID0gW107XG5cbiAgICB0eXBlc0Zyb21KU09OKGpzb24sIHRoaXMudHlwZXMsIGZpbGVDb250ZXh0KTtcblxuICAgIHRoaXMubGVtbWFzID0gW107XG5cbiAgICB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmRlY2xhcmVkVmFyaWFibGVzID0gZGVjbGFyZWRWYXJpYWJsZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5jb21iaW5hdG9ycyA9IGNvbWJpbmF0b3JzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuY29uc3RydWN0b3JzID0gY29uc3RydWN0b3JzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuXG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuYXhpb21zID0gYXhpb21zRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuc2NoZW1hcyA9IHNjaGVtYXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy50aGVvcmVtcyA9IHRoZW9yZW1zRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCB0eXBlc0pTT04gPSB0eXBlc1RvVHlwZXNKU09OKHRoaXMudHlwZXMpLFxuICAgICAgICAgIHJ1bGVzSlNPTiA9IHJ1bGVzVG9SdWxlc0pTT04odGhpcy5ydWxlcyksXG4gICAgICAgICAgYXhpb21zSlNPTiA9IGF4aW9tc1RvQXhpb21zSlNPTih0aGlzLmF4aW9tcyksXG4gICAgICAgICAgc2NoZW1hc0pTT04gPSBzY2hlbWFzVG9TY2hlbWFzSlNPTih0aGlzLnNjaGVtYXMpLFxuICAgICAgICAgIHRoZW9yZW1zSlNPTiA9IHRoZW9yZW1zVG9UaGVvcmVtc0pTT04odGhpcy50aGVvcmVtcyksXG4gICAgICAgICAgY29uamVjdHVyZXNKU09OID0gY29uamVjdHVyZXNUb0NvbmplY3R1cmVzSlNPTih0aGlzLmNvbmplY3R1cmVzKSxcbiAgICAgICAgICBjb21iaW5hdG9yc0pTT04gPSBjb21iaW5hdG9yc1RvQ29tYmluYXRvcnNKU09OKHRoaXMuY29tYmluYXRvcnMpLFxuICAgICAgICAgIHR5cGVQcmVmaXhlc0pTT04gPSB0eXBlUHJlZml4ZXNUb1R5cGVQcmVmaXhlc0pTT04odGhpcy50eXBlUHJlZml4ZXMpLFxuICAgICAgICAgIGNvbnN0cnVjdG9yc0pTT04gPSBjb25zdHJ1Y3RvcnNUb0NvbnN0cnVjdG9yc0pTT04odGhpcy5jb25zdHJ1Y3RvcnMpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzSlNPTiA9IGRlY2xhcmVkVmFyaWFibGVzVG9EZWNsYXJlZFZhcmlhYmxlc0pTT04odGhpcy5kZWNsYXJlZFZhcmlhYmxlcyksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTih0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcyksXG4gICAgICAgICAgZmlsZUNvbnRlbnQgPSB0aGlzLmZpbGVDb250ZW50LFxuICAgICAgICAgIGZpbGVQYXRoID0gdGhpcy5maWxlUGF0aCxcbiAgICAgICAgICB0eXBlcyA9IHR5cGVzSlNPTiwgIC8vL1xuICAgICAgICAgIHJ1bGVzID0gcnVsZXNKU09OLCAgLy8vXG4gICAgICAgICAgYXhpb21zID0gYXhpb21zSlNPTiwgIC8vL1xuICAgICAgICAgIHNjaGVtYXMgPSBzY2hlbWFzSlNPTiwgIC8vL1xuICAgICAgICAgIHRoZW9yZW1zID0gdGhlb3JlbXNKU09OLCAgLy8vXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBjb25qZWN0dXJlc0pTT04sICAvLy9cbiAgICAgICAgICBjb21iaW5hdG9ycyA9IGNvbWJpbmF0b3JzSlNPTiwgIC8vL1xuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IHR5cGVQcmVmaXhlc0pTT04sICAvLy9cbiAgICAgICAgICBjb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnNKU09OLCAgLy8vXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBkZWNsYXJlZFZhcmlhYmxlc0pTT04sICAvLy9cbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIGZpbGVDb250ZW50LFxuICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICB0eXBlcyxcbiAgICAgICAgICAgIHJ1bGVzLFxuICAgICAgICAgICAgYXhpb21zLFxuICAgICAgICAgICAgc2NoZW1hcyxcbiAgICAgICAgICAgIHRoZW9yZW1zLFxuICAgICAgICAgICAgY29uamVjdHVyZXMsXG4gICAgICAgICAgICBjb21iaW5hdG9ycyxcbiAgICAgICAgICAgIHR5cGVQcmVmaXhlcyxcbiAgICAgICAgICAgIGNvbnN0cnVjdG9ycyxcbiAgICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzLFxuICAgICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzXG4gICAgICAgICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21GaWxlKGZpbGUsIGNvbnRleHQpIHtcbiAgICBjb25zdCByZWxlYXNlQ29udGV4dCA9IGNvbnRleHQsIC8vL1xuICAgICAgICAgIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciA9IHJlbGVhc2VDb250ZXh0LmdldENvbWJpbmVkQ3VzdG9tR3JhbW1hcigpLFxuICAgICAgICAgIG5vbWluYWxMZXhlciA9IG5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbExleGVyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIG5vbWluYWxQYXJzZXIgPSBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsUGFyc2VyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIGxleGVyID0gbm9taW5hbExleGVyLCAvLy9cbiAgICAgICAgICBwYXJzZXIgPSBub21pbmFsUGFyc2VyLCAvLy9cbiAgICAgICAgICB0eXBlcyA9IFtdLFxuICAgICAgICAgIHJ1bGVzID0gW10sXG4gICAgICAgICAgYXhpb21zID0gW10sXG4gICAgICAgICAgbGVtbWFzID0gW10sXG4gICAgICAgICAgc2NoZW1hcyA9IFtdLFxuICAgICAgICAgIHRoZW9yZW1zID0gW10sXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBbXSxcbiAgICAgICAgICBjb21iaW5hdG9ycyA9IFtdLFxuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IFtdLFxuICAgICAgICAgIGNvbnN0cnVjdG9ycyA9IFtdLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzID0gW10sXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gW10sXG4gICAgICAgICAgbm9taW5hbEZpbGVDb250ZXh0ID0gRmlsZUNvbnRleHQuZnJvbUZpbGUoTm9taW5hbEZpbGVDb250ZXh0LCBmaWxlLCBsZXhlciwgcGFyc2VyLCB0eXBlcywgcnVsZXMsIGF4aW9tcywgbGVtbWFzLCBzY2hlbWFzLCB0aGVvcmVtcywgY29uamVjdHVyZXMsIGNvbWJpbmF0b3JzLCB0eXBlUHJlZml4ZXMsIGNvbnN0cnVjdG9ycywgZGVjbGFyZWRWYXJpYWJsZXMsIGRlY2xhcmVkTWV0YXZhcmlhYmxlcywgY29udGV4dCk7XG5cbiAgICByZXR1cm4gbm9taW5hbEZpbGVDb250ZXh0O1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCByZWxlYXNlQ29udGV4dCA9IGNvbnRleHQsIC8vL1xuICAgICAgICAgIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciA9IHJlbGVhc2VDb250ZXh0LmdldENvbWJpbmVkQ3VzdG9tR3JhbW1hcigpLFxuICAgICAgICAgIG5vbWluYWxMZXhlciA9IG5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbExleGVyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIG5vbWluYWxQYXJzZXIgPSBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsUGFyc2VyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIGxleGVyID0gbm9taW5hbExleGVyLCAvLy9cbiAgICAgICAgICBwYXJzZXIgPSBub21pbmFsUGFyc2VyLCAvLy9cbiAgICAgICAgICB0eXBlcyA9IG51bGwsXG4gICAgICAgICAgcnVsZXMgPSBudWxsLFxuICAgICAgICAgIGF4aW9tcyA9IG51bGwsXG4gICAgICAgICAgbGVtbWFzID0gbnVsbCxcbiAgICAgICAgICBzY2hlbWFzID0gbnVsbCxcbiAgICAgICAgICB0aGVvcmVtcyA9IG51bGwsXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBudWxsLFxuICAgICAgICAgIGNvbWJpbmF0b3JzID0gbnVsbCxcbiAgICAgICAgICB0eXBlUHJlZml4ZXMgPSBudWxsLFxuICAgICAgICAgIGNvbnN0cnVjdG9ycyA9IG51bGwsXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBudWxsLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IG51bGwsXG4gICAgICAgICAgbm9taW5hbEZpbGVDb250ZXh0ID0gRmlsZUNvbnRleHQuZnJvbUpTT04oTm9taW5hbEZpbGVDb250ZXh0LCBqc29uLCBsZXhlciwgcGFyc2VyLCB0eXBlcywgcnVsZXMsIGF4aW9tcywgbGVtbWFzLCBzY2hlbWFzLCB0aGVvcmVtcywgY29uamVjdHVyZXMsIGNvbWJpbmF0b3JzLCB0eXBlUHJlZml4ZXMsIGNvbnN0cnVjdG9ycywgZGVjbGFyZWRWYXJpYWJsZXMsIGRlY2xhcmVkTWV0YXZhcmlhYmxlcywgY29udGV4dCk7XG5cbiAgICByZXR1cm4gbm9taW5hbEZpbGVDb250ZXh0O1xuICB9XG59XG4iXSwibmFtZXMiOlsiTm9taW5hbEZpbGVDb250ZXh0IiwicHVzaCIsImFycmF5VXRpbGl0aWVzIiwibm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxQYXJzZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyIiwibm9taW5hbFV0aWxpdGllcyIsIkZpbGVDb250ZXh0IiwiY29udGV4dCIsImZpbGVDb250ZW50IiwiZmlsZVBhdGgiLCJ0b2tlbnMiLCJub2RlIiwianNvbiIsImxleGVyIiwicGFyc2VyIiwidHlwZXMiLCJydWxlcyIsImF4aW9tcyIsImxlbW1hcyIsInNjaGVtYXMiLCJ0aGVvcmVtcyIsImNvbmplY3R1cmVzIiwiY29tYmluYXRvcnMiLCJ0eXBlUHJlZml4ZXMiLCJjb25zdHJ1Y3RvcnMiLCJkZWNsYXJlZFZhcmlhYmxlcyIsImRlY2xhcmVkTWV0YXZhcmlhYmxlcyIsImdldExleGVyIiwiZ2V0UGFyc2VyIiwiZ2V0RXF1aXZhbGVuY2VzIiwiZXF1aXZhbGVuY2VzIiwiZ2V0U3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyIsInN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMiLCJnZXRMYWJlbHMiLCJpbmNsdWRlUmVsZWFzZSIsImxhYmVscyIsInJlbGVhc2VDb250ZXh0TGFiZWxzIiwiZm9yRWFjaCIsInJ1bGUiLCJydWxlTGFiZWxzIiwiYXhpb20iLCJheGlvbUxhYmVscyIsImxlbW1hIiwibGVtbWFMYWJlbHMiLCJ0aGVvcmVtIiwidGhlb3JlbUxhYmVscyIsImNvbmplY3R1cmUiLCJjb25qZWN0dXJlTGFiZWxzIiwic2NoZW1hIiwic2NoZW1hTGFiZWwiLCJnZXRMYWJlbCIsImdldFR5cGVzIiwiZ2V0UnVsZXMiLCJnZXRBeGlvbXMiLCJnZXRMZW1tYXMiLCJnZXRTY2hlbWFzIiwiZ2V0VGhlb3JlbXMiLCJnZXRDb25qZWN0dXJlcyIsImdldENvbWJpbmF0b3JzIiwiZ2V0VHlwZVByZWZpeGVzIiwiZ2V0Q29uc3RydWN0b3JzIiwiZ2V0UHJvY2VkdXJlcyIsInByb2NlZHVyZXMiLCJnZXRUb3BMZXZlbEFzc2VydGlvbnMiLCJ0b3BMZXZlbEFzc2VydGlvbnMiLCJnZXREZWNsYXJlZFZhcmlhYmxlcyIsImdldERlY2xhcmVkTWV0YXZhcmlhYmxlcyIsImdldFRlcm1zIiwidGVybXMiLCJnZXRHb2FscyIsImdvYWxzIiwiZ2V0RnJhbWVzIiwiZnJhbWVzIiwiZ2V0UHJvcGVydGllcyIsInByb3BlcnRpZXMiLCJnZXRFcXVhbGl0aWVzIiwiZXF1YWxpdGllcyIsImdldEp1ZGdlbWVudHMiLCJqdWRnZW1lbnRzIiwiZ2V0QXNzZXJ0aW9ucyIsImFzc2VydGlvbnMiLCJnZXRTdGF0ZW1lbnRzIiwic3RhdGVtZW50cyIsImdldFNpZ25hdHVyZXMiLCJzaWduYXR1cmVzIiwiZ2V0UmVmZXJlbmNlcyIsInJlZmVyZW5jZXMiLCJnZXRBc3N1bXB0aW9ucyIsImFzc3VtcHRpb25zIiwiZ2V0TWV0YXZhcmlhYmxlcyIsIm1ldGF2YXJpYWJsZXMiLCJnZXRTdWJzdGl0dXRpb25zIiwic3Vic3RpdHV0aW9ucyIsImdldFByb3BlcnR5UmVsYXRpb25zIiwicHJvcGVydHlSZWxhdGlvbnMiLCJnZXREZXJpdmVkU3Vic3RpdHV0aW9ucyIsImRlcml2ZWRTdWJzdGl0dXRpb25zIiwiYWRkVHlwZSIsInR5cGUiLCJnZXRGaWxlUGF0aCIsInR5cGVTdHJpbmciLCJnZXRTdHJpbmciLCJ0cmFjZSIsImFkZFJ1bGUiLCJydWxlU3RyaW5nIiwiYWRkQXhpb20iLCJheGlvbVN0cmluZyIsImFkZExlbW1hIiwibGVtbWFTdHJpbmciLCJhZGRUaGVvcmVtIiwidGhlb3JlbVN0cmluZyIsImFkZFNjaGVtYSIsInNjaGVtYVN0cmluZyIsImFkZENvbmplY3R1cmUiLCJvY25qZWN0dXJlU3RyaW5nIiwiYWRkQ29tYmluYXRvciIsImNvbWJpbmF0b3IiLCJjb21iaW5hdG9yU3RyaW5nIiwiYWRkVHlwZVByZWZpeCIsInR5cGVQcmVmaXgiLCJ0eXBlUHJlZml4U3RyaW5nIiwiYWRkQ29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yU3RyaW5nIiwiYWRkRGVjbGFyZWRWYXJpYWJsZSIsImRlY2xhcmVkVmFyaWFibGUiLCJkZWNsYXJlZFZhcmlhYmxlU3RyaW5nIiwiYWRkRGVjbGFyZWRNZXRhdmFyaWFibGUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nIiwiZmluZE1ldGF2YXJpYWJsZSIsIm1ldGF2YXJpYWJsZSIsImZpbmQiLCJtZXRhdmFyaWFibGVVbmlmaWVzIiwidW5pZnlNZXRhdmFyaWFibGUiLCJmaW5kUnVsZUJ5UmVmZXJlbmNlIiwicmVmZXJlbmNlIiwibWV0YXZhcmlhYmxlTm9kZSIsImdldE1ldGF2YXJpYWJsZU5vZGUiLCJtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyIsIm1hdGNoTWV0YXZhcmlhYmxlTm9kZSIsImZpbmRBeGlvbUJ5UmVmZXJlbmNlIiwiZmluZExlbW1hQnlSZWZlcmVuY2UiLCJmaW5kVGhlb3JlbUJ5UmVmZXJlbmNlIiwiZmluZENvbmplY3R1cmVCeVJlZmVyZW5jZSIsImZpbmRUb3BMZXZlbEFzc2VydGlvbkJ5UmVmZXJlbmNlIiwidG9wTEV2ZWxBc3NlcnRpb25zIiwidG9wTGV2ZWxBc3NlcnRpb24iLCJmaW5kVHlwZUJ5VHlwZU5hbWUiLCJ0eXBlTmFtZSIsImJhc2VUeXBlIiwiYmFzZVR5cGVGcm9tTm90aGluZyIsInR5cGVDb21wYXJlc1RvVHlwZU5hbWUiLCJjb21wYXJlVHlwZU5hbWUiLCJmaW5kVHlwZUJ5Tm9taW5hbFR5cGVOYW1lIiwibm9taW5hbFR5cGVOYW1lIiwidHlwZUNvbXBhcmVzVG9Ob21pbmFsVHlwZU5hbWUiLCJjb21wYXJlTm9taW5hbFR5cGVOYW1lIiwiZmluZFR5cGVCeVByZWZpeGVkVHlwZU5hbWUiLCJwcmVmaXhlZFR5cGVOYW1lIiwidHlwZUNvbXBhcmVzVG9QcmVmaXhlZFR5cGVOYW1lIiwiY29tcGFyZVByZWZpeGVkVHlwZU5hbWUiLCJmaW5kVHlwZVByZWZpeEJ5VHlwZVByZWZpeE5hbWUiLCJ0eXBlUHJlZml4TmFtZSIsInR5cGVQcmVmaXhDb21wYXJlc1RvVHlwZVByZWZpeE5hbWUiLCJjb21wYXJlVHlwZVByZWZpeE5hbWUiLCJmaW5kRGVjbGFyZWRWYXJpYWJsZUJ5VmFyaWFibGVJZGVudGlmaWVyIiwiVmFyaWFibGVJZGVudGl0aWZlciIsImRlY2xhcmVkVmFyaWFibGVDb21wYXJlc1RvVmFyaWFibGVJZGVudGl0aWZlciIsImNvbXBhcmVWYXJpYWJsZUlkZW50aWZpZXIiLCJmaW5kRGVjbGFyZWRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5hbWUiLCJtZXRhdmFyaWFibGVOYW1lIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVDb21wYXJlc1RvTWV0YXZhcmlhYmxlTmFtZSIsImNvbXBhcmVNZXRhdmFyaWFibGVOYW1lIiwiZmluZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTm9kZSIsImZpbmRTdWJzdGl0dXRpb25CeVN1YnN0aXR1dGlvbk5vZGUiLCJzdWJzdGl0dXRpb25Ob2RlIiwic3Vic3RpdHV0aW9uIiwiZmluZENvbnN0cmFpbnRCeUNvbnN0cmFpbnROb2RlIiwiY29uc3RyYWludE5vZGUiLCJjb25zdHJhaW50IiwiZmluZFByb2NlZHVyZUJ5UHJvY2VkdXJlTmFtZSIsInByb2NlZHVyZU5hbWUiLCJwcm9jZWR1cmUiLCJwcm9jZWR1cmVDb21wYXJlc1RvUHJvY2VkdXJlTmFtZSIsImNvbXBhcmVQcm9jZWR1cmVOYW1lIiwiZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUiLCJtZXRhVHlwZU5hbWUiLCJpc0xhYmVsUHJlc2VudEJ5TGFiZWxOb2RlIiwibGFiZWxOb2RlIiwibGFiZWxQcmVzZW50Iiwic29tZSIsImxhYmVsIiwibGFiZWxOb2RlTWF0Y2hlcyIsIm1hdGNoTGFiZWxOb2RlIiwiaXNUeXBlUHJlc2VudEJ5VHlwZU5hbWUiLCJ0eXBlUHJlc2VudCIsImlzVHlwZVByZXNlbnRCeU5vbWluYWxUeXBlTmFtZSIsImlzVHlwZVByZXNlbnRCeVByZWZpeGVkVHlwZU5hbWUiLCJpc1R5cGVQcmVmaXhQcmVzZW50QnlUeXBlUHJlZml4TmFtZSIsInR5cGVQcmVmaXhQcmVzZW50IiwiaXNEZWNsYXJlZFZhcmlhYmxlUHJlc2VudEJ5VmFyaWFibGVJZGVudGlmaWVyIiwidmFyaWFibGVJZGVudGlmaWVyIiwiZGVjbGFyZWRWYXJpYWJsZVByZXNlbnQiLCJpc0RlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudEJ5TWV0YXZhcmlhYmxlTmFtZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudCIsImlzUHJvY2VkdXJlUHJlc2VudEJ5UHJvY2VkdXJlTmFtZSIsInByb2NlZHVyZVByZXNlbnQiLCJpc01ldGFMZXZlbCIsIm1ldGFMRXZlbCIsImNsZWFyIiwiY29tcGxldGUiLCJ2ZXJpZnlGaWxlIiwiZ2V0Tm9kZSIsImZpbGVOb2RlIiwiZmlsZVZlcmlmaWVzIiwiaW5pdGlhbGlzZSIsImdldEpTT04iLCJmaWxlQ29udGV4dCIsInR5cGVzRnJvbUpTT04iLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXNGcm9tSlNPTiIsImRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04iLCJ0eXBlUHJlZml4ZXNGcm9tSlNPTiIsImNvbWJpbmF0b3JzRnJvbUpTT04iLCJjb25zdHJ1Y3RvcnNGcm9tSlNPTiIsInJ1bGVzRnJvbUpTT04iLCJheGlvbXNGcm9tSlNPTiIsInNjaGVtYXNGcm9tSlNPTiIsInRoZW9yZW1zRnJvbUpTT04iLCJjb25qZWN0dXJlc0Zyb21KU09OIiwidG9KU09OIiwidHlwZXNKU09OIiwidHlwZXNUb1R5cGVzSlNPTiIsInJ1bGVzSlNPTiIsInJ1bGVzVG9SdWxlc0pTT04iLCJheGlvbXNKU09OIiwiYXhpb21zVG9BeGlvbXNKU09OIiwic2NoZW1hc0pTT04iLCJzY2hlbWFzVG9TY2hlbWFzSlNPTiIsInRoZW9yZW1zSlNPTiIsInRoZW9yZW1zVG9UaGVvcmVtc0pTT04iLCJjb25qZWN0dXJlc0pTT04iLCJjb25qZWN0dXJlc1RvQ29uamVjdHVyZXNKU09OIiwiY29tYmluYXRvcnNKU09OIiwiY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTiIsInR5cGVQcmVmaXhlc0pTT04iLCJ0eXBlUHJlZml4ZXNUb1R5cGVQcmVmaXhlc0pTT04iLCJjb25zdHJ1Y3RvcnNKU09OIiwiY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTiIsImRlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJmcm9tRmlsZSIsImZpbGUiLCJyZWxlYXNlQ29udGV4dCIsImNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsImdldENvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxMZXhlciIsIk5vbWluYWxMZXhlciIsIm5vbWluYWxQYXJzZXIiLCJOb21pbmFsUGFyc2VyIiwibm9taW5hbEZpbGVDb250ZXh0IiwiZnJvbUpTT04iXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQXFDQTs7O2VBQXFCQTs7O2dDQW5DeUI7MkJBQ2Y7OERBRU47K0RBQ0M7d0JBRUM7c0JBQ1M7MkJBQ087c0JBc0JzQjs7Ozs7O0FBRWpFLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUdDLHlCQUFjLEVBQ3pCLEVBQUVDLHFDQUFxQyxFQUFFQyxzQ0FBc0MsRUFBRSxHQUFHQyxnQ0FBZ0I7QUFFM0YsTUFBTUws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