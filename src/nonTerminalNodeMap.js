"use strict";

import TermNode from "./node/term";
import RuleNode from "./node/rule";
import StepNode from "./node/proofAssertion/step";
import TypeNode from "./node/type";
import TypesNode from "./node/types";
import ErrorNode from "./node/error";
import FrameNode from "./node/frame";
import AxiomNode from "./node/topLevelAssertion/axiom";
import LemmaNode from "./node/topLevelAssertion/lemma";
import ProofNode from "./node/proof";
import LabelNode from "./node/label";
import LabelsNode from "./node/labels";
import SectionNode from "./node/section";
import PremiseNode from "./node/proofAssertion/premise";
import TheoremNode from "./node/topLevelAssertion/theorem";
import ArgumentNode from "./node/argument";
import SubproofNode from "./node/subproof";
import PropertyNode from "./node/property";
import MetaTypeNode from "./node/metaType";
import EqualityNode from "./node/equality";
import VariableNode from "./node/variable";
import DocumentNode from "./node/document";
import RuleBodyNode from "./node/body/rule";
import StatementNode from "./node/statement";
import ReferenceNode from "./node/reference";
import DeductionNode from "./node/deduction";
import JudgementNode from "./node/judgement";
import MetaLemmaNode from "./node/topLevelMetaAssertion/metaLemma";
import ParameterNode from "./node/parameter";
import SignatureNode from "./node/signature";
import AxiomBodyNode from "./node/body/axiom";
import LemmaBodyNode from "./node/body/lemma";
import DerivationNode from "./node/derivation";
import CombinatorNode from "./node/combinator";
import ConclusionNode from "./node/conclusion";
import ConjectureNode from "./node/topLevelAssertion/conjecture";
import HypothesisNode from "./node/hypothesis";
import TypePrefixNode from "./node/typePrefix";
import AssumptionNode from "./node/assumption";
import RuleHeaderNode from "./node/header/rule";
import SuppositionNode from "./node/proofAssertion/supposition";
import PlaceholderNode from "./node/placeholder";
import ConstructorNode from "./node/constructor";
import MetatheoremNode from "./node/topLevelMetaAssertion/metatheorem";
import EquivalenceNode from "./node/equivalence";
import TheoremBodyNode from "./node/body/theorem";
import AxiomHeaderNode from "./node/header/axiom";
import LemmaHeaderNode from "./node/header/lemma";
import EquivalencesNode from "./node/equivalences";
import MetaArgumentNode from "./node/metaArgument";
import MetavariableNode from "./node/metavariable";
import QualificationNode from "./node/qualification";
import ProcedureCallNode from "./node/procedureCall";
import SubDerivationNode from "./node/subDerivation";
import TheoremHeaderNode from "./node/header/theorem";
import MetaLemmaBodyNode from "./node/body/metaLemma";
import TypeAssertionNode from "./node/assertion/type";
import ConjectureBodyNode from "./node/body/conjecture";
import MetatheoremBodyNode from "./node/body/metatheorem";
import MetaLemmaHeaderNode from "./node/header/metaLemma";
import PropertyRelationNode from "./node/propertyRelation"
import DefinedAssertionNode from "./node/assertion/defined";
import TermSubstitutionNode from "./node/substitution/term";
import ConjectureHeaderNode from "./node/header/conjecture";
import MetatheoremHeaderNode from "./node/header/metatheorem";
import PropertyAssertionNode from "./node/assertion/property";
import SubproofAssertionNode from "./node/assertion/subproof";
import FrameSubstitutionNode from "./node/substitution/frame";
import ParenthesisedLabelNode from "./node/parenthesisedLabel";
import ProcedureReferenceNode from "./node/procedureReference";
import ContainedAssertionNode from "./node/assertion/contained";
import SignatureAssertionNode from "./node/assertion/signature";
import ParenthesisedLabelsNode from "./node/parenthesisedLabels"
import PropertyDeclarationNode from "./node/declaration/property";
import VariableDeclarationNode from "./node/declaration/variable";
import MetaLevelAssumptionpNode from "./node/assumption/metaLevel";
import SimpleTypeDeclarationNode from "./node/declaration/simpleType";
import CombinatorDeclarationNode from "./node/declaration/combinator";
import ReferenceSubstitutionNode from "./node/substitution/reference";
import StatementSubstitutionNode from "./node/substitution/statement";
import TypePrefixDeclarationNode from "./node/declaration/typePrefix";
import ComplexTypeDeclarationNode from "./node/declaration/complexType";
import DonstructorDeclarationNode from "./node/declaration/constructor";
import MetavariableDeclarationNode from "./node/declaration/metavariable";

