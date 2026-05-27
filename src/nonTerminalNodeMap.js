"use strict";

import TermNode from "./node/term";
import RuleNode from "./node/rule";
import StepNode from "./node/proofAssertion/step";
import TypeNode from "./node/type";
import GoalNode from "./node/goal";
import TypesNode from "./node/types";
import ErrorNode from "./node/error";
import FrameNode from "./node/frame";
import AxiomNode from "./node/topLevelAssertion/axiom";
import LemmaNode from "./node/topLevelAssertion/lemma";
import ProofNode from "./node/proof";
import LabelNode from "./node/label";
import LabelsNode from "./node/labels";
import SchemaNode from "./node/schema";
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
import ParameterNode from "./node/parameter";
import SignatureNode from "./node/signature";
import AxiomBodyNode from "./node/body/axiom";
import LemmaBodyNode from "./node/body/lemma";
import GeneratorNode from "./node/generator";
import ConstraintNode from "./node/constraint";
import DerivationNode from "./node/derivation";
import CombinatorNode from "./node/combinator";
import ConclusionNode from "./node/conclusion";
import ConjectureNode from "./node/topLevelAssertion/conjecture";
import HypothesisNode from "./node/hypothesis";
import TypePrefixNode from "./node/typePrefix";
import AssumptionNode from "./node/assumption";
import RuleHeaderNode from "./node/header/rule";
import SchemaBodyNode from "./node/body/schema";
import SuppositionNode from "./node/proofAssertion/supposition";
import PlaceholderNode from "./node/placeholder";
import ConstructorNode from "./node/constructor";
import EquivalenceNode from "./node/equivalence";
import TheoremBodyNode from "./node/body/theorem";
import AxiomHeaderNode from "./node/header/axiom";
import LemmaHeaderNode from "./node/header/lemma";
import EquivalencesNode from "./node/equivalences";
import MetaArgumentNode from "./node/metaArgument";
import MetavariableNode from "./node/metavariable";
import SchemaHeaderNode from "./node/header/schema";
import QualificationNode from "./node/qualification";
import SubDerivationNode from "./node/subDerivation";
import TheoremHeaderNode from "./node/header/theorem";
import TypeAssertionNode from "./node/assertion/type";
import ProcedureCallNode from "./node/procedureCall";
import ConjectureBodyNode from "./node/body/conjecture";
import TypeDeclarationNode from "./node/declaration/type";
import DefinedAssertionNode from "./node/assertion/defined";
import TermSubstitutionNode from "./node/substitution/term";
import ConjectureHeaderNode from "./node/header/conjecture";
import PropertyAssertionNode from "./node/assertion/property";
import SubproofAssertionNode from "./node/assertion/subproof";
import FrameSubstitutionNode from "./node/substitution/frame";
import CotypeDeclarationNode from "./node/declaration/cotype";
import ParenthesisedLabelNode from "./node/parenthesisedLabel";
import ProcedureReferenceNode from "./node/procedureReference";
import ContainedAssertionNode from "./node/assertion/contained";
import SignatureAssertionNode from "./node/assertion/signature";
import ImplicitAssumptionNode from "./node/assumption/implicit";
import ParenthesisedLabelsNode from "./node/parenthesisedLabels"
import PropertyDeclarationNode from "./node/declaration/property";
import VariableDeclarationNode from "./node/declaration/variable";
import GeneratorDeclarationNode from "./node/declaration/generator";
import CombinatorDeclarationNode from "./node/declaration/combinator";
import ReferenceSubstitutionNode from "./node/substitution/reference";
import StatementSubstitutionNode from "./node/substitution/statement";
import TypePrefixDeclarationNode from "./node/declaration/typePrefix";
import DonstructorDeclarationNode from "./node/declaration/constructor";
import MetavariableDeclarationNode from "./node/declaration/metavariable";

