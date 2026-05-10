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
    getVariables(nested = true) {
        const variables = [];
        return variables;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZXh0L2ZpbGUvbm9taW5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRmlsZUNvbnRleHQgfSBmcm9tIFwib2NjYW0tbGFuZ3VhZ2VzXCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IE5vbWluYWxMZXhlciBmcm9tIFwiLi4vLi4vbm9taW5hbC9sZXhlclwiO1xuaW1wb3J0IE5vbWluYWxQYXJzZXIgZnJvbSBcIi4uLy4uL25vbWluYWwvcGFyc2VyXCI7XG5cbmltcG9ydCB7IHZlcmlmeUZpbGUgfSBmcm9tIFwiLi4vLi4vcHJvY2Vzcy92ZXJpZnlcIjtcbmltcG9ydCB7IGJhc2VUeXBlRnJvbU5vdGhpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3R5cGVcIjtcbmltcG9ydCB7IGZpbmRNZXRhVHlwZUJ5TWV0YVR5cGVOYW1lIH0gZnJvbSBcIi4uLy4uL21ldGFUeXBlc1wiO1xuaW1wb3J0IHsgbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvbGV4ZXJzXCI7XG5pbXBvcnQgeyBub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcGFyc2Vyc1wiO1xuaW1wb3J0IHsgdHlwZXNGcm9tSlNPTixcbiAgICAgICAgIHJ1bGVzRnJvbUpTT04sXG4gICAgICAgICBheGlvbXNGcm9tSlNPTixcbiAgICAgICAgIHR5cGVzVG9UeXBlc0pTT04sXG4gICAgICAgICB0aGVvcmVtc0Zyb21KU09OLFxuICAgICAgICAgcnVsZXNUb1J1bGVzSlNPTixcbiAgICAgICAgIGF4aW9tc1RvQXhpb21zSlNPTixcbiAgICAgICAgIGNvbmplY3R1cmVzRnJvbUpTT04sXG4gICAgICAgICBjb21iaW5hdG9yc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzRnJvbUpTT04sXG4gICAgICAgICBjb25zdHJ1Y3RvcnNGcm9tSlNPTixcbiAgICAgICAgIG1ldGF0aGVvcmVtc0Zyb21KU09OLFxuICAgICAgICAgdGhlb3JlbXNUb1RoZW9yZW1zSlNPTixcbiAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04sXG4gICAgICAgICBjb25qZWN0dXJlc1RvQ29uamVjdHVyZXNKU09OLFxuICAgICAgICAgY29tYmluYXRvcnNUb0NvbWJpbmF0b3JzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc0Zyb21KU09OLFxuICAgICAgICAgdHlwZVByZWZpeGVzVG9UeXBlUHJlZml4ZXNKU09OLFxuICAgICAgICAgY29uc3RydWN0b3JzVG9Db25zdHJ1Y3RvcnNKU09OLFxuICAgICAgICAgbWV0YXRoZW9yZW1zVG9NZXRhdGhlb3JlbXNKU09OLFxuICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTixcbiAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvanNvblwiO1xuXG5jb25zdCB7IHB1c2gsIGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vbWluYWxGaWxlQ29udGV4dCBleHRlbmRzIEZpbGVDb250ZXh0IHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwgZmlsZUNvbnRlbnQsIGZpbGVQYXRoLCB0b2tlbnMsIG5vZGUsIGpzb24sIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHRoZW9yZW1zLCBtZXRhTGVtbWFzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBtZXRhdGhlb3JlbXMsIGRlY2xhcmVkVmFyaWFibGVzLCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMpIHtcbiAgICBzdXBlcihjb250ZXh0LCBmaWxlQ29udGVudCwgZmlsZVBhdGgsIHRva2Vucywgbm9kZSwganNvbik7XG5cbiAgICB0aGlzLmxleGVyID0gbGV4ZXI7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG4gICAgdGhpcy50b2tlbnMgPSB0b2tlbnM7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICB0aGlzLnR5cGVzID0gdHlwZXM7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuYXhpb21zID0gYXhpb21zO1xuICAgIHRoaXMubGVtbWFzID0gbGVtbWFzO1xuICAgIHRoaXMudGhlb3JlbXMgPSB0aGVvcmVtcztcbiAgICB0aGlzLm1ldGFMZW1tYXMgPSBtZXRhTGVtbWFzO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlcztcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnM7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMgPSB0eXBlUHJlZml4ZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnM7XG4gICAgdGhpcy5tZXRhdGhlb3JlbXMgPSBtZXRhdGhlb3JlbXM7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcyA9IGRlY2xhcmVkVmFyaWFibGVzO1xuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0TGV4ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV4ZXI7XG4gIH1cblxuICBnZXRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VyO1xuICB9XG5cbiAgZ2V0RXF1aXZhbGVuY2VzKCkge1xuICAgIGNvbnN0IGVxdWl2YWxlbmNlcyA9IFtdO1xuXG4gICAgcmV0dXJuIGVxdWl2YWxlbmNlcztcbiAgfVxuXG4gIGdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMoKSB7XG4gICAgY29uc3Qgc3VicHJvb2ZPclByb29mQXNzZXJ0aW9ucyA9IFtdO1xuXG4gICAgcmV0dXJuIHN1YnByb29mT3JQcm9vZkFzc2VydGlvbnM7XG4gIH1cblxuICBnZXRMYWJlbHMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gW107XG5cbiAgICBpZiAoaW5jbHVkZVJlbGVhc2UpIHtcbiAgICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0TGFiZWxzID0gdGhpcy5jb250ZXh0LmdldExhYmVscygpO1xuXG4gICAgICBwdXNoKGxhYmVscywgcmVsZWFzZUNvbnRleHRMYWJlbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgY29uc3QgcnVsZUxhYmVscyA9IHJ1bGUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIHJ1bGVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYXhpb21zLmZvckVhY2goKGF4aW9tKSA9PiB7XG4gICAgICAgIGNvbnN0IGF4aW9tTGFiZWxzID0gYXhpb20uZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGF4aW9tTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxlbW1hcy5mb3JFYWNoKChsZW1tYSkgPT4ge1xuICAgICAgICBjb25zdCBsZW1tYUxhYmVscyA9IGxlbW1hLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCBsZW1tYUxhYmVscyk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50aGVvcmVtcy5mb3JFYWNoKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHRoZW9yZW1MYWJlbHMgPSB0aGVvcmVtLmdldExhYmVscygpO1xuXG4gICAgICAgIHB1c2gobGFiZWxzLCB0aGVvcmVtTGFiZWxzKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbmplY3R1cmVzLmZvckVhY2goKGNvbmplY3R1cmUpID0+IHtcbiAgICAgICAgY29uc3QgY29uamVjdHVyZUxhYmVscyA9IGNvbmplY3R1cmUuZ2V0TGFiZWxzKCk7XG5cbiAgICAgICAgcHVzaChsYWJlbHMsIGNvbmplY3R1cmVMYWJlbHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubWV0YXRoZW9yZW1zLmZvckVhY2goKG1ldGF0aGVvcmVtKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGF0aGVvcmVtTGFiZWwgPSBtZXRhdGhlb3JlbS5nZXRMYWJlbCgpO1xuXG4gICAgICAgIGxhYmVscy5wdXNoKG1ldGF0aGVvcmVtTGFiZWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhYmVscztcbiAgfVxuXG4gIGdldFR5cGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHR5cGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0VHlwZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlcztcblxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuXG4gIGdldFJ1bGVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHJ1bGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0UnVsZXMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydWxlcztcblxuICAgIHJldHVybiBydWxlcztcbiAgfVxuXG4gIGdldEF4aW9tcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBheGlvbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0QXhpb21zKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aW9tcztcblxuICAgIHJldHVybiBheGlvbXM7XG4gIH1cblxuICBnZXRMZW1tYXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgbGVtbWFzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldExlbW1hcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW1tYXM7XG5cbiAgICByZXR1cm4gbGVtbWFzO1xuICB9XG5cbiAgZ2V0VGhlb3JlbXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdGhlb3JlbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRUaGVvcmVtcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW9yZW1zO1xuXG4gICAgcmV0dXJuIHRoZW9yZW1zO1xuICB9XG5cbiAgZ2V0TWV0YUxlbW1hcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBtZXRhTGVtbWFzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRNZXRhTGVtbWFzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRhTGVtbWFzO1xuXG4gICAgcmV0dXJuIG1ldGFMZW1tYXM7XG4gIH1cblxuICBnZXRDb25qZWN0dXJlcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb25qZWN0dXJlcyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldENvbmplY3R1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uamVjdHVyZXM7XG5cbiAgICByZXR1cm4gY29uamVjdHVyZXM7XG4gIH1cblxuICBnZXRDb21iaW5hdG9ycyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBjb21iaW5hdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldENvbWJpbmF0b3JzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tYmluYXRvcnM7XG5cbiAgICByZXR1cm4gY29tYmluYXRvcnM7XG4gIH1cblxuICBnZXRUeXBlUHJlZml4ZXMoaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZVByZWZpeGVzID0gaW5jbHVkZVJlbGVhc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmdldFR5cGVQcmVmaXhlcygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlUHJlZml4ZXM7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeGVzO1xuICB9XG5cbiAgZ2V0Q29uc3RydWN0b3JzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGNvbnN0cnVjdG9ycyA9IGluY2x1ZGVSZWxlYXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRDb25zdHJ1Y3RvcnMoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3JzO1xuXG4gICAgcmV0dXJuIGNvbnN0cnVjdG9ycztcbiAgfVxuXG4gIGdldE1ldGF0aGVvcmVtcyhpbmNsdWRlUmVsZWFzZSA9IHRydWUpIHtcbiAgICBjb25zdCBtZXRhdGhlb3JlbXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZ2V0TWV0YXRoZW9yZW1zKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGF0aGVvcmVtcztcblxuICAgIHJldHVybiBtZXRhdGhlb3JlbXM7XG4gIH1cblxuICBnZXRQcm9jZWR1cmVzKGluY2x1ZGVSZWxlYXNlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZXMgPSBpbmNsdWRlUmVsZWFzZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5nZXRQcm9jZWR1cmVzKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7ICAvLy9cblxuICAgIHJldHVybiBwcm9jZWR1cmVzO1xuICB9XG5cbiAgZ2V0VmFyaWFibGVzKG5lc3RlZCA9IHRydWUpIHtcbiAgICBjb25zdCB2YXJpYWJsZXMgPSBbXTtcblxuICAgIHJldHVybiB2YXJpYWJsZXM7XG4gIH1cblxuICBnZXREZWNsYXJlZFZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNsYXJlZFZhcmlhYmxlcztcbiAgfVxuXG4gIGdldERlY2xhcmVkTWV0YXZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNsYXJlZE1ldGF2YXJpYWJsZXM7XG4gIH1cblxuICBnZXREZWNsYXJlZEp1ZGdlbWVudHMoKSB7XG4gICAgY29uc3QgZGVjbGFyZWRKdWRnZW1lbnRzID0gW107XG5cbiAgICByZXR1cm4gZGVjbGFyZWRKdWRnZW1lbnRzO1xuICB9XG5cbiAgZ2V0VGVybXModGVybXMgPSBbXSkge1xuICAgIHJldHVybiB0ZXJtcztcbiAgfVxuXG4gIGdldEZyYW1lcyhmcmFtZXMgPSBbXSkge1xuICAgIHJldHVybiBmcmFtZXM7XG4gIH1cblxuICBnZXRQcm9wZXJ0aWVzKHByb3BlcnRpZXMgPSBbXSkge1xuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9XG5cbiAgZ2V0RXF1YWxpdGllcyhlcXVhbGl0aWVzID0gW10pIHtcbiAgICByZXR1cm4gZXF1YWxpdGllcztcbiAgfVxuXG4gIGdldEp1ZGdlbWVudHMoanVkZ2VtZW50cyA9IFtdKSB7XG4gICAgcmV0dXJuIGp1ZGdlbWVudHM7XG4gIH1cblxuICBnZXRBc3NlcnRpb25zKGFzc2VydGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBhc3NlcnRpb25zO1xuICB9XG5cbiAgZ2V0U3RhdGVtZW50cyhzdGF0ZW1lbnRzID0gW10pIHtcbiAgICByZXR1cm4gc3RhdGVtZW50cztcbiAgfVxuXG4gIGdldFNpZ25hdHVyZXMoc2lnbmF0dXJlcyA9IFtdKSB7XG4gICAgcmV0dXJuIHNpZ25hdHVyZXM7XG4gIH1cblxuICBnZXRSZWZlcmVuY2VzKHJlZmVyZW5jZXMgPSBbXSkge1xuICAgIHJldHVybiByZWZlcmVuY2VzO1xuICB9XG5cbiAgZ2V0QXNzdW1wdGlvbnMoYXNzdW1wdGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBhc3N1bXB0aW9ucztcbiAgfVxuXG4gIGdldE1ldGF2YXJpYWJsZXMobWV0YXZhcmlhYmxlcyA9IFtdKSB7XG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZXM7XG4gIH1cblxuICBnZXRTdWJzdGl0dXRpb25zKHN1YnN0aXR1dGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBzdWJzdGl0dXRpb25zO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlSZWxhdGlvbnMocHJvcGVydHlSZWxhdGlvbnMgPSBbXSkge1xuICAgIHJldHVybiBwcm9wZXJ0eVJlbGF0aW9ucztcbiAgfVxuXG4gIGdldERlcml2ZWRTdWJzdGl0dXRpb25zKGRlcml2ZWRTdWJzdGl0dXRpb25zID0gW10pIHtcbiAgICByZXR1cm4gZGVyaXZlZFN1YnN0aXR1dGlvbnM7XG4gIH1cblxuICBhZGRUeXBlKHR5cGUpIHtcbiAgICB0aGlzLnR5cGVzLnB1c2godHlwZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0eXBlU3RyaW5nID0gdHlwZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0eXBlU3RyaW5nfScgdHlwZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZFJ1bGUocnVsZSkge1xuICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHJ1bGVTdHJpbmcgPSBydWxlLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3J1bGVTdHJpbmd9JyBydWxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkQXhpb20oYXhpb20pIHtcbiAgICB0aGlzLmF4aW9tcy5wdXNoKGF4aW9tKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGF4aW9tU3RyaW5nID0gYXhpb20uZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7YXhpb21TdHJpbmd9JyBheGlvbSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZExlbW1hKGxlbW1hKSB7XG4gICAgdGhpcy5sZW1tYXMucHVzaChsZW1tYSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBsZW1tYVN0cmluZyA9IGxlbW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2xlbW1hU3RyaW5nfScgbGVtbWEgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRUaGVvcmVtKHRoZW9yZW0pIHtcbiAgICB0aGlzLnRoZW9yZW1zLnB1c2godGhlb3JlbSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICB0aGVvcmVtU3RyaW5nID0gdGhlb3JlbS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHt0aGVvcmVtU3RyaW5nfScgdGhlb3JlbSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZE1ldGFMZW1tYShtZXRhTGVtbWEpIHtcbiAgICB0aGlzLm1ldGFMZW1tYXMucHVzaChtZXRhTGVtbWEpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgbWV0YUxlbW1hU3RyaW5nID0gbWV0YUxlbW1hLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke21ldGFMZW1tYVN0cmluZ30nIG1ldGEtbGVtbWEgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRDb25qZWN0dXJlKGNvbmplY3R1cmUpIHtcbiAgICB0aGlzLmNvbmplY3R1cmVzLnB1c2goY29uamVjdHVyZSk7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBvY25qZWN0dXJlU3RyaW5nID0gY29uamVjdHVyZS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHtvY25qZWN0dXJlU3RyaW5nfScgb2NuamVjdHVyZSB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZENvbWJpbmF0b3IoY29tYmluYXRvcikge1xuICAgIHRoaXMuY29tYmluYXRvcnMucHVzaChjb21iaW5hdG9yKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGNvbWJpbmF0b3JTdHJpbmcgPSBjb21iaW5hdG9yLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2NvbWJpbmF0b3JTdHJpbmd9JyBjb21iaW5hdG9yIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkVHlwZVByZWZpeCh0eXBlUHJlZml4KSB7XG4gICAgdGhpcy50eXBlUHJlZml4ZXMucHVzaCh0eXBlUHJlZml4KTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIHR5cGVQcmVmaXhTdHJpbmcgPSB0eXBlUHJlZml4LmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke3R5cGVQcmVmaXhTdHJpbmd9JyB0eXBlLXByZWZpeCB0byB0aGUgJyR7ZmlsZVBhdGh9JyBmaWxlIGNvbnRleHQuYClcbiAgfVxuXG4gIGFkZENvbnN0cnVjdG9yKGNvbnN0cnVjdG9yKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMucHVzaChjb25zdHJ1Y3Rvcik7XG5cbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoKSxcbiAgICAgICAgICBjb25zdHJ1Y3RvclN0cmluZyA9IGNvbnN0cnVjdG9yLmdldFN0cmluZygpO1xuXG4gICAgdGhpcy50cmFjZShgQWRkZWQgdGhlICcke2NvbnN0cnVjdG9yU3RyaW5nfScgY29uc3RydWN0b3IgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBhZGRNZXRhdGhlb3JlbShtZXRhdGhlb3JlbSkge1xuICAgIHRoaXMubWV0YXRoZW9yZW1zLnB1c2gobWV0YXRoZW9yZW0pO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgbWV0YXRoZW9yZW1TdHJpbmcgPSBtZXRhdGhlb3JlbS5nZXRTdHJpbmcoKTtcblxuICAgIHRoaXMudHJhY2UoYEFkZGVkIHRoZSAnJHttZXRhdGhlb3JlbVN0cmluZ30nIG1ldGF0aGVvcmVtIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkRGVjbGFyZWRWYXJpYWJsZShkZWNsYXJlZFZhcmlhYmxlKSB7XG4gICAgdGhpcy5kZWNsYXJlZFZhcmlhYmxlcy5wdXNoKGRlY2xhcmVkVmFyaWFibGUpO1xuXG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKCksXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZVN0cmluZyA9IGRlY2xhcmVkVmFyaWFibGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7ZGVjbGFyZWRWYXJpYWJsZVN0cmluZ30nIGRlY2xhcmVkIHZhcmlhYmxlIHRvIHRoZSAnJHtmaWxlUGF0aH0nIGZpbGUgY29udGV4dC5gKVxuICB9XG5cbiAgYWRkRGVjbGFyZWRNZXRhdmFyaWFibGUoZGVjbGFyZWRNZXRhdmFyaWFibGUpIHtcbiAgICB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcy5wdXNoKGRlY2xhcmVkTWV0YXZhcmlhYmxlKTtcblxuICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCgpLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlU3RyaW5nID0gZGVjbGFyZWRNZXRhdmFyaWFibGUuZ2V0U3RyaW5nKCk7XG5cbiAgICB0aGlzLnRyYWNlKGBBZGRlZCB0aGUgJyR7ZGVjbGFyZWRNZXRhdmFyaWFibGVTdHJpbmd9JyBkZWNsYXJlZCBtZXRhdmFyaWFibGUgdG8gdGhlICcke2ZpbGVQYXRofScgZmlsZSBjb250ZXh0LmApXG4gIH1cblxuICBmaW5kTWV0YXZhcmlhYmxlKG1ldGF2YXJpYWJsZSwgY29udGV4dCkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IHRoaXMuZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzKCk7XG5cbiAgICBtZXRhdmFyaWFibGUgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXMuZmluZCgoZGVjbGFyZWRNZXRhdmFyaWFibGUpID0+IHtcbiAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZVVuaWZpZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZS51bmlmeU1ldGF2YXJpYWJsZShtZXRhdmFyaWFibGUsIGNvbnRleHQpO1xuXG4gICAgICBpZiAobWV0YXZhcmlhYmxlVW5pZmllcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIG1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRSdWxlQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgcnVsZXMgPSB0aGlzLmdldFJ1bGVzKCksXG4gICAgICAgICAgbWV0YXZhcmlhYmxlTm9kZSA9IHJlZmVyZW5jZS5nZXRNZXRhdmFyaWFibGVOb2RlKCksXG4gICAgICAgICAgcnVsZSA9IHJ1bGVzLmZpbmQoKHJ1bGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzID0gcnVsZS5tYXRjaE1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICBmaW5kQXhpb21CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBheGlvbXMgPSB0aGlzLmdldEF4aW9tcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIGF4aW9tID0gYXhpb21zLmZpbmQoKGF4aW9tKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IGF4aW9tLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gYXhpb207XG4gIH1cblxuICBmaW5kTGVtbWFCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBsZW1tYXMgPSB0aGlzLmdldExlbW1hcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIGxlbW1hID0gbGVtbWFzLmZpbmQoKGxlbW1hKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IGxlbW1hLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gbGVtbWE7XG4gIH1cblxuICBmaW5kVGhlb3JlbUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHRoZW9yZW1zID0gdGhpcy5nZXRUaGVvcmVtcygpLFxuICAgICAgICAgIG1ldGF2YXJpYWJsZU5vZGUgPSByZWZlcmVuY2UuZ2V0TWV0YXZhcmlhYmxlTm9kZSgpLFxuICAgICAgICAgIHRoZW9yZW0gPSB0aGVvcmVtcy5maW5kKCh0aGVvcmVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhdmFyaWFibGVOb2RlTWF0Y2hlcyA9IHRoZW9yZW0ubWF0Y2hNZXRhdmFyaWFibGVOb2RlKG1ldGF2YXJpYWJsZU5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0aGVvcmVtO1xuICB9XG5cbiAgZmluZENvbmplY3R1cmVCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBjb25qZWN0dXJlcyA9IHRoaXMuZ2V0Q29uamVjdHVyZXMoKSxcbiAgICAgICAgICBtZXRhdmFyaWFibGVOb2RlID0gcmVmZXJlbmNlLmdldE1ldGF2YXJpYWJsZU5vZGUoKSxcbiAgICAgICAgICBjb25qZWN0dXJlID0gY29uamVjdHVyZXMuZmluZCgoY29uamVjdHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YXZhcmlhYmxlTm9kZU1hdGNoZXMgPSBjb25qZWN0dXJlLm1hdGNoTWV0YXZhcmlhYmxlTm9kZShtZXRhdmFyaWFibGVOb2RlKTtcblxuICAgICAgICAgICAgaWYgKG1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gY29uamVjdHVyZTtcbiAgfVxuXG4gIGZpbmRNZXRhTGVtbWFzQnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgbWV0YUxlbW1hcyA9IHRoaXMuZ2V0TWV0YUxlbW1hcygpO1xuXG4gICAgZmlsdGVyKG1ldGFMZW1tYXMsIChtZXRhTGVtbWEpID0+IHtcbiAgICAgIGNvbnN0IHRvcExldmVsTWV0YUFzc2VydGlvbiA9IG1ldGFMZW1tYSwgLy8vXG4gICAgICAgICAgICB0b3BMZXZlbE1ldGFBc3NlcnRpb25Db21wYXJlcyA9IHJlZmVyZW5jZS5jb21wYXJlVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uKHRvcExldmVsTWV0YUFzc2VydGlvbik7XG5cbiAgICAgIGlmICh0b3BMZXZlbE1ldGFBc3NlcnRpb25Db21wYXJlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtZXRhTGVtbWFzO1xuICB9XG5cbiAgZmluZE1ldGF0aGVvcmVtc0J5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IG1ldGF0aGVvcmVtcyA9IHRoaXMuZ2V0TWV0YXRoZW9yZW1zKCk7XG5cbiAgICBmaWx0ZXIobWV0YXRoZW9yZW1zLCAobWV0YXRoZW9yZW0pID0+IHtcbiAgICAgIGNvbnN0IHRvcExldmVsTWV0YUFzc2VydGlvbiA9IG1ldGF0aGVvcmVtLCAvLy9cbiAgICAgICAgICAgIHRvcExldmVsTWV0YUFzc2VydGlvbkNvbXBhcmVzID0gcmVmZXJlbmNlLmNvbXBhcmVUb3BMZXZlbE1ldGFBc3NlcnRpb24odG9wTGV2ZWxNZXRhQXNzZXJ0aW9uKTtcblxuICAgICAgaWYgKHRvcExldmVsTWV0YUFzc2VydGlvbkNvbXBhcmVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1ldGF0aGVvcmVtcztcbiAgfVxuXG4gIGZpbmRUb3BMZXZlbEFzc2VydGlvbkJ5UmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGF4aW9tID0gdGhpcy5maW5kQXhpb21CeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIGxlbW1hID0gdGhpcy5maW5kTGVtbWFCeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIHRoZW9yZW0gPSB0aGlzLmZpbmRUaGVvcmVtQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICBjb25qZWN0dXJlID0gdGhpcy5maW5kQ29uamVjdHVyZUJ5UmVmZXJlbmNlKHJlZmVyZW5jZSksXG4gICAgICAgICAgdG9wTGV2ZWxBc3NlcnRpb24gPSAoYXhpb20gfHwgbGVtbWEgfHwgdGhlb3JlbSB8fCBjb25qZWN0dXJlKTtcblxuICAgIHJldHVybiB0b3BMZXZlbEFzc2VydGlvbjtcbiAgfVxuXG4gIGZpbmRUb3BMZXZlbE1ldGFBc3NlcnRpb25CeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBtZXRhTGVtbWEgPSB0aGlzLmZpbmRNZXRhTGVtbWFCeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIG1ldGF0aGVvcmVtID0gdGhpcy5maW5kTWV0YXRoZW9yZW1CeVJlZmVyZW5jZShyZWZlcmVuY2UpLFxuICAgICAgICAgIHRvcExldmVsTWV0YUFzc2VydGlvbiA9IChtZXRhTGVtbWEgfHwgbWV0YXRoZW9yZW0pOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wTGV2ZWxNZXRhQXNzZXJ0aW9uO1xuICB9XG5cbiAgZmluZFRvcExldmVsTWV0YUFzc2VydGlvbnNCeVJlZmVyZW5jZShyZWZlcmVuY2UpIHtcbiAgICBjb25zdCBtZXRhTGVtbWFzID0gdGhpcy5maW5kTWV0YUxlbW1hc0J5UmVmZXJlbmNlKHJlZmVyZW5jZSksXG4gICAgICAgICAgbWV0YXRoZW9yZW1zID0gdGhpcy5maW5kTWV0YXRoZW9yZW1zQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICB0b3BMZXZlbE1ldGFBc3NlcnRpb25zID0gW1xuICAgICAgICAgICAgLi4ubWV0YUxlbW1hcyxcbiAgICAgICAgICAgIC4uLm1ldGF0aGVvcmVtc1xuICAgICAgICAgIF07XG5cbiAgICByZXR1cm4gdG9wTGV2ZWxNZXRhQXNzZXJ0aW9ucztcbiAgfVxuXG4gIGZpbmRUeXBlQnlUeXBlTmFtZSh0eXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgbGV0IHR5cGVzID0gdGhpcy5nZXRUeXBlcyhpbmNsdWRlUmVsZWFzZSk7XG5cbiAgICBjb25zdCBiYXNlVHlwZSA9IGJhc2VUeXBlRnJvbU5vdGhpbmcoKTtcblxuICAgIHR5cGVzID0gW1xuICAgICAgLi4udHlwZXMsXG4gICAgICBiYXNlVHlwZVxuICAgIF07XG5cbiAgICBjb25zdCB0eXBlID0gdHlwZXMuZmluZCgodHlwZSkgPT4ge1xuICAgICAgY29uc3QgdHlwZUNvbXBhcmVzVG9UeXBlTmFtZSA9IHR5cGUuY29tcGFyZVR5cGVOYW1lKHR5cGVOYW1lKTtcblxuICAgICAgaWYgKHR5cGVDb21wYXJlc1RvVHlwZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgZmluZFR5cGVCeU5vbWluYWxUeXBlTmFtZShub21pbmFsVHlwZU5hbWUpIHtcbiAgICBsZXQgdHlwZXMgPSB0aGlzLmdldFR5cGVzKCk7XG5cbiAgICBjb25zdCBiYXNlVHlwZSA9IGJhc2VUeXBlRnJvbU5vdGhpbmcoKTtcblxuICAgIHR5cGVzID0gW1xuICAgICAgLi4udHlwZXMsXG4gICAgICBiYXNlVHlwZVxuICAgIF07XG5cbiAgICBjb25zdCB0eXBlID0gdHlwZXMuZmluZCgodHlwZSkgPT4ge1xuICAgICAgY29uc3QgdHlwZUNvbXBhcmVzVG9Ob21pbmFsVHlwZU5hbWUgPSB0eXBlLmNvbXBhcmVOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKTtcblxuICAgICAgaWYgKHR5cGVDb21wYXJlc1RvTm9taW5hbFR5cGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGZpbmRUeXBlQnlQcmVmaXhlZFR5cGVOYW1lKHByZWZpeGVkVHlwZU5hbWUpIHtcbiAgICBsZXQgdHlwZXMgPSB0aGlzLmdldFR5cGVzKCk7XG5cbiAgICBjb25zdCBiYXNlVHlwZSA9IGJhc2VUeXBlRnJvbU5vdGhpbmcoKTtcblxuICAgIHR5cGVzID0gW1xuICAgICAgLi4udHlwZXMsXG4gICAgICBiYXNlVHlwZVxuICAgIF07XG5cbiAgICBjb25zdCB0eXBlID0gdHlwZXMuZmluZCgodHlwZSkgPT4ge1xuICAgICAgY29uc3QgdHlwZUNvbXBhcmVzVG9QcmVmaXhlZFR5cGVOYW1lID0gdHlwZS5jb21wYXJlUHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKTtcblxuICAgICAgaWYgKHR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBmaW5kVHlwZVByZWZpeEJ5VHlwZVByZWZpeE5hbWUodHlwZVByZWZpeE5hbWUpIHtcbiAgICBjb25zdCB0eXBlUHJlZml4ZXMgPSB0aGlzLmdldFR5cGVQcmVmaXhlcygpLFxuICAgICAgICAgIHR5cGVQcmVmaXggPSB0eXBlUHJlZml4ZXMuZmluZCgodHlwZVByZWZpeCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHlwZVByZWZpeENvbXBhcmVzVG9UeXBlUHJlZml4TmFtZSA9IHR5cGVQcmVmaXguY29tcGFyZVR5cGVQcmVmaXhOYW1lKHR5cGVQcmVmaXhOYW1lKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVQcmVmaXhDb21wYXJlc1RvVHlwZVByZWZpeE5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiB0eXBlUHJlZml4O1xuICB9XG5cbiAgZmluZERlY2xhcmVkVmFyaWFibGVCeVZhcmlhYmxlSWRlbnRpZmllcihWYXJpYWJsZUlkZW50aXRpZmVyKSB7XG4gICAgY29uc3QgZGVjbGFyZWRWYXJpYWJsZXMgPSB0aGlzLmdldERlY2xhcmVkVmFyaWFibGVzKCksXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZSA9IGRlY2xhcmVkVmFyaWFibGVzLmZpbmQoKGRlY2xhcmVkVmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2xhcmVkVmFyaWFibGVDb21wYXJlc1RvVmFyaWFibGVJZGVudGl0aWZlciA9IGRlY2xhcmVkVmFyaWFibGUuY29tcGFyZVZhcmlhYmxlSWRlbnRpZmllcihWYXJpYWJsZUlkZW50aXRpZmVyKTtcblxuICAgICAgICAgICAgaWYgKGRlY2xhcmVkVmFyaWFibGVDb21wYXJlc1RvVmFyaWFibGVJZGVudGl0aWZlcikge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkVmFyaWFibGU7XG4gIH1cblxuICBmaW5kRGVjbGFyZWRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IHRoaXMuZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzKCksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGUgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXMuZmluZCgoZGVjbGFyZWRNZXRhdmFyaWFibGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlQ29tcGFyZXNUb01ldGF2YXJpYWJsZU5hbWUgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZS5jb21wYXJlTWV0YXZhcmlhYmxlTmFtZShtZXRhdmFyaWFibGVOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGRlY2xhcmVkTWV0YXZhcmlhYmxlQ29tcGFyZXNUb01ldGF2YXJpYWJsZU5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDtcblxuICAgIHJldHVybiBkZWNsYXJlZE1ldGF2YXJpYWJsZTtcbiAgfVxuXG4gIGZpbmRUZXJtQnlUZXJtTm9kZSh0ZXJtTm9kZSkge1xuICAgIGNvbnN0IHRlcm0gPSBudWxsO1xuXG4gICAgcmV0dXJuIHRlcm07XG4gIH1cblxuICBmaW5kU3RhdGVtZW50QnlTdGF0ZW1lbnROb2RlKHN0YXRlbWVudE5vZGUpIHtcbiAgICBjb25zdCBzdGF0ZW1lbnQgPSBudWxsO1xuXG4gICAgcmV0dXJuIHN0YXRlbWVudDtcbiAgfVxuXG4gIGZpbmRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5vZGUobWV0YXZhcmlhYmxlTm9kZSkge1xuICAgIGNvbnN0IG1ldGF2YXJpYWJsZSA9IG51bGw7XG5cbiAgICByZXR1cm4gbWV0YXZhcmlhYmxlO1xuICB9XG5cbiAgZmluZFN1YnN0aXR1dGlvbkJ5U3Vic3RpdHV0aW9uTm9kZShzdWJzdGl0dXRpb25Ob2RlKSB7XG4gICAgY29uc3Qgc3Vic3RpdHV0aW9uID0gbnVsbDtcblxuICAgIHJldHVybiBzdWJzdGl0dXRpb247XG4gIH1cblxuICBmaW5kTWV0YUxldmVsQXNzdW1wdGlvbkJ5TWV0YUxldmVsQXNzdW1wdGlvbk5vZGUobWV0YUxldmVsQXNzdW1wdGlvbk5vZGUpIHtcbiAgICBjb25zdCBtZXRhTGV2ZWxBc3N1bXB0aW9uID0gbnVsbDtcblxuICAgIHJldHVybiBtZXRhTGV2ZWxBc3N1bXB0aW9uO1xuICB9XG5cbiAgZmluZFByb2NlZHVyZUJ5UHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKSB7XG4gICAgY29uc3QgcHJvY2VkdXJlcyA9IHRoaXMuZ2V0UHJvY2VkdXJlcygpLFxuICAgICAgICAgIHByb2NlZHVyZSA9IHByb2NlZHVyZXMuZmluZCgocHJvY2VkdXJlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9jZWR1cmVDb21wYXJlc1RvUHJvY2VkdXJlTmFtZSA9IHByb2NlZHVyZS5jb21wYXJlUHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKTtcblxuICAgICAgICAgICAgaWYgKHByb2NlZHVyZUNvbXBhcmVzVG9Qcm9jZWR1cmVOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7XG5cbiAgICByZXR1cm4gcHJvY2VkdXJlO1xuICB9XG5cbiAgZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUobWV0YVR5cGVOYW1lKSB7IHJldHVybiBmaW5kTWV0YVR5cGVCeU1ldGFUeXBlTmFtZShtZXRhVHlwZU5hbWUpOyB9XG5cbiAgaXNNZXRhdmFyaWFibGVQcmVzZW50KG1ldGF2YXJpYWJsZSwgY29udGV4dCkge1xuICAgIG1ldGF2YXJpYWJsZSA9IHRoaXMuZmluZE1ldGF2YXJpYWJsZShtZXRhdmFyaWFibGUsIGNvbnRleHQpOyAgLy8vXG5cbiAgICBjb25zdCBtZXRhdmFyaWFibGVQcmVzZW50ID0gKG1ldGF2YXJpYWJsZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWV0YXZhcmlhYmxlUHJlc2VudDtcbiAgfVxuXG4gIGlzTGFiZWxQcmVzZW50QnlSZWZlcmVuY2UocmVmZXJlbmNlLCBjb250ZXh0ID0gbnVsbCkge1xuICAgIGNvbnN0IGxhYmVscyA9IHRoaXMuZ2V0TGFiZWxzKCksXG4gICAgICAgICAgbGFiZWxQcmVzZW50ID0gbGFiZWxzLnNvbWUoKGxhYmVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbFVuaWZpZXMgPSByZWZlcmVuY2UudW5pZnlMYWJlbChsYWJlbCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgIGlmIChsYWJlbFVuaWZpZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gbGFiZWxQcmVzZW50O1xuICB9XG5cbiAgaXNUb3BMZXZlbE1ldGFBc3NlcnRpb25QcmVzZW50QnlSZWZlcmVuY2UocmVmZXJlbmNlKSB7XG4gICAgY29uc3QgdG9wTGV2ZWxNZXRhQXNzZXJ0aW9uID0gdGhpcy5maW5kVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uQnlSZWZlcmVuY2UocmVmZXJlbmNlKSxcbiAgICAgICAgICB0b3BMZXZlbE1ldGFBc3NlcnRpb25QcmVzZW50ID0gKHRvcExldmVsTWV0YUFzc2VydGlvbiAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9wTGV2ZWxNZXRhQXNzZXJ0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGlzTGFiZWxQcmVzZW50QnlMYWJlbE5vZGUobGFiZWxOb2RlKSB7XG4gICAgY29uc3QgbGFiZWxzID0gdGhpcy5nZXRMYWJlbHMoKSxcbiAgICAgICAgICBsYWJlbFByZXNlbnQgPSBsYWJlbHMuc29tZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsTm9kZU1hdGNoZXMgPSBsYWJlbC5tYXRjaExhYmVsTm9kZShsYWJlbE5vZGUpO1xuXG4gICAgICAgICAgICBpZiAobGFiZWxOb2RlTWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBsYWJlbFByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVzZW50QnlUeXBlTmFtZSh0eXBlTmFtZSwgaW5jbHVkZVJlbGVhc2UgPSB0cnVlKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZmluZFR5cGVCeVR5cGVOYW1lKHR5cGVOYW1lLCBpbmNsdWRlUmVsZWFzZSksXG4gICAgICAgICAgdHlwZVByZXNlbnQgPSAodHlwZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVzZW50QnlOb21pbmFsVHlwZU5hbWUobm9taW5hbFR5cGVOYW1lKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZmluZFR5cGVCeU5vbWluYWxUeXBlTmFtZShub21pbmFsVHlwZU5hbWUpLFxuICAgICAgICAgIHR5cGVQcmVzZW50ID0gKHR5cGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHR5cGVQcmVzZW50O1xuICB9XG5cbiAgaXNUeXBlUHJlc2VudEJ5UHJlZml4ZWRUeXBlTmFtZShwcmVmaXhlZFR5cGVOYW1lKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZmluZFR5cGVCeVByZWZpeGVkVHlwZU5hbWUocHJlZml4ZWRUeXBlTmFtZSksXG4gICAgICAgICAgdHlwZVByZXNlbnQgPSAodHlwZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZXNlbnQ7XG4gIH1cblxuICBpc1R5cGVQcmVmaXhQcmVzZW50QnlUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSkge1xuICAgIGNvbnN0IHR5cGVQcmVmaXggPSB0aGlzLmZpbmRUeXBlUHJlZml4QnlUeXBlUHJlZml4TmFtZSh0eXBlUHJlZml4TmFtZSksXG4gICAgICAgICAgdHlwZVByZWZpeFByZXNlbnQgPSAodHlwZVByZWZpeCAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdHlwZVByZWZpeFByZXNlbnQ7XG4gIH1cblxuICBpc0RlY2xhcmVkVmFyaWFibGVQcmVzZW50QnlWYXJpYWJsZUlkZW50aWZpZXIodmFyaWFibGVJZGVudGlmaWVyKSB7XG4gICAgY29uc3QgZGVjbGFyZWRWYXJpYWJsZSA9IHRoaXMuZmluZERlY2xhcmVkVmFyaWFibGVCeVZhcmlhYmxlSWRlbnRpZmllcih2YXJpYWJsZUlkZW50aWZpZXIpLFxuICAgICAgICAgIGRlY2xhcmVkVmFyaWFibGVQcmVzZW50ID0gKGRlY2xhcmVkVmFyaWFibGUgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRlY2xhcmVkVmFyaWFibGVQcmVzZW50O1xuICB9XG5cbiAgaXNEZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnRCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSkge1xuICAgIGNvbnN0IGRlY2xhcmVkTWV0YXZhcmlhYmxlID0gdGhpcy5maW5kRGVjbGFyZWRNZXRhdmFyaWFibGVCeU1ldGF2YXJpYWJsZU5hbWUobWV0YXZhcmlhYmxlTmFtZSksXG4gICAgICAgICAgZGVjbGFyZWRNZXRhdmFyaWFibGVQcmVzZW50ID0gKGRlY2xhcmVkTWV0YXZhcmlhYmxlICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkZWNsYXJlZE1ldGF2YXJpYWJsZVByZXNlbnQ7XG4gIH1cblxuICBpc1Byb2NlZHVyZVByZXNlbnRCeVByb2NlZHVyZU5hbWUocHJvY2VkdXJlTmFtZSkge1xuICAgIGNvbnN0IHByb2NlZHVyZSA9IHRoaXMuZmluZFByb2NlZHVyZUJ5UHJvY2VkdXJlTmFtZShwcm9jZWR1cmVOYW1lKSxcbiAgICAgICAgICBwcm9jZWR1cmVQcmVzZW50ID0gKHByb2NlZHVyZSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gcHJvY2VkdXJlUHJlc2VudDtcbiAgfVxuXG4gIGlzTWV0YUxldmVsKCkge1xuICAgIGNvbnN0IG1ldGFMRXZlbCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIG1ldGFMRXZlbDtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMudHlwZXMgPSBbXTtcbiAgICB0aGlzLnJ1bGVzID0gW107XG4gICAgdGhpcy5heGlvbXMgPSBbXTtcbiAgICB0aGlzLmxlbW1hcyA9IFtdO1xuICAgIHRoaXMudGhlb3JlbXMgPSBbXTtcbiAgICB0aGlzLm1ldGFMZW1tYXMgPSBbXTtcbiAgICB0aGlzLmNvbmplY3R1cmVzID0gW107XG4gICAgdGhpcy5jb21iaW5hdG9ycyA9IFtdO1xuICAgIHRoaXMudHlwZVByZWZpeGVzID0gW107XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBbXTtcbiAgICB0aGlzLm1ldGF0aGVvcmVtcyA9IFtdO1xuICAgIHRoaXMuZGVjbGFyZWRWYXJpYWJsZXMgPSBbXTtcbiAgICB0aGlzLmRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IFtdO1xuICB9XG5cbiAgY29tcGxldGUoKSB7XG4gICAgLy8vXG4gIH1cblxuICBhc3luYyB2ZXJpZnlGaWxlKCkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldE5vZGUoKSxcbiAgICAgICAgICBjb250ZXh0ID0gdGhpcywgLy8vXG4gICAgICAgICAgZmlsZU5vZGUgPSBub2RlLCAgLy8vXG4gICAgICAgICAgZmlsZVZlcmlmaWVzID0gYXdhaXQgdmVyaWZ5RmlsZShmaWxlTm9kZSwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZmlsZVZlcmlmaWVzO1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5nZXRKU09OKCk7XG5cbiAgICBpZiAoanNvbiA9PT0gbnVsbCkge1xuICAgICAgc3VwZXIuaW5pdGlhbGlzZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZUNvbnRleHQgPSB0aGlzOyAvLy9cblxuICAgIHRoaXMudHlwZXMgPSBbXTtcblxuICAgIHR5cGVzRnJvbUpTT04oanNvbiwgdGhpcy50eXBlcywgZmlsZUNvbnRleHQpO1xuXG4gICAgdGhpcy5sZW1tYXMgPSBbXTtcbiAgICB0aGlzLm1ldGFMZW1tYXMgPSBbXTtcblxuICAgIHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuZGVjbGFyZWRWYXJpYWJsZXMgPSBkZWNsYXJlZFZhcmlhYmxlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLnR5cGVQcmVmaXhlcyA9IHR5cGVQcmVmaXhlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLmNvbWJpbmF0b3JzID0gY29tYmluYXRvcnNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5jb25zdHJ1Y3RvcnMgPSBjb25zdHJ1Y3RvcnNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG5cbiAgICB0aGlzLnJ1bGVzID0gcnVsZXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy5heGlvbXMgPSBheGlvbXNGcm9tSlNPTihqc29uLCBmaWxlQ29udGV4dCk7XG4gICAgdGhpcy50aGVvcmVtcyA9IHRoZW9yZW1zRnJvbUpTT04oanNvbiwgZmlsZUNvbnRleHQpO1xuICAgIHRoaXMuY29uamVjdHVyZXMgPSBjb25qZWN0dXJlc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgICB0aGlzLm1ldGF0aGVvcmVtcyA9IG1ldGF0aGVvcmVtc0Zyb21KU09OKGpzb24sIGZpbGVDb250ZXh0KTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCB0eXBlc0pTT04gPSB0eXBlc1RvVHlwZXNKU09OKHRoaXMudHlwZXMpLFxuICAgICAgICAgIHJ1bGVzSlNPTiA9IHJ1bGVzVG9SdWxlc0pTT04odGhpcy5ydWxlcyksXG4gICAgICAgICAgYXhpb21zSlNPTiA9IGF4aW9tc1RvQXhpb21zSlNPTih0aGlzLmF4aW9tcyksXG4gICAgICAgICAgdGhlb3JlbXNKU09OID0gdGhlb3JlbXNUb1RoZW9yZW1zSlNPTih0aGlzLnRoZW9yZW1zKSxcbiAgICAgICAgICBjb25qZWN0dXJlc0pTT04gPSBjb25qZWN0dXJlc1RvQ29uamVjdHVyZXNKU09OKHRoaXMuY29uamVjdHVyZXMpLFxuICAgICAgICAgIGNvbWJpbmF0b3JzSlNPTiA9IGNvbWJpbmF0b3JzVG9Db21iaW5hdG9yc0pTT04odGhpcy5jb21iaW5hdG9ycyksXG4gICAgICAgICAgdHlwZVByZWZpeGVzSlNPTiA9IHR5cGVQcmVmaXhlc1RvVHlwZVByZWZpeGVzSlNPTih0aGlzLnR5cGVQcmVmaXhlcyksXG4gICAgICAgICAgY29uc3RydWN0b3JzSlNPTiA9IGNvbnN0cnVjdG9yc1RvQ29uc3RydWN0b3JzSlNPTih0aGlzLmNvbnN0cnVjdG9ycyksXG4gICAgICAgICAgbWV0YXRoZW9yZW1zSlNPTiA9IG1ldGF0aGVvcmVtc1RvTWV0YXRoZW9yZW1zSlNPTih0aGlzLm1ldGF0aGVvcmVtcyksXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXNKU09OID0gZGVjbGFyZWRWYXJpYWJsZXNUb0RlY2xhcmVkVmFyaWFibGVzSlNPTih0aGlzLmRlY2xhcmVkVmFyaWFibGVzKSxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXNKU09OID0gZGVjbGFyZWRNZXRhdmFyaWFibGVzVG9EZWNsYXJlZE1ldGF2YXJpYWJsZXNKU09OKHRoaXMuZGVjbGFyZWRNZXRhdmFyaWFibGVzKSxcbiAgICAgICAgICBmaWxlQ29udGVudCA9IHRoaXMuZmlsZUNvbnRlbnQsXG4gICAgICAgICAgZmlsZVBhdGggPSB0aGlzLmZpbGVQYXRoLFxuICAgICAgICAgIHR5cGVzID0gdHlwZXNKU09OLCAgLy8vXG4gICAgICAgICAgcnVsZXMgPSBydWxlc0pTT04sICAvLy9cbiAgICAgICAgICBheGlvbXMgPSBheGlvbXNKU09OLCAgLy8vXG4gICAgICAgICAgdGhlb3JlbXMgPSB0aGVvcmVtc0pTT04sICAvLy9cbiAgICAgICAgICBjb25qZWN0dXJlcyA9IGNvbmplY3R1cmVzSlNPTiwgIC8vL1xuICAgICAgICAgIGNvbWJpbmF0b3JzID0gY29tYmluYXRvcnNKU09OLCAgLy8vXG4gICAgICAgICAgdHlwZVByZWZpeGVzID0gdHlwZVByZWZpeGVzSlNPTiwgIC8vL1xuICAgICAgICAgIGNvbnN0cnVjdG9ycyA9IGNvbnN0cnVjdG9yc0pTT04sICAvLy9cbiAgICAgICAgICBtZXRhdGhlb3JlbXMgPSBtZXRhdGhlb3JlbXNKU09OLCAgLy8vXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBkZWNsYXJlZFZhcmlhYmxlc0pTT04sICAvLy9cbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBkZWNsYXJlZE1ldGF2YXJpYWJsZXNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIGZpbGVDb250ZW50LFxuICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICB0eXBlcyxcbiAgICAgICAgICAgIHJ1bGVzLFxuICAgICAgICAgICAgYXhpb21zLFxuICAgICAgICAgICAgdGhlb3JlbXMsXG4gICAgICAgICAgICBjb25qZWN0dXJlcyxcbiAgICAgICAgICAgIGNvbWJpbmF0b3JzLFxuICAgICAgICAgICAgdHlwZVByZWZpeGVzLFxuICAgICAgICAgICAgY29uc3RydWN0b3JzLFxuICAgICAgICAgICAgbWV0YXRoZW9yZW1zLFxuICAgICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMsXG4gICAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXNcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUZpbGUoZmlsZSwgY29udGV4dCkge1xuICAgIGNvbnN0IHJlbGVhc2VDb250ZXh0ID0gY29udGV4dCwgLy8vXG4gICAgICAgICAgY29tYmluZWRDdXN0b21HcmFtbWFyID0gcmVsZWFzZUNvbnRleHQuZ2V0Q29tYmluZWRDdXN0b21HcmFtbWFyKCksXG4gICAgICAgICAgbm9taW5hbExleGVyID0gbm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hcihOb21pbmFsTGV4ZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbm9taW5hbFBhcnNlciA9IG5vbWluYWxQYXJzZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKE5vbWluYWxQYXJzZXIsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgICAgbGV4ZXIgPSBub21pbmFsTGV4ZXIsIC8vL1xuICAgICAgICAgIHBhcnNlciA9IG5vbWluYWxQYXJzZXIsIC8vL1xuICAgICAgICAgIHR5cGVzID0gW10sXG4gICAgICAgICAgcnVsZXMgPSBbXSxcbiAgICAgICAgICBheGlvbXMgPSBbXSxcbiAgICAgICAgICBsZW1tYXMgPSBbXSxcbiAgICAgICAgICB0aGVvcmVtcyA9IFtdLFxuICAgICAgICAgIG1ldGFMZW1tYXMgPSBbXSxcbiAgICAgICAgICBjb25qZWN0dXJlcyA9IFtdLFxuICAgICAgICAgIGNvbWJpbmF0b3JzID0gW10sXG4gICAgICAgICAgdHlwZVByZWZpeGVzID0gW10sXG4gICAgICAgICAgY29uc3RydWN0b3JzID0gW10sXG4gICAgICAgICAgbWV0YXRoZW9yZW1zID0gW10sXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBbXSxcbiAgICAgICAgICBkZWNsYXJlZE1ldGF2YXJpYWJsZXMgPSBbXSxcbiAgICAgICAgICBub21pbmFsRmlsZUNvbnRleHQgPSBGaWxlQ29udGV4dC5mcm9tRmlsZShOb21pbmFsRmlsZUNvbnRleHQsIGZpbGUsIGxleGVyLCBwYXJzZXIsIHR5cGVzLCBydWxlcywgYXhpb21zLCBsZW1tYXMsIHRoZW9yZW1zLCBtZXRhTGVtbWFzLCBjb25qZWN0dXJlcywgY29tYmluYXRvcnMsIHR5cGVQcmVmaXhlcywgY29uc3RydWN0b3JzLCBtZXRhdGhlb3JlbXMsIGRlY2xhcmVkVmFyaWFibGVzLCBkZWNsYXJlZE1ldGF2YXJpYWJsZXMsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIG5vbWluYWxGaWxlQ29udGV4dDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uLCBjb250ZXh0KSB7XG4gICAgY29uc3QgcmVsZWFzZUNvbnRleHQgPSBjb250ZXh0LCAvLy9cbiAgICAgICAgICBjb21iaW5lZEN1c3RvbUdyYW1tYXIgPSByZWxlYXNlQ29udGV4dC5nZXRDb21iaW5lZEN1c3RvbUdyYW1tYXIoKSxcbiAgICAgICAgICBub21pbmFsTGV4ZXIgPSBub21pbmFsTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyKE5vbWluYWxMZXhlciwgY29tYmluZWRDdXN0b21HcmFtbWFyKSxcbiAgICAgICAgICBub21pbmFsUGFyc2VyID0gbm9taW5hbFBhcnNlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoTm9taW5hbFBhcnNlciwgY29tYmluZWRDdXN0b21HcmFtbWFyKSxcbiAgICAgICAgICBsZXhlciA9IG5vbWluYWxMZXhlciwgLy8vXG4gICAgICAgICAgcGFyc2VyID0gbm9taW5hbFBhcnNlciwgLy8vXG4gICAgICAgICAgdHlwZXMgPSBudWxsLFxuICAgICAgICAgIHJ1bGVzID0gbnVsbCxcbiAgICAgICAgICBheGlvbXMgPSBudWxsLFxuICAgICAgICAgIGxlbW1hcyA9IG51bGwsXG4gICAgICAgICAgdGhlb3JlbXMgPSBudWxsLFxuICAgICAgICAgIG1ldGFMZW1tYXMgPSBudWxsLFxuICAgICAgICAgIGNvbmplY3R1cmVzID0gbnVsbCxcbiAgICAgICAgICBjb21iaW5hdG9ycyA9IG51bGwsXG4gICAgICAgICAgdHlwZVByZWZpeGVzID0gbnVsbCxcbiAgICAgICAgICBjb25zdHJ1Y3RvcnMgPSBudWxsLFxuICAgICAgICAgIG1ldGF0aGVvcmVtcyA9IG51bGwsXG4gICAgICAgICAgZGVjbGFyZWRWYXJpYWJsZXMgPSBudWxsLFxuICAgICAgICAgIGRlY2xhcmVkTWV0YXZhcmlhYmxlcyA9IG51bGwsXG4gICAgICAgICAgbm9taW5hbEZpbGVDb250ZXh0ID0gRmlsZUNvbnRleHQuZnJvbUpTT04oTm9taW5hbEZpbGVDb250ZXh0LCBqc29uLCBsZXhlciwgcGFyc2VyLCB0eXBlcywgcnVsZXMsIGF4aW9tcywgbGVtbWFzLCB0aGVvcmVtcywgbWV0YUxlbW1hcywgY29uamVjdHVyZXMsIGNvbWJpbmF0b3JzLCB0eXBlUHJlZml4ZXMsIGNvbnN0cnVjdG9ycywgbWV0YXRoZW9yZW1zLCBkZWNsYXJlZFZhcmlhYmxlcywgZGVjbGFyZWRNZXRhdmFyaWFibGVzLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBub21pbmFsRmlsZUNvbnRleHQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOb21pbmFsRmlsZUNvbnRleHQiLCJwdXNoIiwiZmlsdGVyIiwiYXJyYXlVdGlsaXRpZXMiLCJGaWxlQ29udGV4dCIsImNvbnRleHQiLCJmaWxlQ29udGVudCIsImZpbGVQYXRoIiwidG9rZW5zIiwibm9kZSIsImpzb24iLCJsZXhlciIsInBhcnNlciIsInR5cGVzIiwicnVsZXMiLCJheGlvbXMiLCJsZW1tYXMiLCJ0aGVvcmVtcyIsIm1ldGFMZW1tYXMiLCJjb25qZWN0dXJlcyIsImNvbWJpbmF0b3JzIiwidHlwZVByZWZpeGVzIiwiY29uc3RydWN0b3JzIiwibWV0YXRoZW9yZW1zIiwiZGVjbGFyZWRWYXJpYWJsZXMiLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXMiLCJnZXRMZXhlciIsImdldFBhcnNlciIsImdldEVxdWl2YWxlbmNlcyIsImVxdWl2YWxlbmNlcyIsImdldFN1YnByb29mT3JQcm9vZkFzc2VydGlvbnMiLCJzdWJwcm9vZk9yUHJvb2ZBc3NlcnRpb25zIiwiZ2V0TGFiZWxzIiwiaW5jbHVkZVJlbGVhc2UiLCJsYWJlbHMiLCJyZWxlYXNlQ29udGV4dExhYmVscyIsImZvckVhY2giLCJydWxlIiwicnVsZUxhYmVscyIsImF4aW9tIiwiYXhpb21MYWJlbHMiLCJsZW1tYSIsImxlbW1hTGFiZWxzIiwidGhlb3JlbSIsInRoZW9yZW1MYWJlbHMiLCJjb25qZWN0dXJlIiwiY29uamVjdHVyZUxhYmVscyIsIm1ldGF0aGVvcmVtIiwibWV0YXRoZW9yZW1MYWJlbCIsImdldExhYmVsIiwiZ2V0VHlwZXMiLCJnZXRSdWxlcyIsImdldEF4aW9tcyIsImdldExlbW1hcyIsImdldFRoZW9yZW1zIiwiZ2V0TWV0YUxlbW1hcyIsImdldENvbmplY3R1cmVzIiwiZ2V0Q29tYmluYXRvcnMiLCJnZXRUeXBlUHJlZml4ZXMiLCJnZXRDb25zdHJ1Y3RvcnMiLCJnZXRNZXRhdGhlb3JlbXMiLCJnZXRQcm9jZWR1cmVzIiwicHJvY2VkdXJlcyIsImdldFZhcmlhYmxlcyIsIm5lc3RlZCIsInZhcmlhYmxlcyIsImdldERlY2xhcmVkVmFyaWFibGVzIiwiZ2V0RGVjbGFyZWRNZXRhdmFyaWFibGVzIiwiZ2V0RGVjbGFyZWRKdWRnZW1lbnRzIiwiZGVjbGFyZWRKdWRnZW1lbnRzIiwiZ2V0VGVybXMiLCJ0ZXJtcyIsImdldEZyYW1lcyIsImZyYW1lcyIsImdldFByb3BlcnRpZXMiLCJwcm9wZXJ0aWVzIiwiZ2V0RXF1YWxpdGllcyIsImVxdWFsaXRpZXMiLCJnZXRKdWRnZW1lbnRzIiwianVkZ2VtZW50cyIsImdldEFzc2VydGlvbnMiLCJhc3NlcnRpb25zIiwiZ2V0U3RhdGVtZW50cyIsInN0YXRlbWVudHMiLCJnZXRTaWduYXR1cmVzIiwic2lnbmF0dXJlcyIsImdldFJlZmVyZW5jZXMiLCJyZWZlcmVuY2VzIiwiZ2V0QXNzdW1wdGlvbnMiLCJhc3N1bXB0aW9ucyIsImdldE1ldGF2YXJpYWJsZXMiLCJtZXRhdmFyaWFibGVzIiwiZ2V0U3Vic3RpdHV0aW9ucyIsInN1YnN0aXR1dGlvbnMiLCJnZXRQcm9wZXJ0eVJlbGF0aW9ucyIsInByb3BlcnR5UmVsYXRpb25zIiwiZ2V0RGVyaXZlZFN1YnN0aXR1dGlvbnMiLCJkZXJpdmVkU3Vic3RpdHV0aW9ucyIsImFkZFR5cGUiLCJ0eXBlIiwiZ2V0RmlsZVBhdGgiLCJ0eXBlU3RyaW5nIiwiZ2V0U3RyaW5nIiwidHJhY2UiLCJhZGRSdWxlIiwicnVsZVN0cmluZyIsImFkZEF4aW9tIiwiYXhpb21TdHJpbmciLCJhZGRMZW1tYSIsImxlbW1hU3RyaW5nIiwiYWRkVGhlb3JlbSIsInRoZW9yZW1TdHJpbmciLCJhZGRNZXRhTGVtbWEiLCJtZXRhTGVtbWEiLCJtZXRhTGVtbWFTdHJpbmciLCJhZGRDb25qZWN0dXJlIiwib2NuamVjdHVyZVN0cmluZyIsImFkZENvbWJpbmF0b3IiLCJjb21iaW5hdG9yIiwiY29tYmluYXRvclN0cmluZyIsImFkZFR5cGVQcmVmaXgiLCJ0eXBlUHJlZml4IiwidHlwZVByZWZpeFN0cmluZyIsImFkZENvbnN0cnVjdG9yIiwiY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvclN0cmluZyIsImFkZE1ldGF0aGVvcmVtIiwibWV0YXRoZW9yZW1TdHJpbmciLCJhZGREZWNsYXJlZFZhcmlhYmxlIiwiZGVjbGFyZWRWYXJpYWJsZSIsImRlY2xhcmVkVmFyaWFibGVTdHJpbmciLCJhZGREZWNsYXJlZE1ldGF2YXJpYWJsZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVTdHJpbmciLCJmaW5kTWV0YXZhcmlhYmxlIiwibWV0YXZhcmlhYmxlIiwiZmluZCIsIm1ldGF2YXJpYWJsZVVuaWZpZXMiLCJ1bmlmeU1ldGF2YXJpYWJsZSIsImZpbmRSdWxlQnlSZWZlcmVuY2UiLCJyZWZlcmVuY2UiLCJtZXRhdmFyaWFibGVOb2RlIiwiZ2V0TWV0YXZhcmlhYmxlTm9kZSIsIm1ldGF2YXJpYWJsZU5vZGVNYXRjaGVzIiwibWF0Y2hNZXRhdmFyaWFibGVOb2RlIiwiZmluZEF4aW9tQnlSZWZlcmVuY2UiLCJmaW5kTGVtbWFCeVJlZmVyZW5jZSIsImZpbmRUaGVvcmVtQnlSZWZlcmVuY2UiLCJmaW5kQ29uamVjdHVyZUJ5UmVmZXJlbmNlIiwiZmluZE1ldGFMZW1tYXNCeVJlZmVyZW5jZSIsInRvcExldmVsTWV0YUFzc2VydGlvbiIsInRvcExldmVsTWV0YUFzc2VydGlvbkNvbXBhcmVzIiwiY29tcGFyZVRvcExldmVsTWV0YUFzc2VydGlvbiIsImZpbmRNZXRhdGhlb3JlbXNCeVJlZmVyZW5jZSIsImZpbmRUb3BMZXZlbEFzc2VydGlvbkJ5UmVmZXJlbmNlIiwidG9wTGV2ZWxBc3NlcnRpb24iLCJmaW5kVG9wTGV2ZWxNZXRhQXNzZXJ0aW9uQnlSZWZlcmVuY2UiLCJmaW5kTWV0YUxlbW1hQnlSZWZlcmVuY2UiLCJmaW5kTWV0YXRoZW9yZW1CeVJlZmVyZW5jZSIsImZpbmRUb3BMZXZlbE1ldGFBc3NlcnRpb25zQnlSZWZlcmVuY2UiLCJ0b3BMZXZlbE1ldGFBc3NlcnRpb25zIiwiZmluZFR5cGVCeVR5cGVOYW1lIiwidHlwZU5hbWUiLCJiYXNlVHlwZSIsImJhc2VUeXBlRnJvbU5vdGhpbmciLCJ0eXBlQ29tcGFyZXNUb1R5cGVOYW1lIiwiY29tcGFyZVR5cGVOYW1lIiwiZmluZFR5cGVCeU5vbWluYWxUeXBlTmFtZSIsIm5vbWluYWxUeXBlTmFtZSIsInR5cGVDb21wYXJlc1RvTm9taW5hbFR5cGVOYW1lIiwiY29tcGFyZU5vbWluYWxUeXBlTmFtZSIsImZpbmRUeXBlQnlQcmVmaXhlZFR5cGVOYW1lIiwicHJlZml4ZWRUeXBlTmFtZSIsInR5cGVDb21wYXJlc1RvUHJlZml4ZWRUeXBlTmFtZSIsImNvbXBhcmVQcmVmaXhlZFR5cGVOYW1lIiwiZmluZFR5cGVQcmVmaXhCeVR5cGVQcmVmaXhOYW1lIiwidHlwZVByZWZpeE5hbWUiLCJ0eXBlUHJlZml4Q29tcGFyZXNUb1R5cGVQcmVmaXhOYW1lIiwiY29tcGFyZVR5cGVQcmVmaXhOYW1lIiwiZmluZERlY2xhcmVkVmFyaWFibGVCeVZhcmlhYmxlSWRlbnRpZmllciIsIlZhcmlhYmxlSWRlbnRpdGlmZXIiLCJkZWNsYXJlZFZhcmlhYmxlQ29tcGFyZXNUb1ZhcmlhYmxlSWRlbnRpdGlmZXIiLCJjb21wYXJlVmFyaWFibGVJZGVudGlmaWVyIiwiZmluZERlY2xhcmVkTWV0YXZhcmlhYmxlQnlNZXRhdmFyaWFibGVOYW1lIiwibWV0YXZhcmlhYmxlTmFtZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlQ29tcGFyZXNUb01ldGF2YXJpYWJsZU5hbWUiLCJjb21wYXJlTWV0YXZhcmlhYmxlTmFtZSIsImZpbmRUZXJtQnlUZXJtTm9kZSIsInRlcm1Ob2RlIiwidGVybSIsImZpbmRTdGF0ZW1lbnRCeVN0YXRlbWVudE5vZGUiLCJzdGF0ZW1lbnROb2RlIiwic3RhdGVtZW50IiwiZmluZE1ldGF2YXJpYWJsZUJ5TWV0YXZhcmlhYmxlTm9kZSIsImZpbmRTdWJzdGl0dXRpb25CeVN1YnN0aXR1dGlvbk5vZGUiLCJzdWJzdGl0dXRpb25Ob2RlIiwic3Vic3RpdHV0aW9uIiwiZmluZE1ldGFMZXZlbEFzc3VtcHRpb25CeU1ldGFMZXZlbEFzc3VtcHRpb25Ob2RlIiwibWV0YUxldmVsQXNzdW1wdGlvbk5vZGUiLCJtZXRhTGV2ZWxBc3N1bXB0aW9uIiwiZmluZFByb2NlZHVyZUJ5UHJvY2VkdXJlTmFtZSIsInByb2NlZHVyZU5hbWUiLCJwcm9jZWR1cmUiLCJwcm9jZWR1cmVDb21wYXJlc1RvUHJvY2VkdXJlTmFtZSIsImNvbXBhcmVQcm9jZWR1cmVOYW1lIiwiZmluZE1ldGFUeXBlQnlNZXRhVHlwZU5hbWUiLCJtZXRhVHlwZU5hbWUiLCJpc01ldGF2YXJpYWJsZVByZXNlbnQiLCJtZXRhdmFyaWFibGVQcmVzZW50IiwiaXNMYWJlbFByZXNlbnRCeVJlZmVyZW5jZSIsImxhYmVsUHJlc2VudCIsInNvbWUiLCJsYWJlbCIsImxhYmVsVW5pZmllcyIsInVuaWZ5TGFiZWwiLCJpc1RvcExldmVsTWV0YUFzc2VydGlvblByZXNlbnRCeVJlZmVyZW5jZSIsInRvcExldmVsTWV0YUFzc2VydGlvblByZXNlbnQiLCJpc0xhYmVsUHJlc2VudEJ5TGFiZWxOb2RlIiwibGFiZWxOb2RlIiwibGFiZWxOb2RlTWF0Y2hlcyIsIm1hdGNoTGFiZWxOb2RlIiwiaXNUeXBlUHJlc2VudEJ5VHlwZU5hbWUiLCJ0eXBlUHJlc2VudCIsImlzVHlwZVByZXNlbnRCeU5vbWluYWxUeXBlTmFtZSIsImlzVHlwZVByZXNlbnRCeVByZWZpeGVkVHlwZU5hbWUiLCJpc1R5cGVQcmVmaXhQcmVzZW50QnlUeXBlUHJlZml4TmFtZSIsInR5cGVQcmVmaXhQcmVzZW50IiwiaXNEZWNsYXJlZFZhcmlhYmxlUHJlc2VudEJ5VmFyaWFibGVJZGVudGlmaWVyIiwidmFyaWFibGVJZGVudGlmaWVyIiwiZGVjbGFyZWRWYXJpYWJsZVByZXNlbnQiLCJpc0RlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudEJ5TWV0YXZhcmlhYmxlTmFtZSIsImRlY2xhcmVkTWV0YXZhcmlhYmxlUHJlc2VudCIsImlzUHJvY2VkdXJlUHJlc2VudEJ5UHJvY2VkdXJlTmFtZSIsInByb2NlZHVyZVByZXNlbnQiLCJpc01ldGFMZXZlbCIsIm1ldGFMRXZlbCIsImNsZWFyIiwiY29tcGxldGUiLCJ2ZXJpZnlGaWxlIiwiZ2V0Tm9kZSIsImZpbGVOb2RlIiwiZmlsZVZlcmlmaWVzIiwiaW5pdGlhbGlzZSIsImdldEpTT04iLCJmaWxlQ29udGV4dCIsInR5cGVzRnJvbUpTT04iLCJkZWNsYXJlZE1ldGF2YXJpYWJsZXNGcm9tSlNPTiIsImRlY2xhcmVkVmFyaWFibGVzRnJvbUpTT04iLCJ0eXBlUHJlZml4ZXNGcm9tSlNPTiIsImNvbWJpbmF0b3JzRnJvbUpTT04iLCJjb25zdHJ1Y3RvcnNGcm9tSlNPTiIsInJ1bGVzRnJvbUpTT04iLCJheGlvbXNGcm9tSlNPTiIsInRoZW9yZW1zRnJvbUpTT04iLCJjb25qZWN0dXJlc0Zyb21KU09OIiwibWV0YXRoZW9yZW1zRnJvbUpTT04iLCJ0b0pTT04iLCJ0eXBlc0pTT04iLCJ0eXBlc1RvVHlwZXNKU09OIiwicnVsZXNKU09OIiwicnVsZXNUb1J1bGVzSlNPTiIsImF4aW9tc0pTT04iLCJheGlvbXNUb0F4aW9tc0pTT04iLCJ0aGVvcmVtc0pTT04iLCJ0aGVvcmVtc1RvVGhlb3JlbXNKU09OIiwiY29uamVjdHVyZXNKU09OIiwiY29uamVjdHVyZXNUb0NvbmplY3R1cmVzSlNPTiIsImNvbWJpbmF0b3JzSlNPTiIsImNvbWJpbmF0b3JzVG9Db21iaW5hdG9yc0pTT04iLCJ0eXBlUHJlZml4ZXNKU09OIiwidHlwZVByZWZpeGVzVG9UeXBlUHJlZml4ZXNKU09OIiwiY29uc3RydWN0b3JzSlNPTiIsImNvbnN0cnVjdG9yc1RvQ29uc3RydWN0b3JzSlNPTiIsIm1ldGF0aGVvcmVtc0pTT04iLCJtZXRhdGhlb3JlbXNUb01ldGF0aGVvcmVtc0pTT04iLCJkZWNsYXJlZFZhcmlhYmxlc0pTT04iLCJkZWNsYXJlZFZhcmlhYmxlc1RvRGVjbGFyZWRWYXJpYWJsZXNKU09OIiwiZGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiIsImRlY2xhcmVkTWV0YXZhcmlhYmxlc1RvRGVjbGFyZWRNZXRhdmFyaWFibGVzSlNPTiIsImZyb21GaWxlIiwiZmlsZSIsInJlbGVhc2VDb250ZXh0IiwiY29tYmluZWRDdXN0b21HcmFtbWFyIiwiZ2V0Q29tYmluZWRDdXN0b21HcmFtbWFyIiwibm9taW5hbExleGVyIiwibm9taW5hbExleGVyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIk5vbWluYWxMZXhlciIsIm5vbWluYWxQYXJzZXIiLCJub21pbmFsUGFyc2VyRnJvbUNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIk5vbWluYWxQYXJzZXIiLCJub21pbmFsRmlsZUNvbnRleHQiLCJmcm9tSlNPTiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBc0NBOzs7ZUFBcUJBOzs7Z0NBcENPOzJCQUNHOzhEQUVOOytEQUNDO3dCQUVDO3NCQUNTOzJCQUNPO3dCQUNXO3lCQUNDO3NCQXNCVTs7Ozs7O0FBRWpFLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxNQUFNLEVBQUUsR0FBR0MseUJBQWM7QUFFeEIsTUFBTUgsMkJBQTJCSSwyQkFBVztJQUN6RCxZQUFZQyxPQUFPLEVBQUVDLFdBQVcsRUFBRUMsUUFBUSxFQUFFQyxNQUFNLEVBQUVDLElBQUksRUFBRUMsSUFBSSxF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