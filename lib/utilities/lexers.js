"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get default () {
        return _default;
    },
    get nominalLexerFromCombinedCustomGrammar () {
        return nominalLexerFromCombinedCustomGrammar;
    },
    get nominalLexerFromEntriesAndCombinedCustomGrammar () {
        return nominalLexerFromEntriesAndCombinedCustomGrammar;
    },
    get nominalLexerFromNothing () {
        return nominalLexerFromNothing;
    }
});
var _occamgrammars = require("occam-grammars");
var _occamlexers = require("occam-lexers");
var _combined = /*#__PURE__*/ _interop_require_default(require("../customGrammar/combined"));
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var lexerFromRules = _occamlexers.lexerUtilities.lexerFromRules, rulesFromEntries = _occamlexers.lexerUtilities.rulesFromEntries;
function nominalLexerFromNothing(Class) {
    if (Class === undefined) {
        Class = _occamgrammars.NominalLexer; ///
    }
    var entries = Class.entries, combinedCustomGrammar = _combined.default.fromNothing(), rules = rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar), nominalLexer = lexerFromRules(Class, rules);
    return nominalLexer;
}
function nominalLexerFromCombinedCustomGrammar(Class, combinedCustomGrammar) {
    if (combinedCustomGrammar === undefined) {
        combinedCustomGrammar = Class; ///
        Class = _occamgrammars.NominalLexer; ///
    }
    var entries = Class.entries, rules = rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar), nominalLexer = lexerFromRules(Class, rules);
    return nominalLexer;
}
function nominalLexerFromEntriesAndCombinedCustomGrammar(Class, entries, combinedCustomGrammar) {
    if (combinedCustomGrammar === undefined) {
        combinedCustomGrammar = entries; ///
        entries = Class; ///
        Class = _occamgrammars.NominalLexer; ///
    }
    var rules = rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar), nominalLexer = lexerFromRules(Class, rules);
    return nominalLexer;
}
var _default = {
    nominalLexerFromNothing: nominalLexerFromNothing,
    nominalLexerFromCombinedCustomGrammar: nominalLexerFromCombinedCustomGrammar,
    nominalLexerFromEntriesAndCombinedCustomGrammar: nominalLexerFromEntriesAndCombinedCustomGrammar
};
function rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar) {
    var customGrammarEntries = combinedCustomGrammar.getEntries();
    entries = _to_consumable_array(customGrammarEntries).concat(_to_consumable_array(entries));
    var rules = rulesFromEntries(entries);
    return rules;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvbGV4ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBOb21pbmFsTGV4ZXIgfSBmcm9tIFwib2NjYW0tZ3JhbW1hcnNcIjtcbmltcG9ydCB7IGxleGVyVXRpbGl0aWVzIH0gZnJvbSBcIm9jY2FtLWxleGVyc1wiO1xuXG5pbXBvcnQgQ29tYmluZWRDdXN0b21HcmFtbWFyIGZyb20gXCIuLi9jdXN0b21HcmFtbWFyL2NvbWJpbmVkXCI7XG5cbmNvbnN0IHsgbGV4ZXJGcm9tUnVsZXMsIHJ1bGVzRnJvbUVudHJpZXMgfSA9IGxleGVyVXRpbGl0aWVzO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9taW5hbExleGVyRnJvbU5vdGhpbmcoQ2xhc3MpIHtcbiAgaWYgKENsYXNzID09PSB1bmRlZmluZWQpIHtcbiAgICBDbGFzcyA9IE5vbWluYWxMZXhlcjsgLy8vXG4gIH1cblxuICBjb25zdCB7IGVudHJpZXMgfSA9IENsYXNzLFxuICAgICAgICBjb21iaW5lZEN1c3RvbUdyYW1tYXIgPSBDb21iaW5lZEN1c3RvbUdyYW1tYXIuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgcnVsZXMgPSBydWxlc0Zyb21FbnRyaWVzQW5kQ29tYmluZWRDdXN0b21HcmFtbWFyKGVudHJpZXMsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgIG5vbWluYWxMZXhlciA9IGxleGVyRnJvbVJ1bGVzKENsYXNzLCBydWxlcyk7XG5cbiAgcmV0dXJuIG5vbWluYWxMZXhlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIoQ2xhc3MsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hcikge1xuICBpZiAoY29tYmluZWRDdXN0b21HcmFtbWFyID09PSB1bmRlZmluZWQpIHtcbiAgICBjb21iaW5lZEN1c3RvbUdyYW1tYXIgPSBDbGFzczsgIC8vL1xuXG4gICAgQ2xhc3MgPSBOb21pbmFsTGV4ZXI7IC8vL1xuICB9XG5cbiAgY29uc3QgeyBlbnRyaWVzIH0gPSBDbGFzcyxcbiAgICAgICAgcnVsZXMgPSBydWxlc0Zyb21FbnRyaWVzQW5kQ29tYmluZWRDdXN0b21HcmFtbWFyKGVudHJpZXMsIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciksXG4gICAgICAgIG5vbWluYWxMZXhlciA9IGxleGVyRnJvbVJ1bGVzKENsYXNzLCBydWxlcyk7XG5cbiAgcmV0dXJuIG5vbWluYWxMZXhlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vbWluYWxMZXhlckZyb21FbnRyaWVzQW5kQ29tYmluZWRDdXN0b21HcmFtbWFyKENsYXNzLCBlbnRyaWVzLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpIHtcbiAgaWYgKGNvbWJpbmVkQ3VzdG9tR3JhbW1hciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29tYmluZWRDdXN0b21HcmFtbWFyID0gZW50cmllczsgIC8vL1xuXG4gICAgZW50cmllcyA9IENsYXNzOyAgLy8vXG5cbiAgICBDbGFzcyA9IE5vbWluYWxMZXhlcjsgLy8vXG4gIH1cblxuICBjb25zdCBydWxlcyA9IHJ1bGVzRnJvbUVudHJpZXNBbmRDb21iaW5lZEN1c3RvbUdyYW1tYXIoZW50cmllcywgY29tYmluZWRDdXN0b21HcmFtbWFyKSxcbiAgICAgICAgbm9taW5hbExleGVyID0gbGV4ZXJGcm9tUnVsZXMoQ2xhc3MsIHJ1bGVzKTtcblxuICByZXR1cm4gbm9taW5hbExleGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5vbWluYWxMZXhlckZyb21Ob3RoaW5nLFxuICBub21pbmFsTGV4ZXJGcm9tQ29tYmluZWRDdXN0b21HcmFtbWFyLFxuICBub21pbmFsTGV4ZXJGcm9tRW50cmllc0FuZENvbWJpbmVkQ3VzdG9tR3JhbW1hclxufTtcblxuZnVuY3Rpb24gcnVsZXNGcm9tRW50cmllc0FuZENvbWJpbmVkQ3VzdG9tR3JhbW1hcihlbnRyaWVzLCBjb21iaW5lZEN1c3RvbUdyYW1tYXIpIHtcbiAgY29uc3QgY3VzdG9tR3JhbW1hckVudHJpZXMgPSBjb21iaW5lZEN1c3RvbUdyYW1tYXIuZ2V0RW50cmllcygpO1xuXG4gIGVudHJpZXMgPSBbIC8vL1xuICAgIC4uLmN1c3RvbUdyYW1tYXJFbnRyaWVzLFxuICAgIC4uLmVudHJpZXNcbiAgXTtcblxuICBjb25zdCBydWxlcyA9IHJ1bGVzRnJvbUVudHJpZXMoZW50cmllcyk7XG5cbiAgcmV0dXJuIHJ1bGVzO1xufVxuIl0sIm5hbWVzIjpbIm5vbWluYWxMZXhlckZyb21Db21iaW5lZEN1c3RvbUdyYW1tYXIiLCJub21pbmFsTGV4ZXJGcm9tRW50cmllc0FuZENvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxMZXhlckZyb21Ob3RoaW5nIiwibGV4ZXJGcm9tUnVsZXMiLCJsZXhlclV0aWxpdGllcyIsInJ1bGVzRnJvbUVudHJpZXMiLCJDbGFzcyIsInVuZGVmaW5lZCIsIk5vbWluYWxMZXhlciIsImVudHJpZXMiLCJjb21iaW5lZEN1c3RvbUdyYW1tYXIiLCJDb21iaW5lZEN1c3RvbUdyYW1tYXIiLCJmcm9tTm90aGluZyIsInJ1bGVzIiwicnVsZXNGcm9tRW50cmllc0FuZENvbWJpbmVkQ3VzdG9tR3JhbW1hciIsIm5vbWluYWxMZXhlciIsImN1c3RvbUdyYW1tYXJFbnRyaWVzIiwiZ2V0RW50cmllcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O1FBbURBO2VBQUE7O1FBN0JnQkE7ZUFBQUE7O1FBY0FDO2VBQUFBOztRQTNCQUM7ZUFBQUE7Ozs2QkFQYTsyQkFDRTsrREFFRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsQyxJQUFRQyxpQkFBcUNDLDJCQUFjLENBQW5ERCxnQkFBZ0JFLG1CQUFxQkQsMkJBQWMsQ0FBbkNDO0FBRWpCLFNBQVNILHdCQUF3QkksS0FBSztJQUMzQyxJQUFJQSxVQUFVQyxXQUFXO1FBQ3ZCRCxRQUFRRSwyQkFBWSxFQUFFLEdBQUc7SUFDM0I7SUFFQSxJQUFNLEFBQUVDLFVBQVlILE1BQVpHLFNBQ0ZDLHdCQUF3QkMsaUJBQXFCLENBQUNDLFdBQVcsSUFDekRDLFFBQVFDLHlDQUF5Q0wsU0FBU0Msd0JBQzFESyxlQUFlWixlQUFlRyxPQUFPTztJQUUzQyxPQUFPRTtBQUNUO0FBRU8sU0FBU2Ysc0NBQXNDTSxLQUFLLEVBQUVJLHFCQUFxQjtJQUNoRixJQUFJQSwwQkFBMEJILFdBQVc7UUFDdkNHLHdCQUF3QkosT0FBUSxHQUFHO1FBRW5DQSxRQUFRRSwyQkFBWSxFQUFFLEdBQUc7SUFDM0I7SUFFQSxJQUFNLEFBQUVDLFVBQVlILE1BQVpHLFNBQ0ZJLFFBQVFDLHlDQUF5Q0wsU0FBU0Msd0JBQzFESyxlQUFlWixlQUFlRyxPQUFPTztJQUUzQyxPQUFPRTtBQUNUO0FBRU8sU0FBU2QsZ0RBQWdESyxLQUFLLEVBQUVHLE9BQU8sRUFBRUMscUJBQXFCO0lBQ25HLElBQUlBLDBCQUEwQkgsV0FBVztRQUN2Q0csd0JBQXdCRCxTQUFVLEdBQUc7UUFFckNBLFVBQVVILE9BQVEsR0FBRztRQUVyQkEsUUFBUUUsMkJBQVksRUFBRSxHQUFHO0lBQzNCO0lBRUEsSUFBTUssUUFBUUMseUNBQXlDTCxTQUFTQyx3QkFDMURLLGVBQWVaLGVBQWVHLE9BQU9PO0lBRTNDLE9BQU9FO0FBQ1Q7SUFFQSxXQUFlO0lBQ2JiLHlCQUFBQTtJQUNBRix1Q0FBQUE7SUFDQUMsaURBQUFBO0FBQ0Y7QUFFQSxTQUFTYSx5Q0FBeUNMLE9BQU8sRUFBRUMscUJBQXFCO0lBQzlFLElBQU1NLHVCQUF1Qk4sc0JBQXNCTyxVQUFVO0lBRTdEUixVQUFVLEFBQ1IscUJBQUdPLDZCQUNILHFCQUFHUDtJQUdMLElBQU1JLFFBQVFSLGlCQUFpQkk7SUFFL0IsT0FBT0k7QUFDVCJ9