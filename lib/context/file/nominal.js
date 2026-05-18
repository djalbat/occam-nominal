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
const _lexers = require("../../utilities/lexers");
const _parsers = require("../../utilities/parsers");
const _json = require("../../utilities/json");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { push, filter } = _necessary.arrayUtilities;
class NominalFileContext extends _occamlanguages.FileContext {
    constructor(context, fileContent, filePath, tokens, node, json, lexer, parser, types, rules, axioms, lemmas, theorems, metaLemmas, conjectures, combinators, typePrefixes, constructors, metatheorems, declaredVariables, declaredMetavariables){
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
        this.theorems = theorems;
        this.metaLemmas = metaLemmas;
        this.conjectures = conjectures;
        this.combinators = combinators;
        this.typePrefixes = typePrefixes;
        this.constructors = constructors;
        this.metatheorems = metatheorems;
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
            this.metatheorems.forEach((metatheorem)=>{
                const metatheoremLabel = metatheorem.getLabel();
                labels.push(metatheoremLabel);
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
    getTheorems(includeRelease = true) {
        const theorems = includeRelease ? this.context.getTheorems() : this.theorems;
        return theorems;
    }
    getMetaLemmas(includeRelease = true) {
        const metaLemmas = includeRelease ? this.context.getMetaLemmas() : this.metaLemmas;
        return metaLemmas;
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
    getMetatheorems(includeRelease = true) {
        const metatheorems = includeRelease ? this.context.getMetatheorems() : this.metatheorems;
        return metatheorems;
    }
    getProcedures(includeRelease = true) {
        const procedures = includeRelease ? this.context.getProcedures() : null; ///
        return procedures;
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
    addMetaLemma(metaLemma) {
        this.metaLemmas.push(metaLemma);
        const filePath = this.getFilePath(), metaLemmaString = metaLemma.getString();
        this.trace(`Added the '${metaLemmaString}' meta-lemma to the '${filePath}' file context.`);
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
    addMetatheorem(metatheorem) {
        this.metatheorems.push(metatheorem);
        const filePath = this.getFilePath(), metatheoremString = metatheorem.getString();
        this.trace(`Added the '${metatheoremString}' metatheorem to the '${filePath}' file context.`);
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
    findMetaLemmasByReference(reference) {
        const metaLemmas = this.getMetaLemmas();
        filter(metaLemmas, (metaLemma)=>{
            const topLevelMetaAssertion = metaLemma, topLevelMetaAssertionCompares = reference.compareTopLevelMetaAssertion(topLevelMetaAssertion);
            if (topLevelMetaAssertionCompares) {
                return true;
            }
        });
        return metaLemmas;
    }
    findMetatheoremsByReference(reference) {
        const metatheorems = this.getMetatheorems();
        filter(metatheorems, (metatheorem)=>{
            const topLevelMetaAssertion = metatheorem, topLevelMetaAssertionCompares = reference.compareTopLevelMetaAssertion(topLevelMetaAssertion);
            if (topLevelMetaAssertionCompares) {
                return true;
            }
        });
        return metatheorems;
    }
    findTopLevelAssertionByReference(reference) {
        const axiom = this.findAxiomByReference(reference), lemma = this.findLemmaByReference(reference), theorem = this.findTheoremByReference(reference), conjecture = this.findConjectureByReference(reference), topLevelAssertion = axiom || lemma || theorem || conjecture;
        return topLevelAssertion;
    }
    findTopLevelMetaAssertionByReference(reference) {
        const metaLemma = this.findMetaLemmaByReference(reference), metatheorem = this.findMetatheoremByReference(reference), topLevelMetaAssertion = metaLemma || metatheorem; ///
        return topLevelMetaAssertion;
    }
    findTopLevelMetaAssertionsByReference(reference) {
        const metaLemmas = this.findMetaLemmasByReference(reference), metatheorems = this.findMetatheoremsByReference(reference), topLevelMetaAssertions = [
            ...metaLemmas,
            ...metatheorems
        ];
        return topLevelMetaAssertions;
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
    findTermByTermNode(termNode) {
        const term = null;
        return term;
    }
    findStatementByStatementNode(statementNode) {
        const statement = null;
        return statement;
    }
    findMetavariableByMetavariableNode(metavariableNode) {
        const metavariable = null;
        return metavariable;
    }
    findSubstitutionBySubstitutionNode(substitutionNode) {
        const substitution = null;
        return substitution;
    }
    findMetaLevelAssumptionByMetaLevelAssumptionNode(metaLevelAssumptionNode) {
        const metaLevelAssumption = null;
        return metaLevelAssumption;
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
    isLabelPresentByReference(reference, context = null) {
        const labels = this.getLabels(), labelPresent = labels.some((label)=>{
            const labelUnifies = reference.unifyLabel(label, context);
            if (labelUnifies) {
                return true;
            }
        });
        return labelPresent;
    }
    isTopLevelMetaAssertionPresentByReference(reference) {
        const topLevelMetaAssertion = this.findTopLevelMetaAssertionByReference(reference), topLevelMetaAssertionPresent = topLevelMetaAssertion !== null;
        return topLevelMetaAssertionPresent;
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
        this.theorems = [];
        this.metaLemmas = [];
        this.conjectures = [];
        this.combinators = [];
        this.typePrefixes = [];
        this.constructors = [];
        this.metatheorems = [];
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
        this.metaLemmas = [];
        this.declaredMetavariables = (0, _json.declaredMetavariablesFromJSON)(json, fileContext);
        this.declaredVariables = (0, _json.declaredVariablesFromJSON)(json, fileContext);
        this.typePrefixes = (0, _json.typePrefixesFromJSON)(json, fileContext);
        this.combinators = (0, _json.combinatorsFromJSON)(json, fileContext);
        this.constructors = (0, _json.constructorsFromJSON)(json, fileContext);
        this.rules = (0, _json.rulesFromJSON)(json, fileContext);
        this.axioms = (0, _json.axiomsFromJSON)(json, fileContext);
        this.theorems = (0, _json.theoremsFromJSON)(json, fileContext);
        this.conjectures = (0, _json.conjecturesFromJSON)(json, fileContext);
        this.metatheorems = (0, _json.metatheoremsFromJSON)(json, fileContext);
    }
    toJSON() {
        const typesJSON = (0, _json.typesToTypesJSON)(this.types), rulesJSON = (0, _json.rulesToRulesJSON)(this.rules), axiomsJSON = (0, _json.axiomsToAxiomsJSON)(this.axioms), theoremsJSON = (0, _json.theoremsToTheoremsJSON)(this.theorems), conjecturesJSON = (0, _json.conjecturesToConjecturesJSON)(this.conjectures), combinatorsJSON = (0, _json.combinatorsToCombinatorsJSON)(this.combinators), typePrefixesJSON = (0, _json.typePrefixesToTypePrefixesJSON)(this.typePrefixes), constructorsJSON = (0, _json.constructorsToConstructorsJSON)(this.constructors), metatheoremsJSON = (0, _json.metatheoremsToMetatheoremsJSON)(this.metatheorems), declaredVariablesJSON = (0, _json.declaredVariablesToDeclaredVariablesJSON)(this.declaredVariables), declaredMetavariablesJSON = (0, _json.declaredMetavariablesToDeclaredMetavariablesJSON)(this.declaredMetavariables), fileContent = this.fileContent, filePath = this.filePath, types = typesJSON, rules = rulesJSON, axioms = axiomsJSON, theorems = theoremsJSON, conjectures = conjecturesJSON, combinators = combinatorsJSON, typePrefixes = typePrefixesJSON, constructors = constructorsJSON, metatheorems = metatheoremsJSON, declaredVariables = declaredVariablesJSON, declaredMetavariables = declaredMetavariablesJSON, json = {
            fileContent,
            filePath,
            types,
            rules,
            axioms,
            theorems,
            conjectures,
            combinators,
            typePrefixes,
            constructors,
            metatheorems,
            declaredVariables,
            declaredMetavariables
        };
        return json;
    }
    static fromFile(file, context) {
        const releaseContext = context, combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(), nominalLexer = (0, _lexers.nominalLexerFromCombinedCustomGrammar)(_lexer.default, combinedCustomGrammar), nominalParser = (0, _parsers.nominalParserFromCombinedCustomGrammar)(_parser.default, combinedCustomGrammar), lexer = nominalLexer, parser = nominalParser, types = [], rules = [], axioms = [], lemmas = [], theorems = [], metaLemmas = [], conjectures = [], combinators = [], typePrefixes = [], constructors = [], metatheorems = [], declaredVariables = [], declaredMetavariables = [], nominalFileContext = _occamlanguages.FileContext.fromFile(NominalFileContext, file, lexer, parser, types, rules, axioms, lemmas, theorems, metaLemmas, conjectures, combinators, typePrefixes, constructors, metatheorems, declaredVariables, declaredMetavariables, context);
        return nominalFileContext;
    }
    static fromJSON(json, context) {
        const releaseContext = context, combinedCustomGrammar = releaseContext.getCombinedCustomGrammar(), nominalLexer = (0, _lexers.nominalLexerFromCombinedCustomGrammar)(_lexer.default, combinedCustomGrammar), nominalParser = (0, _parsers.nominalParserFromCombinedCustomGrammar)(_parser.default, combinedCustomGrammar), lexer = nominalLexer, parser = nominalParser, types = null, rules = null, axioms = null, lemmas = null, theorems = null, metaLemmas = null, conjectures = null, combinators = null, typePrefixes = null, constructors = null, metatheorems = null, declaredVariables = null, declaredMetavariables = null, nominalFileContext = _occamlanguages.FileContext.fromJSON(NominalFileContext, json, lexer, parser, types, rules, axioms, lemmas, theorems, metaLemmas, conjectures, combinators, typePrefixes, constructors, metatheorems, declaredVariables, declaredMetavariables, context);
        return nominalFileContext;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L2ZpbGUvbm9taW5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRmlsZUNvbnRleHQgfSBmcm9tIFwib2NjYW0tbGFuZ3VhZ2VzXCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IE5vbWluYWxMZXhlciBmcm9tIFwiLi4vLi4vbm9taW5hbC9sZXhlclwiO1xuaW1wb3J0IE5vbWluYWxQYXJzZXIgZnJvbSBcIi4uLy4uL25vbWluYWwvcGFyc2VyXCI7XG5cbmltcG9ydCB7IHZlcmlmeUZpbGUgfSBmcm9tIFwiLi4vLi4vcHJvY2Vzcy92ZXJpZnlcIjtcbmltcG9ydCB7IGJhc2VUeXBlRnJvbU5vdGhpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3R5cGVcIjtcbmltcG9ydCB7IGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lIH0gZnJvbSBcIi4uLy4uL21ldGFUeXBlc1wiO1xuaW1wb3J0IHsgbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvbGV4ZXJzXCI7XG5pbXBvcnQgeyBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcGFyc2Vyc1wiO1xuaW1wb3J0IHsgdHlwZXNGcm9tSlNPTixcbiAgICAgICAgIHJ1bGVzRnJvbUpTT04sXG4gICAgICAgICBheGlvbXNGcm9tSlNPTixcbiAgICAgICAgIHR5cGVzVG9UeXBlc0pTT04sXG4gICAgICAgICB0aGVvcmVtc0Zyb21KU09OLFxuICAgICAgICAgcnVsZXNUb1J1bGVzSlNPTixcbiAgICAgICAgIGF4aW9tc1RvQXhpb21zSlNPTixcbiAgICAgICAgIGNvbmplY3R1cmVzRnJvbUpTT04sXG4gICAgICAgICBjb21iaW5hdG9yc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzRnJvbUpTT04sXG4gICAgICAgICBjb25zdHJ1Y3RvcnNGcm9tSlNPTixcbiAgICAgICAgIG1ldGF0aGVvcmVtc0Zyb21KU09OLFxuICAgICAgICAgdGhlb3JlbXNUb1RoZW9yZW1zSlNPTixcbiAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04sXG4gICAgICAgICBjb25qZWN0dXJlc1RvQ29uamVjdHVyZXNKU09OLFxuICAgICAgICAgY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzVG9UeXBlUHJlZml4ZXNKU09OLFxuICAgICAgICAgY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OLFxuICAgICAgICAgbWV0YXRoZW9yZW1zVG9NZXRhdGhlb3JlbXNKU09OLFxuICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvanNvblwiO1xuXG5jb25zdCB7IHB1c2gsIGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vbWluYWxGaWxlQ29udGV4dCBleHRlbmRzIEZpbGVDb250ZXh0IHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwgZmlsZUNvbnRlbnQsIGZpbGVQYXRoLCB0b2tlbnMsIG5vZGUsIGpzb24sIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHRoZW9yZW1zLCBtZXRhTGVtbWFzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBtZXRhdGhlb3JlbXMsIGRlY2xhcmVkVmFyaWFibGVzLCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMpIHtcbiAgICBzdXBlcihjb250ZXh0LCBmaWxlQ29udGVudCwgZmlsZVBhdGgsIHRva2Vucywgbm9kZSwganNvbik7XG5cbiAgICB0aGlzLmxleGVyID0gbGV4ZXI7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG4gICAgdGhpcy50b2tlbnMgPSB0b2tlbnM7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICB0aGlzLnR5cGVzID0gdHlwZXM7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuYXhpb21zID0gYXhpb21zO1xuICAgIHRoaXMubGVtbWFzID0gbGVtbWFzO1xuICAgIHRoaXMudGhlb3JlbXMgPSB0aGVvcmVtcztcbiAgICB0aGlzLm1ldGFMZW1tYXMgPSBtZXRhTGVtbWFzO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlcztcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnM7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnM7XG4gICAgdGhpcy5tZXRhdGhlb3JlbXMgPSBtZXRhdGhlb3JlbXM7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0TGV4ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV4ZXI7XG4gIH1cblxuICBnZXRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VyO1xuICB9XG5cbiAgZ2V0RXF1aXZhbGVuY2VzKCkge1xuICAgIGNvbnN0IGVxdWl2YWxlbmNlcyA9IFtdO1xuXG4gICAgcmV0dXJuIGVxdWl2YWxlbmNlcztcbiAgfVxuXG4gIGdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMoKSB7XG4gICAgY29uc3Qgc3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyA9IFtdO1xuXG4gICAgcmV0dXJuIHN1YnByb29mT3JQcm9vZkFzc2VydGlvbnM7XG4gIH1cblxuICBnZXRMYWJlbHMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gW107XG5cbiAgICBpZiAoaW5jbHVkZVJlbGVhc2UpIHtcbiAgICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0TGFiZWxzID0gdGhpcy5jb250ZXh0LmdldExhYmVscygpO1xuXG4gICAgICBwdXNoKGxhYmVscywgcmVsZWFzZUNvbnRleHRMYWJlbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgY29uc3QgcnVsZUxhYmVscyA9IHJ1bGUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIHJ1bGVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYXhpb21zLmZvckVhY2goKGF4aW9tKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aW9tTGFiZWxzID0gYXhpb20uZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGF4aW9tTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxlbW1hcy5mb3JFYWNoKChsZW1tYSkgPT4ge1xuICAgICAgICBjb25zdCBsZW1tYUxhYmVscyA9IGxlbW1hLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCBsZW1tYUxhYmVscyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50aGVvcmVtcy5mb3JFYWNoKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHRoZW9yZW1MYWJlbHMgPSB0aGVvcmVtLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCB0aGVvcmVtTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbmplY3R1cmVzLmZvckVhY2goKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgY29uc3QgY29uamVjdHVyZUxhYmVscyA9IGNvbmplY3R1cmUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGNvbmplY3R1cmVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubWV0YXRoZW9yZW1zLmZvckVhY2goKG1ldGF0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGF0aGVvcmVtTGFiZWwgPSBtZXRhdGhlb3JlbS5nZXRMYWJlbCgpO1xuXG4gICAgICAgIGxhYmVscy5wdXNoKG1ldGF0aGVvcmVtTGFiZWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhYmVscztcbiAgfVxuXG4gIGdldFR5cGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHR5cGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0VHlwZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlcztcblxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGdldFJ1bGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHJ1bGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0UnVsZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydWxlcztcblxuICAgIHJldHVybiBydWxlcztcbiAgfVxuXG4gIGdldEF4aW9tcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBheGlvbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0QXhpb21zKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aW9tcztcblxuICAgIHJldHVybiBheGlvbXM7XG4gIH1cblxuICBnZXRMZW1tYXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGVtbWFzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldExlbW1hcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW1tYXM7XG5cbiAgICByZXR1cm4gbGVtbWFzO1xuICB9XG5cbiAgZ2V0VGhlb3JlbXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdGhlb3JlbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUaGVvcmVtcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW9yZW1zO1xuXG4gICAgcmV0dXJuIHRoZW9yZW1zO1xuICB9XG5cbiAgZ2V0TWV0YUxlbW1hcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBtZXRhTGVtbWFzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRNZXRhTGVtbWFzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRhTGVtbWFzO1xuXG4gICAgcmV0dXJuIG1ldGFMZW1tYXM7XG4gIH1cblxuICBnZXRDb25qZWN0dXJlcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb25qZWN0dXJlcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldENvbmplY3R1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uamVjdHVyZXM7XG5cbiAgICByZXR1cm4gY29uamVjdHVyZXM7XG4gIH1cblxuICBnZXRDb21iaW5hdG9ycyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb21iaW5hdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldENvbWJpbmF0b3JzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tYmluYXRvcnM7XG5cbiAgICByZXR1cm4gY29tYmluYXRvcnM7XG4gIH1cblxuICBnZXRUeXBlUHJlZml4ZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZVByZWZpeGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldFR5cGVQcmVmaXhlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlUHJlZml4ZXM7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeGVzO1xuICB9XG5cbiAgZ2V0Q29uc3RydWN0b3JzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGNvbnN0cnVjdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRDb25zdHJ1Y3RvcnMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3JzO1xuXG4gICAgcmV0dXJuIGNvbnN0cnVjdG9ycztcbiAgfVxuXG4gIGdldE1ldGF0aGVvcmVtcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBtZXRhdGhlb3JlbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0TWV0YXRoZW9yZW1zKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGF0aGVvcmVtcztcblxuICAgIHJldHVybiBtZXRhdGhlb3JlbXM7XG4gIH1cblxuICBnZXRQcm9jZWR1cmVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRQcm9jZWR1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwcm9jZWR1cmVzO1xuICB9XG5cbiAgZ2V0RGVjbGFyZWRWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjbGFyZWRWYXJpYWJsZXM7XG4gIH1cblxuICBnZXREZWNsYXJlZE1ldGF2YXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0VGVybXModGVybXMgPSBbXSkge1xuICAgIHJldHVybiB0ZXJtcztcbiAgfVxuXG4gIGdldEZyYW1lcyhmcmFtZXMgPSBbXSkge1xuICAgIHJldHVybiBmcmFtZXM7XG4gIH1cblxuICBnZXRQcm9wZXJ0aWVzKHByb3BlcnRpZXMgPSBbXSkge1xuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9XG5cbiAgZ2V0RXF1YWxpdGllcyhlcXVhbGl0aWVzID0gW10pIHtcbiAgICByZXR1cm4gZXF1YWxpdGllcztcbiAgfVxuXG4gIGdldEp1ZGdlbWVudHMoanVkZ2VtZW50cyA9IFtdKSB7XG4gICAgcmV0dXJuIGp1ZGdlbWVudHM7XG4gIH1cblxuICBnZXRBc3NlcnRpb25zKGFzc2VydGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBhc3NlcnRpb25zO1xuICB9XG5cbiAgZ2V0U3RhdGVtZW50cyhzdGF0ZW1lbnRzID0gW10pIHtcbiAgICByZXR1cm4gc3RhdGVtZW50cztcbiAgfVxuXG4gIGdldFNpZ25hdHVyZXMoc2lnbmF0dXJlcyA9IFtdKSB7XG4gICAgcmV0dXJuIHNpZ25hdHVyZXM7XG4gIH1cblxuICBnZXRSZWZlcmVuY2VzKHJlZmVyZW5jZXMgPSBbXSkge1xuICAgIHJldHVybiByZWZlcmVuY2VzO1xuICB9XG5cbiAgZ2V0QXNzdW1wdGlvbnMoYXNzdW1wdGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBhc3N1bXB0aW9ucztcbiAgfVxuXG4gIGdldE1ldGF2YXJpYWJsZXMobWV0YXZhcmlhYmxlcyA9IFtdKSB7XG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZXM7XG4gIH1cblxuICBnZXRTdWJzdGl0dXRpb25zKHN1YnN0aXR1dGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBzdWJzdGl0dXRpb25zO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlSZWxhdGlvbnMocHJvcGVydHlSZWxhdGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBwcm9wZXJ0eVJlbGF0aW9ucztcbiAgfVxuXG4gIGdldERlcml2ZWRTdWJzdGl0dXRpb25zKGRlcml2ZWRTdWJzdGl0dXRpb25zID0gW10pIHtcbiAgICByZXR1cm4gZGVyaXZlZFN1YnN0aXR1dGlvbnM7XG4gIH1cblxuICBhZGRUeXBlKHR5cGUpIHtcbiAgICB0aGlzLnR5cGVzLnB1c2godHlwZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0eXBlU3RyaW5nID0gdHlwZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0eXBlU3RyaW5nfScgdHlwZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFJ1bGUocnVsZSkge1xuICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHJ1bGVTdHJpbmcgPSBydWxlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3J1bGVTdHJpbmd9JyBydWxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkQXhpb20oYXhpb20pIHtcbiAgICB0aGlzLmF4aW9tcy5wdXNoKGF4aW9tKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGF4aW9tU3RyaW5nID0gYXhpb20uZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7YXhpb21TdHJpbmd9JyBheGlvbSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZExlbW1hKGxlbW1hKSB7XG4gICAgdGhpcy5sZW1tYXMucHVzaChsZW1tYSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBsZW1tYVN0cmluZyA9IGxlbW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2xlbW1hU3RyaW5nfScgbGVtbWEgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRUaGVvcmVtKHRoZW9yZW0pIHtcbiAgICB0aGlzLnRoZW9yZW1zLnB1c2godGhlb3JlbSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0aGVvcmVtU3RyaW5nID0gdGhlb3JlbS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0aGVvcmVtU3RyaW5nfScgdGhlb3JlbSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZE1ldGFMZW1tYShtZXRhTGVtbWEpIHtcbiAgICB0aGlzLm1ldGFMZW1tYXMucHVzaChtZXRhTGVtbWEpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgbWV0YUxlbW1hU3RyaW5nID0gbWV0YUxlbW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke21ldGFMZW1tYVN0cmluZ30nIG1ldGEtbGVtbWEgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRDb25qZWN0dXJlKGNvbmplY3R1cmUpIHtcbiAgICB0aGlzLmNvbmplY3R1cmVzLnB1c2goY29uamVjdHVyZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBvY25qZWN0dXJlU3RyaW5nID0gY29uamVjdHVyZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtvY25qZWN0dXJlU3RyaW5nfScgb2NuamVjdHVyZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZENvbWJpbmF0b3IoY29tYmluYXRvcikge1xuICAgIHRoaXMuY29tYmluYXRvcnMucHVzaChjb21iaW5hdG9yKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGNvbWJpbmF0b3JTdHJpbmcgPSBjb21iaW5hdG9yLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2NvbWJpbmF0b3JTdHJpbmd9JyBjb21iaW5hdG9yIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkVHlwZVByZWZpeCh0eXBlUHJlZml4KSB7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMucHVzaCh0eXBlUHJlZml4KTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHR5cGVQcmVmaXhTdHJpbmcgPSB0eXBlUHJlZml4LmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3R5cGVQcmVmaXhTdHJpbmd9JyB0eXBlLXByZWZpeCB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZENvbnN0cnVjdG9yKGNvbnN0cnVjdG9yKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMucHVzaChjb25zdHJ1Y3Rvcik7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBjb25zdHJ1Y3RvclN0cmluZyA9IGNvbnN0cnVjdG9yLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2NvbnN0cnVjdG9yU3RyaW5nfScgY29uc3RydWN0b3IgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRNZXRhdGhlb3JlbShtZXRhdGhlb3JlbSkge1xuICAgIHRoaXMubWV0YXRoZW9yZW1zLnB1c2gobWV0YXRoZW9yZW0pO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgbWV0YXRoZW9yZW1TdHJpbmcgPSBtZXRhdGhlb3JlbS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHttZXRhdGhlb3JlbVN0cmluZ30nIG1ldGF0aGVvcmVtIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkRGVjbGFyZWRWYXJpYWJsZShkZWNsYXJlZFZhcmlhYmxlKSB7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcy5wdXNoKGRlY2xhcmVkVmFyaWFibGUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZVN0cmluZyA9IGRlY2xhcmVkVmFyaWFibGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7ZGVjbGFyZWRWYXJpYWJsZVN0cmluZ30nIGRlY2xhcmVkIHZhcmlhYmxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkRGVjbGFyZWRNZXRhdmFyaWFibGUoZGVjbGFyZWRNZXRhdmFyaWFibGUpIHtcbiAgICB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcy5wdXNoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nID0gZGVjbGFyZWRNZXRhdmFyaWFibGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7ZGVjbGFyZWRNZXRhdmFyaWFibGVTdHJpbmd9JyBkZWNsYXJlZCBtZXRhdmFyaWFibGUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBmaW5kTWV0YXZhcmlhYmxlKG1ldGF2YXJpYWJsZSwgY29udGV4dCkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IHRoaXMuZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzKCk7XG5cbiAgICBtZXRhdmFyaWFibGUgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXMuZmluZCgoZGVjbGFyZWRNZXRhdmFyaWFibGUpID0+IHtcbiAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZVVuaWZpZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZS51bmlmeU1ldGF2YXJpYWJsZShtZXRhdmFyaWFibGUsIGNvbnRleHQpO1xuXG4gICAgICBpZiAobWV0YXZhcmlhYmxlVW5pZmllcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRSdWxlQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgcnVsZXMgPSB0aGlzLmdldFJ1bGVzKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgcnVsZSA9IHJ1bGVzLmZpbmQoKHJ1bGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gcnVsZS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICBmaW5kQXhpb21CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBheGlvbXMgPSB0aGlzLmdldEF4aW9tcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIGF4aW9tID0gYXhpb21zLmZpbmQoKGF4aW9tKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IGF4aW9tLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gYXhpb207XG4gIH1cblxuICBmaW5kTGVtbWFCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBsZW1tYXMgPSB0aGlzLmdldExlbW1hcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIGxlbW1hID0gbGVtbWFzLmZpbmQoKGxlbW1hKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IGxlbW1hLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gbGVtbWE7XG4gIH1cblxuICBmaW5kVGhlb3JlbUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHRoZW9yZW1zID0gdGhpcy5nZXRUaGVvcmVtcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIHRoZW9yZW0gPSB0aGVvcmVtcy5maW5kKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IHRoZW9yZW0ubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0aGVvcmVtO1xuICB9XG5cbiAgZmluZENvbmplY3R1cmVCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBjb25qZWN0dXJlcyA9IHRoaXMuZ2V0Q29uamVjdHVyZXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBjb25qZWN0dXJlID0gY29uamVjdHVyZXMuZmluZCgoY29uamVjdHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBjb25qZWN0dXJlLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gY29uamVjdHVyZTtcbiAgfVxuXG4gIGZpbmRNZXRhTGVtbWFzQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgbWV0YUxlbW1hcyA9IHRoaXMuZ2V0TWV0YUxlbW1hcygpO1xuXG4gICAgZmlsdGVyKG1ldGFMZW1tYXMsIChtZXRhTGVtbWEpID0+IHtcbiAgICAgIGNvbnN0IHRvcExldmVsTWV0YUFzc2VydGlvbiA9IG1ldGFMZW1tYSwgLy8vXG4gICAgICAgICAgICB0b3BMZXZlbE1ldGFBc3NlcnRpb25Db21wYXJlcyA9IHJlZmVyZW5jZS5jb21wYXJlVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uKHRvcExldmVsTWV0YUFzc2VydGlvbik7XG5cbiAgICAgIGlmICh0b3BMZXZlbE1ldGFBc3NlcnRpb25Db21wYXJlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtZXRhTGVtbWFzO1xuICB9XG5cbiAgZmluZE1ldGF0aGVvcmVtc0J5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IG1ldGF0aGVvcmVtcyA9IHRoaXMuZ2V0TWV0YXRoZW9yZW1zKCk7XG5cbiAgICBmaWx0ZXIobWV0YXRoZW9yZW1zLCAobWV0YXRoZW9yZW0pID0+IHtcbiAgICAgIGNvbnN0IHRvcExldmVsTWV0YUFzc2VydGlvbiA9IG1ldGF0aGVvcmVtLCAvLy9cbiAgICAgICAgICAgIHRvcExldmVsTWV0YUFzc2VydGlvbkNvbXBhcmVzID0gcmVmZXJlbmNlLmNvbXBhcmVUb3BMZXZlbE1ldGFBc3NlcnRpb24odG9wTGV2ZWxNZXRhQXNzZXJ0aW9uKTtcblxuICAgICAgaWYgKHRvcExldmVsTWV0YUFzc2VydGlvbkNvbXBhcmVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1ldGF0aGVvcmVtcztcbiAgfVxuXG4gIGZpbmRUb3BMZXZlbEFzc2VydGlvbkJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGF4aW9tID0gdGhpcy5maW5kQXhpb21CeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIGxlbW1hID0gdGhpcy5maW5kTGVtbWFCeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIHRoZW9yZW0gPSB0aGlzLmZpbmRUaGVvcmVtQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICBjb25qZWN0dXJlID0gdGhpcy5maW5kQ29uamVjdHVyZUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSksXG4gICAgICAgICAgdG9wTGV2ZWxBc3NlcnRpb24gPSAoYXhpb20gfHwgbGVtbWEgfHwgdGhlb3JlbSB8fCBjb25qZWN0dXJlKTtcblxuICAgIHJldHVybiB0b3BMZXZlbEFzc2VydGlvbjtcbiAgfVxuXG4gIGZpbmRUb3BMZXZlbE1ldGFBc3NlcnRpb25CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBtZXRhTGVtbWEgPSB0aGlzLmZpbmRNZXRhTGVtbWFCeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIG1ldGF0aGVvcmVtID0gdGhpcy5maW5kTWV0YXRoZW9yZW1CeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIHRvcExldmVsTWV0YUFzc2VydGlvbiA9IChtZXRhTGVtbWEgfHwgbWV0YXRoZW9yZW0pOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wTGV2ZWxNZXRhQXNzZXJ0aW9uO1xuICB9XG5cbiAgZmluZFRvcExldmVsTWV0YUFzc2VydGlvbnNCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBtZXRhTGVtbWFzID0gdGhpcy5maW5kTWV0YUxlbW1hc0J5UmVmZXJlbmNlKHJlZmVyZW5jZSksXG4gICAgICAgICAgbWV0YXRoZW9yZW1zID0gdGhpcy5maW5kTWV0YXRoZW9yZW1zQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICB0b3BMZXZlbE1ldGFBc3NlcnRpb25zID0gW1xuICAgICAgICAgICAgLi4ubWV0YUxlbW1hcyxcbiAgICAgICAgICAgIC4uLm1ldGF0aGVvcmVtc1xuICAgICAgICAgIF07XG5cbiAgICByZXR1cm4gdG9wTGV2ZWxNZXRhQXNzZXJ0aW9ucztcbiAgfVxuXG4gIGZpbmRUeXBlQnlUeXBlTmFtZSh0eXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgbGV0IHR5cGVzID0gdGhpcy5nZXRUeXBlcyhpbmNsdWRlUmVsZWFzZSk7XG5cbiAgICBjb25zdCBiYXNlVHlwZSA9IGJhc2VUeXBlRnJvbU5vdGhpbmcoKTtcblxuICAgIHR5cGVzID0gW1xuICAgICAgLi4udHlwZXMsXG4gICAgICBiYXNlVHlwZVxuICAgIF07XG5cbiAgICBjb25zdCB0eXBlID0gdHlwZXMuZmluZCgodHlwZSkgPT4ge1xuICAgICAgY29uc3QgdHlwZUNvbXBhcmVzVG9UeXBlTmFtZSA9IHR5cGUuY29tcGFyZVR5cGVOYW1lKHR5cGVOYW1lKTtcblxuICAgICAgaWYgKHR5cGVDb21wYXJlc1RvVHlwZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgZmluZFR5cGVCeU5vbWluYWxUeXBlTmFtZShub21pbmFsVHlwZU5hbWUpIHtcbiAgICBsZXQgdHlwZXMgPSB0aGlzLmdldFR5cGVzKCk7XG5cbiAgICBjb25zdCBiYXNlVHlwZSA9IGJhc2VUeXBlRnJvbU5vdGhpbmcoKTtcblxuICAgIHR5cGVzID0gW1xuICAgICAgLi4udHlwZXMsXG4gICAgICBiYXNlVHlwZVxuICAgIF07XG5cbiAgICBjb25zdCB0eXBlID0gdHlwZXMuZmluZCgodHlwZSkgPT4ge1xuICAgICAgY29uc3QgdHlwZUNvbXBhcmVzVG9Ob21pbmFsVHlwZU5hbWUgPSB0eXBlLmNvbXBhcmVOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKTtcblxuICAgICAgaWYgKHR5cGVDb21wYXJlc1RvTm9taW5hbFR5cGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGZpbmRUeXBlQnlQcmVmaXhlZFR5cGVOYW1lKHByZWZpeGVkVHlwZU5hbWUpIHtcbiAgICBsZXQgdHlwZXMgPSB0aGlzLmdldFR5cGVzKCk7XG5cbiAgICBjb25zdCBiYXNlVHlwZSA9IGJhc2VUeXBlRnJvbU5vdGhpbmcoKTtcblxuICAgIHR5cGVzID0gW1xuICAgICAgLi4udHlwZXMsXG4gICAgICBiYXNlVHlwZVxuICAgIF07XG5cbiAgICBjb25zdCB0eXBlID0gdHlwZXMuZmluZCgodHlwZSkgPT4ge1xuICAgICAgY29uc3QgdHlwZUNvbXBhcmVzVG9QcmVmaXhlZFR5cGVOYW1lID0gdHlwZS5jb21wYXJlUHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKTtcblxuICAgICAgaWYgKHR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBmaW5kVHlwZVByZWZpeEJ5VHlwZVByZWZpeE5hbWUodHlwZVByZWZpeE5hbWUpIHtcbiAgICBjb25zdCB0eXBlUHJlZml4ZXMgPSB0aGlzLmdldFR5cGVQcmVmaXhlcygpLFxuICAgICAgICAgIHR5cGVQcmVmaXggPSB0eXBlUHJlZml4ZXMuZmluZCgodHlwZVByZWZpeCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHlwZVByZWZpeENvbXBhcmVzVG9UeXBlUHJlZml4TmFtZSA9IHR5cGVQcmVmaXguY29tcGFyZVR5cGVQcmVmaXhOYW1lKHR5cGVQcmVmaXhOYW1lKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVQcmVmaXhDb21wYXJlc1RvVHlwZVByZWZpeE5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0eXBlUHJlZml4O1xuICB9XG5cbiAgZmluZERlY2xhcmVkVmFyaWFibGVCeVZhcmlhYmxlSWRlbnRpZmllcihWYXJpYWJsZUlkZW50aXRpZmVyKSB7XG4gICAgY29uc3QgZGVjbGFyZWRWYXJpYWJsZXMgPSB0aGlzLmdldERlY2xhcmVkVmFyaWFibGVzKCksXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZSA9IGRlY2xhcmVkVmFyaWFibGVzLmZpbmQoKGRlY2xhcmVkVmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2xhcmVkVmFyaWFibGVDb21wYXJlc1RvVmFyaWFibGVJZGVudGl0aWZlciA9IGRlY2xhcmVkVmFyaWFibGUuY29tcGFyZVZhcmlhYmxlSWRlbnRpZmllcihWYXJpYWJsZUlkZW50aXRpZmVyKTtcblxuICAgICAgICAgICAgaWYgKGRlY2xhcmVkVmFyaWFibGVDb21wYXJlc1RvVmFyaWFibGVJZGVudGl0aWZlcikge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkVmFyaWFibGU7XG4gIH1cblxuICBmaW5kRGVjbGFyZWRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IHRoaXMuZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzKCksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGUgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXMuZmluZCgoZGVjbGFyZWRNZXRhdmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlQ29tcGFyZXNUb01ldGF2YXJpYWJsZU5hbWUgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZS5jb21wYXJlTWV0YXZhcmlhYmxlTmFtZShtZXRhdmFyaWFibGVOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGRlY2xhcmVkTWV0YXZhcmlhYmxlQ29tcGFyZXNUb01ldGF2YXJpYWJsZU5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBkZWNsYXJlZE1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRUZXJtQnlUZXJtTm9kZSh0ZXJtTm9kZSkge1xuICAgIGNvbnN0IHRlcm0gPSBudWxsO1xuXG4gICAgcmV0dXJuIHRlcm07XG4gIH1cblxuICBmaW5kU3RhdGVtZW50QnlTdGF0ZW1lbnROb2RlKHN0YXRlbWVudE5vZGUpIHtcbiAgICBjb25zdCBzdGF0ZW1lbnQgPSBudWxsO1xuXG4gICAgcmV0dXJuIHN0YXRlbWVudDtcbiAgfVxuXG4gIGZpbmRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSkge1xuICAgIGNvbnN0IG1ldGF2YXJpYWJsZSA9IG51bGw7XG5cbiAgICByZXR1cm4gbWV0YXZhcmlhYmxlO1xuICB9XG5cbiAgZmluZFN1YnN0aXR1dGlvbkJ5U3Vic3RpdHV0aW9uTm9kZShzdWJzdGl0dXRpb25Ob2RlKSB7XG4gICAgY29uc3Qgc3Vic3RpdHV0aW9uID0gbnVsbDtcblxuICAgIHJldHVybiBzdWJzdGl0dXRpb247XG4gIH1cblxuICBmaW5kTWV0YUxldmVsQXNzdW1wdGlvbkJ5TWV0YUxldmVsQXNzdW1wdGlvbk5vZGUobWV0YUxldmVsQXNzdW1wdGlvbk5vZGUpIHtcbiAgICBjb25zdCBtZXRhTGV2ZWxBc3N1bXB0aW9uID0gbnVsbDtcblxuICAgIHJldHVybiBtZXRhTGV2ZWxBc3N1bXB0aW9uO1xuICB9XG5cbiAgZmluZFByb2NlZHVyZUJ5UHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKSB7XG4gICAgY29uc3QgcHJvY2VkdXJlcyA9IHRoaXMuZ2V0UHJvY2VkdXJlcygpLFxuICAgICAgICAgIHByb2NlZHVyZSA9IHByb2NlZHVyZXMuZmluZCgocHJvY2VkdXJlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9jZWR1cmVDb21wYXJlc1RvUHJvY2VkdXJlTmFtZSA9IHByb2NlZHVyZS5jb21wYXJlUHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKTtcblxuICAgICAgICAgICAgaWYgKHByb2NlZHVyZUNvbXBhcmVzVG9Qcm9jZWR1cmVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gcHJvY2VkdXJlO1xuICB9XG5cbiAgZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUobWV0YVR5cGVOYW1lKSB7IHJldHVybiBmaW5kTWV0YVR5cGVCeU1ldGFUeXBlTmFtZShtZXRhVHlwZU5hbWUpOyB9XG5cbiAgaXNMYWJlbFByZXNlbnRCeVJlZmVyZW5jZShyZWZlcmVuY2UsIGNvbnRleHQgPSBudWxsKSB7XG4gICAgY29uc3QgbGFiZWxzID0gdGhpcy5nZXRMYWJlbHMoKSxcbiAgICAgICAgICBsYWJlbFByZXNlbnQgPSBsYWJlbHMuc29tZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsVW5pZmllcyA9IHJlZmVyZW5jZS51bmlmeUxhYmVsKGxhYmVsLCBjb250ZXh0KTtcblxuICAgICAgICAgICAgaWYgKGxhYmVsVW5pZmllcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBsYWJlbFByZXNlbnQ7XG4gIH1cblxuICBpc1RvcExldmVsTWV0YUFzc2VydGlvblByZXNlbnRCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCB0b3BMZXZlbE1ldGFBc3NlcnRpb24gPSB0aGlzLmZpbmRUb3BMZXZlbE1ldGFBc3NlcnRpb25CeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIHRvcExldmVsTWV0YUFzc2VydGlvblByZXNlbnQgPSAodG9wTGV2ZWxNZXRhQXNzZXJ0aW9uICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b3BMZXZlbE1ldGFBc3NlcnRpb25QcmVzZW50O1xuICB9XG5cbiAgaXNMYWJlbFByZXNlbnRCeUxhYmVsTm9kZShsYWJlbE5vZGUpIHtcbiAgICBjb25zdCBsYWJlbHMgPSB0aGlzLmdldExhYmVscygpLFxuICAgICAgICAgIGxhYmVsUHJlc2VudCA9IGxhYmVscy5zb21lKChsYWJlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWxOb2RlTWF0Y2hlcyA9IGxhYmVsLm1hdGNoTGFiZWxOb2RlKGxhYmVsTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChsYWJlbE5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGxhYmVsUHJlc2VudDtcbiAgfVxuXG4gIGlzVHlwZVByZXNlbnRCeVR5cGVOYW1lKHR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5maW5kVHlwZUJ5VHlwZU5hbWUodHlwZU5hbWUsIGluY2x1ZGVSZWxlYXNlKSxcbiAgICAgICAgICB0eXBlUHJlc2VudCA9ICh0eXBlICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0eXBlUHJlc2VudDtcbiAgfVxuXG4gIGlzVHlwZVByZXNlbnRCeU5vbWluYWxUeXBlTmFtZShub21pbmFsVHlwZU5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5maW5kVHlwZUJ5Tm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSksXG4gICAgICAgICAgdHlwZVByZXNlbnQgPSAodHlwZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVzZW50QnlQcmVmaXhlZFR5cGVOYW1lKHByZWZpeGVkVHlwZU5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5maW5kVHlwZUJ5UHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKSxcbiAgICAgICAgICB0eXBlUHJlc2VudCA9ICh0eXBlICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0eXBlUHJlc2VudDtcbiAgfVxuXG4gIGlzVHlwZVByZWZpeFByZXNlbnRCeVR5cGVQcmVmaXhOYW1lKHR5cGVQcmVmaXhOYW1lKSB7XG4gICAgY29uc3QgdHlwZVByZWZpeCA9IHRoaXMuZmluZFR5cGVQcmVmaXhCeVR5cGVQcmVmaXhOYW1lKHR5cGVQcmVmaXhOYW1lKSxcbiAgICAgICAgICB0eXBlUHJlZml4UHJlc2VudCA9ICh0eXBlUHJlZml4ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0eXBlUHJlZml4UHJlc2VudDtcbiAgfVxuXG4gIGlzRGVjbGFyZWRWYXJpYWJsZVByZXNlbnRCeVZhcmlhYmxlSWRlbnRpZmllcih2YXJpYWJsZUlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBkZWNsYXJlZFZhcmlhYmxlID0gdGhpcy5maW5kRGVjbGFyZWRWYXJpYWJsZUJ5VmFyaWFibGVJZGVudGlmaWVyKHZhcmlhYmxlSWRlbnRpZmllciksXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZVByZXNlbnQgPSAoZGVjbGFyZWRWYXJpYWJsZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGVjbGFyZWRWYXJpYWJsZVByZXNlbnQ7XG4gIH1cblxuICBpc0RlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudEJ5TWV0YXZhcmlhYmxlTmFtZShtZXRhdmFyaWFibGVOYW1lKSB7XG4gICAgY29uc3QgZGVjbGFyZWRNZXRhdmFyaWFibGUgPSB0aGlzLmZpbmREZWNsYXJlZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTmFtZShtZXRhdmFyaWFibGVOYW1lKSxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnQgPSAoZGVjbGFyZWRNZXRhdmFyaWFibGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudDtcbiAgfVxuXG4gIGlzUHJvY2VkdXJlUHJlc2VudEJ5UHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKSB7XG4gICAgY29uc3QgcHJvY2VkdXJlID0gdGhpcy5maW5kUHJvY2VkdXJlQnlQcm9jZWR1cmVOYW1lKHByb2NlZHVyZU5hbWUpLFxuICAgICAgICAgIHByb2NlZHVyZVByZXNlbnQgPSAocHJvY2VkdXJlICE9PSBudWxsKTtcblxuICAgIHJldHVybiBwcm9jZWR1cmVQcmVzZW50O1xuICB9XG5cbiAgaXNNZXRhTGV2ZWwoKSB7XG4gICAgY29uc3QgbWV0YUxFdmVsID0gZmFsc2U7XG5cbiAgICByZXR1cm4gbWV0YUxFdmVsO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy50eXBlcyA9IFtdO1xuICAgIHRoaXMucnVsZXMgPSBbXTtcbiAgICB0aGlzLmF4aW9tcyA9IFtdO1xuICAgIHRoaXMubGVtbWFzID0gW107XG4gICAgdGhpcy50aGVvcmVtcyA9IFtdO1xuICAgIHRoaXMubWV0YUxlbW1hcyA9IFtdO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBbXTtcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gW107XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSBbXTtcbiAgICB0aGlzLmNvbnN0cnVjdG9ycyA9IFtdO1xuICAgIHRoaXMubWV0YXRoZW9yZW1zID0gW107XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IFtdO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gW107XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICAvLy9cbiAgfVxuXG4gIGFzeW5jIHZlcmlmeUZpbGUoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Tm9kZSgpLFxuICAgICAgICAgIGNvbnRleHQgPSB0aGlzLCAvLy9cbiAgICAgICAgICBmaWxlTm9kZSA9IG5vZGUsICAvLy9cbiAgICAgICAgICBmaWxlVmVyaWZpZXMgPSBhd2FpdCB2ZXJpZnlGaWxlKGZpbGVOb2RlLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBmaWxlVmVyaWZpZXM7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLmdldEpTT04oKTtcblxuICAgIGlmIChqc29uID09PSBudWxsKSB7XG4gICAgICBzdXBlci5pbml0aWFsaXNlKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlQ29udGV4dCA9IHRoaXM7IC8vL1xuXG4gICAgdGhpcy50eXBlcyA9IFtdO1xuXG4gICAgdHlwZXNGcm9tSlNPTihqc29uLCB0aGlzLnR5cGVzLCBmaWxlQ29udGV4dCk7XG5cbiAgICB0aGlzLmxlbW1hcyA9IFtdO1xuICAgIHRoaXMubWV0YUxlbW1hcyA9IFtdO1xuXG4gICAgdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMudHlwZVByZWZpeGVzID0gdHlwZVByZWZpeGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuY29tYmluYXRvcnMgPSBjb21iaW5hdG9yc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmNvbnN0cnVjdG9ycyA9IGNvbnN0cnVjdG9yc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcblxuICAgIHRoaXMucnVsZXMgPSBydWxlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmF4aW9tcyA9IGF4aW9tc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLnRoZW9yZW1zID0gdGhlb3JlbXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5jb25qZWN0dXJlcyA9IGNvbmplY3R1cmVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMubWV0YXRoZW9yZW1zID0gbWV0YXRoZW9yZW1zRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IHR5cGVzSlNPTiA9IHR5cGVzVG9UeXBlc0pTT04odGhpcy50eXBlcyksXG4gICAgICAgICAgcnVsZXNKU09OID0gcnVsZXNUb1J1bGVzSlNPTih0aGlzLnJ1bGVzKSxcbiAgICAgICAgICBheGlvbXNKU09OID0gYXhpb21zVG9BeGlvbXNKU09OKHRoaXMuYXhpb21zKSxcbiAgICAgICAgICB0aGVvcmVtc0pTT04gPSB0aGVvcmVtc1RvVGhlb3JlbXNKU09OKHRoaXMudGhlb3JlbXMpLFxuICAgICAgICAgIGNvbmplY3R1cmVzSlNPTiA9IGNvbmplY3R1cmVzVG9Db25qZWN0dXJlc0pTT04odGhpcy5jb25qZWN0dXJlcyksXG4gICAgICAgICAgY29tYmluYXRvcnNKU09OID0gY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTih0aGlzLmNvbWJpbmF0b3JzKSxcbiAgICAgICAgICB0eXBlUHJlZml4ZXNKU09OID0gdHlwZVByZWZpeGVzVG9UeXBlUHJlZml4ZXNKU09OKHRoaXMudHlwZVByZWZpeGVzKSxcbiAgICAgICAgICBjb25zdHJ1Y3RvcnNKU09OID0gY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OKHRoaXMuY29uc3RydWN0b3JzKSxcbiAgICAgICAgICBtZXRhdGhlb3JlbXNKU09OID0gbWV0YXRoZW9yZW1zVG9NZXRhdGhlb3JlbXNKU09OKHRoaXMubWV0YXRoZW9yZW1zKSxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlc0pTT04gPSBkZWNsYXJlZFZhcmlhYmxlc1RvRGVjbGFyZWRWYXJpYWJsZXNKU09OKHRoaXMuZGVjbGFyZWRWYXJpYWJsZXMpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04gPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04odGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMpLFxuICAgICAgICAgIGZpbGVDb250ZW50ID0gdGhpcy5maWxlQ29udGVudCxcbiAgICAgICAgICBmaWxlUGF0aCA9IHRoaXMuZmlsZVBhdGgsXG4gICAgICAgICAgdHlwZXMgPSB0eXBlc0pTT04sICAvLy9cbiAgICAgICAgICBydWxlcyA9IHJ1bGVzSlNPTiwgIC8vL1xuICAgICAgICAgIGF4aW9tcyA9IGF4aW9tc0pTT04sICAvLy9cbiAgICAgICAgICB0aGVvcmVtcyA9IHRoZW9yZW1zSlNPTiwgIC8vL1xuICAgICAgICAgIGNvbmplY3R1cmVzID0gY29uamVjdHVyZXNKU09OLCAgLy8vXG4gICAgICAgICAgY29tYmluYXRvcnMgPSBjb21iaW5hdG9yc0pTT04sICAvLy9cbiAgICAgICAgICB0eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXNKU09OLCAgLy8vXG4gICAgICAgICAgY29uc3RydWN0b3JzID0gY29uc3RydWN0b3JzSlNPTiwgIC8vL1xuICAgICAgICAgIG1ldGF0aGVvcmVtcyA9IG1ldGF0aGVvcmVtc0pTT04sICAvLy9cbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzSlNPTiwgIC8vL1xuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04sICAvLy9cbiAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgZmlsZUNvbnRlbnQsXG4gICAgICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgICAgIHR5cGVzLFxuICAgICAgICAgICAgcnVsZXMsXG4gICAgICAgICAgICBheGlvbXMsXG4gICAgICAgICAgICB0aGVvcmVtcyxcbiAgICAgICAgICAgIGNvbmplY3R1cmVzLFxuICAgICAgICAgICAgY29tYmluYXRvcnMsXG4gICAgICAgICAgICB0eXBlUHJlZml4ZXMsXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcnMsXG4gICAgICAgICAgICBtZXRhdGhlb3JlbXMsXG4gICAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlcyxcbiAgICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc1xuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRmlsZShmaWxlLCBjb250ZXh0KSB7XG4gICAgY29uc3QgcmVsZWFzZUNvbnRleHQgPSBjb250ZXh0LCAvLy9cbiAgICAgICAgICBjb21iaW5lZEN1c3RvbUdyYW1tYXIgPSByZWxlYXNlQ29udGV4dC5nZXRDb21iaW5lZEN1c3RvbUdyYW1tYXIoKSxcbiAgICAgICAgICBub21pbmFsTGV4ZXIgPSBub21pbmFsTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKE5vbWluYWxMZXhlciwgY29tYmluZWRDdXN0b21HcmFtbWFyKSxcbiAgICAgICAgICBub21pbmFsUGFyc2VyID0gbm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbFBhcnNlciwgY29tYmluZWRDdXN0b21HcmFtbWFyKSxcbiAgICAgICAgICBsZXhlciA9IG5vbWluYWxMZXhlciwgLy8vXG4gICAgICAgICAgcGFyc2VyID0gbm9taW5hbFBhcnNlciwgLy8vXG4gICAgICAgICAgdHlwZXMgPSBbXSxcbiAgICAgICAgICBydWxlcyA9IFtdLFxuICAgICAgICAgIGF4aW9tcyA9IFtdLFxuICAgICAgICAgIGxlbW1hcyA9IFtdLFxuICAgICAgICAgIHRoZW9yZW1zID0gW10sXG4gICAgICAgICAgbWV0YUxlbW1hcyA9IFtdLFxuICAgICAgICAgIGNvbmplY3R1cmVzID0gW10sXG4gICAgICAgICAgY29tYmluYXRvcnMgPSBbXSxcbiAgICAgICAgICB0eXBlUHJlZml4ZXMgPSBbXSxcbiAgICAgICAgICBjb25zdHJ1Y3RvcnMgPSBbXSxcbiAgICAgICAgICBtZXRhdGhlb3JlbXMgPSBbXSxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlcyA9IFtdLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IFtdLFxuICAgICAgICAgIG5vbWluYWxGaWxlQ29udGV4dCA9IEZpbGVDb250ZXh0LmZyb21GaWxlKE5vbWluYWxGaWxlQ29udGV4dCwgZmlsZSwgbGV4ZXIsIHBhcnNlciwgdHlwZXMsIHJ1bGVzLCBheGlvbXMsIGxlbW1hcywgdGhlb3JlbXMsIG1ldGFMZW1tYXMsIGNvbmplY3R1cmVzLCBjb21iaW5hdG9ycywgdHlwZVByZWZpeGVzLCBjb25zdHJ1Y3RvcnMsIG1ldGF0aGVvcmVtcywgZGVjbGFyZWRWYXJpYWJsZXMsIGRlY2xhcmVkTWV0YXZhcmlhYmxlcywgY29udGV4dCk7XG5cbiAgICByZXR1cm4gbm9taW5hbEZpbGVDb250ZXh0O1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCByZWxlYXNlQ29udGV4dCA9IGNvbnRleHQsIC8vL1xuICAgICAgICAgIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciA9IHJlbGVhc2VDb250ZXh0LmdldENvbWJpbmVkQ3VzdG9tR3JhbW1hcigpLFxuICAgICAgICAgIG5vbWluYWxMZXhlciA9IG5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbExleGVyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIG5vbWluYWxQYXJzZXIgPSBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsUGFyc2VyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIGxleGVyID0gbm9taW5hbExleGVyLCAvLy9cbiAgICAgICAgICBwYXJzZXIgPSBub21pbmFsUGFyc2VyLCAvLy9cbiAgICAgICAgICB0eXBlcyA9IG51bGwsXG4gICAgICAgICAgcnVsZXMgPSBudWxsLFxuICAgICAgICAgIGF4aW9tcyA9IG51bGwsXG4gICAgICAgICAgbGVtbWFzID0gbnVsbCxcbiAgICAgICAgICB0aGVvcmVtcyA9IG51bGwsXG4gICAgICAgICAgbWV0YUxlbW1hcyA9IG51bGwsXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBudWxsLFxuICAgICAgICAgIGNvbWJpbmF0b3JzID0gbnVsbCxcbiAgICAgICAgICB0eXBlUHJlZml4ZXMgPSBudWxsLFxuICAgICAgICAgIGNvbnN0cnVjdG9ycyA9IG51bGwsXG4gICAgICAgICAgbWV0YXRoZW9yZW1zID0gbnVsbCxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlcyA9IG51bGwsXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gbnVsbCxcbiAgICAgICAgICBub21pbmFsRmlsZUNvbnRleHQgPSBGaWxlQ29udGV4dC5mcm9tSlNPTihOb21pbmFsRmlsZUNvbnRleHQsIGpzb24sIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHRoZW9yZW1zLCBtZXRhTGVtbWFzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBtZXRhdGhlb3JlbXMsIGRlY2xhcmVkVmFyaWFibGVzLCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIG5vbWluYWxGaWxlQ29udGV4dDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5vbWluYWxGaWxlQ29udGV4dCIsInB1c2giLCJmaWx0ZXIiLCJhcnJheVV0aWxpdGllcyIsIkZpbGVDb250ZXh0IiwiY29udGV4dCIsImZpbGVDb250ZW50IiwiZmlsZVBhdGgiLCJ0b2tlbnMiLCJub2RlIiwianNvbiIsImxleGVyIiwicGFyc2VyIiwidHlwZXMiLCJydWxlcyIsImF4aW9tcyIsImxlbW1hcyIsInRoZW9yZW1zIiwibWV0YUxlbW1hcyIsImNvbmplY3R1cmVzIiwiY29tYmluYXRvcnMiLCJ0eXBlUHJlZml4ZXMiLCJjb25zdHJ1Y3RvcnMiLCJtZXRhdGhlb3JlbXMiLCJkZWNsYXJlZFZhcmlhYmxlcyIsImRlY2xhcmVkTWV0YXZhcmlhYmxlcyIsImdldExleGVyIiwiZ2V0UGFyc2VyIiwiZ2V0RXF1aXZhbGVuY2VzIiwiZXF1aXZhbGVuY2VzIiwiZ2V0U3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyIsInN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMiLCJnZXRMYWJlbHMiLCJpbmNsdWRlUmVsZWFzZSIsImxhYmVscyIsInJlbGVhc2VDb250ZXh0TGFiZWxzIiwiZm9yRWFjaCIsInJ1bGUiLCJydWxlTGFiZWxzIiwiYXhpb20iLCJheGlvbUxhYmVscyIsImxlbW1hIiwibGVtbWFMYWJlbHMiLCJ0aGVvcmVtIiwidGhlb3JlbUxhYmVscyIsImNvbmplY3R1cmUiLCJjb25qZWN0dXJlTGFiZWxzIiwibWV0YXRoZW9yZW0iLCJtZXRhdGhlb3JlbUxhYmVsIiwiZ2V0TGFiZWwiLCJnZXRUeXBlcyIsImdldFJ1bGVzIiwiZ2V0QXhpb21zIiwiZ2V0TGVtbWFzIiwiZ2V0VGhlb3JlbXMiLCJnZXRNZXRhTGVtbWFzIiwiZ2V0Q29uamVjdHVyZXMiLCJnZXRDb21iaW5hdG9ycyIsImdldFR5cGVQcmVmaXhlcyIsImdldENvbnN0cnVjdG9ycyIsImdldE1ldGF0aGVvcmVtcyIsImdldFByb2NlZHVyZXMiLCJwcm9jZWR1cmVzIiwiZ2V0RGVjbGFyZWRWYXJpYWJsZXMiLCJnZXREZWNsYXJlZE1ldGF2YXJpYWJsZXMiLCJnZXRUZXJtcyIsInRlcm1zIiwiZ2V0RnJhbWVzIiwiZnJhbWVzIiwiZ2V0UHJvcGVydGllcyIsInByb3BlcnRpZXMiLCJnZXRFcXVhbGl0aWVzIiwiZXF1YWxpdGllcyIsImdldEp1ZGdlbWVudHMiLCJqdWRnZW1lbnRzIiwiZ2V0QXNzZXJ0aW9ucyIsImFzc2VydGlvbnMiLCJnZXRTdGF0ZW1lbnRzIiwic3RhdGVtZW50cyIsImdldFNpZ25hdHVyZXMiLCJzaWduYXR1cmVzIiwiZ2V0UmVmZXJlbmNlcyIsInJlZmVyZW5jZXMiLCJnZXRBc3N1bXB0aW9ucyIsImFzc3VtcHRpb25zIiwiZ2V0TWV0YXZhcmlhYmxlcyIsIm1ldGF2YXJpYWJsZXMiLCJnZXRTdWJzdGl0dXRpb25zIiwic3Vic3RpdHV0aW9ucyIsImdldFByb3BlcnR5UmVsYXRpb25zIiwicHJvcGVydHlSZWxhdGlvbnMiLCJnZXREZXJpdmVkU3Vic3RpdHV0aW9ucyIsImRlcml2ZWRTdWJzdGl0dXRpb25zIiwiYWRkVHlwZSIsInR5cGUiLCJnZXRGaWxlUGF0aCIsInR5cGVTdHJpbmciLCJnZXRTdHJpbmciLCJ0cmFjZSIsImFkZFJ1bGUiLCJydWxlU3RyaW5nIiwiYWRkQXhpb20iLCJheGlvbVN0cmluZyIsImFkZExlbW1hIiwibGVtbWFTdHJpbmciLCJhZGRUaGVvcmVtIiwidGhlb3JlbVN0cmluZyIsImFkZE1ldGFMZW1tYSIsIm1ldGFMZW1tYSIsIm1ldGFMZW1tYVN0cmluZyIsImFkZENvbmplY3R1cmUiLCJvY25qZWN0dXJlU3RyaW5nIiwiYWRkQ29tYmluYXRvciIsImNvbWJpbmF0b3IiLCJjb21iaW5hdG9yU3RyaW5nIiwiYWRkVHlwZVByZWZpeCIsInR5cGVQcmVmaXgiLCJ0eXBlUHJlZml4U3RyaW5nIiwiYWRkQ29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yU3RyaW5nIiwiYWRkTWV0YXRoZW9yZW0iLCJtZXRhdGhlb3JlbVN0cmluZyIsImFkZERlY2xhcmVkVmFyaWFibGUiLCJkZWNsYXJlZFZhcmlhYmxlIiwiZGVjbGFyZWRWYXJpYWJsZVN0cmluZyIsImFkZERlY2xhcmVkTWV0YXZhcmlhYmxlIiwiZGVjbGFyZWRNZXRhdmFyaWFibGUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZVN0cmluZyIsImZpbmRNZXRhdmFyaWFibGUiLCJtZXRhdmFyaWFibGUiLCJmaW5kIiwibWV0YXZhcmlhYmxlVW5pZmllcyIsInVuaWZ5TWV0YXZhcmlhYmxlIiwiZmluZFJ1bGVCeVJlZmVyZW5jZSIsInJlZmVyZW5jZSIsIm1ldGF2YXJpYWJsZU5vZGUiLCJnZXRNZXRhdmFyaWFibGVOb2RlIiwibWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMiLCJtYXRjaE1ldGF2YXJpYWJsZU5vZGUiLCJmaW5kQXhpb21CeVJlZmVyZW5jZSIsImZpbmRMZW1tYUJ5UmVmZXJlbmNlIiwiZmluZFRoZW9yZW1CeVJlZmVyZW5jZSIsImZpbmRDb25qZWN0dXJlQnlSZWZlcmVuY2UiLCJmaW5kTWV0YUxlbW1hc0J5UmVmZXJlbmNlIiwidG9wTGV2ZWxNZXRhQXNzZXJ0aW9uIiwidG9wTGV2ZWxNZXRhQXNzZXJ0aW9uQ29tcGFyZXMiLCJjb21wYXJlVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uIiwiZmluZE1ldGF0aGVvcmVtc0J5UmVmZXJlbmNlIiwiZmluZFRvcExldmVsQXNzZXJ0aW9uQnlSZWZlcmVuY2UiLCJ0b3BMZXZlbEFzc2VydGlvbiIsImZpbmRUb3BMZXZlbE1ldGFBc3NlcnRpb25CeVJlZmVyZW5jZSIsImZpbmRNZXRhTGVtbWFCeVJlZmVyZW5jZSIsImZpbmRNZXRhdGhlb3JlbUJ5UmVmZXJlbmNlIiwiZmluZFRvcExldmVsTWV0YUFzc2VydGlvbnNCeVJlZmVyZW5jZSIsInRvcExldmVsTWV0YUFzc2VydGlvbnMiLCJmaW5kVHlwZUJ5VHlwZU5hbWUiLCJ0eXBlTmFtZSIsImJhc2VUeXBlIiwiYmFzZVR5cGVGcm9tTm90aGluZyIsInR5cGVDb21wYXJlc1RvVHlwZU5hbWUiLCJjb21wYXJlVHlwZU5hbWUiLCJmaW5kVHlwZUJ5Tm9taW5hbFR5cGVOYW1lIiwibm9taW5hbFR5cGVOYW1lIiwidHlwZUNvbXBhcmVzVG9Ob21pbmFsVHlwZU5hbWUiLCJjb21wYXJlTm9taW5hbFR5cGVOYW1lIiwiZmluZFR5cGVCeVByZWZpeGVkVHlwZU5hbWUiLCJwcmVmaXhlZFR5cGVOYW1lIiwidHlwZUNvbXBhcmVzVG9QcmVmaXhlZFR5cGVOYW1lIiwiY29tcGFyZVByZWZpeGVkVHlwZU5hbWUiLCJmaW5kVHlwZVByZWZpeEJ5VHlwZVByZWZpeE5hbWUiLCJ0eXBlUHJlZml4TmFtZSIsInR5cGVQcmVmaXhDb21wYXJlc1RvVHlwZVByZWZpeE5hbWUiLCJjb21wYXJlVHlwZVByZWZpeE5hbWUiLCJmaW5kRGVjbGFyZWRWYXJpYWJsZUJ5VmFyaWFibGVJZGVudGlmaWVyIiwiVmFyaWFibGVJZGVudGl0aWZlciIsImRlY2xhcmVkVmFyaWFibGVDb21wYXJlc1RvVmFyaWFibGVJZGVudGl0aWZlciIsImNvbXBhcmVWYXJpYWJsZUlkZW50aWZpZXIiLCJmaW5kRGVjbGFyZWRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5hbWUiLCJtZXRhdmFyaWFibGVOYW1lIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVDb21wYXJlc1RvTWV0YXZhcmlhYmxlTmFtZSIsImNvbXBhcmVNZXRhdmFyaWFibGVOYW1lIiwiZmluZFRlcm1CeVRlcm1Ob2RlIiwidGVybU5vZGUiLCJ0ZXJtIiwiZmluZFN0YXRlbWVudEJ5U3RhdGVtZW50Tm9kZSIsInN0YXRlbWVudE5vZGUiLCJzdGF0ZW1lbnQiLCJmaW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlIiwiZmluZFN1YnN0aXR1dGlvbkJ5U3Vic3RpdHV0aW9uTm9kZSIsInN1YnN0aXR1dGlvbk5vZGUiLCJzdWJzdGl0dXRpb24iLCJmaW5kTWV0YUxldmVsQXNzdW1wdGlvbkJ5TWV0YUxldmVsQXNzdW1wdGlvbk5vZGUiLCJtZXRhTGV2ZWxBc3N1bXB0aW9uTm9kZSIsIm1ldGFMZXZlbEFzc3VtcHRpb24iLCJmaW5kUHJvY2VkdXJlQnlQcm9jZWR1cmVOYW1lIiwicHJvY2VkdXJlTmFtZSIsInByb2NlZHVyZSIsInByb2NlZHVyZUNvbXBhcmVzVG9Qcm9jZWR1cmVOYW1lIiwiY29tcGFyZVByb2NlZHVyZU5hbWUiLCJmaW5kTWV0YVR5cGVCeU1ldGFUeXBlTmFtZSIsIm1ldGFUeXBlTmFtZSIsImlzTGFiZWxQcmVzZW50QnlSZWZlcmVuY2UiLCJsYWJlbFByZXNlbnQiLCJzb21lIiwibGFiZWwiLCJsYWJlbFVuaWZpZXMiLCJ1bmlmeUxhYmVsIiwiaXNUb3BMZXZlbE1ldGFBc3NlcnRpb25QcmVzZW50QnlSZWZlcmVuY2UiLCJ0b3BMZXZlbE1ldGFBc3NlcnRpb25QcmVzZW50IiwiaXNMYWJlbFByZXNlbnRCeUxhYmVsTm9kZSIsImxhYmVsTm9kZSIsImxhYmVsTm9kZU1hdGNoZXMiLCJtYXRjaExhYmVsTm9kZSIsImlzVHlwZVByZXNlbnRCeVR5cGVOYW1lIiwidHlwZVByZXNlbnQiLCJpc1R5cGVQcmVzZW50QnlOb21pbmFsVHlwZU5hbWUiLCJpc1R5cGVQcmVzZW50QnlQcmVmaXhlZFR5cGVOYW1lIiwiaXNUeXBlUHJlZml4UHJlc2VudEJ5VHlwZVByZWZpeE5hbWUiLCJ0eXBlUHJlZml4UHJlc2VudCIsImlzRGVjbGFyZWRWYXJpYWJsZVByZXNlbnRCeVZhcmlhYmxlSWRlbnRpZmllciIsInZhcmlhYmxlSWRlbnRpZmllciIsImRlY2xhcmVkVmFyaWFibGVQcmVzZW50IiwiaXNEZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnRCeU1ldGF2YXJpYWJsZU5hbWUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnQiLCJpc1Byb2NlZHVyZVByZXNlbnRCeVByb2NlZHVyZU5hbWUiLCJwcm9jZWR1cmVQcmVzZW50IiwiaXNNZXRhTGV2ZWwiLCJtZXRhTEV2ZWwiLCJjbGVhciIsImNvbXBsZXRlIiwidmVyaWZ5RmlsZSIsImdldE5vZGUiLCJmaWxlTm9kZSIsImZpbGVWZXJpZmllcyIsImluaXRpYWxpc2UiLCJnZXRKU09OIiwiZmlsZUNvbnRleHQiLCJ0eXBlc0Zyb21KU09OIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVzRnJvbUpTT04iLCJkZWNsYXJlZFZhcmlhYmxlc0Zyb21KU09OIiwidHlwZVByZWZpeGVzRnJvbUpTT04iLCJjb21iaW5hdG9yc0Zyb21KU09OIiwiY29uc3RydWN0b3JzRnJvbUpTT04iLCJydWxlc0Zyb21KU09OIiwiYXhpb21zRnJvbUpTT04iLCJ0aGVvcmVtc0Zyb21KU09OIiwiY29uamVjdHVyZXNGcm9tSlNPTiIsIm1ldGF0aGVvcmVtc0Zyb21KU09OIiwidG9KU09OIiwidHlwZXNKU09OIiwidHlwZXNUb1R5cGVzSlNPTiIsInJ1bGVzSlNPTiIsInJ1bGVzVG9SdWxlc0pTT04iLCJheGlvbXNKU09OIiwiYXhpb21zVG9BeGlvbXNKU09OIiwidGhlb3JlbXNKU09OIiwidGhlb3JlbXNUb1RoZW9yZW1zSlNPTiIsImNvbmplY3R1cmVzSlNPTiIsImNvbmplY3R1cmVzVG9Db25qZWN0dXJlc0pTT04iLCJjb21iaW5hdG9yc0pTT04iLCJjb21iaW5hdG9yc1RvQ29tYmluYXRvcnNKU09OIiwidHlwZVByZWZpeGVzSlNPTiIsInR5cGVQcmVmaXhlc1RvVHlwZVByZWZpeGVzSlNPTiIsImNvbnN0cnVjdG9yc0pTT04iLCJjb25zdHJ1Y3RvcnNUb0NvbnN0cnVjdG9yc0pTT04iLCJtZXRhdGhlb3JlbXNKU09OIiwibWV0YXRoZW9yZW1zVG9NZXRhdGhlb3JlbXNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTiIsImRlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJmcm9tRmlsZSIsImZpbGUiLCJyZWxlYXNlQ29udGV4dCIsImNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsImdldENvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxMZXhlciIsIm5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIiLCJOb21pbmFsTGV4ZXIiLCJub21pbmFsUGFyc2VyIiwibm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIiLCJOb21pbmFsUGFyc2VyIiwibm9taW5hbEZpbGVDb250ZXh0IiwiZnJvbUpTT04iXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQXNDQTs7O2VBQXFCQTs7O2dDQXBDTzsyQkFDRzs4REFFTjsrREFDQzt3QkFFQztzQkFDUzsyQkFDTzt3QkFDVzt5QkFDQztzQkFzQlU7Ozs7OztBQUVqRSxNQUFNLEVBQUVDLElBQUksRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjO0FBRXhCLE1BQU1ILDJCQUEyQkksMkJBQVc7SUFDekQsWUFBWUMsT0FBTyxFQUFFQyxXQUFXLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxVQUFVLEVBQUVDLFdBQVcsRUFBRUMsV0FBVyxFQUFFQyxZQUFZLEVBQUVDLFlBQVksRUFBRUMsWUFBWSxFQUFFQyxpQkFBaUIsRUFBRUMscUJBQXFCLENBQUU7UUFDL08sS0FBSyxDQUFDcEIsU0FBU0MsYUFBYUMsVUFBVUMsUUFBUUMsTUFBTUM7UUFFcEQsSUFBSSxDQUFDQyxLQUFLLEdBQUdBO1FBQ2IsSUFBSSxDQUFDQyxNQUFNLEdBQUdBO1FBQ2QsSUFBSSxDQUFDUCxPQUFPLEdBQUdBO1FBQ2YsSUFBSSxDQUFDRSxRQUFRLEdBQUdBO1FBQ2hCLElBQUksQ0FBQ0MsTUFBTSxHQUFHQTtRQUNkLElBQUksQ0FBQ0MsSUFBSSxHQUFHQTtRQUNaLElBQUksQ0FBQ0ksS0FBSyxHQUFHQTtRQUNiLElBQUksQ0FBQ0MsS0FBSyxHQUFHQTtRQUNiLElBQUksQ0FBQ0MsTUFBTSxHQUFHQTtRQUNkLElBQUksQ0FBQ0MsTUFBTSxHQUFHQTtRQUNkLElBQUksQ0FBQ0MsUUFBUSxHQUFHQTtRQUNoQixJQUFJLENBQUNDLFVBQVUsR0FBR0E7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