import {
  RULE_RULE_NAME,
  STEP_RULE_NAME,
  TERM_RULE_NAME,
  TYPE_RULE_NAME,
  TYPES_RULE_NAME,
  PROOF_RULE_NAME,
  ERROR_RULE_NAME,
  FRAME_RULE_NAME,
  AXIOM_RULE_NAME,
  LEMMA_RULE_NAME,
  LABEL_RULE_NAME,
  LABELS_RULE_NAME,
  THEOREM_RULE_NAME,
  PREMISE_RULE_NAME,
  SECTION_RULE_NAME,
  ARGUMENT_RULE_NAME,
  SUBPROOF_RULE_NAME,
  PROPERTY_RULE_NAME,
  EQUALITY_RULE_NAME,
  VARIABLE_RULE_NAME,
  DOCUMENT_RULE_NAME,
  META_TYPE_RULE_NAME,
  SIGNATURE_RULE_NAME,
  DEDUCTION_RULE_NAME,
  JUDGEMENT_RULE_NAME,
  PARAMETER_RULE_NAME,
  REFERENCE_RULE_NAME,
  STATEMENT_RULE_NAME,
  RULE_BODY_RULE_NAME,
  META_LEMMA_RULE_NAME,
  DERIVATION_RULE_NAME,
  COMBINATOR_RULE_NAME,
  CONCLUSION_RULE_NAME,
  CONJECTURE_RULE_NAME,
  HYPOTHESIS_RULE_NAME,
  AXIOM_BODY_RULE_NAME,
  LEMMA_BODY_RULE_NAME,
  ASSUMPTION_RULE_NAME,
  PLACEHOLDER_RULE_NAME,
  TYPE_PREFIX_RULE_NAME,
  SUPPOSITION_RULE_NAME,
  RULE_HEADER_RULE_NAME,
  CONSTRUCTOR_RULE_NAME,
  METATHEOREM_RULE_NAME,
  EQUIVALENCE_RULE_NAME,
  EQUIVALENCES_RULE_NAME,
  AXIOM_HEADER_RULE_NAME,
  LEMMA_HEADER_RULE_NAME,
  THEOREM_BODY_RULE_NAME,
  METAVARIABLE_RULE_NAME,
  QUALIFICATION_RULE_NAME,
  META_ARGUMENT_RULE_NAME,
  THEOREM_HEADER_RULE_NAME,
  SUB_DERIVATION_RULE_NAME,
  TYPE_ASSERTION_RULE_NAME,
  PROCEDURE_CALL_RULE_NAME,
  CONJECTURE_BODY_RULE_NAME,
  META_LEMMA_BODY_RULE_NAME,
  METATHEOREM_BODY_RULE_NAME,
  CONJECTURE_HEADER_RULE_NAME,
  META_LEMMA_HEADER_RULE_NAME,
  PROPERTY_RELATION_RULE_NAME,
  DEFINED_ASSERTION_RULE_NAME,
  TERM_SUBSTITUTION_RULE_NAME,
  METATHEOREM_HEADER_RULE_NAME,
  SUBPROOF_ASSERTION_RULE_NAME,
  PROPERTY_ASSERTION_RULE_NAME,
  FRAME_SUBSTITUTION_RULE_NAME,
  PROCEDURE_REFERENCE_RULE_NAME,
  CONTAINED_ASSERTION_RULE_NAME,
  SIGNATURE_ASSERTION_RULE_NAME,
  PARENTHESISED_LABEL_RULE_NAME,
  PARENTHESISED_LABELS_RULE_NAME,
  PROPERTY_DECLARATION_RULE_NAME,
  VARIABLE_DECLARATION_RULE_NAME,
  META_LEVEL_ASSUMPTION_RULE_NAME,
  COMBINATOR_DECLARATION_RULE_NAME,
  REFERENCE_SUBSTITUTION_RULE_NAME,
  STATEMENT_SUBSTITUTION_RULE_NAME,
  SIMPLE_TYPE_DECLARATION_RULE_NAME,
  CONSTRUCTOR_DECLARATION_RULE_NAME,
  TYPE_PREFIX_DECLARATION_RULE_NAME,
  COMPLEX_TYPE_DECLARATION_RULE_NAME,
  METAVARIABLE_DECLARATION_RULE_NAME } from "./ruleNames";

