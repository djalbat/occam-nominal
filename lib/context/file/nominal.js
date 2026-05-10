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
    getDeclaredJudgements() {
        const declaredJudgements = [];
        return declaredJudgements;
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
    isMetavariablePresent(metavariable, context) {
        metavariable = this.findMetavariable(metavariable, context); ///
        const metavariablePresent = metavariable !== null;
        return metavariablePresent;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L2ZpbGUvbm9taW5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRmlsZUNvbnRleHQgfSBmcm9tIFwib2NjYW0tbGFuZ3VhZ2VzXCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IE5vbWluYWxMZXhlciBmcm9tIFwiLi4vLi4vbm9taW5hbC9sZXhlclwiO1xuaW1wb3J0IE5vbWluYWxQYXJzZXIgZnJvbSBcIi4uLy4uL25vbWluYWwvcGFyc2VyXCI7XG5cbmltcG9ydCB7IHZlcmlmeUZpbGUgfSBmcm9tIFwiLi4vLi4vcHJvY2Vzcy92ZXJpZnlcIjtcbmltcG9ydCB7IGJhc2VUeXBlRnJvbU5vdGhpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3R5cGVcIjtcbmltcG9ydCB7IGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lIH0gZnJvbSBcIi4uLy4uL21ldGFUeXBlc1wiO1xuaW1wb3J0IHsgbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvbGV4ZXJzXCI7XG5pbXBvcnQgeyBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcGFyc2Vyc1wiO1xuaW1wb3J0IHsgdHlwZXNGcm9tSlNPTixcbiAgICAgICAgIHJ1bGVzRnJvbUpTT04sXG4gICAgICAgICBheGlvbXNGcm9tSlNPTixcbiAgICAgICAgIHR5cGVzVG9UeXBlc0pTT04sXG4gICAgICAgICB0aGVvcmVtc0Zyb21KU09OLFxuICAgICAgICAgcnVsZXNUb1J1bGVzSlNPTixcbiAgICAgICAgIGF4aW9tc1RvQXhpb21zSlNPTixcbiAgICAgICAgIGNvbmplY3R1cmVzRnJvbUpTT04sXG4gICAgICAgICBjb21iaW5hdG9yc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzRnJvbUpTT04sXG4gICAgICAgICBjb25zdHJ1Y3RvcnNGcm9tSlNPTixcbiAgICAgICAgIG1ldGF0aGVvcmVtc0Zyb21KU09OLFxuICAgICAgICAgdGhlb3JlbXNUb1RoZW9yZW1zSlNPTixcbiAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04sXG4gICAgICAgICBjb25qZWN0dXJlc1RvQ29uamVjdHVyZXNKU09OLFxuICAgICAgICAgY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzVG9UeXBlUHJlZml4ZXNKU09OLFxuICAgICAgICAgY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OLFxuICAgICAgICAgbWV0YXRoZW9yZW1zVG9NZXRhdGhlb3JlbXNKU09OLFxuICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvanNvblwiO1xuXG5jb25zdCB7IHB1c2gsIGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vbWluYWxGaWxlQ29udGV4dCBleHRlbmRzIEZpbGVDb250ZXh0IHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwgZmlsZUNvbnRlbnQsIGZpbGVQYXRoLCB0b2tlbnMsIG5vZGUsIGpzb24sIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHRoZW9yZW1zLCBtZXRhTGVtbWFzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBtZXRhdGhlb3JlbXMsIGRlY2xhcmVkVmFyaWFibGVzLCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMpIHtcbiAgICBzdXBlcihjb250ZXh0LCBmaWxlQ29udGVudCwgZmlsZVBhdGgsIHRva2Vucywgbm9kZSwganNvbik7XG5cbiAgICB0aGlzLmxleGVyID0gbGV4ZXI7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG4gICAgdGhpcy50b2tlbnMgPSB0b2tlbnM7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICB0aGlzLnR5cGVzID0gdHlwZXM7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuYXhpb21zID0gYXhpb21zO1xuICAgIHRoaXMubGVtbWFzID0gbGVtbWFzO1xuICAgIHRoaXMudGhlb3JlbXMgPSB0aGVvcmVtcztcbiAgICB0aGlzLm1ldGFMZW1tYXMgPSBtZXRhTGVtbWFzO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlcztcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnM7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnM7XG4gICAgdGhpcy5tZXRhdGhlb3JlbXMgPSBtZXRhdGhlb3JlbXM7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0TGV4ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV4ZXI7XG4gIH1cblxuICBnZXRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VyO1xuICB9XG5cbiAgZ2V0RXF1aXZhbGVuY2VzKCkge1xuICAgIGNvbnN0IGVxdWl2YWxlbmNlcyA9IFtdO1xuXG4gICAgcmV0dXJuIGVxdWl2YWxlbmNlcztcbiAgfVxuXG4gIGdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMoKSB7XG4gICAgY29uc3Qgc3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyA9IFtdO1xuXG4gICAgcmV0dXJuIHN1YnByb29mT3JQcm9vZkFzc2VydGlvbnM7XG4gIH1cblxuICBnZXRMYWJlbHMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gW107XG5cbiAgICBpZiAoaW5jbHVkZVJlbGVhc2UpIHtcbiAgICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0TGFiZWxzID0gdGhpcy5jb250ZXh0LmdldExhYmVscygpO1xuXG4gICAgICBwdXNoKGxhYmVscywgcmVsZWFzZUNvbnRleHRMYWJlbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgY29uc3QgcnVsZUxhYmVscyA9IHJ1bGUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIHJ1bGVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYXhpb21zLmZvckVhY2goKGF4aW9tKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aW9tTGFiZWxzID0gYXhpb20uZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGF4aW9tTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxlbW1hcy5mb3JFYWNoKChsZW1tYSkgPT4ge1xuICAgICAgICBjb25zdCBsZW1tYUxhYmVscyA9IGxlbW1hLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCBsZW1tYUxhYmVscyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50aGVvcmVtcy5mb3JFYWNoKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHRoZW9yZW1MYWJlbHMgPSB0aGVvcmVtLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCB0aGVvcmVtTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbmplY3R1cmVzLmZvckVhY2goKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgY29uc3QgY29uamVjdHVyZUxhYmVscyA9IGNvbmplY3R1cmUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGNvbmplY3R1cmVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubWV0YXRoZW9yZW1zLmZvckVhY2goKG1ldGF0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGF0aGVvcmVtTGFiZWwgPSBtZXRhdGhlb3JlbS5nZXRMYWJlbCgpO1xuXG4gICAgICAgIGxhYmVscy5wdXNoKG1ldGF0aGVvcmVtTGFiZWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhYmVscztcbiAgfVxuXG4gIGdldFR5cGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHR5cGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0VHlwZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlcztcblxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGdldFJ1bGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHJ1bGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0UnVsZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydWxlcztcblxuICAgIHJldHVybiBydWxlcztcbiAgfVxuXG4gIGdldEF4aW9tcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBheGlvbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0QXhpb21zKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aW9tcztcblxuICAgIHJldHVybiBheGlvbXM7XG4gIH1cblxuICBnZXRMZW1tYXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGVtbWFzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldExlbW1hcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW1tYXM7XG5cbiAgICByZXR1cm4gbGVtbWFzO1xuICB9XG5cbiAgZ2V0VGhlb3JlbXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdGhlb3JlbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUaGVvcmVtcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW9yZW1zO1xuXG4gICAgcmV0dXJuIHRoZW9yZW1zO1xuICB9XG5cbiAgZ2V0TWV0YUxlbW1hcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBtZXRhTGVtbWFzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRNZXRhTGVtbWFzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRhTGVtbWFzO1xuXG4gICAgcmV0dXJuIG1ldGFMZW1tYXM7XG4gIH1cblxuICBnZXRDb25qZWN0dXJlcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb25qZWN0dXJlcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldENvbmplY3R1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uamVjdHVyZXM7XG5cbiAgICByZXR1cm4gY29uamVjdHVyZXM7XG4gIH1cblxuICBnZXRDb21iaW5hdG9ycyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb21iaW5hdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldENvbWJpbmF0b3JzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tYmluYXRvcnM7XG5cbiAgICByZXR1cm4gY29tYmluYXRvcnM7XG4gIH1cblxuICBnZXRUeXBlUHJlZml4ZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZVByZWZpeGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldFR5cGVQcmVmaXhlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlUHJlZml4ZXM7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeGVzO1xuICB9XG5cbiAgZ2V0Q29uc3RydWN0b3JzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGNvbnN0cnVjdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRDb25zdHJ1Y3RvcnMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3JzO1xuXG4gICAgcmV0dXJuIGNvbnN0cnVjdG9ycztcbiAgfVxuXG4gIGdldE1ldGF0aGVvcmVtcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBtZXRhdGhlb3JlbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0TWV0YXRoZW9yZW1zKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGF0aGVvcmVtcztcblxuICAgIHJldHVybiBtZXRhdGhlb3JlbXM7XG4gIH1cblxuICBnZXRQcm9jZWR1cmVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRQcm9jZWR1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwcm9jZWR1cmVzO1xuICB9XG5cbiAgZ2V0RGVjbGFyZWRWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjbGFyZWRWYXJpYWJsZXM7XG4gIH1cblxuICBnZXREZWNsYXJlZE1ldGF2YXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0RGVjbGFyZWRKdWRnZW1lbnRzKCkge1xuICAgIGNvbnN0IGRlY2xhcmVkSnVkZ2VtZW50cyA9IFtdO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkSnVkZ2VtZW50cztcbiAgfVxuXG4gIGdldFRlcm1zKHRlcm1zID0gW10pIHtcbiAgICByZXR1cm4gdGVybXM7XG4gIH1cblxuICBnZXRGcmFtZXMoZnJhbWVzID0gW10pIHtcbiAgICByZXR1cm4gZnJhbWVzO1xuICB9XG5cbiAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzID0gW10pIHtcbiAgICByZXR1cm4gcHJvcGVydGllcztcbiAgfVxuXG4gIGdldEVxdWFsaXRpZXMoZXF1YWxpdGllcyA9IFtdKSB7XG4gICAgcmV0dXJuIGVxdWFsaXRpZXM7XG4gIH1cblxuICBnZXRKdWRnZW1lbnRzKGp1ZGdlbWVudHMgPSBbXSkge1xuICAgIHJldHVybiBqdWRnZW1lbnRzO1xuICB9XG5cbiAgZ2V0QXNzZXJ0aW9ucyhhc3NlcnRpb25zID0gW10pIHtcbiAgICByZXR1cm4gYXNzZXJ0aW9ucztcbiAgfVxuXG4gIGdldFN0YXRlbWVudHMoc3RhdGVtZW50cyA9IFtdKSB7XG4gICAgcmV0dXJuIHN0YXRlbWVudHM7XG4gIH1cblxuICBnZXRTaWduYXR1cmVzKHNpZ25hdHVyZXMgPSBbXSkge1xuICAgIHJldHVybiBzaWduYXR1cmVzO1xuICB9XG5cbiAgZ2V0UmVmZXJlbmNlcyhyZWZlcmVuY2VzID0gW10pIHtcbiAgICByZXR1cm4gcmVmZXJlbmNlcztcbiAgfVxuXG4gIGdldEFzc3VtcHRpb25zKGFzc3VtcHRpb25zID0gW10pIHtcbiAgICByZXR1cm4gYXNzdW1wdGlvbnM7XG4gIH1cblxuICBnZXRNZXRhdmFyaWFibGVzKG1ldGF2YXJpYWJsZXMgPSBbXSkge1xuICAgIHJldHVybiBtZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0U3Vic3RpdHV0aW9ucyhzdWJzdGl0dXRpb25zID0gW10pIHtcbiAgICByZXR1cm4gc3Vic3RpdHV0aW9ucztcbiAgfVxuXG4gIGdldFByb3BlcnR5UmVsYXRpb25zKHByb3BlcnR5UmVsYXRpb25zID0gW10pIHtcbiAgICByZXR1cm4gcHJvcGVydHlSZWxhdGlvbnM7XG4gIH1cblxuICBnZXREZXJpdmVkU3Vic3RpdHV0aW9ucyhkZXJpdmVkU3Vic3RpdHV0aW9ucyA9IFtdKSB7XG4gICAgcmV0dXJuIGRlcml2ZWRTdWJzdGl0dXRpb25zO1xuICB9XG5cbiAgYWRkVHlwZSh0eXBlKSB7XG4gICAgdGhpcy50eXBlcy5wdXNoKHR5cGUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgdHlwZVN0cmluZyA9IHR5cGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7dHlwZVN0cmluZ30nIHR5cGUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRSdWxlKHJ1bGUpIHtcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBydWxlU3RyaW5nID0gcnVsZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtydWxlU3RyaW5nfScgcnVsZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZEF4aW9tKGF4aW9tKSB7XG4gICAgdGhpcy5heGlvbXMucHVzaChheGlvbSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBheGlvbVN0cmluZyA9IGF4aW9tLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2F4aW9tU3RyaW5nfScgYXhpb20gdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRMZW1tYShsZW1tYSkge1xuICAgIHRoaXMubGVtbWFzLnB1c2gobGVtbWEpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgbGVtbWFTdHJpbmcgPSBsZW1tYS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtsZW1tYVN0cmluZ30nIGxlbW1hIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkVGhlb3JlbSh0aGVvcmVtKSB7XG4gICAgdGhpcy50aGVvcmVtcy5wdXNoKHRoZW9yZW0pO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgdGhlb3JlbVN0cmluZyA9IHRoZW9yZW0uZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7dGhlb3JlbVN0cmluZ30nIHRoZW9yZW0gdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRNZXRhTGVtbWEobWV0YUxlbW1hKSB7XG4gICAgdGhpcy5tZXRhTGVtbWFzLnB1c2gobWV0YUxlbW1hKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIG1ldGFMZW1tYVN0cmluZyA9IG1ldGFMZW1tYS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHttZXRhTGVtbWFTdHJpbmd9JyBtZXRhLWxlbW1hIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkQ29uamVjdHVyZShjb25qZWN0dXJlKSB7XG4gICAgdGhpcy5jb25qZWN0dXJlcy5wdXNoKGNvbmplY3R1cmUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgb2NuamVjdHVyZVN0cmluZyA9IGNvbmplY3R1cmUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7b2NuamVjdHVyZVN0cmluZ30nIG9jbmplY3R1cmUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRDb21iaW5hdG9yKGNvbWJpbmF0b3IpIHtcbiAgICB0aGlzLmNvbWJpbmF0b3JzLnB1c2goY29tYmluYXRvcik7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBjb21iaW5hdG9yU3RyaW5nID0gY29tYmluYXRvci5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtjb21iaW5hdG9yU3RyaW5nfScgY29tYmluYXRvciB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFR5cGVQcmVmaXgodHlwZVByZWZpeCkge1xuICAgIHRoaXMudHlwZVByZWZpeGVzLnB1c2godHlwZVByZWZpeCk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0eXBlUHJlZml4U3RyaW5nID0gdHlwZVByZWZpeC5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0eXBlUHJlZml4U3RyaW5nfScgdHlwZS1wcmVmaXggdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRDb25zdHJ1Y3Rvcihjb25zdHJ1Y3Rvcikge1xuICAgIHRoaXMuY29uc3RydWN0b3JzLnB1c2goY29uc3RydWN0b3IpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgY29uc3RydWN0b3JTdHJpbmcgPSBjb25zdHJ1Y3Rvci5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtjb25zdHJ1Y3RvclN0cmluZ30nIGNvbnN0cnVjdG9yIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkTWV0YXRoZW9yZW0obWV0YXRoZW9yZW0pIHtcbiAgICB0aGlzLm1ldGF0aGVvcmVtcy5wdXNoKG1ldGF0aGVvcmVtKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIG1ldGF0aGVvcmVtU3RyaW5nID0gbWV0YXRoZW9yZW0uZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7bWV0YXRoZW9yZW1TdHJpbmd9JyBtZXRhdGhlb3JlbSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZERlY2xhcmVkVmFyaWFibGUoZGVjbGFyZWRWYXJpYWJsZSkge1xuICAgIHRoaXMuZGVjbGFyZWRWYXJpYWJsZXMucHVzaChkZWNsYXJlZFZhcmlhYmxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVTdHJpbmcgPSBkZWNsYXJlZFZhcmlhYmxlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2RlY2xhcmVkVmFyaWFibGVTdHJpbmd9JyBkZWNsYXJlZCB2YXJpYWJsZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZERlY2xhcmVkTWV0YXZhcmlhYmxlKGRlY2xhcmVkTWV0YXZhcmlhYmxlKSB7XG4gICAgdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMucHVzaChkZWNsYXJlZE1ldGF2YXJpYWJsZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZVN0cmluZyA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2RlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nfScgZGVjbGFyZWQgbWV0YXZhcmlhYmxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgZmluZE1ldGF2YXJpYWJsZShtZXRhdmFyaWFibGUsIGNvbnRleHQpIHtcbiAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSB0aGlzLmdldERlY2xhcmVkTWV0YXZhcmlhYmxlcygpO1xuXG4gICAgbWV0YXZhcmlhYmxlID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzLmZpbmQoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhdmFyaWFibGVVbmlmaWVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGUudW5pZnlNZXRhdmFyaWFibGUobWV0YXZhcmlhYmxlLCBjb250ZXh0KTtcblxuICAgICAgaWYgKG1ldGF2YXJpYWJsZVVuaWZpZXMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBtZXRhdmFyaWFibGU7XG4gIH1cblxuICBmaW5kUnVsZUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5nZXRSdWxlcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIHJ1bGUgPSBydWxlcy5maW5kKChydWxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IHJ1bGUubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBydWxlO1xuICB9XG5cbiAgZmluZEF4aW9tQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgYXhpb21zID0gdGhpcy5nZXRBeGlvbXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBheGlvbSA9IGF4aW9tcy5maW5kKChheGlvbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBheGlvbS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGF4aW9tO1xuICB9XG5cbiAgZmluZExlbW1hQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgbGVtbWFzID0gdGhpcy5nZXRMZW1tYXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBsZW1tYSA9IGxlbW1hcy5maW5kKChsZW1tYSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBsZW1tYS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGxlbW1hO1xuICB9XG5cbiAgZmluZFRoZW9yZW1CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCB0aGVvcmVtcyA9IHRoaXMuZ2V0VGhlb3JlbXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICB0aGVvcmVtID0gdGhlb3JlbXMuZmluZCgodGhlb3JlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSB0aGVvcmVtLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdGhlb3JlbTtcbiAgfVxuXG4gIGZpbmRDb25qZWN0dXJlQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgY29uamVjdHVyZXMgPSB0aGlzLmdldENvbmplY3R1cmVzKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgY29uamVjdHVyZSA9IGNvbmplY3R1cmVzLmZpbmQoKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gY29uamVjdHVyZS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGNvbmplY3R1cmU7XG4gIH1cblxuICBmaW5kTWV0YUxlbW1hc0J5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IG1ldGFMZW1tYXMgPSB0aGlzLmdldE1ldGFMZW1tYXMoKTtcblxuICAgIGZpbHRlcihtZXRhTGVtbWFzLCAobWV0YUxlbW1hKSA9PiB7XG4gICAgICBjb25zdCB0b3BMZXZlbE1ldGFBc3NlcnRpb24gPSBtZXRhTGVtbWEsIC8vL1xuICAgICAgICAgICAgdG9wTGV2ZWxNZXRhQXNzZXJ0aW9uQ29tcGFyZXMgPSByZWZlcmVuY2UuY29tcGFyZVRvcExldmVsTWV0YUFzc2VydGlvbih0b3BMZXZlbE1ldGFBc3NlcnRpb24pO1xuXG4gICAgICBpZiAodG9wTGV2ZWxNZXRhQXNzZXJ0aW9uQ29tcGFyZXMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWV0YUxlbW1hcztcbiAgfVxuXG4gIGZpbmRNZXRhdGhlb3JlbXNCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBtZXRhdGhlb3JlbXMgPSB0aGlzLmdldE1ldGF0aGVvcmVtcygpO1xuXG4gICAgZmlsdGVyKG1ldGF0aGVvcmVtcywgKG1ldGF0aGVvcmVtKSA9PiB7XG4gICAgICBjb25zdCB0b3BMZXZlbE1ldGFBc3NlcnRpb24gPSBtZXRhdGhlb3JlbSwgLy8vXG4gICAgICAgICAgICB0b3BMZXZlbE1ldGFBc3NlcnRpb25Db21wYXJlcyA9IHJlZmVyZW5jZS5jb21wYXJlVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uKHRvcExldmVsTWV0YUFzc2VydGlvbik7XG5cbiAgICAgIGlmICh0b3BMZXZlbE1ldGFBc3NlcnRpb25Db21wYXJlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtZXRhdGhlb3JlbXM7XG4gIH1cblxuICBmaW5kVG9wTGV2ZWxBc3NlcnRpb25CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBheGlvbSA9IHRoaXMuZmluZEF4aW9tQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICBsZW1tYSA9IHRoaXMuZmluZExlbW1hQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICB0aGVvcmVtID0gdGhpcy5maW5kVGhlb3JlbUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSksXG4gICAgICAgICAgY29uamVjdHVyZSA9IHRoaXMuZmluZENvbmplY3R1cmVCeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIHRvcExldmVsQXNzZXJ0aW9uID0gKGF4aW9tIHx8IGxlbW1hIHx8IHRoZW9yZW0gfHwgY29uamVjdHVyZSk7XG5cbiAgICByZXR1cm4gdG9wTGV2ZWxBc3NlcnRpb247XG4gIH1cblxuICBmaW5kVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgbWV0YUxlbW1hID0gdGhpcy5maW5kTWV0YUxlbW1hQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICBtZXRhdGhlb3JlbSA9IHRoaXMuZmluZE1ldGF0aGVvcmVtQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICB0b3BMZXZlbE1ldGFBc3NlcnRpb24gPSAobWV0YUxlbW1hIHx8IG1ldGF0aGVvcmVtKTsgIC8vL1xuXG4gICAgcmV0dXJuIHRvcExldmVsTWV0YUFzc2VydGlvbjtcbiAgfVxuXG4gIGZpbmRUb3BMZXZlbE1ldGFBc3NlcnRpb25zQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgbWV0YUxlbW1hcyA9IHRoaXMuZmluZE1ldGFMZW1tYXNCeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIG1ldGF0aGVvcmVtcyA9IHRoaXMuZmluZE1ldGF0aGVvcmVtc0J5UmVmZXJlbmNlKHJlZmVyZW5jZSksXG4gICAgICAgICAgdG9wTGV2ZWxNZXRhQXNzZXJ0aW9ucyA9IFtcbiAgICAgICAgICAgIC4uLm1ldGFMZW1tYXMsXG4gICAgICAgICAgICAuLi5tZXRhdGhlb3JlbXNcbiAgICAgICAgICBdO1xuXG4gICAgcmV0dXJuIHRvcExldmVsTWV0YUFzc2VydGlvbnM7XG4gIH1cblxuICBmaW5kVHlwZUJ5VHlwZU5hbWUodHlwZU5hbWUsIGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGxldCB0eXBlcyA9IHRoaXMuZ2V0VHlwZXMoaW5jbHVkZVJlbGVhc2UpO1xuXG4gICAgY29uc3QgYmFzZVR5cGUgPSBiYXNlVHlwZUZyb21Ob3RoaW5nKCk7XG5cbiAgICB0eXBlcyA9IFtcbiAgICAgIC4uLnR5cGVzLFxuICAgICAgYmFzZVR5cGVcbiAgICBdO1xuXG4gICAgY29uc3QgdHlwZSA9IHR5cGVzLmZpbmQoKHR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvVHlwZU5hbWUgPSB0eXBlLmNvbXBhcmVUeXBlTmFtZSh0eXBlTmFtZSk7XG5cbiAgICAgIGlmICh0eXBlQ29tcGFyZXNUb1R5cGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGZpbmRUeXBlQnlOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKSB7XG4gICAgbGV0IHR5cGVzID0gdGhpcy5nZXRUeXBlcygpO1xuXG4gICAgY29uc3QgYmFzZVR5cGUgPSBiYXNlVHlwZUZyb21Ob3RoaW5nKCk7XG5cbiAgICB0eXBlcyA9IFtcbiAgICAgIC4uLnR5cGVzLFxuICAgICAgYmFzZVR5cGVcbiAgICBdO1xuXG4gICAgY29uc3QgdHlwZSA9IHR5cGVzLmZpbmQoKHR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvTm9taW5hbFR5cGVOYW1lID0gdHlwZS5jb21wYXJlTm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSk7XG5cbiAgICAgIGlmICh0eXBlQ29tcGFyZXNUb05vbWluYWxUeXBlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBmaW5kVHlwZUJ5UHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKSB7XG4gICAgbGV0IHR5cGVzID0gdGhpcy5nZXRUeXBlcygpO1xuXG4gICAgY29uc3QgYmFzZVR5cGUgPSBiYXNlVHlwZUZyb21Ob3RoaW5nKCk7XG5cbiAgICB0eXBlcyA9IFtcbiAgICAgIC4uLnR5cGVzLFxuICAgICAgYmFzZVR5cGVcbiAgICBdO1xuXG4gICAgY29uc3QgdHlwZSA9IHR5cGVzLmZpbmQoKHR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSA9IHR5cGUuY29tcGFyZVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSk7XG5cbiAgICAgIGlmICh0eXBlQ29tcGFyZXNUb1ByZWZpeGVkVHlwZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgZmluZFR5cGVQcmVmaXhCeVR5cGVQcmVmaXhOYW1lKHR5cGVQcmVmaXhOYW1lKSB7XG4gICAgY29uc3QgdHlwZVByZWZpeGVzID0gdGhpcy5nZXRUeXBlUHJlZml4ZXMoKSxcbiAgICAgICAgICB0eXBlUHJlZml4ID0gdHlwZVByZWZpeGVzLmZpbmQoKHR5cGVQcmVmaXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVQcmVmaXhDb21wYXJlc1RvVHlwZVByZWZpeE5hbWUgPSB0eXBlUHJlZml4LmNvbXBhcmVUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlUHJlZml4Q29tcGFyZXNUb1R5cGVQcmVmaXhOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeDtcbiAgfVxuXG4gIGZpbmREZWNsYXJlZFZhcmlhYmxlQnlWYXJpYWJsZUlkZW50aWZpZXIoVmFyaWFibGVJZGVudGl0aWZlcikge1xuICAgIGNvbnN0IGRlY2xhcmVkVmFyaWFibGVzID0gdGhpcy5nZXREZWNsYXJlZFZhcmlhYmxlcygpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGUgPSBkZWNsYXJlZFZhcmlhYmxlcy5maW5kKChkZWNsYXJlZFZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIgPSBkZWNsYXJlZFZhcmlhYmxlLmNvbXBhcmVWYXJpYWJsZUlkZW50aWZpZXIoVmFyaWFibGVJZGVudGl0aWZlcik7XG5cbiAgICAgICAgICAgIGlmIChkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBkZWNsYXJlZFZhcmlhYmxlO1xuICB9XG5cbiAgZmluZERlY2xhcmVkTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpIHtcbiAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSB0aGlzLmdldERlY2xhcmVkTWV0YXZhcmlhYmxlcygpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzLmZpbmQoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lID0gZGVjbGFyZWRNZXRhdmFyaWFibGUuY29tcGFyZU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gZGVjbGFyZWRNZXRhdmFyaWFibGU7XG4gIH1cblxuICBmaW5kVGVybUJ5VGVybU5vZGUodGVybU5vZGUpIHtcbiAgICBjb25zdCB0ZXJtID0gbnVsbDtcblxuICAgIHJldHVybiB0ZXJtO1xuICB9XG5cbiAgZmluZFN0YXRlbWVudEJ5U3RhdGVtZW50Tm9kZShzdGF0ZW1lbnROb2RlKSB7XG4gICAgY29uc3Qgc3RhdGVtZW50ID0gbnVsbDtcblxuICAgIHJldHVybiBzdGF0ZW1lbnQ7XG4gIH1cblxuICBmaW5kTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpIHtcbiAgICBjb25zdCBtZXRhdmFyaWFibGUgPSBudWxsO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRTdWJzdGl0dXRpb25CeVN1YnN0aXR1dGlvbk5vZGUoc3Vic3RpdHV0aW9uTm9kZSkge1xuICAgIGNvbnN0IHN1YnN0aXR1dGlvbiA9IG51bGw7XG5cbiAgICByZXR1cm4gc3Vic3RpdHV0aW9uO1xuICB9XG5cbiAgZmluZE1ldGFMZXZlbEFzc3VtcHRpb25CeU1ldGFMZXZlbEFzc3VtcHRpb25Ob2RlKG1ldGFMZXZlbEFzc3VtcHRpb25Ob2RlKSB7XG4gICAgY29uc3QgbWV0YUxldmVsQXNzdW1wdGlvbiA9IG51bGw7XG5cbiAgICByZXR1cm4gbWV0YUxldmVsQXNzdW1wdGlvbjtcbiAgfVxuXG4gIGZpbmRQcm9jZWR1cmVCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSB0aGlzLmdldFByb2NlZHVyZXMoKSxcbiAgICAgICAgICBwcm9jZWR1cmUgPSBwcm9jZWR1cmVzLmZpbmQoKHByb2NlZHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvY2VkdXJlQ29tcGFyZXNUb1Byb2NlZHVyZU5hbWUgPSBwcm9jZWR1cmUuY29tcGFyZVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZWR1cmVDb21wYXJlc1RvUHJvY2VkdXJlTmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHByb2NlZHVyZTtcbiAgfVxuXG4gIGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lKG1ldGFUeXBlTmFtZSkgeyByZXR1cm4gZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUobWV0YVR5cGVOYW1lKTsgfVxuXG4gIGlzTWV0YXZhcmlhYmxlUHJlc2VudChtZXRhdmFyaWFibGUsIGNvbnRleHQpIHtcbiAgICBtZXRhdmFyaWFibGUgPSB0aGlzLmZpbmRNZXRhdmFyaWFibGUobWV0YXZhcmlhYmxlLCBjb250ZXh0KTsgIC8vL1xuXG4gICAgY29uc3QgbWV0YXZhcmlhYmxlUHJlc2VudCA9IChtZXRhdmFyaWFibGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZVByZXNlbnQ7XG4gIH1cblxuICBpc0xhYmVsUHJlc2VudEJ5UmVmZXJlbmNlKHJlZmVyZW5jZSwgY29udGV4dCA9IG51bGwpIHtcbiAgICBjb25zdCBsYWJlbHMgPSB0aGlzLmdldExhYmVscygpLFxuICAgICAgICAgIGxhYmVsUHJlc2VudCA9IGxhYmVscy5zb21lKChsYWJlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWxVbmlmaWVzID0gcmVmZXJlbmNlLnVuaWZ5TGFiZWwobGFiZWwsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICBpZiAobGFiZWxVbmlmaWVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGxhYmVsUHJlc2VudDtcbiAgfVxuXG4gIGlzVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uUHJlc2VudEJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHRvcExldmVsTWV0YUFzc2VydGlvbiA9IHRoaXMuZmluZFRvcExldmVsTWV0YUFzc2VydGlvbkJ5UmVmZXJlbmNlKHJlZmVyZW5jZSksXG4gICAgICAgICAgdG9wTGV2ZWxNZXRhQXNzZXJ0aW9uUHJlc2VudCA9ICh0b3BMZXZlbE1ldGFBc3NlcnRpb24gIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvcExldmVsTWV0YUFzc2VydGlvblByZXNlbnQ7XG4gIH1cblxuICBpc0xhYmVsUHJlc2VudEJ5TGFiZWxOb2RlKGxhYmVsTm9kZSkge1xuICAgIGNvbnN0IGxhYmVscyA9IHRoaXMuZ2V0TGFiZWxzKCksXG4gICAgICAgICAgbGFiZWxQcmVzZW50ID0gbGFiZWxzLnNvbWUoKGxhYmVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbE5vZGVNYXRjaGVzID0gbGFiZWwubWF0Y2hMYWJlbE5vZGUobGFiZWxOb2RlKTtcblxuICAgICAgICAgICAgaWYgKGxhYmVsTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gbGFiZWxQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlc2VudEJ5VHlwZU5hbWUodHlwZU5hbWUsIGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZpbmRUeXBlQnlUeXBlTmFtZSh0eXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UpLFxuICAgICAgICAgIHR5cGVQcmVzZW50ID0gKHR5cGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlc2VudEJ5Tm9taW5hbFR5cGVOYW1lKG5vbWluYWxUeXBlTmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZpbmRUeXBlQnlOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKSxcbiAgICAgICAgICB0eXBlUHJlc2VudCA9ICh0eXBlICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0eXBlUHJlc2VudDtcbiAgfVxuXG4gIGlzVHlwZVByZXNlbnRCeVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZpbmRUeXBlQnlQcmVmaXhlZFR5cGVOYW1lKHByZWZpeGVkVHlwZU5hbWUpLFxuICAgICAgICAgIHR5cGVQcmVzZW50ID0gKHR5cGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlZml4UHJlc2VudEJ5VHlwZVByZWZpeE5hbWUodHlwZVByZWZpeE5hbWUpIHtcbiAgICBjb25zdCB0eXBlUHJlZml4ID0gdGhpcy5maW5kVHlwZVByZWZpeEJ5VHlwZVByZWZpeE5hbWUodHlwZVByZWZpeE5hbWUpLFxuICAgICAgICAgIHR5cGVQcmVmaXhQcmVzZW50ID0gKHR5cGVQcmVmaXggIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVmaXhQcmVzZW50O1xuICB9XG5cbiAgaXNEZWNsYXJlZFZhcmlhYmxlUHJlc2VudEJ5VmFyaWFibGVJZGVudGlmaWVyKHZhcmlhYmxlSWRlbnRpZmllcikge1xuICAgIGNvbnN0IGRlY2xhcmVkVmFyaWFibGUgPSB0aGlzLmZpbmREZWNsYXJlZFZhcmlhYmxlQnlWYXJpYWJsZUlkZW50aWZpZXIodmFyaWFibGVJZGVudGlmaWVyKSxcbiAgICAgICAgICBkZWNsYXJlZFZhcmlhYmxlUHJlc2VudCA9IChkZWNsYXJlZFZhcmlhYmxlICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkZWNsYXJlZFZhcmlhYmxlUHJlc2VudDtcbiAgfVxuXG4gIGlzRGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50QnlNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpIHtcbiAgICBjb25zdCBkZWNsYXJlZE1ldGF2YXJpYWJsZSA9IHRoaXMuZmluZERlY2xhcmVkTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOYW1lKG1ldGF2YXJpYWJsZU5hbWUpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudCA9IChkZWNsYXJlZE1ldGF2YXJpYWJsZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50O1xuICB9XG5cbiAgaXNQcm9jZWR1cmVQcmVzZW50QnlQcm9jZWR1cmVOYW1lKHByb2NlZHVyZU5hbWUpIHtcbiAgICBjb25zdCBwcm9jZWR1cmUgPSB0aGlzLmZpbmRQcm9jZWR1cmVCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSksXG4gICAgICAgICAgcHJvY2VkdXJlUHJlc2VudCA9IChwcm9jZWR1cmUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHByb2NlZHVyZVByZXNlbnQ7XG4gIH1cblxuICBpc01ldGFMZXZlbCgpIHtcbiAgICBjb25zdCBtZXRhTEV2ZWwgPSBmYWxzZTtcblxuICAgIHJldHVybiBtZXRhTEV2ZWw7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnR5cGVzID0gW107XG4gICAgdGhpcy5ydWxlcyA9IFtdO1xuICAgIHRoaXMuYXhpb21zID0gW107XG4gICAgdGhpcy5sZW1tYXMgPSBbXTtcbiAgICB0aGlzLnRoZW9yZW1zID0gW107XG4gICAgdGhpcy5tZXRhTGVtbWFzID0gW107XG4gICAgdGhpcy5jb25qZWN0dXJlcyA9IFtdO1xuICAgIHRoaXMuY29tYmluYXRvcnMgPSBbXTtcbiAgICB0aGlzLnR5cGVQcmVmaXhlcyA9IFtdO1xuICAgIHRoaXMuY29uc3RydWN0b3JzID0gW107XG4gICAgdGhpcy5tZXRhdGhlb3JlbXMgPSBbXTtcbiAgICB0aGlzLmRlY2xhcmVkVmFyaWFibGVzID0gW107XG4gICAgdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBbXTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIC8vL1xuICB9XG5cbiAgYXN5bmMgdmVyaWZ5RmlsZSgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5nZXROb2RlKCksXG4gICAgICAgICAgY29udGV4dCA9IHRoaXMsIC8vL1xuICAgICAgICAgIGZpbGVOb2RlID0gbm9kZSwgIC8vL1xuICAgICAgICAgIGZpbGVWZXJpZmllcyA9IGF3YWl0IHZlcmlmeUZpbGUoZmlsZU5vZGUsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGZpbGVWZXJpZmllcztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgY29uc3QganNvbiA9IHRoaXMuZ2V0SlNPTigpO1xuXG4gICAgaWYgKGpzb24gPT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGVDb250ZXh0ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLnR5cGVzID0gW107XG5cbiAgICB0eXBlc0Zyb21KU09OKGpzb24sIHRoaXMudHlwZXMsIGZpbGVDb250ZXh0KTtcblxuICAgIHRoaXMubGVtbWFzID0gW107XG4gICAgdGhpcy5tZXRhTGVtbWFzID0gW107XG5cbiAgICB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmRlY2xhcmVkVmFyaWFibGVzID0gZGVjbGFyZWRWYXJpYWJsZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5jb21iaW5hdG9ycyA9IGNvbWJpbmF0b3JzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuY29uc3RydWN0b3JzID0gY29uc3RydWN0b3JzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuXG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuYXhpb21zID0gYXhpb21zRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMudGhlb3JlbXMgPSB0aGVvcmVtc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmNvbmplY3R1cmVzID0gY29uamVjdHVyZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5tZXRhdGhlb3JlbXMgPSBtZXRhdGhlb3JlbXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3QgdHlwZXNKU09OID0gdHlwZXNUb1R5cGVzSlNPTih0aGlzLnR5cGVzKSxcbiAgICAgICAgICBydWxlc0pTT04gPSBydWxlc1RvUnVsZXNKU09OKHRoaXMucnVsZXMpLFxuICAgICAgICAgIGF4aW9tc0pTT04gPSBheGlvbXNUb0F4aW9tc0pTT04odGhpcy5heGlvbXMpLFxuICAgICAgICAgIHRoZW9yZW1zSlNPTiA9IHRoZW9yZW1zVG9UaGVvcmVtc0pTT04odGhpcy50aGVvcmVtcyksXG4gICAgICAgICAgY29uamVjdHVyZXNKU09OID0gY29uamVjdHVyZXNUb0NvbmplY3R1cmVzSlNPTih0aGlzLmNvbmplY3R1cmVzKSxcbiAgICAgICAgICBjb21iaW5hdG9yc0pTT04gPSBjb21iaW5hdG9yc1RvQ29tYmluYXRvcnNKU09OKHRoaXMuY29tYmluYXRvcnMpLFxuICAgICAgICAgIHR5cGVQcmVmaXhlc0pTT04gPSB0eXBlUHJlZml4ZXNUb1R5cGVQcmVmaXhlc0pTT04odGhpcy50eXBlUHJlZml4ZXMpLFxuICAgICAgICAgIGNvbnN0cnVjdG9yc0pTT04gPSBjb25zdHJ1Y3RvcnNUb0NvbnN0cnVjdG9yc0pTT04odGhpcy5jb25zdHJ1Y3RvcnMpLFxuICAgICAgICAgIG1ldGF0aGVvcmVtc0pTT04gPSBtZXRhdGhlb3JlbXNUb01ldGF0aGVvcmVtc0pTT04odGhpcy5tZXRhdGhlb3JlbXMpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzSlNPTiA9IGRlY2xhcmVkVmFyaWFibGVzVG9EZWNsYXJlZFZhcmlhYmxlc0pTT04odGhpcy5kZWNsYXJlZFZhcmlhYmxlcyksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiA9IGRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTih0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcyksXG4gICAgICAgICAgZmlsZUNvbnRlbnQgPSB0aGlzLmZpbGVDb250ZW50LFxuICAgICAgICAgIGZpbGVQYXRoID0gdGhpcy5maWxlUGF0aCxcbiAgICAgICAgICB0eXBlcyA9IHR5cGVzSlNPTiwgIC8vL1xuICAgICAgICAgIHJ1bGVzID0gcnVsZXNKU09OLCAgLy8vXG4gICAgICAgICAgYXhpb21zID0gYXhpb21zSlNPTiwgIC8vL1xuICAgICAgICAgIHRoZW9yZW1zID0gdGhlb3JlbXNKU09OLCAgLy8vXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBjb25qZWN0dXJlc0pTT04sICAvLy9cbiAgICAgICAgICBjb21iaW5hdG9ycyA9IGNvbWJpbmF0b3JzSlNPTiwgIC8vL1xuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IHR5cGVQcmVmaXhlc0pTT04sICAvLy9cbiAgICAgICAgICBjb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnNKU09OLCAgLy8vXG4gICAgICAgICAgbWV0YXRoZW9yZW1zID0gbWV0YXRoZW9yZW1zSlNPTiwgIC8vL1xuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzID0gZGVjbGFyZWRWYXJpYWJsZXNKU09OLCAgLy8vXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBmaWxlQ29udGVudCxcbiAgICAgICAgICAgIGZpbGVQYXRoLFxuICAgICAgICAgICAgdHlwZXMsXG4gICAgICAgICAgICBydWxlcyxcbiAgICAgICAgICAgIGF4aW9tcyxcbiAgICAgICAgICAgIHRoZW9yZW1zLFxuICAgICAgICAgICAgY29uamVjdHVyZXMsXG4gICAgICAgICAgICBjb21iaW5hdG9ycyxcbiAgICAgICAgICAgIHR5cGVQcmVmaXhlcyxcbiAgICAgICAgICAgIGNvbnN0cnVjdG9ycyxcbiAgICAgICAgICAgIG1ldGF0aGVvcmVtcyxcbiAgICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzLFxuICAgICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzXG4gICAgICAgICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21GaWxlKGZpbGUsIGNvbnRleHQpIHtcbiAgICBjb25zdCByZWxlYXNlQ29udGV4dCA9IGNvbnRleHQsIC8vL1xuICAgICAgICAgIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciA9IHJlbGVhc2VDb250ZXh0LmdldENvbWJpbmVkQ3VzdG9tR3JhbW1hcigpLFxuICAgICAgICAgIG5vbWluYWxMZXhlciA9IG5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbExleGVyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIG5vbWluYWxQYXJzZXIgPSBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsUGFyc2VyLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpLFxuICAgICAgICAgIGxleGVyID0gbm9taW5hbExleGVyLCAvLy9cbiAgICAgICAgICBwYXJzZXIgPSBub21pbmFsUGFyc2VyLCAvLy9cbiAgICAgICAgICB0eXBlcyA9IFtdLFxuICAgICAgICAgIHJ1bGVzID0gW10sXG4gICAgICAgICAgYXhpb21zID0gW10sXG4gICAgICAgICAgbGVtbWFzID0gW10sXG4gICAgICAgICAgdGhlb3JlbXMgPSBbXSxcbiAgICAgICAgICBtZXRhTGVtbWFzID0gW10sXG4gICAgICAgICAgY29uamVjdHVyZXMgPSBbXSxcbiAgICAgICAgICBjb21iaW5hdG9ycyA9IFtdLFxuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IFtdLFxuICAgICAgICAgIGNvbnN0cnVjdG9ycyA9IFtdLFxuICAgICAgICAgIG1ldGF0aGVvcmVtcyA9IFtdLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzID0gW10sXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gW10sXG4gICAgICAgICAgbm9taW5hbEZpbGVDb250ZXh0ID0gRmlsZUNvbnRleHQuZnJvbUZpbGUoTm9taW5hbEZpbGVDb250ZXh0LCBmaWxlLCBsZXhlciwgcGFyc2VyLCB0eXBlcywgcnVsZXMsIGF4aW9tcywgbGVtbWFzLCB0aGVvcmVtcywgbWV0YUxlbW1hcywgY29uamVjdHVyZXMsIGNvbWJpbmF0b3JzLCB0eXBlUHJlZml4ZXMsIGNvbnN0cnVjdG9ycywgbWV0YXRoZW9yZW1zLCBkZWNsYXJlZFZhcmlhYmxlcywgZGVjbGFyZWRNZXRhdmFyaWFibGVzLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBub21pbmFsRmlsZUNvbnRleHQ7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0ID0gY29udGV4dCwgLy8vXG4gICAgICAgICAgY29tYmluZWRDdXN0b21HcmFtbWFyID0gcmVsZWFzZUNvbnRleHQuZ2V0Q29tYmluZWRDdXN0b21HcmFtbWFyKCksXG4gICAgICAgICAgbm9taW5hbExleGVyID0gbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsTGV4ZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbm9taW5hbFBhcnNlciA9IG5vbWluYWxQYXJzZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKE5vbWluYWxQYXJzZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbGV4ZXIgPSBub21pbmFsTGV4ZXIsIC8vL1xuICAgICAgICAgIHBhcnNlciA9IG5vbWluYWxQYXJzZXIsIC8vL1xuICAgICAgICAgIHR5cGVzID0gbnVsbCxcbiAgICAgICAgICBydWxlcyA9IG51bGwsXG4gICAgICAgICAgYXhpb21zID0gbnVsbCxcbiAgICAgICAgICBsZW1tYXMgPSBudWxsLFxuICAgICAgICAgIHRoZW9yZW1zID0gbnVsbCxcbiAgICAgICAgICBtZXRhTGVtbWFzID0gbnVsbCxcbiAgICAgICAgICBjb25qZWN0dXJlcyA9IG51bGwsXG4gICAgICAgICAgY29tYmluYXRvcnMgPSBudWxsLFxuICAgICAgICAgIHR5cGVQcmVmaXhlcyA9IG51bGwsXG4gICAgICAgICAgY29uc3RydWN0b3JzID0gbnVsbCxcbiAgICAgICAgICBtZXRhdGhlb3JlbXMgPSBudWxsLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzID0gbnVsbCxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBudWxsLFxuICAgICAgICAgIG5vbWluYWxGaWxlQ29udGV4dCA9IEZpbGVDb250ZXh0LmZyb21KU09OKE5vbWluYWxGaWxlQ29udGV4dCwganNvbiwgbGV4ZXIsIHBhcnNlciwgdHlwZXMsIHJ1bGVzLCBheGlvbXMsIGxlbW1hcywgdGhlb3JlbXMsIG1ldGFMZW1tYXMsIGNvbmplY3R1cmVzLCBjb21iaW5hdG9ycywgdHlwZVByZWZpeGVzLCBjb25zdHJ1Y3RvcnMsIG1ldGF0aGVvcmVtcywgZGVjbGFyZWRWYXJpYWJsZXMsIGRlY2xhcmVkTWV0YXZhcmlhYmxlcywgY29udGV4dCk7XG5cbiAgICByZXR1cm4gbm9taW5hbEZpbGVDb250ZXh0O1xuICB9XG59XG4iXSwibmFtZXMiOlsiTm9taW5hbEZpbGVDb250ZXh0IiwicHVzaCIsImZpbHRlciIsImFycmF5VXRpbGl0aWVzIiwiRmlsZUNvbnRleHQiLCJjb250ZXh0IiwiZmlsZUNvbnRlbnQiLCJmaWxlUGF0aCIsInRva2VucyIsIm5vZGUiLCJqc29uIiwibGV4ZXIiLCJwYXJzZXIiLCJ0eXBlcyIsInJ1bGVzIiwiYXhpb21zIiwibGVtbWFzIiwidGhlb3JlbXMiLCJtZXRhTGVtbWFzIiwiY29uamVjdHVyZXMiLCJjb21iaW5hdG9ycyIsInR5cGVQcmVmaXhlcyIsImNvbnN0cnVjdG9ycyIsIm1ldGF0aGVvcmVtcyIsImRlY2xhcmVkVmFyaWFibGVzIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVzIiwiZ2V0TGV4ZXIiLCJnZXRQYXJzZXIiLCJnZXRFcXVpdmFsZW5jZXMiLCJlcXVpdmFsZW5jZXMiLCJnZXRTdWJwcm9vZk9yUHJvb2ZBc3NlcnRpb25zIiwic3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyIsImdldExhYmVscyIsImluY2x1ZGVSZWxlYXNlIiwibGFiZWxzIiwicmVsZWFzZUNvbnRleHRMYWJlbHMiLCJmb3JFYWNoIiwicnVsZSIsInJ1bGVMYWJlbHMiLCJheGlvbSIsImF4aW9tTGFiZWxzIiwibGVtbWEiLCJsZW1tYUxhYmVscyIsInRoZW9yZW0iLCJ0aGVvcmVtTGFiZWxzIiwiY29uamVjdHVyZSIsImNvbmplY3R1cmVMYWJlbHMiLCJtZXRhdGhlb3JlbSIsIm1ldGF0aGVvcmVtTGFiZWwiLCJnZXRMYWJlbCIsImdldFR5cGVzIiwiZ2V0UnVsZXMiLCJnZXRBeGlvbXMiLCJnZXRMZW1tYXMiLCJnZXRUaGVvcmVtcyIsImdldE1ldGFMZW1tYXMiLCJnZXRDb25qZWN0dXJlcyIsImdldENvbWJpbmF0b3JzIiwiZ2V0VHlwZVByZWZpeGVzIiwiZ2V0Q29uc3RydWN0b3JzIiwiZ2V0TWV0YXRoZW9yZW1zIiwiZ2V0UHJvY2VkdXJlcyIsInByb2NlZHVyZXMiLCJnZXREZWNsYXJlZFZhcmlhYmxlcyIsImdldERlY2xhcmVkTWV0YXZhcmlhYmxlcyIsImdldERlY2xhcmVkSnVkZ2VtZW50cyIsImRlY2xhcmVkSnVkZ2VtZW50cyIsImdldFRlcm1zIiwidGVybXMiLCJnZXRGcmFtZXMiLCJmcmFtZXMiLCJnZXRQcm9wZXJ0aWVzIiwicHJvcGVydGllcyIsImdldEVxdWFsaXRpZXMiLCJlcXVhbGl0aWVzIiwiZ2V0SnVkZ2VtZW50cyIsImp1ZGdlbWVudHMiLCJnZXRBc3NlcnRpb25zIiwiYXNzZXJ0aW9ucyIsImdldFN0YXRlbWVudHMiLCJzdGF0ZW1lbnRzIiwiZ2V0U2lnbmF0dXJlcyIsInNpZ25hdHVyZXMiLCJnZXRSZWZlcmVuY2VzIiwicmVmZXJlbmNlcyIsImdldEFzc3VtcHRpb25zIiwiYXNzdW1wdGlvbnMiLCJnZXRNZXRhdmFyaWFibGVzIiwibWV0YXZhcmlhYmxlcyIsImdldFN1YnN0aXR1dGlvbnMiLCJzdWJzdGl0dXRpb25zIiwiZ2V0UHJvcGVydHlSZWxhdGlvbnMiLCJwcm9wZXJ0eVJlbGF0aW9ucyIsImdldERlcml2ZWRTdWJzdGl0dXRpb25zIiwiZGVyaXZlZFN1YnN0aXR1dGlvbnMiLCJhZGRUeXBlIiwidHlwZSIsImdldEZpbGVQYXRoIiwidHlwZVN0cmluZyIsImdldFN0cmluZyIsInRyYWNlIiwiYWRkUnVsZSIsInJ1bGVTdHJpbmciLCJhZGRBeGlvbSIsImF4aW9tU3RyaW5nIiwiYWRkTGVtbWEiLCJsZW1tYVN0cmluZyIsImFkZFRoZW9yZW0iLCJ0aGVvcmVtU3RyaW5nIiwiYWRkTWV0YUxlbW1hIiwibWV0YUxlbW1hIiwibWV0YUxlbW1hU3RyaW5nIiwiYWRkQ29uamVjdHVyZSIsIm9jbmplY3R1cmVTdHJpbmciLCJhZGRDb21iaW5hdG9yIiwiY29tYmluYXRvciIsImNvbWJpbmF0b3JTdHJpbmciLCJhZGRUeXBlUHJlZml4IiwidHlwZVByZWZpeCIsInR5cGVQcmVmaXhTdHJpbmciLCJhZGRDb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3JTdHJpbmciLCJhZGRNZXRhdGhlb3JlbSIsIm1ldGF0aGVvcmVtU3RyaW5nIiwiYWRkRGVjbGFyZWRWYXJpYWJsZSIsImRlY2xhcmVkVmFyaWFibGUiLCJkZWNsYXJlZFZhcmlhYmxlU3RyaW5nIiwiYWRkRGVjbGFyZWRNZXRhdmFyaWFibGUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nIiwiZmluZE1ldGF2YXJpYWJsZSIsIm1ldGF2YXJpYWJsZSIsImZpbmQiLCJtZXRhdmFyaWFibGVVbmlmaWVzIiwidW5pZnlNZXRhdmFyaWFibGUiLCJmaW5kUnVsZUJ5UmVmZXJlbmNlIiwicmVmZXJlbmNlIiwibWV0YXZhcmlhYmxlTm9kZSIsImdldE1ldGF2YXJpYWJsZU5vZGUiLCJtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyIsIm1hdGNoTWV0YXZhcmlhYmxlTm9kZSIsImZpbmRBeGlvbUJ5UmVmZXJlbmNlIiwiZmluZExlbW1hQnlSZWZlcmVuY2UiLCJmaW5kVGhlb3JlbUJ5UmVmZXJlbmNlIiwiZmluZENvbmplY3R1cmVCeVJlZmVyZW5jZSIsImZpbmRNZXRhTGVtbWFzQnlSZWZlcmVuY2UiLCJ0b3BMZXZlbE1ldGFBc3NlcnRpb24iLCJ0b3BMZXZlbE1ldGFBc3NlcnRpb25Db21wYXJlcyIsImNvbXBhcmVUb3BMZXZlbE1ldGFBc3NlcnRpb24iLCJmaW5kTWV0YXRoZW9yZW1zQnlSZWZlcmVuY2UiLCJmaW5kVG9wTGV2ZWxBc3NlcnRpb25CeVJlZmVyZW5jZSIsInRvcExldmVsQXNzZXJ0aW9uIiwiZmluZFRvcExldmVsTWV0YUFzc2VydGlvbkJ5UmVmZXJlbmNlIiwiZmluZE1ldGFMZW1tYUJ5UmVmZXJlbmNlIiwiZmluZE1ldGF0aGVvcmVtQnlSZWZlcmVuY2UiLCJmaW5kVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uc0J5UmVmZXJlbmNlIiwidG9wTGV2ZWxNZXRhQXNzZXJ0aW9ucyIsImZpbmRUeXBlQnlUeXBlTmFtZSIsInR5cGVOYW1lIiwiYmFzZVR5cGUiLCJiYXNlVHlwZUZyb21Ob3RoaW5nIiwidHlwZUNvbXBhcmVzVG9UeXBlTmFtZSIsImNvbXBhcmVUeXBlTmFtZSIsImZpbmRUeXBlQnlOb21pbmFsVHlwZU5hbWUiLCJub21pbmFsVHlwZU5hbWUiLCJ0eXBlQ29tcGFyZXNUb05vbWluYWxUeXBlTmFtZSIsImNvbXBhcmVOb21pbmFsVHlwZU5hbWUiLCJmaW5kVHlwZUJ5UHJlZml4ZWRUeXBlTmFtZSIsInByZWZpeGVkVHlwZU5hbWUiLCJ0eXBlQ29tcGFyZXNUb1ByZWZpeGVkVHlwZU5hbWUiLCJjb21wYXJlUHJlZml4ZWRUeXBlTmFtZSIsImZpbmRUeXBlUHJlZml4QnlUeXBlUHJlZml4TmFtZSIsInR5cGVQcmVmaXhOYW1lIiwidHlwZVByZWZpeENvbXBhcmVzVG9UeXBlUHJlZml4TmFtZSIsImNvbXBhcmVUeXBlUHJlZml4TmFtZSIsImZpbmREZWNsYXJlZFZhcmlhYmxlQnlWYXJpYWJsZUlkZW50aWZpZXIiLCJWYXJpYWJsZUlkZW50aXRpZmVyIiwiZGVjbGFyZWRWYXJpYWJsZUNvbXBhcmVzVG9WYXJpYWJsZUlkZW50aXRpZmVyIiwiY29tcGFyZVZhcmlhYmxlSWRlbnRpZmllciIsImZpbmREZWNsYXJlZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTmFtZSIsIm1ldGF2YXJpYWJsZU5hbWUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZUNvbXBhcmVzVG9NZXRhdmFyaWFibGVOYW1lIiwiY29tcGFyZU1ldGF2YXJpYWJsZU5hbWUiLCJmaW5kVGVybUJ5VGVybU5vZGUiLCJ0ZXJtTm9kZSIsInRlcm0iLCJmaW5kU3RhdGVtZW50QnlTdGF0ZW1lbnROb2RlIiwic3RhdGVtZW50Tm9kZSIsInN0YXRlbWVudCIsImZpbmRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5vZGUiLCJmaW5kU3Vic3RpdHV0aW9uQnlTdWJzdGl0dXRpb25Ob2RlIiwic3Vic3RpdHV0aW9uTm9kZSIsInN1YnN0aXR1dGlvbiIsImZpbmRNZXRhTGV2ZWxBc3N1bXB0aW9uQnlNZXRhTGV2ZWxBc3N1bXB0aW9uTm9kZSIsIm1ldGFMZXZlbEFzc3VtcHRpb25Ob2RlIiwibWV0YUxldmVsQXNzdW1wdGlvbiIsImZpbmRQcm9jZWR1cmVCeVByb2NlZHVyZU5hbWUiLCJwcm9jZWR1cmVOYW1lIiwicHJvY2VkdXJlIiwicHJvY2VkdXJlQ29tcGFyZXNUb1Byb2NlZHVyZU5hbWUiLCJjb21wYXJlUHJvY2VkdXJlTmFtZSIsImZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lIiwibWV0YVR5cGVOYW1lIiwiaXNNZXRhdmFyaWFibGVQcmVzZW50IiwibWV0YXZhcmlhYmxlUHJlc2VudCIsImlzTGFiZWxQcmVzZW50QnlSZWZlcmVuY2UiLCJsYWJlbFByZXNlbnQiLCJzb21lIiwibGFiZWwiLCJsYWJlbFVuaWZpZXMiLCJ1bmlmeUxhYmVsIiwiaXNUb3BMZXZlbE1ldGFBc3NlcnRpb25QcmVzZW50QnlSZWZlcmVuY2UiLCJ0b3BMZXZlbE1ldGFBc3NlcnRpb25QcmVzZW50IiwiaXNMYWJlbFByZXNlbnRCeUxhYmVsTm9kZSIsImxhYmVsTm9kZSIsImxhYmVsTm9kZU1hdGNoZXMiLCJtYXRjaExhYmVsTm9kZSIsImlzVHlwZVByZXNlbnRCeVR5cGVOYW1lIiwidHlwZVByZXNlbnQiLCJpc1R5cGVQcmVzZW50QnlOb21pbmFsVHlwZU5hbWUiLCJpc1R5cGVQcmVzZW50QnlQcmVmaXhlZFR5cGVOYW1lIiwiaXNUeXBlUHJlZml4UHJlc2VudEJ5VHlwZVByZWZpeE5hbWUiLCJ0eXBlUHJlZml4UHJlc2VudCIsImlzRGVjbGFyZWRWYXJpYWJsZVByZXNlbnRCeVZhcmlhYmxlSWRlbnRpZmllciIsInZhcmlhYmxlSWRlbnRpZmllciIsImRlY2xhcmVkVmFyaWFibGVQcmVzZW50IiwiaXNEZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnRCeU1ldGF2YXJpYWJsZU5hbWUiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnQiLCJpc1Byb2NlZHVyZVByZXNlbnRCeVByb2NlZHVyZU5hbWUiLCJwcm9jZWR1cmVQcmVzZW50IiwiaXNNZXRhTGV2ZWwiLCJtZXRhTEV2ZWwiLCJjbGVhciIsImNvbXBsZXRlIiwidmVyaWZ5RmlsZSIsImdldE5vZGUiLCJmaWxlTm9kZSIsImZpbGVWZXJpZmllcyIsImluaXRpYWxpc2UiLCJnZXRKU09OIiwiZmlsZUNvbnRleHQiLCJ0eXBlc0Zyb21KU09OIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVzRnJvbUpTT04iLCJkZWNsYXJlZFZhcmlhYmxlc0Zyb21KU09OIiwidHlwZVByZWZpeGVzRnJvbUpTT04iLCJjb21iaW5hdG9yc0Zyb21KU09OIiwiY29uc3RydWN0b3JzRnJvbUpTT04iLCJydWxlc0Zyb21KU09OIiwiYXhpb21zRnJvbUpTT04iLCJ0aGVvcmVtc0Zyb21KU09OIiwiY29uamVjdHVyZXNGcm9tSlNPTiIsIm1ldGF0aGVvcmVtc0Zyb21KU09OIiwidG9KU09OIiwidHlwZXNKU09OIiwidHlwZXNUb1R5cGVzSlNPTiIsInJ1bGVzSlNPTiIsInJ1bGVzVG9SdWxlc0pTT04iLCJheGlvbXNKU09OIiwiYXhpb21zVG9BeGlvbXNKU09OIiwidGhlb3JlbXNKU09OIiwidGhlb3JlbXNUb1RoZW9yZW1zSlNPTiIsImNvbmplY3R1cmVzSlNPTiIsImNvbmplY3R1cmVzVG9Db25qZWN0dXJlc0pTT04iLCJjb21iaW5hdG9yc0pTT04iLCJjb21iaW5hdG9yc1RvQ29tYmluYXRvcnNKU09OIiwidHlwZVByZWZpeGVzSlNPTiIsInR5cGVQcmVmaXhlc1RvVHlwZVByZWZpeGVzSlNPTiIsImNvbnN0cnVjdG9yc0pTT04iLCJjb25zdHJ1Y3RvcnNUb0NvbnN0cnVjdG9yc0pTT04iLCJtZXRhdGhlb3JlbXNKU09OIiwibWV0YXRoZW9yZW1zVG9NZXRhdGhlb3JlbXNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNKU09OIiwiZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTiIsImRlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXNUb0RlY2xhcmVkTWV0YXZhcmlhYmxlc0pTT04iLCJmcm9tRmlsZSIsImZpbGUiLCJyZWxlYXNlQ29udGV4dCIsImNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsImdldENvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxMZXhlciIsIm5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIiLCJOb21pbmFsTGV4ZXIiLCJub21pbmFsUGFyc2VyIiwibm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIiLCJOb21pbmFsUGFyc2VyIiwibm9taW5hbEZpbGVDb250ZXh0IiwiZnJvbUpTT04iXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQXNDQTs7O2VBQXFCQTs7O2dDQXBDTzsyQkFDRzs4REFFTjsrREFDQzt3QkFFQztzQkFDUzsyQkFDTzt3QkFDVzt5QkFDQztzQkFzQlU7Ozs7OztBQUVqRSxNQUFNLEVBQUVDLElBQUksRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjO0FBRXhCLE1BQU1ILDJCQUEyQkksMkJBQVc7SUFDekQsWUFBWUMsT0FBTyxFQUFFQyxXQUFXLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxVQUFVLEVBQUVDLFdBQVcsRUFBRUMsV0FBVyxFQUFFQyxZQUFZLEVBQUVDLFlB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