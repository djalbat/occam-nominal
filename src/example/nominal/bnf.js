"use strict";

const bnf = `document                             ::=  ( variableDeclaration 
                                           
                                          | metavariableDeclaration 
                                                          
                                          | combinatorDeclaration 
                                                          
                                          | constructorDeclaration 
                                                          
                                          | generatorDeclaration 
                                                          
                                          | typePrefixDeclaration  
                                                                                                     
                                          | typeDeclaration 
                                                          
                                          | cotypeDeclaration 
                                                      
                                          | rule 
               
                                          | axiom 
               
                                          | lemma 
               
                                          | theorem 
               
                                          | conjecture 
               
                                          | schema  
                                                      
                                          | section 
                                                      
                                          | verticalSpace 
                                                      
                                          | error )+ ;



section                              ::=  "Given" <END_OF_LINE>

                                          hypothesis+
                                          
                                          <END_OF_LINE>
                                          
                                          ( axiom 
                                          
                                          | lemma 
                                          
                                          | theorem 
                                          
                                          | conjecture 
                                          
                                          | generatorDeclaration 
                                          
                                          | constructorDeclaration ) ; 
                                          


verticalSpace                        ::=  <END_OF_LINE>+ ;



error.                               ::=  . ;



variableDeclaration                  ::=  "Variable" variable ( ":" type "provisionally"? )? <END_OF_LINE> ;
 
metavariableDeclaration              ::=  "Metavariable" metavariable... ":" metaType <END_OF_LINE> ;
 
typePrefixDeclaration                ::=  "TypePrefix" typePrefix <END_OF_LINE> ;

typeDeclaration                      ::=  "Provisional"? "Closed"? "Type" type ( ":" types )? <END_OF_LINE> ;
 
cotypeDeclaration                    ::=  "Provisional"? "Type" <END_OF_LINE> 

                                          type ( ":" types )? <END_OF_LINE>
                                          
                                          (
                                          
                                            ( "Properties" <END_OF_LINE> propertyDeclaration propertyDeclaration+ ) 
                                             
                                            | 
                                             
                                            ( "Property" <END_OF_LINE> propertyDeclaration ) 
                                             
                                          );

combinatorDeclaration                ::=  "Combinator" combinator... <END_OF_LINE> ;
 
propertyDeclaration.                 ::=  property... ( ":" ( type | stuff ) )? <END_OF_LINE> ;

generatorDeclaration                 ::=  "Generator" generator... ( ":" ( type | stuff ) "provisionally"? )? <END_OF_LINE> ;
 
constructorDeclaration               ::=  "Constructor" constructor... ( ":" ( type | stuff ) "provisionally"? )? <END_OF_LINE> ;
 


  
rule                                 ::=  ruleHeader ruleBody ;                                         

axiom                                ::=  axiomHeader axiomBody ;

lemma                                ::=  lemmaHeader lemmaBody ;

theorem                              ::=  theoremHeader theoremBody ;

conjecture                           ::=  conjectureHeader conjectureBody ;

schema                               ::=  schemaHeader schemaBody ;



ruleHeader                          ::=  "Rule" parenthesisedLabels... <END_OF_LINE> ; 

schemaHeader                        ::=  "Schema" parenthesisedLabel... <END_OF_LINE> ;

axiomHeader                         ::=  "Axiom" signature? parenthesisedLabels... <END_OF_LINE> ; 

lemmaHeader                         ::=  "Lemma" parenthesisedLabels... <END_OF_LINE> | "Lemma" <END_OF_LINE> ; 

theoremHeader                       ::=  "Theorem" parenthesisedLabels... <END_OF_LINE> ; 

conjectureHeader                    ::=  "Conjecture" parenthesisedLabels... <END_OF_LINE> ;



ruleBody                             ::=  ( 

                                            ( "Premises" <END_OF_LINE> premise premise+ ) 
                                             
                                            | 
                                             
                                            ( "Premise" <END_OF_LINE> premise ) 
                                             
                                          )?
                                             
                                          "Conclusion" <END_OF_LINE> conclusion 
                                           
                                          proof? ;                                         

schemaBody                           ::=  (
                                           
                                            "Suppose" <END_OF_LINE> supposition+ 

                                            "Then" <END_OF_LINE> 
                                             
                                          )?
                                            
                                          deduction
                                                                                         
                                          proof ;

axiomBody                            ::=  (
                                           
                                            "Suppose" <END_OF_LINE> supposition+
    
                                            "Then" <END_OF_LINE> 
                                                 
                                          )?
                                                 
                                          deduction ;

lemmaBody                            ::=  (
                                           
                                            "Suppose" <END_OF_LINE> supposition+

                                            "Then" <END_OF_LINE> 
                                             
                                          )?
                                            
                                          deduction
                                           
                                          proof ;

theoremBody                          ::=  (
                                           
                                            "Suppose" <END_OF_LINE> supposition+

                                            "Then" <END_OF_LINE> 
                                             
                                          )?
                                             
                                          deduction
                                           
                                          proof ;

conjectureBody                       ::=  (
                                           
                                            "Suppose" <END_OF_LINE> supposition+

                                            "Then" <END_OF_LINE> 
                                             
                                          )?
                                             
                                          deduction
                                           
                                          proof? ;



proof                                ::=  "Proof" <END_OF_LINE> derivation ;

subproof                             ::=  "Suppose" <END_OF_LINE> supposition+ subDerivation ;

derivation                           ::=  ( 

                                            ( step | subproof )+ 
                                            
                                            "Therefore" <END_OF_LINE> 
                                            
                                          )? 
                                          
                                          step ;                                        

subDerivation                        ::=  (

                                            "Hence" <END_OF_LINE>
    
                                            ( step | subproof )+ 
                                                                                         
                                          )? 
                                           
                                          "Then" <END_OF_LINE> 
                                           
                                          step ;                                        



premise.                             ::=  procedureCall <END_OF_LINE>  

                                       |  statement... <END_OF_LINE>  

                                       |  nonsense... <END_OF_LINE>
                                       
                                       ;

supposition.                         ::=  procedureCall <END_OF_LINE>  

                                       |  statement... <END_OF_LINE>  

                                       |  nonsense... <END_OF_LINE>
                                       
                                       ;

conclusion.                          ::=  statement... <END_OF_LINE>  

                                       |  nonsense... <END_OF_LINE>
                                       
                                       ;

deduction.                           ::=  statement... <END_OF_LINE>  

                                       |  nonsense... <END_OF_LINE>
                                       
                                       ;

hypothesis.                          ::=  procedureCall <END_OF_LINE>  

                                       |  statement... <END_OF_LINE>  

                                       |  nonsense... <END_OF_LINE>
                                       
                                       ;



step.                                ::=  statement... qualification? <END_OF_LINE>  

                                       |  nonsense... qualification <END_OF_LINE>
                                       
                                       |  nonsense... <END_OF_LINE>
                                       
                                       ;



qualification                        ::=  "because" signatureAssertion

                                       |  "via" schemaAssertion

                                       |  ( "by" | "from" ) reference
                                       
                                       ; 



procedureCall                        ::=  "@"<NO_WHITESPACE>procedureReference<NO_WHITESPACE>"(" parameter ( "," parameter )* ")" ;



parenthesisedLabels                  ::=  "(" labels ")" ; 

parenthesisedLabel                   ::=  "(" label ")" ; 



signature                            ::=  "[" term ( "," term )* "]" ;



arguments                            ::=  argument ( "," argument )* ;

labels                               ::=  label ( "," label )* ;

types                                ::=  type ( "," type )* ;



argument                             ::=  term ( ) 

                                       |  type ( )
                                       
                                       ;

metaArgument                         ::=  statement ( ) 

                                       |  metaType ( ) 
                                       
                                       ;

procedureReference.                  ::=  [name] ;

reference.                           ::=  metavariable ;

label.                               ::=  metavariable ;



equivalences                         ::=  equivalence ( "," equivalence )* ;

equivalence                          ::=  "[" term ( "," term )* "]" ;



equality                             ::=  term ( "=" | "!=" ) term ;

typeAssertion                        ::=  term ":" type ;

propertyAssertion                    ::=  term "is" ( "a" | "an" | "the" ) term ;

definedAssertion                     ::=  term "is" ( "defined" | "undefined" ) ;

containedAssertion                   ::=  term "is" ( "present" | "missing" ) "in" statement ;

signatureAssertion                   ::=  "[" term ( "," term )* "]" "satisfies" metavariable ;  

subproofAssertion                    ::=  "[" statement ( "," statement )* "]" "..." statement ;

schemaAssertion                      ::=  metavariable "-"<NO_WHITESPACE>"|" frame ;

frame                                ::=  "[" ( ( metavariable | assumption ) ( "," assumption )* ) "]" ;
 
assumption                           ::=  metavariable "::" statement ;

constraint                           ::=  reference "::" statement ;
 
implicitAssumption                   ::=  "." "::" statement ;

termSubstitution                     ::=  "[" term "for" term "]" ;

frameSubstitution                    ::=  "[" frame "for" frame "]" ;

statementSubstitution                ::=  "[" statement "for" statement "]" ;

referenceSubstitution                ::=  "[" reference "for" reference "]" ;



combinator                           ::=  statement | nonsense ;

constructor                          ::=  term | stuff ; 

generator                            ::=  term | stuff ; 

property                             ::=  term | stuff ; 

 

metavariable.                        ::=  [name] ( <NO_WHITESPACE>"(" ( term | type | stuff ) ")" )? ;

parameter.                           ::=  [name] | [identifier] ;

variable.                            ::=  [identifier] ;

metaType.                            ::=  [meta-type] ;

typePrefix.                          ::=  [type] ;

type.                                ::=  [type] ( <NO_WHITESPACE>[type] )? 

                                       |  "<"<NO_WHITESPACE>">"

                                       ;



stuff.                               ::=  ( [symbol] | [type] | [name] | [backtick] | [identifier] | [primitive] | [unassigned] )+ ;

nonsense.                            ::=  ( [secondary-keyword] | [meta-type] | [special] | [symbol] | [type] | [name] | [backtick] | [identifier] | [primitive] | [unassigned] )+ ;`;

export default bnf;