const NonTerminalNodeMap = {
  [RULE_RULE_NAME]: RuleNode,
  [STEP_RULE_NAME]: StepNode,
  [TERM_RULE_NAME]: TermNode,
  [TYPE_RULE_NAME]: TypeNode,
  [TYPES_RULE_NAME]: TypesNode,
  [ERROR_RULE_NAME]: ErrorNode,
  [FRAME_RULE_NAME]: FrameNode,
  [LEMMA_RULE_NAME]: LemmaNode,
  [AXIOM_RULE_NAME]: AxiomNode,
  [PROOF_RULE_NAME]: ProofNode,
  [LABEL_RULE_NAME]: LabelNode,
  [LABELS_RULE_NAME]: LabelsNode,
  [THEOREM_RULE_NAME]: TheoremNode,
  [PREMISE_RULE_NAME]: PremiseNode,
  [SECTION_RULE_NAME]: SectionNode,
  [ARGUMENT_RULE_NAME]: ArgumentNode,
  [PROPERTY_RULE_NAME]: PropertyNode,
  [SUBPROOF_RULE_NAME]: SubproofNode,
  [EQUALITY_RULE_NAME]: EqualityNode,
  [VARIABLE_RULE_NAME]: VariableNode,
  [DOCUMENT_RULE_NAME]: DocumentNode,
  [RULE_BODY_RULE_NAME]: RuleBodyNode,
  [META_TYPE_RULE_NAME]: MetaTypeNode,
  [SIGNATURE_RULE_NAME]: SignatureNode,
  [REFERENCE_RULE_NAME]: ReferenceNode,
  [JUDGEMENT_RULE_NAME]: JudgementNode,
  [DEDUCTION_RULE_NAME]: DeductionNode,
  [PARAMETER_RULE_NAME]: ParameterNode,
  [STATEMENT_RULE_NAME]: StatementNode,
  [AXIOM_BODY_RULE_NAME]: AxiomBodyNode,
  [LEMMA_BODY_RULE_NAME]: LemmaBodyNode,
  [META_LEMMA_RULE_NAME]: MetaLemmaNode,
  [COMBINATOR_RULE_NAME]: CombinatorNode,
  [CONCLUSION_RULE_NAME]: ConclusionNode,
  [CONJECTURE_RULE_NAME]: ConjectureNode,
  [DERIVATION_RULE_NAME]: DerivationNode,
  [HYPOTHESIS_RULE_NAME]: HypothesisNode,
  [ASSUMPTION_RULE_NAME]: AssumptionNode,
  [RULE_HEADER_RULE_NAME]: RuleHeaderNode,
  [TYPE_PREFIX_RULE_NAME]: TypePrefixNode,
  [PLACEHOLDER_RULE_NAME]: PlaceholderNode,
  [SUPPOSITION_RULE_NAME]: SuppositionNode,
  [CONSTRUCTOR_RULE_NAME]: ConstructorNode,
  [METATHEOREM_RULE_NAME]: MetatheoremNode,
  [EQUIVALENCE_RULE_NAME]: EquivalenceNode,
  [AXIOM_HEADER_RULE_NAME]: AxiomHeaderNode,
  [LEMMA_HEADER_RULE_NAME]: LemmaHeaderNode,
  [THEOREM_BODY_RULE_NAME]: TheoremBodyNode,
  [METAVARIABLE_RULE_NAME]: MetavariableNode,
  [EQUIVALENCES_RULE_NAME]: EquivalencesNode,
  [META_ARGUMENT_RULE_NAME]: MetaArgumentNode,
  [QUALIFICATION_RULE_NAME]: QualificationNode,
  [TYPE_ASSERTION_RULE_NAME]: TypeAssertionNode,
  [PROCEDURE_CALL_RULE_NAME]: ProcedureCallNode,
  [SUB_DERIVATION_RULE_NAME]: SubDerivationNode,
  [THEOREM_HEADER_RULE_NAME]: TheoremHeaderNode,
  [META_LEMMA_BODY_RULE_NAME]: MetaLemmaBodyNode,
  [CONJECTURE_BODY_RULE_NAME]: ConjectureBodyNode,
  [METATHEOREM_BODY_RULE_NAME]: MetatheoremBodyNode,
  [META_LEMMA_HEADER_RULE_NAME]: MetaLemmaHeaderNode,
  [CONJECTURE_HEADER_RULE_NAME]: ConjectureHeaderNode,
  [PROPERTY_RELATION_RULE_NAME]: PropertyRelationNode,
  [DEFINED_ASSERTION_RULE_NAME]: DefinedAssertionNode,
  [TERM_SUBSTITUTION_RULE_NAME]: TermSubstitutionNode,
  [METATHEOREM_HEADER_RULE_NAME]: MetatheoremHeaderNode,
  [SUBPROOF_ASSERTION_RULE_NAME]: SubproofAssertionNode,
  [PROPERTY_ASSERTION_RULE_NAME]: PropertyAssertionNode,
  [FRAME_SUBSTITUTION_RULE_NAME]: FrameSubstitutionNode,
  [PROCEDURE_REFERENCE_RULE_NAME]: ProcedureReferenceNode,
  [PARENTHESISED_LABEL_RULE_NAME]: ParenthesisedLabelNode,
  [SIGNATURE_ASSERTION_RULE_NAME]: SignatureAssertionNode,
  [CONTAINED_ASSERTION_RULE_NAME]: ContainedAssertionNode,
  [PARENTHESISED_LABELS_RULE_NAME]: ParenthesisedLabelsNode,
  [VARIABLE_DECLARATION_RULE_NAME]: VariableDeclarationNode,
  [PROPERTY_DECLARATION_RULE_NAME]: PropertyDeclarationNode,
  [META_LEVEL_ASSUMPTION_RULE_NAME]: MetaLevelAssumptionpNode,
  [COMBINATOR_DECLARATION_RULE_NAME]: CombinatorDeclarationNode,
  [STATEMENT_SUBSTITUTION_RULE_NAME]: StatementSubstitutionNode,
  [REFERENCE_SUBSTITUTION_RULE_NAME]: ReferenceSubstitutionNode,
  [SIMPLE_TYPE_DECLARATION_RULE_NAME]: SimpleTypeDeclarationNode,
  [TYPE_PREFIX_DECLARATION_RULE_NAME]: TypePrefixDeclarationNode,
  [CONSTRUCTOR_DECLARATION_RULE_NAME]: DonstructorDeclarationNode,
  [COMPLEX_TYPE_DECLARATION_RULE_NAME]: ComplexTypeDeclarationNode,
  [METAVARIABLE_DECLARATION_RULE_NAME]: MetavariableDeclarationNode
};

export default NonTerminalNodeMap;
