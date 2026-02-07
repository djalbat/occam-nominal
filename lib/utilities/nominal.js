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
    get nominalLexer () {
        return nominalLexer;
    },
    get nominalParser () {
        return nominalParser;
    }
});
var _occamlexers = require("occam-lexers");
var _occamparsers = require("occam-parsers");
var _occamgrammars = require("occam-grammars");
var nominalLexer = _occamlexers.CommonLexer.fromNothing(_occamgrammars.NominalLexer);
var nominalParser = _occamparsers.CommonParser.fromNothing(_occamgrammars.NominalParser);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvbm9taW5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgQ29tbW9uTGV4ZXIgfSBmcm9tIFwib2NjYW0tbGV4ZXJzXCI7XG5pbXBvcnQgeyBDb21tb25QYXJzZXIgfSBmcm9tIFwib2NjYW0tcGFyc2Vyc1wiO1xuaW1wb3J0IHsgTm9taW5hbExleGVyLCBOb21pbmFsUGFyc2VyIH0gZnJvbSBcIm9jY2FtLWdyYW1tYXJzXCI7XG5cbmV4cG9ydCBjb25zdCBub21pbmFsTGV4ZXIgPSBDb21tb25MZXhlci5mcm9tTm90aGluZyhOb21pbmFsTGV4ZXIpO1xuXG5leHBvcnQgY29uc3Qgbm9taW5hbFBhcnNlciA9IENvbW1vblBhcnNlci5mcm9tTm90aGluZyhOb21pbmFsUGFyc2VyKTtcbiJdLCJuYW1lcyI6WyJub21pbmFsTGV4ZXIiLCJub21pbmFsUGFyc2VyIiwiQ29tbW9uTGV4ZXIiLCJmcm9tTm90aGluZyIsIk5vbWluYWxMZXhlciIsIkNvbW1vblBhcnNlciIsIk5vbWluYWxQYXJzZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQU1hQTtlQUFBQTs7UUFFQUM7ZUFBQUE7OzsyQkFOZTs0QkFDQzs2QkFDZTtBQUVyQyxJQUFNRCxlQUFlRSx3QkFBVyxDQUFDQyxXQUFXLENBQUNDLDJCQUFZO0FBRXpELElBQU1ILGdCQUFnQkksMEJBQVksQ0FBQ0YsV0FBVyxDQUFDRyw0QkFBYSJ9