import {
  RULE_RULE_NAME,
  STEP_RULE_NAME,
  TERM_RULE_NAME,
  TYPE_RULE_NAME,
  GOAL_RULE_NAME,
  TYPES_RULE_NAME,
  PROOF_RULE_NAME,
  ERROR_RULE_NAME,
  FRAME_RULE_NAME,
  AXIOM_RULE_NAME,
  LEMMA_RULE_NAME,
  LABEL_RULE_NAME,
  SCHEMA_RULE_NAME,
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
  GENERATOR_RULE_NAME,
  DERIVATION_RULE_NAME,
  COMBINATOR_RULE_NAME,
  CONCLUSION_RULE_NAME,
  CONJECTURE_RULE_NAME,
  HYPOTHESIS_RULE_NAME,
  AXIOM_BODY_RULE_NAME,
  LEMMA_BODY_RULE_NAME,
  ASSUMPTION_RULE_NAME,
  CONSTRAINT_RULE_NAME,
  PLACEHOLDER_RULE_NAME,
  TYPE_PREFIX_RULE_NAME,
  SUPPOSITION_RULE_NAME,
  RULE_HEADER_RULE_NAME,
  CONSTRUCTOR_RULE_NAME,
  EQUIVALENCE_RULE_NAME,
  SCHEMA_BODY_RULE_NAME,
  EQUIVALENCES_RULE_NAME,
  AXIOM_HEADER_RULE_NAME,
  LEMMA_HEADER_RULE_NAME,
  THEOREM_BODY_RULE_NAME,
  METAVARIABLE_RULE_NAME,
  SCHEMA_HEADER_RULE_NAME,
  QUALIFICATION_RULE_NAME,
  META_ARGUMENT_RULE_NAME,
  PROCEDURE_CALL_RULE_NAME,
  THEOREM_HEADER_RULE_NAME,
  SUB_DERIVATION_RULE_NAME,
  TYPE_ASSERTION_RULE_NAME,
  CONJECTURE_BODY_RULE_NAME,
  TYPE_DECLARATION_RULE_NAME,
  CONJECTURE_HEADER_RULE_NAME,
  DEFINED_ASSERTION_RULE_NAME,
  TERM_SUBSTITUTION_RULE_NAME,
  COTYPE_DECLARATION_RULE_NAME,
  SUBPROOF_ASSERTION_RULE_NAME,
  PROPERTY_ASSERTION_RULE_NAME,
  FRAME_SUBSTITUTION_RULE_NAME,
  PROCEDURE_REFERENCE_RULE_NAME,
  CONTAINED_ASSERTION_RULE_NAME,
  SIGNATURE_ASSERTION_RULE_NAME,
  PARENTHESISED_LABEL_RULE_NAME,
  IMPLICIT_ASSUMPTION_RULE_NAME,
  PARENTHESISED_LABELS_RULE_NAME,
  PROPERTY_DECLARATION_RULE_NAME,
  VARIABLE_DECLARATION_RULE_NAME,
  GENERATOR_DECLARATION_RULE_NAME,
  COMBINATOR_DECLARATION_RULE_NAME,
  REFERENCE_SUBSTITUTION_RULE_NAME,
  STATEMENT_SUBSTITUTION_RULE_NAME,
  CONSTRUCTOR_DECLARATION_RULE_NAME,
  TYPE_PREFIX_DECLARATION_RULE_NAME,
  METAVARIABLE_DECLARATION_RULE_NAME } from "./ruleNames";

const NonTerminalNodeMap = {
  [RULE_RULE_NAME]: RuleNode,
  [STEP_RULE_NAME]: StepNode,
  [TERM_RULE_NAME]: TermNode,
  [TYPE_RULE_NAME]: TypeNode,
  [GOAL_RULE_NAME]: GoalNode,
  [TYPES_RULE_NAME]: TypesNode,
  [ERROR_RULE_NAME]: ErrorNode,
  [FRAME_RULE_NAME]: FrameNode,
  [LEMMA_RULE_NAME]: LemmaNode,
  [AXIOM_RULE_NAME]: AxiomNode,
  [PROOF_RULE_NAME]: ProofNode,
  [LABEL_RULE_NAME]: LabelNode,
  [SCHEMA_RULE_NAME]: SchemaNode,
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
  [GENERATOR_RULE_NAME]: GeneratorNode,
  [AXIOM_BODY_RULE_NAME]: AxiomBodyNode,
  [LEMMA_BODY_RULE_NAME]: LemmaBodyNode,
  [COMBINATOR_RULE_NAME]: CombinatorNode,
  [CONCLUSION_RULE_NAME]: ConclusionNode,
  [CONJECTURE_RULE_NAME]: ConjectureNode,
  [DERIVATION_RULE_NAME]: DerivationNode,
  [HYPOTHESIS_RULE_NAME]: HypothesisNode,
  [ASSUMPTION_RULE_NAME]: AssumptionNode,
  [CONSTRAINT_RULE_NAME]: ConstraintNode,
  [RULE_HEADER_RULE_NAME]: RuleHeaderNode,
  [TYPE_PREFIX_RULE_NAME]: TypePrefixNode,
  [PLACEHOLDER_RULE_NAME]: PlaceholderNode,
  [SUPPOSITION_RULE_NAME]: SuppositionNode,
  [CONSTRUCTOR_RULE_NAME]: ConstructorNode,
  [EQUIVALENCE_RULE_NAME]: EquivalenceNode,
  [SCHEMA_BODY_RULE_NAME]: SchemaBodyNode,
  [AXIOM_HEADER_RULE_NAME]: AxiomHeaderNode,
  [LEMMA_HEADER_RULE_NAME]: LemmaHeaderNode,
  [THEOREM_BODY_RULE_NAME]: TheoremBodyNode,
  [METAVARIABLE_RULE_NAME]: MetavariableNode,
  [EQUIVALENCES_RULE_NAME]: EquivalencesNode,
  [META_ARGUMENT_RULE_NAME]: MetaArgumentNode,
  [SCHEMA_HEADER_RULE_NAME]: SchemaHeaderNode,
  [QUALIFICATION_RULE_NAME]: QualificationNode,
  [PROCEDURE_CALL_RULE_NAME]: ProcedureCallNode,
  [TYPE_ASSERTION_RULE_NAME]: TypeAssertionNode,
  [SUB_DERIVATION_RULE_NAME]: SubDerivationNode,
  [THEOREM_HEADER_RULE_NAME]: TheoremHeaderNode,
  [CONJECTURE_BODY_RULE_NAME]: ConjectureBodyNode,
  [TYPE_DECLARATION_RULE_NAME]: TypeDeclarationNode,
  [CONJECTURE_HEADER_RULE_NAME]: ConjectureHeaderNode,
  [DEFINED_ASSERTION_RULE_NAME]: DefinedAssertionNode,
  [TERM_SUBSTITUTION_RULE_NAME]: TermSubstitutionNode,
  [COTYPE_DECLARATION_RULE_NAME]: CotypeDeclarationNode,
  [SUBPROOF_ASSERTION_RULE_NAME]: SubproofAssertionNode,
  [PROPERTY_ASSERTION_RULE_NAME]: PropertyAssertionNode,
  [FRAME_SUBSTITUTION_RULE_NAME]: FrameSubstitutionNode,
  [PROCEDURE_REFERENCE_RULE_NAME]: ProcedureReferenceNode,
  [PARENTHESISED_LABEL_RULE_NAME]: ParenthesisedLabelNode,
  [SIGNATURE_ASSERTION_RULE_NAME]: SignatureAssertionNode,
  [CONTAINED_ASSERTION_RULE_NAME]: ContainedAssertionNode,
  [IMPLICIT_ASSUMPTION_RULE_NAME]: ImplicitAssumptionNode,
  [PARENTHESISED_LABELS_RULE_NAME]: ParenthesisedLabelsNode,
  [VARIABLE_DECLARATION_RULE_NAME]: VariableDeclarationNode,
  [PROPERTY_DECLARATION_RULE_NAME]: PropertyDeclarationNode,
  [GENERATOR_DECLARATION_RULE_NAME]: GeneratorDeclarationNode,
  [COMBINATOR_DECLARATION_RULE_NAME]: CombinatorDeclarationNode,
  [STATEMENT_SUBSTITUTION_RULE_NAME]: StatementSubstitutionNode,
  [REFERENCE_SUBSTITUTION_RULE_NAME]: ReferenceSubstitutionNode,
  [TYPE_PREFIX_DECLARATION_RULE_NAME]: TypePrefixDeclarationNode,
  [CONSTRUCTOR_DECLARATION_RULE_NAME]: DonstructorDeclarationNode,
  [METAVARIABLE_DECLARATION_RULE_NAME]: MetavariableDeclarationNode
};

export default NonTerminalNodeMap;
